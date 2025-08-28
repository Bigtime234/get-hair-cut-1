"use server"

import { db } from "@/server"
import { bookings, users, services } from "@/server/schema"
import { eq } from "drizzle-orm"
import { CustomerInfo, AppointmentTime } from "@/Types/booking-schema"
import { Resend } from "resend"
import { revalidatePath } from "next/cache"

const resend = new Resend(process.env.RESEND_API_KEY)

type CreateEnhancedBookingParams = {
  serviceId: string
  customerInfo: CustomerInfo
  appointmentTime: AppointmentTime
  sessionUserId: string // This should be the database user CUID2
}

export async function createEnhancedBookingAction({
  serviceId,
  customerInfo,
  appointmentTime,
  sessionUserId,
}: CreateEnhancedBookingParams) {
  try {
    console.log('Creating enhanced booking with:', { serviceId, customerInfo, appointmentTime, sessionUserId })

    // Validate required fields
    if (!sessionUserId) {
      return { error: "User session is required. Please log in and try again." }
    }

    if (!serviceId) {
      return { error: "Service ID is required." }
    }

    if (!customerInfo.email) {
      return { error: "Email is required." }
    }

    if (!appointmentTime.date || !appointmentTime.time) {
      return { error: "Appointment date and time are required." }
    }

    // Get service details
    const service = await db.query.services.findFirst({
      where: eq(services.id, serviceId),
    })

    if (!service) {
      return { error: "Service not found" }
    }

    if (!service.isActive) {
      return { error: "This service is currently unavailable" }
    }

    // Look up user by the session user ID (which should be the database CUID2)
    let user = await db.query.users.findFirst({
      where: eq(users.id, sessionUserId),
    })

    if (!user) {
      // If user doesn't exist, this indicates a problem with authentication
      // The user should already exist in the database when they're authenticated
      console.error('User not found in database with ID:', sessionUserId)
      return { error: "User session invalid. Please log out and log back in." }
    }

    // Update existing user with current booking info if provided
    try {
      const updatedUser = await db.update(users)
        .set({
          name: customerInfo.name || user.name,
          email: customerInfo.email || user.email,
          phone: customerInfo.phone || user.phone,
          updatedAt: new Date(),
        })
        .where(eq(users.id, sessionUserId))
        .returning()

      if (!updatedUser.length) {
        return { error: "Failed to update user information" }
      }

      user = updatedUser[0]
      console.log('Updated existing user:', user.id, user.email)
    } catch (updateError) {
      console.error('Failed to update user:', updateError)
      return { error: "Failed to update user information" }
    }

    // Validate appointment time
    const appointmentDate = new Date(appointmentTime.date)
    const [hours, minutes] = appointmentTime.time.split(':').map(Number)
    
    if (isNaN(hours) || isNaN(minutes)) {
      return { error: "Invalid appointment time format" }
    }

    appointmentDate.setHours(hours, minutes, 0, 0)
    
    // Check if appointment is in the past
    const now = new Date()
    if (appointmentDate <= now) {
      return { error: "Cannot book appointments in the past" }
    }

    // Calculate end time
    const endDate = new Date(appointmentDate)
    endDate.setMinutes(endDate.getMinutes() + service.duration)

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    }

    // Check for existing bookings at the same time (basic conflict check)
    const existingBooking = await db.query.bookings.findFirst({
      where: (bookings, { and, eq, gte, lt, ne }) => and(
        eq(bookings.appointmentDate, appointmentDate),
        eq(bookings.startTime, formatTime(appointmentDate)),
        ne(bookings.status, 'cancelled')
      )
    })

    if (existingBooking) {
      return { error: "This time slot is already booked. Please choose another time." }
    }

    // Create booking with the database user CUID2 - DEFAULTS TO PENDING
    const [booking] = await db.insert(bookings).values({
      serviceId: service.id,
      customerId: sessionUserId,
      appointmentDate: appointmentDate,
      startTime: formatTime(appointmentDate),
      endTime: formatTime(endDate),
      totalPrice: service.price,
      status: 'pending', // Default status - admin will mark as completed when service is done
      notes: customerInfo.notes || null,
    }).returning()

    console.log('Booking created successfully with PENDING status:', {
      bookingId: booking.id,
      customerId: sessionUserId,
      customerEmail: user.email,
      status: booking.status
    })

    // Send email notifications
    try {
      // Format appointment date
      const appointmentDateFormatted = appointmentDate.toLocaleDateString('en-NG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      // Send admin notification email
      const adminEmailResult = await resend.emails.send({
        from: 'Hair Cutz Studio <onboarding@resend.dev>',
        to: 'codebyriven@gmail.com',
        subject: `New Booking Request - #${booking.id}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h1 style="color: #f59e0b; text-align: center;">New Booking Request!</h1>
            <p style="font-size: 18px; text-align: center; margin-bottom: 30px;">Booking #${booking.id}</p>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
              <h2 style="color: #92400e; margin-top: 0;">Appointment Request</h2>
              <p><strong>Service:</strong> ${service.name}</p>
              <p><strong>Category:</strong> ${service.category || 'General'}</p>
              <p><strong>Date:</strong> ${appointmentDateFormatted}</p>
              <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
              <p><strong>Duration:</strong> ${service.duration} minutes</p>
              <p><strong>Price:</strong> ₦${parseFloat(booking.totalPrice).toLocaleString()}</p>
              <p><strong>Status:</strong> <span style="color: #d97706; font-weight: bold;">PENDING</span></p>
            </div>

            <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1f2937; margin-top: 0;">Customer Details</h2>
              <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Phone:</strong> ${user.phone || 'N/A'}</p>
              <p><strong>Customer ID:</strong> ${sessionUserId}</p>
              ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
            </div>

            <div style="background-color: #e0f2fe; padding: 15px; border-radius: 8px; border-left: 4px solid #0284c7;">
              <h3 style="color: #0c4a6e; margin-top: 0;">📅 Next Steps</h3>
              <p style="color: #0c4a6e; margin: 0;">
                This booking is awaiting your confirmation. Once the service is completed, 
                mark it as "Completed" in the admin panel.
              </p>
            </div>
          </div>
        `,
      })

      // Send customer booking confirmation email
      const customerEmailResult = await resend.emails.send({
        from: 'Hair Cutz Studio <onboarding@resend.dev>',
        to: "codebyriven@gmail.com",
        subject: `Booking Request Received - ${service.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #f59e0b;">Booking Request Received!</h1>
              <p style="font-size: 18px; color: #6b7280;">Reference: #${booking.id}</p>
            </div>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
              <h2 style="color: #92400e; margin-top: 0;">Your Appointment Request</h2>
              <p><strong>Service:</strong> ${service.name}</p>
              <p><strong>Description:</strong> ${service.description || 'Professional service'}</p>
              <p><strong>Date:</strong> ${appointmentDateFormatted}</p>
              <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
              <p><strong>Duration:</strong> ${service.duration} minutes</p>
              <p><strong>Total Amount:</strong> ₦${parseFloat(booking.totalPrice).toLocaleString()}</p>
              ${booking.notes ? `<p><strong>Your Notes:</strong> ${booking.notes}</p>` : ''}
            </div>

            <div style="background-color: #e0f2fe; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0284c7;">
              <h3 style="color: #0c4a6e; margin-top: 0;">✅ What's Next?</h3>
              <p style="color: #0c4a6e; margin: 0;">
                Your appointment request has been received and is being reviewed. 
                We'll be in touch soon to confirm your slot!
              </p>
            </div>

            <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #0369a1; margin-top: 0;">Important Information</h3>
              <ul style="color: #1e40af; margin: 0; padding-left: 20px;">
                <li>Your slot is being held for review</li>
                <li>Payment will be made at the time of service</li>
                <li>Please arrive 5-10 minutes early</li>
                <li>Bring a valid ID for verification</li>
              </ul>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0;">
                Questions? Contact us at <strong>+234 XXX XXX XXXX</strong>
              </p>
              <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">
                Hair Cutz Studio - Professional Barber Services
              </p>
            </div>
          </div>
        `,
      })

      console.log("Booking request emails sent successfully", { 
        bookingId: booking.id,
        adminSuccess: !adminEmailResult.error,
        customerSuccess: !customerEmailResult.error,
        customerEmail: user.email,
        customerId: sessionUserId
      })

    } catch (emailError) {
      console.error("Failed to send booking request emails:", emailError)
      // Don't fail the booking creation if emails fail
    }

    // Revalidate relevant pages
    revalidatePath('/bookings')
    revalidatePath('/bookings')

    // Return success with booking ID and redirect URL
    return {
      success: true,
      bookingId: booking.id,
      customerId: sessionUserId,
      redirectUrl: `/booking/success?id=${booking.id}`,
    }

  } catch (error) {
    console.error('Enhanced booking creation error:', error)
    return { error: "Failed to create booking. Please try again." }
  }
}