import { Scissors, Phone, Mail, CheckCircle, Calendar } from "lucide-react"

type SimpleSuccessBannerProps = {
  serviceName: string
  servicePrice: string
  bookingId: string
  appointmentDate?: string
  appointmentTime?: string
}

export default function SimpleSuccessBanner({ 
  serviceName, 
  servicePrice, 
  bookingId,
  appointmentDate,
  appointmentTime
}: SimpleSuccessBannerProps) {

  return (
    <div className="max-w-lg mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div className="flex items-center justify-center gap-2 text-green-700 mb-4">
          <Scissors className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Booking Request Submitted!</h2>
        </div>
        <p className="text-slate-600">Your appointment request has been received and is being reviewed.</p>
      </div>

      {/* Service Summary Card */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
          <Scissors className="h-5 w-5" />
          Booking Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-green-200">
            <span className="text-slate-700 font-medium">Service</span>
            <span className="font-bold text-slate-900">{serviceName}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-green-200">
            <span className="text-slate-700 font-medium">Booking ID</span>
            <span className="font-mono text-sm text-slate-600">#{bookingId}</span>
          </div>
          {appointmentDate && (
            <div className="flex justify-between items-center py-2 border-b border-green-200">
              <span className="text-slate-700 font-medium">Date</span>
              <span className="font-semibold text-slate-900">{appointmentDate}</span>
            </div>
          )}
          {appointmentTime && (
            <div className="flex justify-between items-center py-2 border-b border-green-200">
              <span className="text-slate-700 font-medium">Time</span>
              <span className="font-semibold text-slate-900">{appointmentTime}</span>
            </div>
          )}
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-700 font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-green-600">{servicePrice}</span>
          </div>
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-800">Request Status: Pending</h3>
            <p className="text-blue-700 text-sm">Awaiting admin confirmation</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-amber-800 mb-2">What happens next:</h4>
          <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
            <li>Your appointment slot is being reviewed</li>
            <li>We'll contact you to confirm availability</li>
            <li>Payment will be made at the time of service</li>
            <li>Please keep your booking ID for reference</li>
          </ul>
        </div>

        <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Important reminders:</h4>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>Please arrive 5-10 minutes early for your appointment</li>
            <li>Bring a valid ID for verification</li>
            <li>Your slot will be confirmed shortly</li>
            <li>Check your email for updates</li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => window.location.href = '/bookings'}
          className="flex-1 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:via-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>View My Bookings</span>
          </div>
        </button>
        
        <button
          onClick={() => window.location.href = '/services'}
          className="flex-1 bg-gradient-to-r from-amber-600 via-amber-600 to-yellow-600 hover:from-amber-700 hover:via-amber-700 hover:to-yellow-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-center gap-2">
            <Scissors className="h-4 w-4" />
            <span>Book Another Service</span>
          </div>
        </button>
      </div>

      {/* Contact Info */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
        <p className="text-sm text-slate-600 mb-3">
          <strong>Questions about your booking?</strong> We're here to help!
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span>Quick Response</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>Email Support</span>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Request Submitted Successfully</span>
        </div>
      </div>
    </div>
  )
}