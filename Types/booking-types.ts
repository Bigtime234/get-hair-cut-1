// types/booking-types.ts
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'

export interface UpdateBookingStatusResponse {
  success?: boolean
  error?: string
  message?: string
  warning?: string
}

export interface BookingStatusConfig {
  className: string
  label: string
  description?: string
}

export const BOOKING_STATUS_CONFIG: Record<BookingStatus, BookingStatusConfig> = {
  pending: {
    className: "bg-red-100 text-red-800 border-red-200",
    label: "Pending",
    description: "Booking awaiting confirmation"
  },
  confirmed: {
    className: "bg-amber-100 text-amber-800 border-amber-200",
    label: "Confirmed",
    description: "Appointment confirmed and scheduled"
  },
  completed: {
    className: "bg-green-100 text-green-800 border-green-200",
    label: "Success",
    description: "Service completed successfully"
  },
  cancelled: {
    className: "bg-red-100 text-red-800 border-red-200",
    label: "Cancelled",
    description: "Appointment cancelled"
  },
  no_show: {
    className: "bg-gray-100 text-gray-800 border-gray-200",
    label: "No Show",
    description: "Customer did not attend appointment"
  }
}