"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import CustomerInfoStep from "./customer-info-step"
import AppointmentTimeStep from "./appointment-time-step"
import ReviewStep from "./review-step"
import SimpleCashAppBanner from "../payment/simple-cashapp-banner"
import { createEnhancedBookingAction } from "@/lib/actions/enhanced-create-booking"
import { CustomerInfo, AppointmentTime } from "@/Types/booking-schema"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CreditCard, CheckCircle, User, AlertCircle } from "lucide-react"

type BookingStep = 'customer-info' | 'appointment-time' | 'review' | 'payment'

type Service = {
  id: string
  name: string
  description?: string | null
  price: string
  duration: number
  category?: string | null
  imageUrl?: string | null
}

type MultiStepBookingFormProps = {
  service: Service
}

export default function MultiStepBookingForm({ service }: MultiStepBookingFormProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [currentStep, setCurrentStep] = useState<BookingStep>('customer-info')
  const [isLoading, setIsLoading] = useState(false)
  const [bookingId, setBookingId] = useState<string>("")
  
  // Form data
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  
  const [appointmentTime, setAppointmentTime] = useState<AppointmentTime>({
    date: new Date(),
    time: "",
  })

  // Pre-fill form with user session data when available
  useEffect(() => {
    if (session?.user) {
      setCustomerInfo(prev => ({
        ...prev,
        name: session.user.name || prev.name,
        email: session.user.email || prev.email,
        // Don't override phone if user already filled it
      }))
    }
  }, [session])

  // Format price for display
  const formatPrice = (price: string) => {
    const priceValue = parseFloat(price)
    return new Intl.NumberFormat("en-NG", {
      currency: "NGN",
      style: "currency",
    }).format(isNaN(priceValue) ? 0 : priceValue)
  }

  // Step navigation
  const handleCustomerInfoNext = (data: CustomerInfo) => {
    setCustomerInfo(data)
    setCurrentStep('appointment-time')
  }

  const handleAppointmentTimeNext = (data: AppointmentTime) => {
    setAppointmentTime(data)
    setCurrentStep('review')
  }

  const handleReviewNext = async () => {
    // Check if user is authenticated
    if (status === 'loading') {
      toast.error("Please wait while we verify your session...")
      return
    }

    if (!session?.user?.id) {
      toast.error("You must be logged in to make a booking. Please log in and try again.")
      router.push('/login')
      return
    }

    setIsLoading(true)
    
    try {
      console.log('Creating booking with data:', {
        serviceId: service.id,
        customerInfo,
        appointmentTime,
        sessionUserId: session.user.id // This should be the database CUID2
      })

      const result = await createEnhancedBookingAction({
        serviceId: service.id,
        customerInfo,
        appointmentTime,
        sessionUserId: session.user.id // Pass the authenticated user's database ID
      })

      if (result.error) {
        toast.error(result.error)
        return
      }

      if (result.success && result.bookingId) {
        setBookingId(result.bookingId)
        toast.success("Booking created! Please complete payment to confirm.")
        setCurrentStep('payment')
      }
    } catch (error) {
      console.error('Booking creation error:', error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    switch (currentStep) {
      case 'appointment-time':
        setCurrentStep('customer-info')
        break
      case 'review':
        setCurrentStep('appointment-time')
        break
      case 'payment':
        setCurrentStep('review')
        break
      default:
        break
    }
  }

  // Complete booking after payment confirmation
  const handleCompleteBookingAction = async () => {
    if (!bookingId) {
      toast.error("Booking ID not found. Please try again.")
      return
    }

    // The SimpleCashAppBanner component will handle payment confirmation
    // and redirect to success page
    toast.success("Processing payment confirmation...")
  }

  // Step indicator
  const steps = [
    { id: 'customer-info', label: 'Your Info', icon: User },
    { id: 'appointment-time', label: 'Date & Time', icon: Calendar },
    { id: 'review', label: 'Review', icon: CheckCircle },
    { id: 'payment', label: 'Payment', icon: CreditCard },
  ]

  const currentStepIndex = steps.findIndex(step => step.id === currentStep)

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <div className="animate-pulse">
              <div className="h-8 bg-amber-200 rounded w-64 mb-2"></div>
              <div className="h-4 bg-amber-100 rounded w-96"></div>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
              <p className="mt-2 text-slate-600">Loading your session...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show authentication required message
  if (!session) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-2xl text-slate-800">{service.name}</CardTitle>
                {service.description && (
                  <p className="text-slate-600">{service.description}</p>
                )}
                {service.category && (
                  <Badge variant="secondary" className="w-fit">
                    {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                  </Badge>
                )}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-amber-700">{formatPrice(service.price)}</div>
                <div className="text-sm text-slate-600">{service.duration} minutes</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <AlertCircle className="h-6 w-6" />
              Login Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 mb-6">
              You need to be logged in to make a booking. Please log in to continue.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => router.push('/login')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Login to Continue
              </button>
              <button 
                onClick={() => router.push('/services')}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Back to Services
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Service Header */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl text-slate-800">{service.name}</CardTitle>
              {service.description && (
                <p className="text-slate-600">{service.description}</p>
              )}
              {service.category && (
                <Badge variant="secondary" className="w-fit">
                  {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                </Badge>
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-amber-700">{formatPrice(service.price)}</div>
              <div className="text-sm text-slate-600">{service.duration} minutes</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* User Info Display */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium">
              Logged in as: {session.user.name || session.user.email}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Step Indicator */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = index < currentStepIndex
              const isDisabled = index > currentStepIndex

              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex flex-col items-center ${isDisabled ? 'opacity-50' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      isActive 
                        ? 'bg-amber-600 border-amber-600 text-white' 
                        : isCompleted
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-xs mt-1 font-medium ${
                      isActive ? 'text-amber-600' : isCompleted ? 'text-green-600' : 'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      index < currentStepIndex ? 'bg-green-600' : 'bg-slate-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <div className="min-h-[500px]">
        {currentStep === 'customer-info' && (
          <CustomerInfoStep
            initialData={customerInfo}
            onNextAction={handleCustomerInfoNext}
            isLoading={isLoading}
          />
        )}

        {currentStep === 'appointment-time' && (
          <AppointmentTimeStep
            serviceDuration={service.duration}
            initialData={appointmentTime}
            onNextAction={handleAppointmentTimeNext}
            onBackAction={handleBack}
            isLoading={isLoading}
          />
        )}

        {currentStep === 'review' && (
          <ReviewStep
            customerInfo={customerInfo}
            appointmentTime={appointmentTime}
            serviceName={service.name}
            servicePrice={formatPrice(service.price)}
            serviceDuration={service.duration}
            serviceCategory={service.category || undefined}
            onNextAction={handleReviewNext}
            onBackAction={handleBack}
            isLoading={isLoading}
          />
        )}

        {currentStep === 'payment' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <CreditCard className="h-6 w-6 text-amber-600" />
                Payment & Confirmation
              </CardTitle>
              <p className="text-slate-600 mt-2">
                Complete your payment to finalize the booking. You'll receive email confirmations once processed.
              </p>
            </CardHeader>
            <CardContent>
              <SimpleCashAppBanner
                bookingId={bookingId}
                serviceName={service.name}
                servicePrice={formatPrice(service.price)}
                onCompleteBookingAction={handleCompleteBookingAction}
                isProcessing={isLoading}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}