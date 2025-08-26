import * as z from "zod"

// Helper function to convert time string to minutes
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

// Customer Info Schema (for booking form)
export const CustomerInfoSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  notes: z.string().max(500, { message: "Notes cannot exceed 500 characters" }).optional(),
})

export type CustomerInfo = z.infer<typeof CustomerInfoSchema>

// Appointment Time Schema (for booking form)
export const AppointmentTimeSchema = z.object({
  date: z.date({ message: "Please select a date" }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid time format (HH:MM)",
  }),
})

export type AppointmentTime = z.infer<typeof AppointmentTimeSchema>

// Booking Schema
export const BookingSchema = z.object({
  id: z.string().optional(),
  customerId: z.string().min(1, { message: "Customer is required" }),
  serviceId: z.string().min(1, { message: "Service is required" }),
  appointmentDate: z.date({ message: "Appointment date is required" }).refine((date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }, { message: "Appointment date cannot be in the past" }),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid time format (HH:MM)",
  }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid time format (HH:MM)",
  }),
  status: z
    .enum(['pending', 'confirmed', 'completed', 'cancelled', 'no_show'])
    .default('pending'),
  totalPrice: z.number().min(0),
  notes: z.string().max(500, { message: "Notes cannot exceed 500 characters" }).optional(),
  cancelReason: z.string().optional(),
})

export type zBookingSchema = z.infer<typeof BookingSchema>

// Booking Filter Schema
export const BookingFilterSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled', 'no_show']).optional(),
  serviceId: z.string().optional(),
  customerId: z.string().optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  search: z.string().optional(),
})

export type zBookingFilterSchema = z.infer<typeof BookingFilterSchema>

// Combined booking form schema (for frontend forms)
export const BookingFormSchema = z.object({
  serviceId: z.string().min(1, { message: "Please select a service" }),
  customerInfo: CustomerInfoSchema,
  appointmentTime: AppointmentTimeSchema,
})

export type BookingFormData = z.infer<typeof BookingFormSchema>