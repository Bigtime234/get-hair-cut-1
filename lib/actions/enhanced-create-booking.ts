"use server"

import { db } from "@/server"
import { bookings, users, services } from "@/server/schema"
import { eq } from "drizzle-orm"
import { CustomerInfo, AppointmentTime } from "@/Types/booking-schema"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type CreateEnhancedBookingParams = {
  serviceId: string
  customerInfo: CustomerInfo
  appointmentTime: AppointmentTime
}

export async function createEnhancedBookingAction({
  serviceId,
  customerInfo,
  appointmentTime,
}: CreateEnhancedBookingParams) {
  try {
    console.log('Creating enhanced booking with:', { serviceId, customerInfo, appointmentTime })

    // Get service details
    const service = await db.query.services.findFirst({
      where: eq(services.id, serviceId),
    })

    if (!service) {
      return { error: "Service not found" }
    }

    // Check if user exists or create new one
    let user = await db.query.users.findFirst({
      where: eq(users.email, customerInfo.email),
    })

    if (!user) {
      // Create new user
      const [newUser] = await db.insert(users).values({
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
      }).returning()
      user = newUser
    } else {
      // Update existing user with new info if provided
      await db.update(users)
        .set({
          name: customerInfo.name,
          phone: customerInfo.phone,
        })
        .where(eq(users.id, user.id))
    }

    // Calculate end time
    const startDate = new Date(appointmentTime.date)
    const [hours, minutes] = appointmentTime.time.split(':').map(Number)
    startDate.setHours(hours, minutes, 0, 0)
    
    const endDate = new Date(startDate)
    endDate.setMinutes(endDate.getMinutes() + service.duration)

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    }

    // Create booking
    const [booking] = await db.insert(bookings).values({
      serviceId: service.id,
      customerId: user.id,
      appointmentDate: startDate,
      startTime: formatTime(startDate),
      endTime: formatTime(endDate),
      totalPrice: service.price,
      status: 'pending',
      notes: customerInfo.notes || null,
    }).returning()

    console.log('Booking created successfully:', booking.id)

    // Send email notifications immediately after booking creation
    try {
      // Format appointment date
      const appointmentDate = new Date(startDate).toLocaleDateString('en-NG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      // Send admin notification email
      const adminEmailResult = await resend.emails.send({
        from: 'Hair Cutz Studio <onboarding@resend.dev>',
        to: 'codebyriven@gmail.com', // Your admin email
        subject: `New Booking Created - #${booking.id}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h1 style="color: #f59e0b; text-align: center;">New Booking Created!</h1>
            <p style="font-size: 18px; text-align: center; margin-bottom: 30px;">Booking #${booking.id}</p>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
              <h2 style="color: #92400e; margin-top: 0;">Pending Appointment</h2>
              <p><strong>Service:</strong> ${service.name}</p>
              <p><strong>Category:</strong> ${service.category || 'General'}</p>
              <p><strong>Date:</strong> ${appointmentDate}</p>
              <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
              <p><strong>Duration:</strong> ${service.duration} minutes</p>
              <p><strong>Price:</strong> ₦${parseFloat(booking.totalPrice).toLocaleString()}</p>
              <p><strong>Status:</strong> Pending Payment</p>
            </div>

            <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1f2937; margin-top: 0;">Customer Details</h2>
              <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Phone:</strong> ${user.phone || 'N/A'}</p>
              ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
            </div>

            <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px;">
              <h3 style="color: #1e40af; margin-top: 0;">Next Steps</h3>
              <p style="color: #1e40af; margin: 0;">
                Customer needs to complete payment. You'll receive another email once payment is confirmed!
              </p>
            </div>
          </div>
        `,
      })

      // Send customer booking confirmation email
      const customerEmailResult = await resend.emails.send({
        from: 'Hair Cutz Studio <onboarding@resend.dev>',
        to: 'codebyriven@gmail.com',
        subject: `Booking Created - ${service.name} | Complete Payment`,
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
              <p><strong>Date:</strong> ${appointmentDate}</p>
              <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
              <p><strong>Duration:</strong> ${service.duration} minutes</p>
              <p><strong>Total Amount:</strong> ₦${parseFloat(booking.totalPrice).toLocaleString()}</p>
              ${booking.notes ? `<p><strong>Your Notes:</strong> ${booking.notes}</p>` : ''}
            </div>

            <div style="background-color: #fee2e2; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #dc2626; margin-top: 0;">⚠️ Payment Required</h3>
              <p style="color: #dc2626; margin: 0;">
                Your appointment is reserved but <strong>not confirmed</strong> until payment is completed. 
                Please complete your payment to secure your slot!
              </p>
            </div>

            <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #0369a1; margin-top: 0;">What Happens Next?</h3>
              <ul style="color: #1e40af; margin: 0; padding-left: 20px;">
                <li>Complete your payment using the provided instructions</li>
                <li>You'll receive a confirmation email once payment is processed</li>
                <li>Your appointment will be officially confirmed</li>
                <li>We'll send you a reminder 24 hours before your appointment</li>
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

      console.log("Booking creation emails sent successfully", { 
        bookingId: booking.id,
        admin: adminEmailResult.data?.id, 
        customer: customerEmailResult.data?.id,
        adminSuccess: adminEmailResult.error ? false : true,
        customerSuccess: customerEmailResult.error ? false : true
      })

      // Log any email errors but don't fail the booking
      if (adminEmailResult.error || customerEmailResult.error) {
        console.error("Email errors during booking creation:", {
          admin: adminEmailResult.error,
          customer: customerEmailResult.error
        })
      }

    } catch (emailError) {
      console.error("Failed to send booking creation emails:", emailError)
      // Don't fail the booking creation if emails fail
    }

    // Return success with booking ID and redirect URL
    return {
      success: true,
      bookingId: booking.id,
      redirectUrl: `/booking/success?id=${booking.id}`,
    }

  } catch (error) {
    console.error('Enhanced booking creation error:', error)
    return { error: "Failed to create booking. Please try again." }
  }
}

// Export the payment confirmation functions that the payment component needs
export async function confirmPaymentAndSendEmails(bookingId: string) {
  try {
    // Get booking details with related data using your schema structure
    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, bookingId),
      with: {
        service: true,    // This matches your servicesRelations
        customer: true,   // This matches your usersRelations via customerId
      }
    })

    if (!booking) {
      return { error: "Booking not found" }
    }

    if (!booking.service) {
      return { error: "Service details not found" }
    }

    if (!booking.customer) {
      return { error: "Customer details not found" }
    }

    // Update booking status to confirmed
    await db.update(bookings)
      .set({ 
        status: 'confirmed',
        updatedAt: new Date()
      })
      .where(eq(bookings.id, bookingId))

    // Format appointment date - handle the timestamp correctly
    const appointmentDate = new Date(booking.appointmentDate).toLocaleDateString('en-NG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Send admin notification
    const adminEmailResult = await resend.emails.send({
      from: 'Hair Cutz Studio <onboarding@resend.dev>',
      to: 'codebyriven@gmail.com', // Your admin email
      subject: `Payment Received - Booking #${bookingId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h1 style="color: #059669; text-align: center;">Payment Confirmed!</h1>
          <p style="font-size: 18px; text-align: center; margin-bottom: 30px;">Booking #${bookingId}</p>
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #10b981;">
            <h2 style="color: #065f46; margin-top: 0;">Confirmed Appointment</h2>
            <p><strong>Service:</strong> ${booking.service.name}</p>
            <p><strong>Category:</strong> ${booking.service.category || 'General'}</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
            <p><strong>Duration:</strong> ${booking.service.duration} minutes</p>
            <p><strong>Price:</strong> ₦${parseFloat(booking.totalPrice).toLocaleString()}</p>
          </div>

          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Customer Details</h2>
            <p><strong>Name:</strong> ${booking.customer.name || 'N/A'}</p>
            <p><strong>Email:</strong> ${booking.customer.email}</p>
            <p><strong>Phone:</strong> ${booking.customer.phone || 'N/A'}</p>
            ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
          </div>

          <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px;">
            <h3 style="color: #1e40af; margin-top: 0;">Action Required</h3>
            <p style="color: #1e40af; margin: 0;">
              Customer has confirmed payment. Please prepare for the appointment and update your calendar!
            </p>
          </div>
        </div>
      `,
    })

    // Send customer confirmation
    const customerEmailResult = await resend.emails.send({
      from: 'Hair Cutz Studio <onboarding@resend.dev>',
      to: 'codebyriven@gmail.com',
      subject: `Booking Confirmed - ${booking.service.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669;">Booking Confirmed!</h1>
            <p style="font-size: 18px; color: #6b7280;">Reference: #${bookingId}</p>
          </div>
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #10b981;">
            <h2 style="color: #065f46; margin-top: 0;">Your Confirmed Appointment</h2>
            <p><strong>Service:</strong> ${booking.service.name}</p>
            <p><strong>Description:</strong> ${booking.service.description || 'Professional service'}</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
            <p><strong>Duration:</strong> ${booking.service.duration} minutes</p>
            <p><strong>Total Paid:</strong> ₦${parseFloat(booking.totalPrice).toLocaleString()}</p>
            ${booking.notes ? `<p><strong>Your Notes:</strong> ${booking.notes}</p>` : ''}
          </div>

          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0369a1; margin-top: 0;">What to Expect</h3>
            <ul style="color: #1e40af; margin: 0; padding-left: 20px;">
              <li>Please arrive 5-10 minutes early for your appointment</li>
              <li>Bring a valid ID for verification</li>
              <li>We'll send you a reminder 24 hours before your appointment</li>
              <li>Contact us immediately if you need to reschedule</li>
              <li>Our professional barber will provide excellent service</li>
            </ul>
          </div>

          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #92400e; margin-top: 0;">Cancellation Policy</h3>
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              Please provide at least 24 hours notice for cancellations. Late cancellations may be subject to charges.
            </p>
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

    console.log("Payment confirmation emails sent successfully", { 
      bookingId,
      admin: adminEmailResult.data?.id, 
      customer: customerEmailResult.data?.id,
      adminSuccess: adminEmailResult.error ? false : true,
      customerSuccess: customerEmailResult.error ? false : true
    })

    // Check if either email failed
    if (adminEmailResult.error || customerEmailResult.error) {
      console.error("Email errors:", {
        admin: adminEmailResult.error,
        customer: customerEmailResult.error
      })
      return { 
        success: true, 
        warning: "Booking confirmed but some emails may have failed to send" 
      }
    }

    return { success: true }

  } catch (error) {
    console.error("Error confirming payment:", error)
    return { error: "Failed to confirm payment. Please contact support." }
  }
}

// Alternative manual version if relations don't work
export async function confirmPaymentManual(bookingId: string) {
  try {
    // First get the booking
    const bookingResult = await db.select().from(bookings).where(eq(bookings.id, bookingId)).limit(1)
    
    if (!bookingResult.length) {
      return { error: "Booking not found" }
    }

    const booking = bookingResult[0]

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

    // Update booking status
    await db.update(bookings)
      .set({ 
        status: 'confirmed',
        updatedAt: new Date()
      })
      .where(eq(bookings.id, bookingId))

    // Format appointment date
    const appointmentDate = new Date(booking.appointmentDate).toLocaleDateString('en-NG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Send admin email
    const adminEmailResult = await resend.emails.send({
      from: 'Hair Cutz Studio <onboarding@resend.dev>',
      to: 'codebyriven@gmail.com',
      subject: `Payment Received - Booking #${bookingId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h1 style="color: #059669; text-align: center;">Payment Confirmed!</h1>
          <p style="font-size: 18px; text-align: center; margin-bottom: 30px;">Booking #${bookingId}</p>
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #10b981;">
            <h2 style="color: #065f46; margin-top: 0;">Confirmed Appointment</h2>
            <p><strong>Service:</strong> ${service.name}</p>
            <p><strong>Category:</strong> ${service.category || 'General'}</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
            <p><strong>Duration:</strong> ${service.duration} minutes</p>
            <p><strong>Price:</strong> ₦${parseFloat(booking.totalPrice).toLocaleString()}</p>
          </div>

          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Customer Details</h2>
            <p><strong>Name:</strong> ${customer.name || 'N/A'}</p>
            <p><strong>Email:</strong> ${customer.email}</p>
            <p><strong>Phone:</strong> ${customer.phone || 'N/A'}</p>
            ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
          </div>
        </div>
      `,
    })

    // Send customer email
    const customerEmailResult = await resend.emails.send({
      from: 'Hair Cutz Studio <onboarding@resend.dev>',
      to: 'codebyriven@gmail.com',
      subject: `Booking Confirmed - ${service.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669;">Booking Confirmed!</h1>
            <p style="font-size: 18px; color: #6b7280;">Reference: #${bookingId}</p>
          </div>
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #10b981;">
            <h2 style="color: #065f46; margin-top: 0;">Your Confirmed Appointment</h2>
            <p><strong>Service:</strong> ${service.name}</p>
            <p><strong>Description:</strong> ${service.description || 'Professional service'}</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
            <p><strong>Duration:</strong> ${service.duration} minutes</p>
            <p><strong>Total Paid:</strong> ₦${parseFloat(booking.totalPrice).toLocaleString()}</p>
            ${booking.notes ? `<p><strong>Your Notes:</strong> ${booking.notes}</p>` : ''}
          </div>

          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0369a1; margin-top: 0;">What to Expect</h3>
            <ul style="color: #1e40af; margin: 0; padding-left: 20px;">
              <li>Please arrive 5-10 minutes early</li>
              <li>Bring a valid ID for verification</li>
              <li>We'll send you a reminder 24 hours before</li>
              <li>Contact us if you need to reschedule</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0;">
              Questions? Contact us at <strong>+234 XXX XXX XXXX</strong>
            </p>
          </div>
        </div>
      `,
    })

    console.log("Manual payment confirmation emails sent", { 
      bookingId,
      admin: adminEmailResult.data?.id, 
      customer: customerEmailResult.data?.id 
    })

    return { success: true }

  } catch (error) {
    console.error("Manual payment confirmation error:", error)
    return { error: "Failed to confirm payment" }
  }
}