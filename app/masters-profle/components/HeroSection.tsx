"use client"

import Image from "next/image"
import { Award, Clock, Users, Star, Calendar, Play, Trophy, Scissors, MapPin, Phone, Zap, Flame, Crown, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface HeroSectionProps {
  onBookNow?: () => void
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [spotsLeft, setSpotsLeft] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    const spotsTimer = setInterval(() => {
      setSpotsLeft(prev => prev > 1 ? prev - 1 : Math.floor(Math.random() * 3) + 1)
    }, 15000)
    
    return () => {
      clearInterval(timer)
      clearInterval(spotsTimer)
    }
  }, [])

  const isOpen = currentTime.getHours() >= 9 && currentTime.getHours() < 19

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-8">
          {/* Enhanced Content */}
          <div className="space-y-8">
            {/* Urgency Banner */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-4 border border-red-500/30 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-white animate-bounce" />
                  <span className="font-bold text-sm">🔥 LIMITED SPOTS TODAY</span>
                </div>
                <div className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                  Only {spotsLeft} left!
                </div>
              </div>
            </div>

            {/* Enhanced Title + Badge */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg animate-spin-slow">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="text-amber-400 font-bold text-lg">MASTER CRAFTSMAN</span>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-sm text-gray-300 ml-2">(847 reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
                  Transform Your
                  <span className="block text-amber-400">LOOK TODAY</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 font-light">
                  Where legends are made, one cut at a time ✂️
                </p>
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-200 bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-6 rounded-xl border border-gray-600/30">
                <Sparkles className="w-5 h-5 text-amber-400 inline mr-2" />
                <strong>15+ years</strong> of crafting confidence. Join over <strong>5,000+ satisfied clients</strong> who've experienced the Marcus difference. This isn't just a haircut—it's your moment to shine.
              </p>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-4 border border-amber-500/30 text-center group hover:scale-105 transition-transform">
                  <Clock className="w-6 h-6 text-amber-400 mx-auto mb-2 group-hover:rotate-12 transition-transform" />
                  <div className="text-2xl font-bold text-white">15+</div>
                  <div className="text-xs text-gray-300">Years Master</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/30 text-center group hover:scale-105 transition-transform">
                  <Users className="w-6 h-6 text-emerald-400 mx-auto mb-2 group-hover:bounce transition-transform" />
                  <div className="text-2xl font-bold text-white">5K+</div>
                  <div className="text-xs text-gray-300">Happy Clients</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 text-center group hover:scale-105 transition-transform">
                  <Star className="w-6 h-6 text-purple-400 mx-auto mb-2 group-hover:spin transition-transform" />
                  <div className="text-2xl font-bold text-white">4.9</div>
                  <div className="text-xs text-gray-300">Star Rating</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 text-center group hover:scale-105 transition-transform">
                  <Trophy className="w-6 h-6 text-blue-400 mx-auto mb-2 group-hover:bounce transition-transform" />
                  <div className="text-2xl font-bold text-white">2023</div>
                  <div className="text-xs text-gray-300">Best Barber</div>
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-4 bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-4 rounded-xl border border-gray-600/30">
              <div className={`w-3 h-3 rounded-full ${isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span className="font-medium">
                {isOpen ? '🟢 OPEN NOW - Book immediately!' : '🔴 Currently Closed'}
              </span>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Downtown Lagos</span>
                <Phone className="w-4 h-4 ml-2" />
                <span>+234 123 456 7890</span>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="space-y-4">
              <button
                onClick={onBookNow}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-amber-400/50"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <Calendar className="w-6 h-6" />
                  <span>BOOK YOUR TRANSFORMATION NOW</span>
                  <Zap className="w-6 h-6 animate-bounce" />
                </div>
                <div className="text-sm font-normal mt-1 opacity-90">
                  ⚡ Instant confirmation • Next available: Today 2:30 PM
                </div>
              </button>
              
              <div className="flex gap-4">
                <button className="flex-1 group border-2 border-gray-600 hover:border-amber-400 text-white hover:bg-amber-400/10 px-6 py-3 rounded-xl font-medium transition-all duration-300">
                  <div className="flex items-center justify-center gap-2">
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Watch Transformation</span>
                  </div>
                </button>
                <button className="flex-1 group border-2 border-gray-600 hover:border-emerald-400 text-white hover:bg-emerald-400/10 px-6 py-3 rounded-xl font-medium transition-all duration-300">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Client Reviews</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 opacity-80">
              <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-full border border-green-500/30">✓ Licensed Professional</span>
              <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">✓ Sanitized Tools</span>
              <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">✓ Premium Products</span>
              <span className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full border border-orange-500/30">✓ Satisfaction Guaranteed</span>
            </div>
          </div>

          {/* Enhanced Image + Floating Stats */}
          <div className="relative">
            <div className="relative z-10 group">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/30 group-hover:border-amber-400/60 transition-all duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&crop=face"
                  alt="Marcus Thompson - Master Barber transforming lives"
                  width={600}
                  height={750}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Enhanced Floating Stats */}
              <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-white to-gray-100 rounded-2xl p-5 shadow-2xl border-4 border-amber-400/30 transform rotate-2 hover:rotate-0 transition-transform duration-300 animate-bounce-slow">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-2xl text-gray-800">2023</div>
                    <div className="text-sm text-gray-600 font-medium">City's Best Barber</div>
                    <div className="text-xs text-amber-600">🏆 Award Winner</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -right-8 bg-gradient-to-br from-white to-gray-100 rounded-2xl p-5 shadow-2xl border-4 border-emerald-400/30 transform -rotate-2 hover:rotate-0 transition-transform duration-300 animate-float">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Scissors className="w-6 h-6 text-white animate-spin-slow" />
                  </div>
                  <div>
                    <div className="font-black text-2xl text-gray-800">50K+</div>
                    <div className="text-sm text-gray-600 font-medium">Cuts Completed</div>
                    <div className="text-xs text-emerald-600">✂️ Master Level</div>
                  </div>
                </div>
              </div>

              {/* Live Booking Indicator */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                🔴 LIVE: {Math.floor(Math.random() * 12) + 3} people booking now
              </div>
            </div>

            {/* Enhanced Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-3xl rotate-6 -z-10 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl -rotate-6 -z-20 animate-pulse delay-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl rotate-3 -z-30 animate-pulse delay-2000"></div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50 lg:hidden">
        <button
          onClick={onBookNow}
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center animate-bounce border-4 border-white/30"
        >
          <Calendar className="w-7 h-7" />
        </button>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </section>
  )
}