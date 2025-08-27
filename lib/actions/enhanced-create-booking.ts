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

    // Create booking with the database user CUID2
    const [booking] = await db.insert(bookings).values({
      serviceId: service.id,
      customerId: sessionUserId, // Now guaranteed to be the correct database CUID2
      appointmentDate: appointmentDate,
      startTime: formatTime(appointmentDate),
      endTime: formatTime(endDate),
      totalPrice: service.price,
      status: 'pending',
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
        subject: `New Booking Created - #${booking.id}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h1 style="color: #f59e0b; text-align: center;">New Booking Created!</h1>
            <p style="font-size: 18px; text-align: center; margin-bottom: 30px;">Booking #${booking.id}</p>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
              <h2 style="color: #92400e; margin-top: 0;">Pending Appointment (Payment Required)</h2>
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

            <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
              <h3 style="color: #dc2626; margin-top: 0;">⚠️ Action Required</h3>
              <p style="color: #dc2626; margin: 0;">
                This booking is <strong>PENDING</strong> until payment is confirmed. 
                Remember to mark as "Confirmed" once payment is received.
              </p>
            </div>
          </div>
        `,
      })

      // Send customer booking confirmation email
      const customerEmailResult = await resend.emails.send({
        from: 'Hair Cutz Studio <onboarding@resend.dev>',
        to: "codebyriven@gmail.com",
        subject: `Booking Created - ${service.name} | Payment Required`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #f59e0b;">Booking Created Successfully!</h1>
              <p style="font-size: 18px; color: #6b7280;">Reference: #${booking.id}</p>
            </div>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
              <h2 style="color: #92400e; margin-top: 0;">Your Appointment Details</h2>
              <p><strong>Service:</strong> ${service.name}</p>
              <p><strong>Description:</strong> ${service.description || 'Professional service'}</p>
              <p><strong>Date:</strong> ${appointmentDateFormatted}</p>
              <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
              <p><strong>Duration:</strong> ${service.duration} minutes</p>
              <p><strong>Total Amount:</strong> ₦${parseFloat(booking.totalPrice).toLocaleString()}</p>
              ${booking.notes ? `<p><strong>Your Notes:</strong> ${booking.notes}</p>` : ''}
            </div>

            <div style="background-color: #fee2e2; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #dc2626;">
              <h3 style="color: #dc2626; margin-top: 0;">⚠️ Payment Required</h3>
              <p style="color: #dc2626; margin: 0;">
                Your appointment is reserved but <strong>NOT CONFIRMED</strong> until payment is completed. 
                Please complete your payment to secure your slot!
              </p>
            </div>

            <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #0369a1; margin-top: 0;">Next Steps</h3>
              <ol style="color: #1e40af; margin: 0; padding-left: 20px;">
                <li>Complete payment via our secure payment system</li>
                <li>You'll receive a confirmation email once payment is processed</li>
                <li>Your appointment will then be confirmed</li>
                <li>We'll send you a reminder 24 hours before your appointment</li>
              </ol>
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

      console.log("Booking creation emails sent successfully", { 
        bookingId: booking.id,
        adminSuccess: !adminEmailResult.error,
        customerSuccess: !customerEmailResult.error,
        customerEmail: user.email,
        customerId: sessionUserId
      })

    } catch (emailError) {
      console.error("Failed to send booking creation emails:", emailError)
      // Don't fail the booking creation if emails fail
    }

    // Revalidate relevant pages
    revalidatePath('/bookings')
    revalidatePath('/admin/bookings')

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

// Payment confirmation function - ENSURES STATUS CHANGES TO CONFIRMED
export async function confirmPaymentAndSendEmails(bookingId: string) {
  try {
    console.log('Confirming payment for booking:', bookingId)
    
    // Use manual queries to avoid relation issues
    const bookingResult = await db.select().from(bookings).where(eq(bookings.id, bookingId)).limit(1)
    
    if (!bookingResult.length) {
      return { error: "Booking not found" }
    }

    const booking = bookingResult[0]
    console.log('Found booking with status:', booking.status)

    // Get service details
    const serviceResult = await db.select().from(services).where(eq(services.id, booking.serviceId)).limit(1)
    
    if (!serviceResult.length) {
      return { error: "Service not found" }
    }

    const service = serviceResult[0]

    // Get customer details
    const customerResult = await db.select().from(users).where(eq(users.id, booking.customerId)).limit(1)
    
    if (!customerResult.length) {
      return { error: "Customer not found" }
    }

    const customer = customerResult[0]

    // Update booking status to CONFIRMED (from pending)
    const [updatedBooking] = await db.update(bookings)
      .set({ 
        status: 'confirmed',
        updatedAt: new Date()
      })
      .where(eq(bookings.id, bookingId))
      .returning()

    console.log('Booking status updated:', {
      bookingId,
      oldStatus: booking.status,
      newStatus: updatedBooking.status,
      customerId: customer.id,
      customerEmail: customer.email
    })

    // Format appointment date
    const appointmentDate = new Date(booking.appointmentDate).toLocaleDateString('en-NG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Send admin notification
    const adminEmailResult = await resend.emails.send({
      from: 'Hair Cutz Studio <onboarding@resend.dev>',
      to: 'codebyriven@gmail.com',
      subject: `Payment Confirmed - Booking #${bookingId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #059669; text-align: center;">Payment Confirmed!</h1>
          <p style="font-size: 18px; text-align: center;">Booking #${bookingId}</p>
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
            <h2 style="color: #065f46; margin-top: 0;">Confirmed Appointment</h2>
            <p><strong>Service:</strong> ${service.name}</p>
            <p><strong>Customer:</strong> ${customer.name} (${customer.email})</p>
            <p><strong>Customer ID:</strong> ${customer.id}</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
            <p><strong>Price:</strong> ₦${parseFloat(booking.totalPrice).toLocaleString()}</p>
            <p><strong>Status:</strong> <span style="color: #059669; font-weight: bold;">CONFIRMED</span></p>
          </div>
        </div>
      `,
    })

    // Send customer confirmation
    const customerEmailResult = await resend.emails.send({
      from: 'Hair Cutz Studio <onboarding@resend.dev>',
      to: 'codebyriven@gmail.com',
      subject: `Booking Confirmed - ${service.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #059669; text-align: center;">Booking Confirmed!</h1>
          <p style="font-size: 18px; text-align: center;">Reference: #${bookingId}</p>
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
            <h2 style="color: #065f46; margin-top: 0;">Your Confirmed Appointment</h2>
            <p><strong>Service:</strong> ${service.name}</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
            <p><strong>Total Paid:</strong> ₦${parseFloat(booking.totalPrice).toLocaleString()}</p>
            <p><strong>Status:</strong> <span style="color: #059669; font-weight: bold;">CONFIRMED</span></p>
          </div>

          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px;">
            <h3 style="color: #0369a1; margin-top: 0;">What to Expect</h3>
            <ul style="color: #1e40af;">
              <li>Please arrive 5-10 minutes early</li>
              <li>Bring a valid ID for verification</li>
              <li>We'll send you a reminder 24 hours before</li>
              <li>Your appointment is now secured!</li>
            </ul>
          </div>
        </div>
      `,
    })

    console.log("Payment confirmation emails sent", { 
      bookingId,
      adminSuccess: !adminEmailResult.error,
      customerSuccess: !customerEmailResult.error,
      customerEmail: customer.email,
      customerId: customer.id
    })

    // Revalidate relevant pages
    revalidatePath('/bookings')
    revalidatePath('/admin/bookings')

    return { success: true, status: 'confirmed' }

  } catch (error) {
    console.error("Error confirming payment:", error)
    return { error: "Failed to confirm payment. Please contact support." }
  }
}

// Manual payment confirmation function as fallback
export async function confirmPaymentManual(bookingId: string) {
  try {
    console.log("Using manual payment confirmation approach for booking:", bookingId)
    
    // Update booking status directly to CONFIRMED
    const updateResult = await db.update(bookings)
      .set({ 
        status: 'confirmed',
        updatedAt: new Date()
      })
      .where(eq(bookings.id, bookingId))
      .returning()

    if (!updateResult.length) {
      return { error: "Failed to update booking status" }
    }

    console.log("Booking status manually updated to CONFIRMED:", {
      bookingId,
      newStatus: updateResult[0].status
    })

    // For manual approach, send a basic notification
    try {
      await resend.emails.send({
        from: 'Hair Cutz Studio <onboarding@resend.dev>',
        to: 'codebyriven@gmail.com',
        subject: `Manual Payment Confirmation - Booking #${bookingId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #059669;">Manual Payment Confirmed</h1>
            <p>Booking #${bookingId} has been manually confirmed.</p>
            <p><strong>Status:</strong> <span style="color: #059669;">CONFIRMED</span></p>
            <p>Please check the admin dashboard for full details.</p>
          </div>
        `,
      })
    } catch (emailError) {
      console.warn("Manual confirmation email failed:", emailError)
    }

    // Revalidate relevant pages
    revalidatePath('/bookings')
    revalidatePath('/bookings')

    return { success: true, status: 'confirmed' }

  } catch (error) {
    console.error("Manual payment confirmation error:", error)
    return { error: "Failed to manually confirm payment" }
  }
}