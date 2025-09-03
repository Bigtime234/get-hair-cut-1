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
  Star, AlertTriangle, ImageIcon, Sparkles, TrendingUp,
  Filter, Search, Download, Eye, ChevronDown, ChevronUp
} from "lucide-react"
import Image from "next/image"
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
    imageUrl: string | null
    galleryUrls: string | null
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

      console.log(`User ${session.user.email} (ID: ${session.user.id}) has ${bookingsList.length} bookings`)
    }
  } catch (error) {
    console.error("Error fetching bookings:", error)
    bookingsList = []
  }

  // Stats calculations
  const totalRevenue = bookingsList.reduce((sum, booking) => sum + parseFloat(booking.totalPrice), 0)
  const completedBookings = bookingsList.filter(b => b.status === 'completed').length
  const averageRating = bookingsList.filter(b => b.rating).reduce((sum, b) => sum + (b.rating?.stars || 0), 0) / bookingsList.filter(b => b.rating).length || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200/60">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-100/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              {isAdmin ? (
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-20"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2 md:p-3 rounded-lg">
                    <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-20"></div>
                  <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-2 md:p-3 rounded-lg">
                    <Calendar className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
              )}
              
              <div>
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 bg-clip-text text-transparent">
                  {isAdmin ? 'Customer Bookings Dashboard' : 'My Orders'}
                </h1>
                <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-lg">
                  {isAdmin 
                    ? `Manage and track all customer appointments` 
                    : `Track your appointments and service history`
                  }
                </p>
                {!isAdmin && (
                  <div className="text-xs md:text-sm text-slate-500 mt-1 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Logged in as: {session.user.name || session.user.email}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur border-slate-200 hover:bg-white text-xs md:text-sm">
                <Filter className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur border-slate-200 hover:bg-white text-xs md:text-sm">
                <Download className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          {bookingsList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-blue-200/30 rounded-full -translate-y-3 translate-x-3 md:-translate-y-4 md:translate-x-4"></div>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-700 text-xs md:text-sm font-medium">Total {isAdmin ? 'Bookings' : 'Orders'}</p>
                      <p className="text-xl md:text-3xl font-bold text-blue-900 mt-1">{bookingsList.length}</p>
                    </div>
                    <Calendar className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100/50 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-green-200/30 rounded-full -translate-y-3 translate-x-3 md:-translate-y-4 md:translate-x-4"></div>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-700 text-xs md:text-sm font-medium">Completed</p>
                      <p className="text-xl md:text-3xl font-bold text-green-900 mt-1">{completedBookings}</p>
                    </div>
                    <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-50 to-yellow-100/50 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-amber-200/30 rounded-full -translate-y-3 translate-x-3 md:-translate-y-4 md:translate-x-4"></div>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-700 text-xs md:text-sm font-medium">Total {isAdmin ? 'Revenue' : 'Spent'}</p>
                      <p className="text-lg md:text-2xl font-bold text-amber-900 mt-1">{formatPrice(totalRevenue)}</p>
                    </div>
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>

              {averageRating > 0 && (
                <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-100/50 backdrop-blur-sm">
                  <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-purple-200/30 rounded-full -translate-y-3 translate-x-3 md:-translate-y-4 md:translate-x-4"></div>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-700 text-xs md:text-sm font-medium">Avg Rating</p>
                        <div className="flex items-center gap-1 md:gap-2 mt-1">
                          <p className="text-lg md:text-2xl font-bold text-purple-900">{averageRating.toFixed(1)}</p>
                          <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            {bookingsList.length === 0 ? (
              <div className="py-16 md:py-24 text-center">
                <div className="relative mb-6 md:mb-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full"></div>
                  </div>
                  <Calendar className="relative mx-auto h-12 w-12 md:h-16 md:w-16 text-slate-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2 md:mb-3">
                  No {isAdmin ? 'bookings' : 'orders'} found
                </h3>
                <p className="text-slate-600 text-sm md:text-lg max-w-md mx-auto mb-6 md:mb-8 leading-relaxed">
                  {isAdmin 
                    ? "No customer bookings have been made yet. Your dashboard will come alive as customers start booking services." 
                    : "You haven't made any orders yet. Discover amazing services and book your first appointment to get started!"
                  }
                </p>
                {!isAdmin && (
                  <Button 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 md:px-8 md:py-3 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.location.href = '/services'}
                  >
                    <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Browse Services
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-hidden">
                {/* Mobile Cards View */}
                <div className="md:hidden p-4 space-y-4">
                  {bookingsList.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                              <span className="text-sm font-semibold text-slate-900">#{booking.id.slice(-8)}</span>
                            </div>
                            <Badge
                              className={cn(
                                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border-0",
                                {
                                  "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800": booking.status === "pending",
                                  "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800": booking.status === "confirmed",
                                  "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800": booking.status === "completed",
                                  "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800": booking.status === "cancelled",
                                  "bg-gradient-to-r from-red-100 to-rose-100 text-red-800": booking.status === "no_show",
                                }
                              )}
                            >
                              {booking.status === "no_show" ? "No Show" : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                          <Dialog>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-slate-100 rounded-lg">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-slate-200">
                                <DialogTrigger asChild>
                                  <DropdownMenuItem className="flex items-center gap-2 text-xs">
                                    <Eye className="w-3 h-3" />
                                    View details
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                {isAdmin && (
                                  <>
                                    {booking.status === "pending" && (
                                      <>
                                        <DropdownMenuItem className="text-xs">
                                          <form action={async () => {
                                            "use server"
                                            await updateBookStatus(booking.id, "completed")
                                          }}>
                                            <button type="submit" className="w-full text-left flex items-center gap-2">
                                              <CheckCircle className="w-3 h-3" />
                                              Confirm booking
                                            </button>
                                          </form>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-xs">
                                          <form action={async () => {
                                            "use server"
                                            await updateBookStatus(booking.id, "cancelled", "Admin cancellation")
                                          }}>
                                            <button type="submit" className="w-full text-left flex items-center gap-2">
                                              <X className="w-3 h-3" />
                                              Cancel booking
                                            </button>
                                          </form>
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                    {booking.status === "confirmed" && (
                                      <>
                                        <DropdownMenuItem className="text-xs">
                                          <form action={async () => {
                                            "use server"
                                            await updateBookStatus(booking.id, "completed")
                                          }}>
                                            <button type="submit" className="w-full text-left flex items-center gap-2">
                                              <CheckCircle className="w-3 h-3" />
                                              Mark completed
                                            </button>
                                          </form>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-xs">
                                          <form action={async () => {
                                            "use server"
                                            await updateBookStatus(booking.id, "no_show", "Customer did not show up")
                                          }}>
                                            <button type="submit" className="w-full text-left flex items-center gap-2">
                                              <AlertTriangle className="w-3 h-3" />
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
                            <DialogContent className="max-w-[95vw] rounded-lg sm:max-w-md max-h-[80vh] overflow-y-auto">
                              <BookingDetailsDialog booking={booking} isAdmin={isAdmin} />
                            </DialogContent>
                          </Dialog>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0 shadow-sm">
                            {booking.service.imageUrl ? (
                              <Image
                                src={booking.service.imageUrl}
                                alt={booking.service.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Scissors className="h-5 w-5 text-slate-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 text-sm truncate">{booking.service.name}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                              <Clock className="h-3 w-3" />
                              {booking.service.duration} min
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-xs text-slate-500">Date & Time</p>
                            <p className="font-medium text-slate-900">
                              {new Date(booking.appointmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                            <p className="text-xs text-slate-600">
                              {booking.startTime}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Total</p>
                            <p className="font-bold text-green-700">
                              {formatPrice(booking.totalPrice)}
                            </p>
                          </div>
                        </div>

                        {isAdmin && (
                          <div className="mt-4 pt-4 border-t border-slate-100">
                            <p className="text-xs text-slate-500">Customer</p>
                            <p className="text-sm font-medium text-slate-900 truncate">
                              {booking.customer.name || "N/A"}
                            </p>
                            <p className="text-xs text-slate-600 truncate">
                              {booking.customer.email || "N/A"}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                        <TableHead className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Order #
                        </TableHead>
                        {isAdmin && (
                          <TableHead className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Customer
                          </TableHead>
                        )}
                        <TableHead className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Service
                        </TableHead>
                        <TableHead className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Appointment
                        </TableHead>
                        <TableHead className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Total
                        </TableHead>
                        <TableHead className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Status
                        </TableHead>
                        <TableHead className="relative px-4 lg:px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="bg-white divide-y divide-slate-100">
                      {bookingsList.map((booking) => (
                        <TableRow key={booking.id} className="hover:bg-slate-50/50 transition-colors duration-200 group">
                          <TableCell className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                              <span className="text-sm font-semibold text-slate-900">#{booking.id.slice(-8)}</span>
                            </div>
                          </TableCell>
                          
                          {isAdmin && (
                            <TableCell className="px-4 lg:px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium text-slate-900 text-sm">{booking.customer.name || "N/A"}</span>
                                  <span className="text-xs text-slate-500">{booking.customer.email || "N/A"}</span>
                                </div>
                              </div>
                            </TableCell>
                          )}
                          
                          <TableCell className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0 shadow-sm">
                                {booking.service.imageUrl ? (
                                  <Image
                                    src={booking.service.imageUrl}
                                    alt={booking.service.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Scissors className="h-5 w-5 text-slate-400" />
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-slate-900 text-sm">{booking.service.name}</span>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {booking.service.duration} min
                                  </div>
                                  {booking.service.category && (
                                    <>
                                      <span>•</span>
                                      <Badge variant="secondary" className="text-xs px-1.5 py-0 bg-slate-100 text-slate-600">
                                        {booking.service.category}
                                      </Badge>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          
                          <TableCell className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                                <CalendarClock className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-900">
                                  {new Date(booking.appointmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {booking.startTime} - {booking.endTime}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          
                          <TableCell className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              {formatPrice(booking.totalPrice)}
                            </div>
                          </TableCell>
                          
                          <TableCell className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={cn(
                                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border-0",
                                  {
                                    "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800": booking.status === "pending",
                                    "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800": booking.status === "confirmed",
                                    "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800": booking.status === "completed",
                                    "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800": booking.status === "cancelled",
                                    "bg-gradient-to-r from-red-100 to-rose-100 text-red-800": booking.status === "no_show",
                                  }
                                )}
                              >
                                {booking.status === "no_show" ? "No Show" : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                              {booking.rating && (
                                <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded-full">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs font-medium text-yellow-700">{booking.rating.stars}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          
                          <TableCell className="px-4 lg:px-6 py-4 whitespace-nowrap text-right">
                            <Dialog>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 rounded-lg">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-slate-200">
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem className="flex items-center gap-2 text-xs">
                                      <Eye className="w-3 h-3" />
                                      View details
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  {isAdmin && (
                                    <>
                                      {booking.status === "pending" && (
                                        <>
                                          <DropdownMenuItem className="text-xs">
                                            <form action={async () => {
                                              "use server"
                                              await updateBookStatus(booking.id, "completed")
                                            }}>
                                              <button type="submit" className="w-full text-left flex items-center gap-2">
                                                <CheckCircle className="w-3 h-3" />
                                                Confirm booking
                                              </button>
                                            </form>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="text-xs">
                                            <form action={async () => {
                                              "use server"
                                              await updateBookStatus(booking.id, "cancelled", "Admin cancellation")
                                            }}>
                                              <button type="submit" className="w-full text-left flex items-center gap-2">
                                                <X className="w-3 h-3" />
                                                Cancel booking
                                              </button>
                                            </form>
                                          </DropdownMenuItem>
                                        </>
                                      )}
                                      {booking.status === "confirmed" && (
                                        <>
                                          <DropdownMenuItem className="text-xs">
                                            <form action={async () => {
                                              "use server"
                                              await updateBookStatus(booking.id, "completed")
                                            }}>
                                              <button type="submit" className="w-full text-left flex items-center gap-2">
                                                <CheckCircle className="w-3 h-3" />
                                                Mark completed
                                              </button>
                                            </form>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="text-xs">
                                            <form action={async () => {
                                              "use server"
                                              await updateBookStatus(booking.id, "no_show", "Customer did not show up")
                                            }}>
                                              <button type="submit" className="w-full text-left flex items-center gap-2">
                                                <AlertTriangle className="w-3 h-3" />
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
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                <BookingDetailsDialog booking={booking} isAdmin={isAdmin} />
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Extracted Dialog Component for better organization
function BookingDetailsDialog({ booking, isAdmin }: { booking: BookingType, isAdmin: boolean }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-lg">
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
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                <div className="flex flex-wrap gap-2">
                  {booking.status === "pending" && (
                    <>
                      <form action={async () => {
                        "use server"
                        await updateBookStatus(booking.id, "completed")
                      }}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Confirm
                        </Button>
                      </form>
                      <form action={async () => {
                        "use server"
                        await updateBookStatus(booking.id, "cancelled", "Admin cancellation")
                      }}>
                        <Button size="sm" variant="destructive" className="text-xs">
                          <X className="mr-1 h-3 w-3" />
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
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Complete
                        </Button>
                      </form>
                      <form action={async () => {
                        "use server"
                        await updateBookStatus(booking.id, "no_show", "Customer did not show up")
                      }}>
                        <Button size="sm" variant="outline" className="text-orange-600 border-orange-300 hover:bg-orange-50 text-xs">
                          <AlertTriangle className="mr-1 h-3 w-3" />
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

        {/* Enhanced Service Details with Image Gallery */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Scissors className="h-5 w-5 text-amber-600" />
              Service Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Service Image Section */}
            <div className="space-y-4">
              {/* Main Service Image */}
              <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden bg-gray-100">
                {booking.service.imageUrl ? (
                  <Image
                    src={booking.service.imageUrl}
                    alt={booking.service.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No image available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Gallery Images */}
              {booking.service.galleryUrls && (() => {
                try {
                  const galleryImages = JSON.parse(booking.service.galleryUrls) as string[]
                  return galleryImages.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Gallery</p>
                      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {galleryImages.map((imageUrl, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={imageUrl}
                              alt={`${booking.service.name} gallery ${index + 1}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                } catch {
                  return null
                }
              })()}
            </div>

            {/* Service Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Service Name</p>
                  <p className="font-semibold text-lg">{booking.service.name}</p>
                </div>
                {booking.service.description && (
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-sm leading-relaxed">{booking.service.description}</p>
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
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{booking.service.duration} minutes</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Service Price</p>
                  <p className="text-lg font-bold text-green-600">{formatPrice(booking.service.price)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                  <p className="text-xl font-bold text-amber-600">{formatPrice(booking.totalPrice)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
              Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold text-lg">{formatAppointmentDate(booking.appointmentDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-semibold text-lg">{booking.startTime} - {booking.endTime}</p>
              </div>
            </div>
            {booking.notes && (
              <div>
                <p className="text-sm text-muted-foreground">Customer Notes</p>
                <p className="text-sm bg-amber-50 p-3 rounded-lg border border-amber-200">
                  {booking.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

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
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
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
    </>
  )
}