import { db } from "@/server"
import { auth } from "@/server/auth"
import { bookings, users } from "@/server/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { 
  Calendar, User, Phone, MapPin, Mail, 
  MessageCircle, Shield, CheckCircle, X, 
  MoreHorizontal, CalendarClock, Scissors, Clock,
  Star, AlertTriangle
} from "lucide-react"
import { updateBookStatus } from "@/lib/actions/update-book-status"

// Helper function to format timestamp
function formatBookingDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

function formatAppointmentDate(date: Date) {
  return date.toLocaleDateString('en-NG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatPrice(price: string | number) {
  const priceValue = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    style: "currency",
  }).format(isNaN(priceValue) ? 0 : priceValue)
}

type BookingType = {
  id: string
  customerId: string
  serviceId: string
  appointmentDate: Date
  startTime: string
  endTime: string
  status: string
  totalPrice: string
  notes: string | null
  cancelReason: string | null
  createdAt: Date | null
  updatedAt: Date | null
  customer: {
    id: string
    name: string | null
    email: string
    phone: string | null
  }
  service: {
    id: string
    name: string
    description: string | null
    price: string
    duration: number
    category: string | null
  }
  rating: {
    id: string
    stars: number
    createdAt: Date | null
  } | null
}

export default async function BookingsPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const isAdmin = session.user.role === "admin"
  
  let bookingsList: BookingType[] = []

  try {
    if (isAdmin) {
      // Admin gets all bookings
      bookingsList = await db.query.bookings.findMany({
        with: {
          customer: true,
          service: true,
          rating: true,
        },
        orderBy: (bookings, { desc }) => [desc(bookings.createdAt)]
      }) as BookingType[]
    } else {
      // Regular users get their own bookings using the authenticated user's ID
      bookingsList = await db.query.bookings.findMany({
        where: eq(bookings.customerId, session.user.id), // This will now match the ID used during booking creation
        with: {
          customer: true,
          service: true,
          rating: true,
        },
        orderBy: (bookings, { desc }) => [desc(bookings.createdAt)]
      }) as BookingType[]

      console.log(`User ${session.user.email} (ID: ${session.user.id}) has ${bookingsList.length} bookings`)
    }
  } catch (error) {
    console.error("Error fetching bookings:", error)
    bookingsList = []
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-3">
            {isAdmin ? (
              <>
                <Shield className="w-6 h-6 text-blue-600" />
                All Customer Bookings
              </>
            ) : (
              <>
                <Calendar className="w-6 h-6 text-indigo-600" />
                My Orders
              </>
            )}
          </CardTitle>
          <CardDescription>
            {isAdmin 
              ? `Managing ${bookingsList.length} customer bookings` 
              : `You have ${bookingsList.length} orders`
            }
          </CardDescription>
          {!isAdmin && (
            <div className="text-sm text-muted-foreground">
              Logged in as: {session.user.name || session.user.email} (ID: {session.user.id})
            </div>
          )}
        </CardHeader>

        <CardContent className="px-0">
          {bookingsList.length === 0 ? (
            <div className="py-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">
                No {isAdmin ? 'bookings' : 'orders'} found
              </h3>
              <p className="text-gray-500 mt-2">
                {isAdmin 
                  ? "No customer bookings have been made yet." 
                  : "You haven't made any orders yet. Why not book your first appointment?"
                }
              </p>
              {!isAdmin && (
                <Button 
                  className="mt-4"
                  onClick={() => window.location.href = '/services'}
                >
                  Browse Services
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border">
              <Table className="min-w-full divide-y divide-gray-200">
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order #
                    </TableHead>
                    {isAdmin && (
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </TableHead>
                    )}
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Appointment
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                  {bookingsList.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-gray-50">
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{booking.id.slice(-8)}
                      </TableCell>
                      
                      {isAdmin && (
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-medium">{booking.customer.name || "N/A"}</span>
                            <span className="text-sm text-gray-500">{booking.customer.email || "N/A"}</span>
                            <span className="text-xs text-gray-400">{booking.customer.id}</span>
                          </div>
                        </TableCell>
                      )}
                      
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Scissors className="h-4 w-4 text-amber-600" />
                          <div className="flex flex-col">
                            <span className="font-medium">{booking.service.name}</span>
                            <span className="text-xs text-gray-500">{booking.service.duration} min</span>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <CalendarClock className="h-4 w-4 text-gray-500" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {formatAppointmentDate(booking.appointmentDate)}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {booking.startTime} - {booking.endTime}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatPrice(booking.totalPrice)}
                      </TableCell>
                      
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Badge
                            className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                              {
                                "bg-amber-100 text-amber-800 border-amber-200": booking.status === "pending",
                                "bg-blue-100 text-blue-800 border-blue-200": booking.status === "confirmed",
                                "bg-green-100 text-green-800 border-green-200": booking.status === "completed",
                                "bg-gray-100 text-gray-800 border-gray-200": booking.status === "cancelled",
                                "bg-red-100 text-red-800 border-red-200": booking.status === "no_show",
                              }
                            )}
                          >
                            {booking.status === "no_show" ? "No Show" : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                          {booking.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-gray-500">{booking.rating.stars}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DialogTrigger asChild>
                                <DropdownMenuItem>
                                  View details
                                </DropdownMenuItem>
                              </DialogTrigger>
                              {isAdmin && (
                                <>
                                  {booking.status === "pending" && (
                                    <>
                                      <DropdownMenuItem>
                                        <form action={async () => {
                                          "use server"
                                          await updateBookStatus(booking.id, "confirmed")
                                        }}>
                                          <button type="submit" className="w-full text-left">
                                            Confirm booking
                                          </button>
                                        </form>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <form action={async () => {
                                          "use server"
                                          await updateBookStatus(booking.id, "cancelled", "Admin cancellation")
                                        }}>
                                          <button type="submit" className="w-full text-left">
                                            Cancel booking
                                          </button>
                                        </form>
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {booking.status === "confirmed" && (
                                    <>
                                      <DropdownMenuItem>
                                        <form action={async () => {
                                          "use server"
                                          await updateBookStatus(booking.id, "completed")
                                        }}>
                                          <button type="submit" className="w-full text-left">
                                            Mark completed
                                          </button>
                                        </form>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <form action={async () => {
                                          "use server"
                                          await updateBookStatus(booking.id, "no_show", "Customer did not show up")
                                        }}>
                                          <button type="submit" className="w-full text-left">
                                            Mark no-show
                                          </button>
                                        </form>
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>

                          {/* Booking Details Dialog */}
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                Order #{booking.id.slice(-8)}
                                {isAdmin && <Badge variant="secondary">Admin View</Badge>}
                                {booking.rating && (
                                  <div className="flex items-center gap-1 ml-auto">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium">{booking.rating.stars}/5</span>
                                  </div>
                                )}
                              </DialogTitle>
                              <DialogDescription>
                                Order details and appointment information
                              </DialogDescription>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <CalendarClock className="h-4 w-4" />
                                <span>
                                  Ordered on {booking.createdAt ? formatBookingDate(booking.createdAt.toISOString()) : "N/A"}
                                </span>
                              </div>
                            </DialogHeader>

                            <div className="mt-6 space-y-6">
                              {/* Status Card with Admin Actions */}
                              <Card>
                                <CardHeader className="pb-2">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-lg font-medium">Order Status</h3>
                                      <Badge
                                        className={cn(
                                          "border",
                                          {
                                            "bg-amber-100 text-amber-800 border-amber-200": booking.status === "pending",
                                            "bg-blue-100 text-blue-800 border-blue-200": booking.status === "confirmed",
                                            "bg-green-100 text-green-800 border-green-200": booking.status === "completed",
                                            "bg-gray-100 text-gray-800 border-gray-200": booking.status === "cancelled",
                                            "bg-red-100 text-red-800 border-red-200": booking.status === "no_show",
                                          }
                                        )}
                                      >
                                        {booking.status === "no_show" ? "No Show" : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                      </Badge>
                                    </div>
                                    {isAdmin && (booking.status === "pending" || booking.status === "confirmed") && (
                                      <div className="flex gap-2">
                                        {booking.status === "pending" && (
                                          <>
                                            <form action={async () => {
                                              "use server"
                                              await updateBookStatus(booking.id, "confirmed")
                                            }}>
                                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Confirm
                                              </Button>
                                            </form>
                                            <form action={async () => {
                                              "use server"
                                              await updateBookStatus(booking.id, "cancelled", "Admin cancellation")
                                            }}>
                                              <Button size="sm" variant="destructive">
                                                <X className="mr-2 h-4 w-4" />
                                                Cancel
                                              </Button>
                                            </form>
                                          </>
                                        )}
                                        {booking.status === "confirmed" && (
                                          <>
                                            <form action={async () => {
                                              "use server"
                                              await updateBookStatus(booking.id, "completed")
                                            }}>
                                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Complete
                                              </Button>
                                            </form>
                                            <form action={async () => {
                                              "use server"
                                              await updateBookStatus(booking.id, "no_show", "Customer did not show up")
                                            }}>
                                              <Button size="sm" variant="outline" className="text-orange-600 border-orange-300 hover:bg-orange-50">
                                                <AlertTriangle className="mr-2 h-4 w-4" />
                                                No Show
                                              </Button>
                                            </form>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  {booking.cancelReason && (
                                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                                      <strong>Cancellation reason:</strong> {booking.cancelReason}
                                    </div>
                                  )}
                                </CardHeader>
                              </Card>

                              {/* Service & Appointment Info */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                      <Scissors className="h-5 w-5 text-amber-600" />
                                      Service Details
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Service</p>
                                      <p className="font-semibold">{booking.service.name}</p>
                                    </div>
                                    {booking.service.description && (
                                      <div>
                                        <p className="text-sm text-muted-foreground">Description</p>
                                        <p className="text-sm">{booking.service.description}</p>
                                      </div>
                                    )}
                                    {booking.service.category && (
                                      <div>
                                        <p className="text-sm text-muted-foreground">Category</p>
                                        <Badge variant="outline" className="capitalize">
                                          {booking.service.category}
                                        </Badge>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                      <Clock className="h-4 w-4 text-muted-foreground" />
                                      <div>
                                        <p className="text-sm text-muted-foreground">Duration</p>
                                        <p className="font-medium">{booking.service.duration} minutes</p>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Price</p>
                                      <p className="text-lg font-bold text-green-600">{formatPrice(booking.totalPrice)}</p>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                      <Calendar className="h-5 w-5 text-blue-600" />
                                      Appointment Time
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Date</p>
                                      <p className="font-semibold">{formatAppointmentDate(booking.appointmentDate)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Time</p>
                                      <p className="font-semibold text-lg">{booking.startTime} - {booking.endTime}</p>
                                    </div>
                                    {booking.notes && (
                                      <div>
                                        <p className="text-sm text-muted-foreground">Customer Notes</p>
                                        <p className="text-sm bg-gray-50 p-2 rounded border">
                                          {booking.notes}
                                        </p>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>

                              {/* Customer Information */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2 text-lg">
                                    <User className="h-5 w-5" />
                                    Customer Information
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                      <User className="h-4 w-4 text-muted-foreground" />
                                      <div>
                                        <p className="text-sm text-muted-foreground">Name</p>
                                        <p className="font-medium">{booking.customer.name || "N/A"}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <Mail className="h-4 w-4 text-muted-foreground" />
                                      <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p>{booking.customer.email || "N/A"}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <Phone className="h-4 w-4 text-muted-foreground" />
                                      <div>
                                        <p className="text-sm text-muted-foreground">Phone</p>
                                        <p>{booking.customer.phone || "N/A"}</p>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Rating Section */}
                              {booking.rating && (
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                      <Star className="h-5 w-5 text-yellow-500" />
                                      Customer Rating
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex items-center gap-2">
                                      <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star
                                            key={star}
                                            className={cn(
                                              "h-5 w-5",
                                              star <= booking.rating!.stars
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                            )}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-lg font-semibold">{booking.rating.stars}/5</span>
                                      <span className="text-sm text-muted-foreground">
                                        • Rated on {booking.rating.createdAt ? formatBookingDate(booking.rating.createdAt.toISOString()) : "N/A"}
                                      </span>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}