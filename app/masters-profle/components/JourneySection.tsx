"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  MapPin,
  GraduationCap,
  Award,
  Store,
  Crown,
  Smartphone,
  Trophy,
  Calendar,
  Clock,
  Users,
  Scissors,
  Star,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  ChevronRight,
  Play,
  Pause
} from "lucide-react"

const JourneySection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [inView, setInView] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const timelineRef = useRef(null)

  const milestones = [
    {
      year: "2008",
      title: "The Humble Beginning",
      subtitle: "Where Legends Are Born",
      description:
        "Started as an apprentice at Classic Cuts, learning the sacred fundamentals of traditional barbering under master craftsman Robert Williams. Every master has their genesis.",
      icon: GraduationCap,
      image: "/Barber3.jpg",
      gradient: "from-blue-500 to-indigo-600",
      achievement: "Foundation Laid",
      metric: "1000+ Hours Training"
    },
    {
      year: "2012",
      title: "First Mastery Achieved",
      subtitle: "Skills Sharpened to Perfection",
      description:
        "Earned Advanced Barbering Certification from the International Barber Institute, specializing in classic cuts and straight razor techniques that separate masters from novices.",
      icon: Award,
      image: "/Barber7.jpg",
      gradient: "from-purple-500 to-pink-600",
      achievement: "Certified Expert",
      metric: "Top 10% Graduate"
    },
    {
      year: "2015",
      title: "Empire Building Begins",
      subtitle: "Vision Becomes Reality",
      description:
        "Launched Thompson's Barbershop with a revolutionary vision to blend traditional craftsmanship with modern luxury, setting new standards in the industry.",
      icon: Store,
      image: "/Barber8.jpg",
      gradient: "from-emerald-500 to-teal-600",
      achievement: "Business Pioneer",
      metric: "First Location Opened"
    },
    {
      year: "2018",
      title: "Master Status Unlocked",
      subtitle: "Elite Recognition Earned",
      description:
        "Achieved Master Barber status—a distinction held by less than 5% of barbers worldwide. Began mentoring the next generation while expanding premium services.",
      icon: Crown,
      image: "/Barber9.jpg",
      gradient: "from-amber-500 to-orange-600",
      achievement: "Master Craftsman",
      metric: "Top 5% Worldwide"
    },
    {
      year: "2021",
      title: "Digital Revolution Led",
      subtitle: "Innovation Meets Tradition",
      description:
        "Pioneered cutting-edge online booking and client management systems, making premium barbering more accessible while maintaining the personal touch.",
      icon: Smartphone,
      image: "/Barber8.jpg",
      gradient: "from-cyan-500 to-blue-600",
      achievement: "Tech Pioneer",
      metric: "500% Efficiency Boost"
    },
    {
      year: "2023",
      title: "City's Crowned Champion",
      subtitle: "Ultimate Recognition",
      description:
        "Awarded 'Best Barber in the City' by Metro Style Magazine, cementing a legacy of excellence and client satisfaction that speaks for itself.",
      icon: Trophy,
      image: "/Barber1.jpg",
      gradient: "from-yellow-500 to-red-500",
      achievement: "City Champion",
      metric: "10,000+ Satisfied Clients"
    },
  ]

  const stats = [
    { number: "15+", label: "Years Mastering", icon: Clock, color: "from-blue-400 to-blue-600" },
    { number: "12K+", label: "Lives Changed", icon: Users, color: "from-purple-400 to-purple-600" },
    { number: "75K+", label: "Perfect Cuts", icon: Scissors, color: "from-emerald-400 to-emerald-600" },
    { number: "4.98", label: "Perfect Rating", icon: Star, color: "from-amber-400 to-amber-600" },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % milestones.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, milestones.length])

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (timelineRef.current) {
      observer.observe(timelineRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Elements */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-8 py-3 mb-8">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="font-bold text-amber-300 tracking-wide">THE LEGENDARY JOURNEY</span>
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-orange-300 mb-8 leading-tight">
            From Apprentice
            <br />
            <span className="text-4xl lg:text-6xl bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              To Living Legend
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Every master craftsman has a story of dedication, sacrifice, and relentless pursuit of perfection. 
            This is mine—a journey that transformed passion into mastery.
          </p>
          
          {/* Journey Progress Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800/50 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000 ease-out"
                style={{ width: `${((activeIndex + 1) / milestones.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>2008</span>
              <span className="text-amber-400 font-semibold">Present Day</span>
            </div>
          </div>
        </div>

        {/* Interactive Timeline Controls */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 flex items-center space-x-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-semibold transition-all duration-300"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isAutoPlaying ? 'Pause' : 'Play'} Story</span>
            </button>
            <div className="flex space-x-2">
              {milestones.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-amber-400 scale-125'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Timeline Display */}
        <div ref={timelineRef} className="mb-20">
          <div className="relative">
            {/* Active Milestone Card */}
            <div className="max-w-5xl mx-auto">
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className={`absolute inset-0 bg-gradient-to-br ${milestones[activeIndex].gradient}`}></div>
                </div>
                
                <div className="relative p-8 lg:p-12">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${milestones[activeIndex].gradient} flex items-center justify-center shadow-lg`}>
                          {(() => {
                            const Icon = milestones[activeIndex].icon;
                            return <Icon className="w-8 h-8 text-white" />;
                          })()}
                        </div>
                        <div>
                          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-4 py-2">
                            <Calendar className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-300 font-bold text-lg">{milestones[activeIndex].year}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-3xl lg:text-4xl font-black text-white mb-2">
                          {milestones[activeIndex].title}
                        </h3>
                        <p className="text-xl text-amber-300 font-semibold mb-6">
                          {milestones[activeIndex].subtitle}
                        </p>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8">
                          {milestones[activeIndex].description}
                        </p>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 flex-1">
                          <div className="text-amber-400 font-bold text-sm mb-1">Achievement</div>
                          <div className="text-white font-semibold">{milestones[activeIndex].achievement}</div>
                        </div>
                        <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 flex-1">
                          <div className="text-amber-400 font-bold text-sm mb-1">Impact</div>
                          <div className="text-white font-semibold">{milestones[activeIndex].metric}</div>
                        </div>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${milestones[activeIndex].gradient} rounded-3xl blur-xl opacity-20`}></div>
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                          src={milestones[activeIndex].image}
                          alt={milestones[activeIndex].title}
                          width={600}
                          height={450}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Navigation */}
            <div className="flex justify-center mt-12">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50">
                <div className="grid grid-cols-6 gap-2">
                  {milestones.map((milestone, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveIndex(index)
                        setIsAutoPlaying(false)
                      }}
                      className={`group relative p-4 rounded-xl transition-all duration-300 ${
                        index === activeIndex
                          ? `bg-gradient-to-r ${milestone.gradient} text-white shadow-lg`
                          : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="text-center">
                        <milestone.icon className="w-6 h-6 mx-auto mb-2" />
                        <div className="text-xs font-bold">{milestone.year}</div>
                      </div>
                      {index === activeIndex && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-amber-400"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-slate-700/50">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full px-6 py-3 mb-6">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-emerald-300 tracking-wide">LEGENDARY NUMBERS</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200 mb-4">
                A Legacy Written in Excellence
              </h3>
              <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
                These aren't just statistics—they're proof of a relentless pursuit of perfection and a commitment to transforming lives, one cut at a time.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group text-center transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200 mb-2 group-hover:scale-105 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 font-medium group-hover:text-amber-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-black text-white mb-6">
              Ready to Be Part of This Legacy?
            </h3>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Join thousands who've experienced what true mastery looks like. 
              Your transformation story starts with your first appointment.
            </p>
            
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black px-12 py-4 rounded-2xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-400/40 transition-all duration-300 cursor-pointer group">
              <Target className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-lg tracking-wide">JOIN THE LEGACY</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
            
            <div className="flex items-center justify-center space-x-2 mt-6 text-slate-400 text-sm">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Be part of the next chapter in barbering excellence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JourneySection