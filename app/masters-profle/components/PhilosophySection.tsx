// app/homepage/PhilosophySection.tsx
"use client"

import React, { useState, useEffect } from 'react'
import {
  Scissors,
  Heart,
  Sparkles,
  Clock,
  Lightbulb,
  Quote,
  User,
  ArrowRight,
  Star
} from "lucide-react"

export default function PhilosophySection() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const philosophyPoints = [
    {
      icon: Scissors,
      title: "Precision in Every Cut",
      description: "Every snip is deliberate, every line intentional. I believe that precision isn't just about technique—it's about understanding the unique canvas that is each client's face and hair.",
      color: "from-amber-500 to-orange-600",
      bgGlow: "bg-amber-50 hover:bg-amber-100",
      accent: "text-amber-600"
    },
    {
      icon: Heart,
      title: "Personal Connection",
      description: "Beyond the chair, we build relationships. I take time to understand not just your style preferences, but your lifestyle, profession, and personal story.",
      color: "from-rose-500 to-pink-600", 
      bgGlow: "bg-rose-50 hover:bg-rose-100",
      accent: "text-rose-600"
    },
    {
      icon: Sparkles,
      title: "Transformation Ritual",
      description: "A haircut isn't just maintenance—it's a transformation ritual. You leave not just looking better, but feeling more confident and ready to conquer your world.",
      color: "from-purple-500 to-indigo-600",
      bgGlow: "bg-purple-50 hover:bg-purple-100", 
      accent: "text-purple-600"
    },
    {
      icon: Clock,
      title: "Timeless Meets Modern",
      description: "I honor the traditional techniques passed down through generations while embracing modern tools and trends. The result is timeless style with contemporary edge.",
      color: "from-emerald-500 to-teal-600",
      bgGlow: "bg-emerald-50 hover:bg-emerald-100",
      accent: "text-emerald-600"
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Heading with Enhanced Animation */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-8 py-3 mb-8 hover:scale-105 transition-all duration-300">
            <Lightbulb className="w-6 h-6 text-amber-400 animate-pulse" />
            <span className="font-bold text-amber-300 tracking-wider text-sm uppercase">Master Craftsman Philosophy</span>
            <div className="flex space-x-1">
              {[1,2,3].map(i => (
                <Star key={i} className="w-3 h-3 text-amber-400 fill-current animate-pulse" style={{animationDelay: `${i * 200}ms`}} />
              ))}
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-8 leading-tight">
            The Art of
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              Transformation
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Where traditional barbering artistry meets modern innovation, creating experiences that don't just change your look—
            <span className="text-amber-400 font-semibold"> they transform your confidence.</span>
          </p>
        </div>

        {/* Enhanced Philosophy Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {philosophyPoints.map((point, index) => {
            const Icon = point.icon
            const isActive = activeCard === index
            
            return (
              <div 
                key={index} 
                className={`group cursor-pointer transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{transitionDelay: `${index * 200}ms`}}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-gray-700/50 hover:border-gray-600/80 transition-all duration-500 overflow-hidden ${isActive ? 'scale-105 shadow-2xl' : 'hover:scale-102'}`}>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${point.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  {/* Floating Particles */}
                  {isActive && (
                    <div className="absolute inset-0 overflow-hidden rounded-3xl">
                      {[1,2,3,4,5].map(i => (
                        <div 
                          key={i}
                          className={`absolute w-1 h-1 bg-gradient-to-r ${point.color} rounded-full animate-ping`}
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${i * 300}ms`,
                            animationDuration: '2s'
                          }}
                        ></div>
                      ))}
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start space-x-6 mb-6">
                      <div className="flex-shrink-0 relative">
                        <div className={`w-20 h-20 bg-gradient-to-br ${point.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                          <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                        {isActive && (
                          <div className={`absolute -inset-2 bg-gradient-to-br ${point.color} rounded-2xl opacity-30 animate-pulse`}></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:${point.accent} transition-all duration-300`}>
                          {point.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed text-lg flex-grow group-hover:text-gray-200 transition-colors duration-300">
                      {point.description}
                    </p>
                    
                    <div className={`flex items-center mt-6 ${point.accent} opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500`}>
                      <span className="font-semibold mr-2">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Enhanced Quote Section */}
        <div className={`transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative bg-gradient-to-r from-gray-800/80 via-gray-900/80 to-black/80 backdrop-blur-sm rounded-3xl p-10 lg:p-16 text-center overflow-hidden border border-gray-700/50">
            
            {/* Animated Quote Background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10">
              <div className="relative mb-8">
                <Quote className="w-16 h-16 mx-auto text-amber-400 opacity-80 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full animate-ping"></div>
                </div>
              </div>
              
              <blockquote className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300 mb-10 leading-tight">
                "I don't just cut hair. I craft 
                <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent"> confidence</span>, sculpt 
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"> style</span>, and create the foundation for your 
                <span className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent"> best self</span>."
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4 group cursor-pointer hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-30 group-hover:opacity-50 animate-pulse"></div>
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
                    Marcus Thompson
                  </div>
                  <div className="text-sm text-gray-400 font-medium tracking-wider">
                    MASTER BARBER & CRAFTSMAN
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}