import { useState } from "react"
import { Copy, Check, Scissors, Phone, Mail } from "lucide-react"
import { confirmPaymentAndSendEmails, confirmPaymentManual } from "@/lib/actions/enhanced-create-booking"
import { toast } from "sonner" 

type SimpleCashappBannerProps = {
  serviceName: string
  servicePrice: string
  bookingId: string
  onCompleteBookingAction?: () => Promise<void>
  isProcessing?: boolean
}

export default function SimpleCashappBanner({ 
  serviceName, 
  servicePrice, 
  bookingId,
  onCompleteBookingAction,
  isProcessing = false
}: SimpleCashappBannerProps) {
  const [copied, setCopied] = useState(false)
  const [processing, setProcessing] = useState(false)
  
  const cashTag = "$HairCutzStudio"
  const displayName = "Hair Cutz Studio"
  
  const handleCopyTag = async () => {
    try {
      await navigator.clipboard.writeText(cashTag)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const handleCompleteBooking = async () => {
    try {
      setProcessing(true)
      console.log("Starting payment confirmation for booking:", bookingId)
      
      // Show processing toast
      toast.info("Your booking is being processed...")
      
      // First try the relations-based version
      let result = await confirmPaymentAndSendEmails(bookingId)
      
      // If relations don't work, try manual version
      if (result.error && result.error.includes("relation")) {
        console.log("Relations failed, trying manual approach...")
        result = await confirmPaymentManual(bookingId)
      }
      
      if (result.error) {
        console.error("Payment confirmation error:", result.error)
        toast.error(`Failed to confirm payment: ${result.error}`)
        return
      }

      if (result.warning) {
        console.warn("Payment confirmation warning:", result.warning)
        toast.warning(`Payment confirmed with warning: ${result.warning}`)
      } else {
        console.log("Payment confirmed and emails sent successfully!")
        toast.success("Payment confirmed! You should receive a confirmation email shortly.")
      }
      
      // Call the original callback if provided
      if (onCompleteBookingAction) {
        await onCompleteBookingAction()
      }
      
      // Redirect to success page
      setTimeout(() => {
        window.location.href = `/booking-processing?bookingId=${bookingId}`
      }, 2000)
      
    } catch (error) {
      console.error("Booking completion error:", error)
      toast.error("Something went wrong. Please contact support or try again.")
    } finally {
      setProcessing(false)
    }
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const imgElement = e.currentTarget
    const fallbackElement = imgElement.nextElementSibling as HTMLSpanElement | null
    
    imgElement.style.display = 'none'
    if (fallbackElement) {
      fallbackElement.style.display = 'block'
    }
  }

  return (
    <div className="max-w-lg mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-amber-700 mb-4">
          <Scissors className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Complete Your Booking</h2>
        </div>
        <p className="text-slate-600">Send payment to confirm your appointment</p>
      </div>

      {/* Service Summary Card */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
          <Scissors className="h-5 w-5" />
          Booking Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-amber-200">
            <span className="text-slate-700 font-medium">Service</span>
            <span className="font-bold text-slate-900">{serviceName}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-amber-200">
            <span className="text-slate-700 font-medium">Booking ID</span>
            <span className="font-mono text-sm text-slate-600">#{bookingId}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-700 font-medium">Total Amount</span>
            <span className="text-3xl font-bold text-green-600">{servicePrice}</span>
          </div>
        </div>
      </div>

      {/* Cash App Payment Card */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 shadow-lg">
        {/* Cash App Logo and Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow-md">
            <img 
              src="/Cashapp.jpg" 
              alt="Cash App" 
              className="w-8 h-8 rounded"
              onError={handleImageError}
            />
            <span 
              className="text-white font-bold text-sm hidden"
              style={{ display: 'none' }}
            >
              CA
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-800">Pay with Cash App</h3>
            <p className="text-green-700 text-sm">Instant & Secure Payment</p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="space-y-4">
          {/* Business Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-green-800">Send Payment To:</label>
            <div className="bg-white border-2 border-green-300 rounded-lg p-4 shadow-inner">
              <div className="font-bold text-xl text-slate-900">{displayName}</div>
            </div>
          </div>

          {/* Cash Tag */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-green-800">Cash App Tag:</label>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white border-2 border-green-300 rounded-lg p-4 shadow-inner">
                <span className="font-mono text-2xl font-bold text-green-700">{cashTag}</span>
              </div>
              <button
                onClick={handleCopyTag}
                className={`px-4 py-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-md ${
                  copied 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span className="hidden sm:inline">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2">Payment Instructions:</h4>
            <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
              <li>Open your Cash App and tap "Send"</li>
              <li>Enter the exact amount: <strong>{servicePrice}</strong></li>
              <li>Send to: <strong>{cashTag}</strong></li>
              <li>Add your booking ID #{bookingId} in the payment note</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Complete Booking Button */}
      <button
        onClick={handleCompleteBooking}
        disabled={processing || isProcessing}
        className={`w-full bg-gradient-to-r from-amber-600 via-amber-600 to-yellow-600 hover:from-amber-700 hover:via-amber-700 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
          (processing || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {(processing || isProcessing) ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing Payment Confirmation...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Scissors className="h-5 w-5" />
            <span>I've Sent Payment - Complete Booking</span>
          </div>
        )}
      </button>

      {/* Contact Info */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
        <p className="text-sm text-slate-600 mb-3">
          <strong>Need help?</strong> We'll contact you once payment is confirmed
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span>Support Available</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>Quick Response</span>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Secure Payment • Instant Confirmation</span>
        </div>
      </div>
    </div>
  )
}