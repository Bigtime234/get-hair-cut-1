"use server"

import { db } from "@/server"
import { users, bookings, services } from "@/server/schema"
import { eq, and } from "drizzle-orm"
import { createId } from '@paralleldrive/cuid2'
import { Resend } from "resend"
import { CustomerInfo } from '@/Types/booking-schema'
import { AppointmentTime } from '@/Types/booking-schema'

const resend = new Resend(process.env.RESEND_API_KEY)

export type BookingData = {
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceId: string
  appointmentDate: Date
  startTime: string
  endTime: string
  totalPrice: number
  notes?: string
}

// Enhanced createBooking function with email notifications
export async function createBookingWithNotification(data: BookingData): Promise<
  { success: { bookingId: string; customerId: string } } | { error: string }
> {
  try {
    // Validate required fields
    if (!data.customerName || !data.customerEmail || !data.customerPhone) {
      return { error: "All customer information is required" }
    }

    if (!data.serviceId || !data.appointmentDate || !data.startTime || !data.endTime) {
      return { error: "Service and appointment details are required" }
    }

    // Check if service exists and is active
    const service = await db.query.services.findFirst({
      where: eq(services.id, data.serviceId),
    })

    if (!service) {
      return { error: "Service not found" }
    }

    if (!service.isActive) {
      return { error: "Service is not available for booking" }
    }

    // Check if time slot is still available
    const existingBooking = await db.query.bookings.findFirst({
      where: and(
        eq(bookings.serviceId, data.serviceId),
        eq(bookings.appointmentDate, data.appointmentDate),
        eq(bookings.startTime, data.startTime)
      ),
    })

    if (existingBooking) {
      return { error: "Time slot is no longer available" }
    }

    // Find or create customer
    let customer = await db.query.users.findFirst({
      where: eq(users.email, data.customerEmail),
    })

    let customerId: string

    if (!customer) {
      // Create new customer
      const newCustomerId = createId()
      
      const [newCustomer] = await db.insert(users).values({
        id: newCustomerId,
        name: data.customerName,
        email: data.customerEmail,
        phone: data.customerPhone,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning()

      if (!newCustomer) {
        return { error: "Failed to create customer record" }
      }

      customerId = newCustomer.id
    } else {
      customerId = customer.id
      
      // Update customer info if provided details are different
      if (customer.name !== data.customerName || customer.phone !== data.customerPhone) {
        await db.update(users)
          .set({
            name: data.customerName,
            phone: data.customerPhone,
            updatedAt: new Date(),
          })
          .where(eq(users.id, customerId))
      }
    }

    // Create booking
    const bookingId = createId()
    
    const [newBooking] = await db.insert(bookings).values({
      id: bookingId,
      customerId: customerId,
      serviceId: data.serviceId,
      appointmentDate: data.appointmentDate,
      startTime: data.startTime,
      endTime: data.endTime,
      status: 'pending',
      totalPrice: data.totalPrice.toString(),
      notes: data.notes || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning()

    if (!newBooking) {
      return { error: "Failed to create booking" }
    }

    // Send email notifications
    const appointmentDate = data.appointmentDate.toLocaleDateString('en-NG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    try {
      // Admin notification email
      const adminEmailResult = await resend.emails.send({
        from: 'Booking System <noreply@yourbarber.com>',
        to: 'codebyriven@gmail.com', // Replace with your admin email
        subject: `📅 New Booking Request - ${service.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h1 style="color: #1f2937; text-align: center;">New Booking Request</h1>
            <p style="font-size: 18px; text-align: center; margin-bottom: 30px;">Booking #${newBooking.id}</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
              <h2 style="color: #1f2937; margin-top: 0;">Service Details</h2>
              <p><strong>Service:</strong> ${service.name}</p>
              <p><strong>Date:</strong> ${appointmentDate}</p>
              <p><strong>Time:</strong> ${data.startTime} - ${data.endTime}</p>
              <p><strong>Duration:</strong> ${service.duration} minutes</p>
              <p><strong>Price:</strong> ₦${data.totalPrice.toLocaleString()}</p>
            </div>

            <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1f2937; margin-top: 0;">Customer Information</h2>
              <p><strong>Name:</strong> ${data.customerName}</p>
              <p><strong>Email:</strong> ${data.customerEmail}</p>
              <p><strong>Phone:</strong> ${data.customerPhone}</p>
              ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
            </div>

            <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
              <h3 style="color: #1e40af; margin-top: 0;">Next Steps</h3>
              <p style="color: #1e40af; margin: 0;">
                Please confirm payment receipt and update the booking status to "confirmed" in your admin panel.
              </p>
            </div>
          </div>
        `,
      })

      // Customer confirmation email
      const customerEmailResult = await resend.emails.send({
        from: 'Your Barber <noreply@yourbarber.com>',
        to: data.customerEmail,
        subject: `📋 Booking Request Submitted - ${service.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #059669;">Thank You for Your Booking!</h1>
              <p style="font-size: 18px; color: #6b7280;">Booking Reference: #${newBooking.id}</p>
            </div>
            
            <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #10b981;">
              <h2 style="color: #065f46; margin-top: 0;">Your Appointment Details</h2>
              <p><strong>Service:</strong> ${service.name}</p>
              <p><strong>Date:</strong> ${appointmentDate}</p>
              <p><strong>Time:</strong> ${data.startTime} - ${data.endTime}</p>
              <p><strong>Duration:</strong> ${service.duration} minutes</p>
              <p><strong>Total:</strong> ₦${data.totalPrice.toLocaleString()}</p>
              ${data.notes ? `<p><strong>Your Notes:</strong> ${data.notes}</p>` : ''}
            </div>

            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
              <h3 style="color: #92400e; margin-top: 0;">Status: Pending Confirmation</h3>
              <p style="color: #92400e; margin: 0;">
                Your booking request is being processed. We'll contact you once we confirm your payment and finalize the appointment.
              </p>
            </div>

            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px;">
              <h3 style="color: #374151; margin-top: 0;">What Happens Next?</h3>
              <ul style="color: #4b5563; margin: 0; padding-left: 20px;">
                <li>We'll verify your payment within 24 hours</li>
                <li>You'll receive a confirmation call once verified</li>
                <li>We'll send you a reminder before your appointment</li>
                <li>Please arrive 5-10 minutes early on your appointment date</li>
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

      console.log("Email notifications sent successfully", { 
        admin: adminEmailResult.data?.id, 
        customer: customerEmailResult.data?.id 
      })
    } catch (emailError) {
      console.error("Email notification failed:", emailError)
      // Don't fail booking creation if email fails
    }

    return { 
      success: { 
        bookingId: newBooking.id,
        customerId: customerId
      } 
    }

  } catch (error) {
    console.error("Error creating booking:", error)
    return { error: "Failed to create booking. Please try again." }
  }
}

// Helper functions
export async function calculateEndTime(startTime: string, durationMinutes: number): Promise<string> {
  const [hours, minutes] = startTime.split(':').map(Number)
  const startMinutes = hours * 60 + minutes
  const endMinutes = startMinutes + durationMinutes
  
  const endHours = Math.floor(endMinutes / 60)
  const endMins = endMinutes % 60
  
  return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`
}

// Adapter function for your booking form
type FormBookingData = {
  serviceId: string
  customerInfo: CustomerInfo
  appointmentTime: AppointmentTime
}

export async function createEnhancedBookingAction(data: FormBookingData) {
  try {
    console.log('Creating enhanced booking with form data:', data)

    // Get service details to calculate price and end time
    const service = await db.query.services.findFirst({
      where: eq(services.id, data.serviceId),
    })

    if (!service) {
      return { error: "Service not found" }
    }

    // Create appointment datetime
    const appointmentDateTime = new Date(data.appointmentTime.date)
    const [hours, minutes] = data.appointmentTime.time.split(':')
    appointmentDateTime.setHours(parseInt(hours), parseInt(minutes))

    // Calculate end time
    const endTime = await calculateEndTime(data.appointmentTime.time, service.duration)

    // Transform form data to match BookingData type
    const bookingData: BookingData = {
      customerName: data.customerInfo.name,
      customerEmail: data.customerInfo.email,
      customerPhone: data.customerInfo.phone,
      serviceId: data.serviceId,
      appointmentDate: appointmentDateTime,
      startTime: data.appointmentTime.time,
      endTime: endTime,
      totalPrice: parseFloat(service.price),
      notes: data.customerInfo.notes || undefined,
    }

    // Use enhanced booking creation with email notifications
    const result = await createBookingWithNotification(bookingData)

    if ('error' in result) {
      return { error: result.error }
    }

    console.log('Enhanced booking created successfully:', result.success.bookingId)

    return { 
      success: true, 
      bookingId: result.success.bookingId,
      redirectUrl: `/booking-processing?bookingId=${result.success.bookingId}`
    }

  } catch (error) {
    console.error('Error in createEnhancedBookingAction:', error)
    return { 
      error: "Failed to create booking. Please try again." 
    }
  }
}