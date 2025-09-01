"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Star, CreditCard, Sparkles, Phone, ArrowRight, MapPin, Zap, Users, TrendingUp, CheckCircle, Timer, Crown, Flame, Target } from "lucide-react"

interface CTASectionProps {
  onBookNow?: () => void
}

export default function CTASection({ onBookNow }: CTASectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 30
  })
  
  const [bookedToday, setBookedToday] = useState(87)
  const [activeSlot, setActiveSlot] = useState(0)

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Simulate booking updates
  useEffect(() => {
    const bookingTimer = setInterval(() => {
      setBookedToday(prev => prev + Math.floor(Math.random() * 2))
    }, 8000)

    return () => clearInterval(bookingTimer)
  }, [])

  const benefits = [
    {
      icon: Zap,
      title: "Instant Confirmation",
      description: "Get confirmed in seconds with our smart booking system",
      color: "from-yellow-400 to-orange-500",
      glow: "shadow-yellow-500/50"
    },
    {
      icon: Crown,
      title: "VIP Treatment",
      description: "Premium experience with complimentary refreshments",
      color: "from-purple-400 to-pink-500",
      glow: "shadow-purple-500/50"
    },
    {
      icon: Target,
      title: "Perfect Results",
      description: "Guaranteed satisfaction or your money back",
      color: "from-emerald-400 to-teal-500",
      glow: "shadow-emerald-500/50"
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Pay online, in-store, or split payments available",
      color: "from-blue-400 to-indigo-500",
      glow: "shadow-blue-500/50"
    },
  ]

  const slots = [
    { day: "Today", time: "4:30 PM", available: true, popular: true, discount: "20% OFF" },
    { day: "Tomorrow", time: "10:00 AM", available: true, popular: false, discount: null },
    { day: "Friday", time: "2:15 PM", available: true, popular: true, discount: "15% OFF" },
    { day: "Saturday", time: "11:45 AM", available: false, popular: false, discount: null },
    { day: "Monday", time: "3:00 PM", available: true, popular: false, discount: "10% OFF" },
  ]

  const testimonialSnippets = [
    { name: "Marcus T.", text: "Best cut of my life!", rating: 5 },
    { name: "David L.", text: "Absolute perfection every time", rating: 5 },
    { name: "James R.", text: "Worth every penny", rating: 5 }
  ]

  const socialProof = [
    { metric: bookedToday, label: "Booked Today", icon: Calendar },
    { metric: "4.9", label: "Average Rating", icon: Star },
    { metric: "12K+", label: "Happy Clients", icon: Users },
    { metric: "98%", label: "Return Rate", icon: TrendingUp }
  ]

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-amber-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300 opacity-60"></div>
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-700 opacity-60"></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-orange-400 rounded-full animate-bounce delay-1000 opacity-60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Urgency Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-8 py-3 mb-4">
            <Flame className="w-5 h-5 text-red-400 animate-pulse" />
            <span className="font-bold text-red-300 tracking-wide">LIMITED TIME OFFER</span>
            <Flame className="w-5 h-5 text-red-400 animate-pulse" />
          </div>
          
          {/* Countdown Timer */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-xs text-slate-400 font-medium">HOURS</div>
            </div>
            <div className="text-2xl text-amber-400 animate-pulse">:</div>
            <div className="text-center">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-xs text-slate-400 font-medium">MINS</div>
            </div>
            <div className="text-2xl text-amber-400 animate-pulse">:</div>
            <div className="text-center">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-xs text-slate-400 font-medium">SECS</div>
            </div>
          </div>
          <p className="text-amber-300 font-semibold">⚡ 25% OFF your first premium cut expires soon!</p>
        </div>

        {/* Main Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-orange-300 mb-8 leading-tight">
            Your Transformation
            <br />
            <span className="text-4xl lg:text-6xl bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Awaits
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Join the elite circle of clients who demand nothing less than perfection. 
            Your next level starts with one click.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button
              onClick={onBookNow}
              className="group relative px-12 py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-lg rounded-2xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-400/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>BOOK NOW - SAVE 25%</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>
            
            <div className="flex items-center space-x-4">
              <a
                href="tel:5551234567"
                className="group px-8 py-4 border-2 border-slate-600 hover:border-amber-500 text-white hover:text-amber-300 font-bold rounded-xl transition-all duration-300 flex items-center space-x-3 hover:bg-slate-800/50"
              >
                <Phone className="w-5 h-5 group-hover:animate-pulse" />
                <span>Call Now</span>
              </a>
              <div className="text-slate-400 text-sm">
                or call<br />
                <span className="text-amber-400 font-bold">(555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Social Proof Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {socialProof.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-black text-white mb-1">{item.metric}</div>
                <div className="text-sm text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl transform group-hover:-rotate-1 transition-transform duration-300"></div>
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 group-hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20">
                <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-xl ${benefit.glow} group-hover:${benefit.glow}`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">{benefit.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Available Slots */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-slate-700/50">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-6 py-3 mb-6">
                <Timer className="w-5 h-5 text-red-400 animate-pulse" />
                <span className="font-bold text-red-300 tracking-wide">FILLING UP FAST</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200 mb-6">
                Secure Your Premium Slot
              </h3>
              <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
                Only {5 - Math.floor(Math.random() * 3)} premium slots left this week. Don't miss your chance to experience perfection.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
              {slots.map((slot, index) => (
                <div
                  key={index}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                    slot.available
                      ? `border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1`
                      : "border-slate-700 bg-slate-800/50 opacity-60 cursor-not-allowed"
                  }`}
                  onClick={() => slot.available && setActiveSlot(index)}
                >
                  {slot.popular && slot.available && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        POPULAR
                      </div>
                    </div>
                  )}
                  
                  {slot.discount && slot.available && (
                    <div className="absolute -top-2 right-2">
                      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {slot.discount}
                      </div>
                    </div>
                  )}

                  <div className={`text-center ${slot.available ? 'text-white' : 'text-slate-500'}`}>
                    <div className="font-bold text-lg mb-1">{slot.day}</div>
                    <div className="text-sm mb-2">{slot.time}</div>
                    <div className={`text-xs flex items-center justify-center space-x-1 ${
                      slot.available ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {slot.available ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          <span>Available</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          <span>Booked</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {slot.available && activeSlot === index && (
                    <div className="absolute inset-0 border-2 border-amber-400 rounded-2xl animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={onBookNow}
                className="group relative px-12 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-lg rounded-xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-400/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>CLAIM YOUR SPOT NOW</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </button>
              <p className="text-slate-400 mt-4 text-sm">
                ⚡ Instant confirmation • 🔒 Secure booking • 💰 Best price guaranteed
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Ticker */}
        <div className="mb-16 overflow-hidden">
          <div className="flex items-center space-x-8 animate-marquee">
            {[...testimonialSnippets, ...testimonialSnippets].map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 min-w-[250px]">
                <div className="flex items-center space-x-2 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white font-medium text-sm mb-2">"{testimonial.text}"</p>
                <p className="text-slate-400 text-xs">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: MapPin, title: "Premium Location", info: "123 Main St, Downtown", subtext: "Luxury district" },
            { icon: Phone, title: "Instant Booking", info: "(555) 123-4567", subtext: "Available 24/7" },
            { icon: Clock, title: "Flexible Hours", info: "Mon-Sat 8AM-9PM", subtext: "Sunday by appointment" }
          ].map((contact, index) => (
            <div key={index} className="group text-center p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <contact.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-bold mb-2 group-hover:text-amber-300 transition-colors">{contact.title}</h4>
              <p className="text-amber-400 font-semibold mb-1">{contact.info}</p>
              <p className="text-slate-400 text-sm">{contact.subtext}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-300 mb-6 text-lg">
            Don't let this opportunity slip away. Your best look is just one appointment away.
          </p>
          <div className="inline-flex items-center space-x-2 text-amber-400 text-sm animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Join {bookedToday}+ satisfied clients who booked today</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%) }
          100% { transform: translateX(-50%) }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  )
}