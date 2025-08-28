"use server"

import { db } from "@/server"
import { bookings } from "@/server/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function updateBookStatus(
  id: string,
  status: "pending" | "completed" | "cancelled" | "no_show",
  cancelReason?: string
) {
  try {
    console.log(`Updating booking ${id} status to ${status}`)
    
    // Get current booking to log status change
    const currentBooking = await db.query.bookings.findFirst({
      where: eq(bookings.id, id)
    })
    
    if (!currentBooking) {
      console.error(`Booking not found: ${id}`)
      return { error: "Booking not found" }
    }

    console.log(`Status change: ${currentBooking.status} → ${status}`)

    // Valid status transitions:
    // pending → completed (admin marks service as done)
    // pending → cancelled (admin/customer cancels)
    // pending → no_show (admin marks customer didn't show)
    // Note: No "confirmed" status exists in simplified flow

    const [updatedBooking] = await db
      .update(bookings)
      .set({
        status,
        cancelReason: cancelReason || null,
        updatedAt: new Date()
      })
      .where(eq(bookings.id, id))
      .returning()

    console.log(`Booking ${id} status successfully updated:`, {
      bookingId: id,
      oldStatus: currentBooking.status,
      newStatus: updatedBooking.status,
      cancelReason: cancelReason || 'none',
      customerId: updatedBooking.customerId
    })

    // Revalidate the bookings page to reflect changes
    revalidatePath("/bookings")
    
    return {
      success: true,
      oldStatus: currentBooking.status,
      newStatus: updatedBooking.status
    }
    
  } catch (error) {
    console.error("Error updating booking status:", error)
    return { error: "Failed to update booking status" }
  }
}