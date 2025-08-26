import { Suspense } from "react"
import { db } from "@/server"
import { auth } from "@/server/auth"
import { bookings } from "@/server/schema"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar, Clock, Users, TrendingUp, 
  CheckCircle, AlertCircle, XCircle, 
  Shield, Phone, Mail, Scissors
} from "lucide-react"
import { BookingStatusActions, QuickStatusActions, StatusBadge } from "@/app/components/bookings/booking-status-action"
import Link from "next/link"

// Stats calculation functions
function calculateBookingStats(bookings: any[]) {
  const today = new Date()
  const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  return {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    todayBookings: bookings.filter(b => 
      new Date(b.appointmentDate).toDateString() === today.toDateString()
    ).length,
    thisWeek: bookings.filter(b => b.createdAt >= thisWeek).length,
    thisMonth: bookings.filter(b => b.createdAt >= thisMonth).length,
  }
}

// Helper functions
function formatPrice(price: string | number) {
  const priceValue = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    style: "currency",
  }).format(isNaN(priceValue) ? 0 : priceValue)
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-NG', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

function formatTime(time: string) {
  return time
}

// Loading component
function BookingDashboardSkeleton() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-96"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-32"></div>
          </div>
        ))}
      </div>
      
      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-lg h-96"></div>
      </div>
    </div>
  )
}

// Main dashboard component
async function AdminBookingDashboard() {
  const session = await auth()
  if (!session) redirect("/auth/signin")
  if (session.user.role !== "admin") redirect("/bookings")

  // Fetch all bookings with relationships
  const allBookings = await db.query.bookings.findMany({
    with: {
      customer: true,
      service: true,
      rating: true,
    },
    orderBy: (bookings, { desc }) => [desc(bookings.appointmentDate)]
  })

  const stats = calculateBookingStats(allBookings)
  
  // Filter bookings by status for tabs
  const pendingBookings = allBookings.filter(b => b.status === 'pending')
  const confirmedBookings = allBookings.filter(b => b.status === 'confirmed')
  const todayBookings = allBookings.filter(b => {
    const today = new Date()
    return new Date(b.appointmentDate).toDateString() === today.toDateString()
  })

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage bookings and track business performance
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/bookings"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All Bookings →
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-gray-500 mt-1">This month: {stats.thisMonth}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-xs text-gray-500 mt-1">Need attention</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Bookings</p>
                <p className="text-2xl font-bold text-green-600">{stats.todayBookings}</p>
                <p className="text-xs text-gray-500 mt-1">Confirmed: {todayBookings.filter(b => b.status === 'confirmed').length}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Completed: {stats.completed}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Booking Management
          </CardTitle>
          <CardDescription>
            Review and manage customer bookings by status
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending ({stats.pending})
              </TabsTrigger>
              <TabsTrigger value="today" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Today ({stats.todayBookings})
              </TabsTrigger>
              <TabsTrigger value="confirmed" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Confirmed ({stats.confirmed})
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                All ({stats.total})
              </TabsTrigger>
            </TabsList>

            {/* Pending Bookings Tab */}
            <TabsContent value="pending" className="space-y-4">
              {pendingBookings.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <p className="text-gray-500">No pending bookings</p>
                  <p className="text-sm text-gray-400">All caught up!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingBookings.slice(0, 10).map((booking) => (
                    <Card key={booking.id} className="border-yellow-200 bg-yellow-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Scissors className="h-4 w-4 text-amber-600" />
                              <div>
                                <p className="font-medium">{booking.service.name}</p>
                                <p className="text-sm text-gray-600">
                                  #{booking.id.slice(-8)} • {booking.customer.name}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(booking.appointmentDate)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {booking.startTime} - {booking.endTime}
                              </div>
                              <div className="font-semibold text-green-600">
                                {formatPrice(booking.totalPrice)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <StatusBadge status={booking.status} />
                            <QuickStatusActions 
                              bookingId={booking.id}
                              currentStatus={booking.status}
                              compact={true}
                            />
                          </div>
                        </div>
                        
                        {booking.notes && (
                          <div className="mt-3 p-2 bg-white rounded border text-sm">
                            <strong>Customer notes:</strong> {booking.notes}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  
                  {pendingBookings.length > 10 && (
                    <div className="text-center">
                      <Link 
                        href="/bookings"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View all {pendingBookings.length} pending bookings →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Today's Bookings Tab */}
            <TabsContent value="today" className="space-y-4">
              {todayBookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No bookings for today</p>
                  <p className="text-sm text-gray-400">Enjoy your free time!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todayBookings.map((booking) => (
                    <Card key={booking.id} className="border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <div>
                                <p className="font-medium">
                                  {booking.startTime} - {booking.endTime}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {booking.service.name} • {booking.customer.name}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Phone className="h-3 w-3" />
                                {booking.customer.phone || 'No phone'}
                              </div>
                              <div className="font-semibold text-green-600">
                                {formatPrice(booking.totalPrice)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <StatusBadge status={booking.status} />
                            <QuickStatusActions 
                              bookingId={booking.id}
                              currentStatus={booking.status}
                              compact={true}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Confirmed Bookings Tab */}
            <TabsContent value="confirmed" className="space-y-4">
              {confirmedBookings.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No confirmed bookings</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {confirmedBookings.slice(0, 10).map((booking) => (
                    <Card key={booking.id} className="border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Scissors className="h-4 w-4 text-green-600" />
                              <div>
                                <p className="font-medium">{booking.service.name}</p>
                                <p className="text-sm text-gray-600">
                                  {booking.customer.name} • #{booking.id.slice(-8)}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(booking.appointmentDate)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {booking.startTime}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <StatusBadge status={booking.status} />
                            <QuickStatusActions 
                              bookingId={booking.id}
                              currentStatus={booking.status}
                              compact={true}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {confirmedBookings.length > 10 && (
                    <div className="text-center">
                      <Link 
                        href="/bookings"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View all {confirmedBookings.length} confirmed bookings →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* All Bookings Tab */}
            <TabsContent value="all" className="space-y-4">
              <div className="space-y-3">
                {allBookings.slice(0, 15).map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Scissors className="h-4 w-4 text-amber-600" />
                            <div>
                              <p className="font-medium">{booking.service.name}</p>
                              <p className="text-sm text-gray-600">
                                {booking.customer.name} • #{booking.id.slice(-8)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(booking.appointmentDate)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {booking.startTime}
                            </div>
                            <div className="font-semibold text-green-600">
                              {formatPrice(booking.totalPrice)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <StatusBadge status={booking.status} />
                          <BookingStatusActions 
                            bookingId={booking.id}
                            currentStatus={booking.status}
                            isAdmin={true}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {allBookings.length > 15 && (
                  <div className="text-center">
                    <Link 
                      href="/bookings"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View all bookings →
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link 
              href="/services"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 text-sm"
            >
              <Scissors className="h-4 w-4" />
              Manage Services
            </Link>
            <Link 
              href="/admin/schedule"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 text-sm"
            >
              <Calendar className="h-4 w-4" />
              Working Hours
            </Link>
            <Link 
              href="/admin/reports"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 text-sm"
            >
              <TrendingUp className="h-4 w-4" />
              View Reports
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                {stats.thisWeek} new bookings this week
              </p>
              <p className="text-gray-600">
                {stats.pending} bookings need attention
              </p>
              <p className="text-gray-600">
                {stats.todayBookings} appointments today
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Contact Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3 text-gray-400" />
              <span>+234 XXX XXX XXXX</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3 text-gray-400" />
              <span>admin@yourbarber.com</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AdminBookingDashboardPage() {
  return (
    <Suspense fallback={<BookingDashboardSkeleton />}>
      <AdminBookingDashboard />
    </Suspense>
  )
}