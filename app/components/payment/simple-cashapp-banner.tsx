import { useState } from "react"
import { Scissors, CheckCircle, Calendar, CreditCard, Loader2, ArrowRight, Copy, Check } from "lucide-react"

type CashAppPaymentBannerProps = {
  serviceName: string
  servicePrice: string
  bookingId: string
  appointmentDate?: string
  appointmentTime?: string
  onCompleteBookingAction?: () => Promise<void>
  isProcessing?: boolean   
}

export default function CashAppPaymentBanner({ 
  serviceName, 
  servicePrice, 
  bookingId,
  appointmentDate,
  appointmentTime,
  onCompleteBookingAction,
  isProcessing             
}: CashAppPaymentBannerProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyHandle = async () => {
    try {
      await navigator.clipboard.writeText('$haircutz')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      console.log('Clipboard not supported')
    }
  }

  const handlePaymentConfirmation = async () => {
    setIsConfirming(true)
    
    // Show loading for 3 seconds
    setTimeout(() => {
      window.location.href = '/bookings'
    }, 3000)
    
    if (onCompleteBookingAction) {
      await onCompleteBookingAction()
    }
  }

  return (
    <div className="max-w-lg mx-auto space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="text-center space-y-3 md:space-y-4">
        <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-3 md:mb-4 shadow-lg">
          <CreditCard className="h-5 w-5 md:h-8 md:w-8 text-white" />
        </div>
        <div className="flex items-center justify-center gap-2 text-slate-800 mb-3 md:mb-4">
          <Scissors className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
          <h2 className="text-xl md:text-2xl font-bold">Complete Your Payment</h2>
        </div>
        <p className="text-sm md:text-base text-slate-600">Send payment via CashApp to secure your booking</p>
      </div>

      {/* Service Summary Card */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-amber-800 mb-3 md:mb-4 flex items-center gap-2">
          <Scissors className="h-4 w-4 md:h-5 md:w-5" />
          Booking Summary
        </h3>
        <div className="space-y-2 md:space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-amber-200">
            <span className="text-sm md:text-base text-slate-700 font-medium">Service</span>
            <span className="text-sm md:text-base font-bold text-slate-900 truncate ml-2 max-w-[50%]">{serviceName}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-amber-200">
            <span className="text-sm md:text-base text-slate-700 font-medium">Booking ID</span>
            <span className="font-mono text-xs md:text-sm text-slate-600">#{bookingId}</span>
          </div>
          {appointmentDate && (
            <div className="flex justify-between items-center py-2 border-b border-amber-200">
              <span className="text-sm md:text-base text-slate-700 font-medium">Date</span>
              <span className="text-sm md:text-base font-semibold text-slate-900">{appointmentDate}</span>
            </div>
          )}
          {appointmentTime && (
            <div className="flex justify-between items-center py-2 border-b border-amber-200">
              <span className="text-sm md:text-base text-slate-700 font-medium">Time</span>
              <span className="text-sm md:text-base font-semibold text-slate-900">{appointmentTime}</span>
            </div>
          )}
          <div className="flex justify-between items-center py-2">
            <span className="text-sm md:text-base text-slate-700 font-medium">Total Amount</span>
            <span className="text-xl md:text-3xl font-bold text-green-600">{servicePrice}</span>
          </div>
        </div>
      </div>

      {/* CashApp Payment Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-xl md:rounded-2xl p-5 md:p-8 shadow-2xl border border-slate-700">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-emerald-500/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-green-500/10 rounded-full -mr-16 -mt-16 md:-mr-32 md:-mt-32 blur-3xl"></div>
        
        <div className="relative z-10 text-center space-y-5 md:space-y-8">
          {/* Header with CashApp Branding */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-5 md:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
              <CreditCard className="w-5 h-5 md:w-8 md:h-8 text-white" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-white">Pay with CashApp</h3>
              <p className="text-green-400 text-xs md:text-sm font-medium">Instant & Secure</p>
            </div>
          </div>

          {/* CashApp Handle Display */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl md:rounded-2xl p-5 md:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-3 md:mb-4">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-lg">$</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                <h4 className="text-2xl md:text-3xl font-black text-white tracking-wide">haircutz</h4>
                <button
                  onClick={handleCopyHandle}
                  className="flex items-center gap-1 md:gap-2 bg-slate-700/60 hover:bg-slate-600/60 border border-slate-600 text-slate-300 hover:text-white px-2 py-1 md:px-3 md:py-2 rounded-lg transition-all duration-200 hover:scale-105 text-xs md:text-sm"
                  title="Copy CashApp handle"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
                      <span className="font-medium text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="font-medium">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <p className="text-green-300 text-sm md:text-lg font-medium mb-2">Transfer {servicePrice} to this CashApp handle</p>
            <p className="text-green-200/80 text-xs md:text-sm">Secure payment processing • Instant confirmation</p>
            <div className="mt-4 md:mt-6 flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 text-xs md:text-sm">Active & Ready to Receive Payments</span>
            </div>
          </div>

          {/* Enhanced Payment Steps */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-600/50 rounded-xl p-4 md:p-6">
            <h4 className="text-white font-bold text-base md:text-lg mb-3 md:mb-4 flex items-center gap-2">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <ArrowRight className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
              </div>
              Quick Payment Steps
            </h4>
            <div className="grid gap-2 md:gap-4">
              <div className="flex items-center gap-3 p-2 md:p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">1</div>
                <span className="text-xs md:text-sm text-slate-300">Open CashApp & transfer <strong className="text-white">{servicePrice}</strong> to <strong className="text-green-400">$haircutz</strong></span>
              </div>
              <div className="flex items-center gap-3 p-2 md:p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">2</div>
                <span className="text-xs md:text-sm text-slate-300">Add booking reference: <strong className="text-white">#{bookingId}</strong> in payment note</span>
              </div>
              <div className="flex items-center gap-3 p-2 md:p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">3</div>
                <span className="text-xs md:text-sm text-slate-300">Click <strong className="text-green-400">"I Have Made Payment"</strong> below when complete</span>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 rounded-xl p-3 md:p-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs md:text-sm">💡</span>
              </div>
              <div className="text-left">
                <h4 className="text-amber-400 font-bold text-xs md:text-sm">Pro Tip</h4>
                <p className="text-amber-200 text-xs md:text-sm">Screenshot your payment confirmation for your records</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Button */}
      <div className="space-y-3 md:space-y-4">
        <button
          onClick={handlePaymentConfirmation}
          disabled={isConfirming || isProcessing}
          className={`w-full font-bold py-4 md:py-5 px-6 md:px-8 rounded-xl md:rounded-2xl text-white text-base md:text-lg transition-all duration-500 shadow-xl md:shadow-2xl relative overflow-hidden group ${
            isConfirming || isProcessing
              ? 'bg-slate-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 hover:shadow-green-500/25 hover:-translate-y-1 hover:scale-[1.02]'
          }`}
        >
          {/* Button Background Effect */}
          {!isConfirming && !isProcessing && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          )}
          
          <div className="relative flex items-center justify-center gap-2 md:gap-3">
            {isConfirming || isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 md:h-6 md:w-6 animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6 group-hover:animate-pulse" />
                <span>I Have Made Payment</span>
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </div>
        </button>

        <div className="text-center space-y-1 md:space-y-2">
          <p className="text-slate-600 text-xs md:text-sm font-medium">
            🚀 You'll be redirected to your bookings after confirmation
          </p>
          <div className="flex items-center justify-center gap-1 md:gap-2">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 md:p-6 text-center shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-sm md:text-lg">💬</span>
          </div>
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-sm md:text-base">Need Help?</p>
            <p className="text-slate-300 text-xs md:text-sm">We're here to assist you</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-xs md:text-sm">
          <div className="flex items-center gap-1 md:gap-2 text-green-400">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-ping"></div>
            <span className="font-medium">Live Support</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2 text-blue-400">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="font-medium">Instant Response</span>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 text-green-400 px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold backdrop-blur-sm shadow-lg">
          <div className="relative">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <span className="whitespace-nowrap">🔒 Bank-Level Security • SSL Encrypted</span>
        </div>
      </div>
    </div>
  )
}