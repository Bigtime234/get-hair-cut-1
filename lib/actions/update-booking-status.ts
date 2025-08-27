// File: ./lib/actions/create-booking.ts
"use server"

import { db } from "@/server"
import { users, bookings, services } from "@/server/schema"
import { eq, and } from "drizzle-orm"
import { createId } from '@paralleldrive/cuid2'
import { Resend } from "resend"
import { auth } from "@/server/auth"
import { revalidatePath } from "next/cache"

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

/**
 * Create a booking and send notifications.
 * If the request is authenticated, use the logged in user's id as the customerId.
 * If not authenticated, find-or-create a user based on email and use that id.
 */
export async function createBookingWithNotification(data: BookingData): Promise<
  { success: { bookingId: string; customerId: string } } | { error: string }
> {
  try {
    // Basic validation
    if (!data.customerName || !data.customerEmail || !data.customerPhone) {
      return { error: "All customer information is required" }
    }
    if (!data.serviceId || !data.appointmentDate || !data.startTime || !data.endTime) {
      return { error: "Service and appointment details are required" }
    }

    // Check service exists and is active
    const service = await db.query.services.findFirst({
      where: eq(services.id, data.serviceId),
    })

    if (!service) return { error: "Service not found" }
    if (!service.isActive) return { error: "Service is not available for booking" }

    // Check slot availability (same service, same appointmentDate and startTime)
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

    // Use auth if available so that logged-in users see their bookings
    const session = await auth()
    let customerId: string

    if (session) {
      // Use the logged in user's id
      customerId = session.user.id
      // Optionally update profile info (name/phone) if different
      const currentUser = await db.query.users.findFirst({ where: eq(users.id, customerId) })
      if (currentUser && (currentUser.name !== data.customerName || currentUser.phone !== data.customerPhone)) {
        await db.update(users)
          .set({ name: data.customerName, phone: data.customerPhone, updatedAt: new Date() })
          .where(eq(users.id, customerId))
      }
    } else {
      // Not authenticated: find or create user by email
      let customer = await db.query.users.findFirst({
        where: eq(users.email, data.customerEmail),
      })

      if (!customer) {
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

        if (!newCustomer) return { error: "Failed to create customer record" }
        customerId = newCustomer.id
      } else {
        customerId = customer.id
        if (customer.name !== data.customerName || customer.phone !== data.customerPhone) {
          await db.update(users)
            .set({ name: data.customerName, phone: data.customerPhone, updatedAt: new Date() })
            .where(eq(users.id, customerId))
        }
      }
    }

    // Create booking record with default status 'pending'
    const bookingId = createId()
    const [newBooking] = await db.insert(bookings).values({
      id: bookingId,
      customerId,
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

    if (!newBooking) return { error: "Failed to create booking" }

    // Send notifications (don't fail booking creation if emails fail)
    try {
      const appointmentDate = data.appointmentDate.toLocaleDateString('en-NG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      // Admin email (replace admin email as needed)
      await resend.emails.send({
        from: 'Booking System <noreply@yourbarber.com>',
        to: 'admin@yourbarber.com',
        subject: `📅 New Booking Request - ${service.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>New Booking: #${newBooking.id}</h2>
            <p><strong>Service:</strong> ${service.name}</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${data.startTime} - ${data.endTime}</p>
            <p><strong>Customer:</strong> ${data.customerName} (${data.customerEmail})</p>
          </div>
        `,
      })

      // Customer email
      await resend.emails.send({
        from: 'Your Barber <noreply@yourbarber.com>',
        to: data.customerEmail,
        subject: `📋 Booking Request Submitted - ${service.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Thanks — booking ref #${newBooking.id}</h2>
            <p>Service: ${service.name}</p>
            <p>Date: ${appointmentDate}</p>
            <p>Time: ${data.startTime} - ${data.endTime}</p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Booking emails failed:", emailError)
      // proceed — booking is created
    }

    // Revalidate bookings list page (so user/admin sees fresh data)
    try {
      revalidatePath("/bookings")
      revalidatePath("/admin/bookings")
    } catch (e) {
      // Not fatal; dev only
    }

    return { success: { bookingId: newBooking.id, customerId } }
  } catch (error) {
    console.error("Error creating booking:", error)
    return { error: "Failed to create booking. Please try again." }
  }
}

/**
 * Helper: calculate end time string "HH:MM" given start "HH:MM" and duration in minutes.
 */
export async function calculateEndTime(startTime: string, durationMinutes: number): Promise<string> {
  const [hours, minutes] = startTime.split(':').map(Number)
  const startMinutes = hours * 60 + minutes
  const endMinutes = startMinutes + durationMinutes

  const endHours = Math.floor(endMinutes / 60)
  const endMins = endMinutes % 60

  return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`
}

/**
 * Adapter used by your booking form layer.
 * Accepts form-shaped data and calls createBookingWithNotification.
 */
type CustomerInfo = { name: string; email: string; phone: string; notes?: string }
type AppointmentTime = { date: Date; time: string }

export async function createEnhancedBookingAction(data: {
  serviceId: string
  customerInfo: CustomerInfo
  appointmentTime: AppointmentTime
}) {
  try {
    // Fetch service
    const service = await db.query.services.findFirst({ where: eq(services.id, data.serviceId) })
    if (!service) return { error: "Service not found" }

    // Construct appointment date time
    const appointmentDateTime = new Date(data.appointmentTime.date)
    const [hours, minutes] = data.appointmentTime.time.split(':').map(Number)
    appointmentDateTime.setHours(hours, minutes, 0, 0)

    // Calculate end time
    const endTime = await calculateEndTime(data.appointmentTime.time, service.duration)

    // Build booking payload
    const bookingData: BookingData = {
      customerName: data.customerInfo.name,
      customerEmail: data.customerInfo.email,
      customerPhone: data.customerInfo.phone,
      serviceId: data.serviceId,
      appointmentDate: appointmentDateTime,
      startTime: data.appointmentTime.time,
      endTime,
      totalPrice: parseFloat(service.price),
      notes: data.customerInfo.notes || undefined,
    }

    const result = await createBookingWithNotification(bookingData)
    if ('error' in result) return { error: result.error }

    return {
      success: true,
      bookingId: result.success.bookingId,
      redirectUrl: `/booking-processing?bookingId=${result.success.bookingId}`
    }
  } catch (error) {
    console.error("createEnhancedBookingAction error:", error)
    return { error: "Failed to create booking. Please try again." }
  }
}
