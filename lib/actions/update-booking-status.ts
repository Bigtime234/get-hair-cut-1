"use server"

import { db } from "@/server"
import { auth } from "@/server/auth"
import { bookings, users, services } from "@/server/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function updateBookingStatus(
  bookingId: string, 
  newStatus: "pending" | "confirmed" | "completed" | "cancelled" | "no_show",
  cancelReason?: string
) {
  const user = await auth()
  if (!user) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin or the booking owner
  const isAdmin = user.user.role === "admin"
  
  if (!isAdmin) {
    // If not admin, check if the booking belongs to the user
    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, bookingId),
    })
    
    if (!booking || booking.customerId !== user.user.id) {
      throw new Error("Unauthorized to update this booking")
    }
  }

  try {
    // Get booking details for email notification
    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, bookingId),
      with: {
        customer: true,
        service: true,
      },
    })

    if (!booking) {
      throw new Error("Booking not found")
    }

    // Update booking status
    const updateData: any = {
      status: newStatus,
      updatedAt: new Date(),
    }

    if (cancelReason && (newStatus === "cancelled" || newStatus === "no_show")) {
      updateData.cancelReason = cancelReason
    }

    await db
      .update(bookings)
      .set(updateData)
      .where(eq(bookings.id, bookingId))

    // Send email notification if status changed to confirmed or cancelled
    if (newStatus === "confirmed" || newStatus === "cancelled") {
      const statusText = newStatus === "confirmed" ? "Confirmed" : "Cancelled"
      const statusColor = newStatus === "confirmed" ? "#16a34a" : "#dc2626"
      
      const appointmentDate = booking.appointmentDate.toLocaleDateString('en-NG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      const emailSubject = newStatus === "confirmed" 
        ? `✅ Booking Confirmed - ${booking.service.name}`
        : `❌ Booking Cancelled - ${booking.service.name}`

      const { data, error } = await resend.emails.send({
        from: 'Clean Cutz <onboarding@resend.dev>',
        to: booking.customer.email || '',
        subject: emailSubject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: ${statusColor}; margin-bottom: 10px;">Booking ${statusText}</h1>
              <p style="font-size: 18px; color: #6b7280;">Booking Reference: #${booking.id}</p>
            </div>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin-top: 0;">Appointment Details</h2>
              <div style="space-y: 8px;">
                <p><strong>Service:</strong> ${booking.service.name}</p>
                <p><strong>Date:</strong> ${appointmentDate}</p>
                <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
                <p><strong>Duration:</strong> ${booking.service.duration} minutes</p>
                <p><strong>Price:</strong> ₦${parseFloat(booking.totalPrice).toLocaleString()}</p>
                ${newStatus === "cancelled" && cancelReason ? `<p><strong>Cancellation Reason:</strong> ${cancelReason}</p>` : ''}
              </div>
            </div>

            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #374151; margin-top: 0;">Customer Information</h3>
              <p><strong>Name:</strong> ${booking.customer.name || 'N/A'}</p>
              <p><strong>Email:</strong> ${booking.customer.email || 'N/A'}</p>
              <p><strong>Phone:</strong> ${booking.customer.phone || 'N/A'}</p>
              ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
            </div>

            ${newStatus === "confirmed" ? `
              <div style="background-color: #dcfce7; padding: 15px; border-radius: 8px; border-left: 4px solid #16a34a;">
                <h3 style="color: #15803d; margin-top: 0;">What's Next?</h3>
                <ul style="color: #166534; margin: 0; padding-left: 20px;">
                  <li>Your appointment is confirmed and reserved</li>
                  <li>Please arrive 5-10 minutes early</li>
                  <li>Bring a valid ID for verification</li>
                  <li>We'll send you a reminder 24 hours before your appointment</li>
                </ul>
              </div>
            ` : `
              <div style="background-color: #fee2e2; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">
                <h3 style="color: #dc2626; margin-top: 0;">Booking Cancelled</h3>
                <p style="color: #991b1b; margin: 0;">
                  We're sorry your appointment has been cancelled. If you'd like to reschedule, please visit our website or call us directly.
                </p>
              </div>
            `}

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0;">
                Need help? Contact us at <strong>+234 XXX XXX XXXX</strong>
              </p>
            </div>
          </div>
        `,
      })

      if (error) {
        console.error("Email notification failed:", error)
        // Don't fail the status update if email fails
      }
    }

    revalidatePath("/bookings")
    return { success: true, message: `Booking ${newStatus} successfully` }
    
  } catch (error) {
    console.error("Error updating booking status:", error)
    throw new Error("Failed to update booking status")
  }
}