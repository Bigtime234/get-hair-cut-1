import { db } from "@/server"
import { auth } from "@/server/auth"
import { bookings, users } from "@/server/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import Link from "next/link"
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
  Star, AlertTriangle, Eye, CreditCard, Sparkles
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
        where: eq(bookings.customerId, session.user.id),
        with: {
          customer: true,
          service: true,
          rating: true,
        },
        orderBy: (bookings, { desc }) => [desc(bookings.createdAt)]
      }) as BookingType[]
    }
  } catch (error) {
    console.error("Error fetching bookings:", error)
    bookingsList = []
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
      case "confirmed":
        return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
      case "completed":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
      case "cancelled":
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
      case "no_show":
        return "bg-gradient-to-r from-red-500 to-pink-600 text-white"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto py-4 sm:py-8 px-4">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              {isAdmin ? (
                <>
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                      Admin Dashboard
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg">Managing all customer appointments</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl shadow-lg">
                    <Scissors className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
                      My Appointments
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg">Your grooming journey with us</p>
                  </div>
                </>
              )}
            </div>
            
            {!isAdmin && (
              <Link href="/services" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white shadow-lg transition-all duration-200 transform hover:scale-105">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Book New Service
                </Button>
              </Link>
            )}
          </div>

          {/* Stats Cards - Responsive Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Total {isAdmin ? 'Bookings' : 'Appointments'}</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{bookingsList.length}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Completed</p>
                    <p className="text-lg sm:text-2xl font-bold text-green-600">
                      {bookingsList.filter(b => b.status === 'completed').length}
                    </p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Pending</p>
                    <p className="text-lg sm:text-2xl font-bold text-orange-500">
                      {bookingsList.filter(b => b.status === 'pending').length}
                    </p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Total Spent</p>
                    <p className="text-sm sm:text-2xl font-bold text-indigo-600">
                      {formatPrice(
                        bookingsList
                          .filter(b => b.status === 'completed')
                          .reduce((sum, b) => sum + parseFloat(b.totalPrice), 0)
                      )}
                    </p>
                  </div>
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 text-indigo-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            {bookingsList.length === 0 ? (
              <div className="py-12 sm:py-16 text-center px-4">
                <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                  <Scissors className="h-8 w-8 sm:h-12 sm:w-12 text-indigo-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {isAdmin ? 'No Bookings Yet' : 'Ready for Your First Cut?'}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg mb-6 max-w-md mx-auto">
                  {isAdmin 
                    ? "No customer bookings have been made yet." 
                    : "You haven't booked any appointments yet. Let's get you looking fresh!"
                  }
                </p>
                {!isAdmin && (
                  <Link href="/services">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white shadow-lg transition-all duration-200 transform hover:scale-105">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Browse Our Services
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              /* Mobile-first responsive table */
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                      <TableHead className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        ID
                      </TableHead>
                      {isAdmin && (
                        <TableHead className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Customer
                        </TableHead>
                      )}
                      <TableHead className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Service
                      </TableHead>
                      <TableHead className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Date & Time
                      </TableHead>
                      <TableHead className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Total
                      </TableHead>
                      <TableHead className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </TableHead>
                      <TableHead className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookingsList.map((booking, index) => (
                      <TableRow 
                        key={booking.id} 
                        className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        {/* Mobile-optimized booking ID */}
                        <TableCell className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-xs sm:text-sm">
                                #{booking.id.slice(-2)}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 text-xs sm:text-sm">#{booking.id.slice(-6)}</p>
                              <p className="text-xs text-gray-500 hidden sm:block">
                                {booking.createdAt ? formatBookingDate(booking.createdAt.toISOString()) : "N/A"}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        
                        {/* Customer info - hidden on mobile unless admin */}
                        {isAdmin && (
                          <TableCell className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-gray-900 text-sm truncate">{booking.customer.name || "N/A"}</p>
                                <p className="text-xs text-gray-600 truncate">{booking.customer.email}</p>
                              </div>
                            </div>
                          </TableCell>
                        )}
                        
                        {/* Service info */}
                        <TableCell className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Scissors className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{booking.service.name}</p>
                              <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-600">
                                <Clock className="w-3 h-3" />
                                <span>{booking.service.duration}min</span>
                              </div>
                              {/* Show date on mobile */}
                              <div className="sm:hidden text-xs text-gray-500 mt-1">
                                {booking.appointmentDate.toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        
                        {/* Date & Time - hidden on mobile */}
                        <TableCell className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                              <CalendarClock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">
                                {formatAppointmentDate(booking.appointmentDate)}
                              </p>
                              <p className="text-sm text-gray-600 font-medium">
                                {booking.startTime} - {booking.endTime}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        
                        {/* Total price */}
                        <TableCell className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="text-right">
                            <p className="text-sm sm:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              {formatPrice(booking.totalPrice)}
                            </p>
                          </div>
                        </TableCell>
                        
                        {/* Status */}
                        <TableCell className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex flex-col space-y-1">
                            <Badge className={cn("px-2 sm:px-3 py-1 font-semibold border-0 shadow-sm text-xs", getStatusColor(booking.status))}>
                              {booking.status === "no_show" ? "No Show" : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                            {booking.rating && (
                              <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full w-fit">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs font-semibold text-yellow-700">{booking.rating.stars}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        
                        {/* Actions */}
                        <TableCell className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                          <Dialog>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-indigo-50">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DialogTrigger asChild>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                {isAdmin && booking.status === "pending" && (
                                  <>
                                    <DropdownMenuItem>
                                      <form action={async () => {
                                        "use server"
                                        await updateBookStatus(booking.id, "completed")
                                      }}>
                                        <button type="submit" className="w-full text-left flex items-center">
                                          <CheckCircle className="mr-2 h-4 w-4" />
                                          Mark Completed
                                        </button>
                                      </form>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <form action={async () => {
                                        "use server"
                                        await updateBookStatus(booking.id, "cancelled", "Admin cancellation")
                                      }}>
                                        <button type="submit" className="w-full text-left flex items-center text-red-600">
                                          <X className="mr-2 h-4 w-4" />
                                          Cancel Booking
                                        </button>
                                      </form>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <form action={async () => {
                                        "use server"
                                        await updateBookStatus(booking.id, "no_show", "Customer did not show up")
                                      }}>
                                        <button type="submit" className="w-full text-left flex items-center text-orange-600">
                                          <AlertTriangle className="mr-2 h-4 w-4" />
                                          Mark No-Show
                                        </button>
                                      </form>
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Enhanced Responsive Dialog Content */}
                            <DialogContent className="w-[95vw] max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50 mx-auto">
                              <DialogHeader className="pb-4 sm:pb-6 border-b border-gray-200">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                                  <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
                                      <Scissors className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div className="min-w-0">
                                      <DialogTitle className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                                        Appointment #{booking.id.slice(-8)}
                                      </DialogTitle>
                                      <DialogDescription className="text-sm sm:text-base text-gray-600">
                                        Complete appointment details and information
                                      </DialogDescription>
                                    </div>
                                  </div>
                                  {booking.rating && (
                                    <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded-full border border-yellow-200 w-fit">
                                      <Star className="h-4  sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                                      <span className="font-semibold text-yellow-700 text-sm">{booking.rating.stars}/5</span>
                                    </div>
                                  )}
                                </div>
                              </DialogHeader>

                              <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                                {/* Status Card - Responsive */}
                                <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-gray-50">
                                  <CardHeader className="pb-3 sm:pb-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                                      <div className="flex items-center space-x-3">
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Status</h3>
                                        <Badge className={cn("px-3 sm:px-4 py-1.5 sm:py-2 font-semibold border-0 shadow-md text-xs sm:text-sm", getStatusColor(booking.status))}>
                                          {booking.status === "no_show" ? "No Show" : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </Badge>
                                      </div>
                                      {/* Admin Actions - Responsive */}
                                      {isAdmin && booking.status === "pending" && (
                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                                          <form action={async () => {
                                            "use server"
                                            await updateBookStatus(booking.id, "completed")
                                          }} className="w-full sm:w-auto">
                                            <Button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg text-sm">
                                              <CheckCircle className="mr-2 h-4 w-4" />
                                              Complete
                                            </Button>
                                          </form>
                                          <form action={async () => {
                                            "use server"
                                            await updateBookStatus(booking.id, "cancelled", "Admin cancellation")
                                          }} className="w-full sm:w-auto">
                                            <Button variant="destructive" className="w-full sm:w-auto shadow-lg text-sm">
                                              <X className="mr-2 h-4 w-4" />
                                              Cancel
                                            </Button>
                                          </form>
                                          <form action={async () => {
                                            "use server"
                                            await updateBookStatus(booking.id, "no_show", "Customer did not show up")
                                          }} className="w-full sm:w-auto">
                                            <Button variant="outline" className="w-full sm:w-auto text-orange-600 border-orange-300 hover:bg-orange-50 shadow-lg text-sm">
                                              <AlertTriangle className="mr-2 h-4 w-4" />
                                              No Show
                                            </Button>
                                          </form>
                                        </div>
                                      )}
                                    </div>
                                    {booking.cancelReason && (
                                      <div className="mt-4 p-3 sm:p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                                        <div className="flex items-center">
                                          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 mr-2 flex-shrink-0" />
                                          <strong className="text-red-800 text-sm sm:text-base">Cancellation Reason:</strong>
                                        </div>
                                        <p className="text-red-700 mt-1 text-sm sm:text-base">{booking.cancelReason}</p>
                                      </div>
                                    )}
                                  </CardHeader>
                                </Card>

                                {/* Service & Appointment Info - Responsive Grid */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                                  {/* Service Details Card */}
                                  <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
                                    <CardHeader className="pb-3 sm:pb-4">
                                      <CardTitle className="flex items-center space-x-3 text-lg sm:text-xl">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                          <Scissors className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        </div>
                                        <span className="text-gray-900 min-w-0 truncate">Service Details</span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <p className="text-xs sm:text-sm text-gray-600 font-medium">Service</p>
                                          <p className="font-bold text-base sm:text-lg text-gray-900 break-words">{booking.service.name}</p>
                                        </div>
                                        <div className="space-y-1">
                                          <p className="text-xs sm:text-sm text-gray-600 font-medium">Duration</p>
                                          <p className="font-semibold text-gray-900 text-sm sm:text-base">{booking.service.duration} minutes</p>
                                        </div>
                                      </div>
                                      {booking.service.description && (
                                        <div className="space-y-1">
                                          <p className="text-xs sm:text-sm text-gray-600 font-medium">Description</p>
                                          <p className="text-gray-800 text-sm sm:text-base leading-relaxed">{booking.service.description}</p>
                                        </div>
                                      )}
                                      {booking.service.category && (
                                        <div className="space-y-1">
                                          <p className="text-xs sm:text-sm text-gray-600 font-medium">Category</p>
                                          <Badge variant="outline" className="text-xs sm:text-sm px-2 py-1">
                                            {booking.service.category}
                                          </Badge>
                                        </div>
                                      )}
                                      <div className="pt-3 sm:pt-4 border-t border-orange-200">
                                        <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Total Price</p>
                                        <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                          {formatPrice(booking.totalPrice)}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Appointment Details Card */}
                                  <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                                    <CardHeader className="pb-3 sm:pb-4">
                                      <CardTitle className="flex items-center space-x-3 text-lg sm:text-xl">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        </div>
                                        <span className="text-gray-900 min-w-0 truncate">Appointment Details</span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div className="space-y-1">
                                        <p className="text-xs sm:text-sm text-gray-600 font-medium">Date</p>
                                        <p className="font-bold text-base sm:text-lg text-gray-900 break-words">{formatAppointmentDate(booking.appointmentDate)}</p>
                                      </div>
                                      <div className="space-y-1">
                                        <p className="text-xs sm:text-sm text-gray-600 font-medium">Time Slot</p>
                                        <p className="font-bold text-lg sm:text-xl text-indigo-600">{booking.startTime} - {booking.endTime}</p>
                                      </div>
                                      {booking.notes && (
                                        <div className="space-y-2">
                                          <p className="text-xs sm:text-sm text-gray-600 font-medium">Special Notes</p>
                                          <div className="p-3 bg-white/60 rounded-lg border border-blue-200">
                                            <p className="text-gray-800 text-sm sm:text-base leading-relaxed break-words">{booking.notes}</p>
                                          </div>
                                        </div>
                                      )}
                                      <div className="pt-3 sm:pt-4 border-t border-blue-200">
                                        <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Booked On</p>
                                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                          {booking.createdAt ? formatBookingDate(booking.createdAt.toISOString()) : "N/A"}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Customer Information - Full Width Responsive */}
                                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50">
                                  <CardHeader className="pb-3 sm:pb-4">
                                    <CardTitle className="flex items-center space-x-3 text-lg sm:text-xl">
                                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                      </div>
                                      <span className="text-gray-900">Customer Information</span>
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                      {/* Name */}
                                      <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/60 rounded-lg border border-purple-200">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                          <User className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <p className="text-xs sm:text-sm text-gray-600 font-medium">Full Name</p>
                                          <p className="font-bold text-gray-900 text-sm sm:text-base break-words">{booking.customer.name || "Not provided"}</p>
                                        </div>
                                      </div>
                                      
                                      {/* Email */}
                                      <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/60 rounded-lg border border-purple-200">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                          <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <p className="text-xs sm:text-sm text-gray-600 font-medium">Email</p>
                                          <p className="font-semibold text-gray-900 text-xs sm:text-base break-all">{booking.customer.email}</p>
                                        </div>
                                      </div>
                                      
                                      {/* Phone */}
                                      <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/60 rounded-lg border border-purple-200">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                                          <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <p className="text-xs sm:text-sm text-gray-600 font-medium">Phone</p>
                                          <p className="font-semibold text-gray-900 text-sm sm:text-base break-words">{booking.customer.phone || "Not provided"}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Rating Section - Responsive */}
                                {booking.rating && (
                                  <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-amber-50">
                                    <CardHeader className="pb-3 sm:pb-4">
                                      <CardTitle className="flex items-center space-x-3 text-lg sm:text-xl">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        </div>
                                        <span className="text-gray-900">Customer Rating</span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white/60 rounded-xl border border-yellow-200 space-y-4 sm:space-y-0">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                                          <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                              <Star
                                                key={star}
                                                className={cn(
                                                  "h-5 w-5 sm:h-6 sm:w-6",
                                                  star <= booking.rating!.stars
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                                )}
                                              />
                                            ))}
                                          </div>
                                          <div>
                                            <p className="text-xl sm:text-2xl font-bold text-gray-900">{booking.rating.stars}/5</p>
                                            <p className="text-xs sm:text-sm text-gray-600">
                                              Rated on {booking.rating.createdAt ? formatBookingDate(booking.rating.createdAt.toISOString()) : "N/A"}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="text-left sm:text-right w-full sm:w-auto">
                                          <p className="text-xs sm:text-sm text-gray-600 font-medium">Service Quality</p>
                                          <p className="text-base sm:text-lg font-bold text-yellow-600">
                                            {booking.rating.stars >= 4 ? "Excellent" : 
                                             booking.rating.stars >= 3 ? "Good" : 
                                             booking.rating.stars >= 2 ? "Fair" : "Poor"}
                                          </p>
                                        </div>
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
    </div>
  )
}