"use client"

import React, { useState, useEffect } from "react"
import {
  MessageSquare,
  Star,
  Quote,
  Scissors,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Heart,
  Users,
  ThumbsUp,
  Award,
  Zap,
  Crown,
  TrendingUp,
  Camera,
  Play,
  CheckCircle,
  ArrowRight
} from "lucide-react"

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [autoPlay])

  const testimonials = [
    {
      id: 1,
      name: "David Chen",
      role: "Marketing Executive",
      company: "Tech Innovations Ltd",
      image: "/api/placeholder/100/100",
      rating: 5,
      date: "2 weeks ago",
      content: `Marcus transformed not just my hair, but my entire professional image. His attention to detail and understanding of what works for my face shape is incredible. I've been going to him for 2 years now, and every cut is consistently perfect.`,
      service: "Executive Cut & Style",
      gradient: "from-blue-500 to-indigo-600",
      bgGlow: "bg-blue-500/10",
      accent: "text-blue-400",
      visits: 24,
      transformation: "Professional Confidence Boost"
    },
    {
      id: 2,
      name: "James Rodriguez",
      role: "Software Engineer",
      company: "Digital Solutions",
      image: "/api/placeholder/100/100",
      rating: 5,
      date: "1 month ago",
      content: `I was skeptical about trying a new barber, but Marcus exceeded all expectations. His modern fade technique is flawless, and the online booking system made scheduling so convenient. The hot towel treatment was the perfect touch.`,
      service: "Modern Fade",
      gradient: "from-purple-500 to-pink-600",
      bgGlow: "bg-purple-500/10",
      accent: "text-purple-400",
      visits: 18,
      transformation: "Style Revolution"
    },
    {
      id: 3,
      name: "Michael Thompson",
      role: "Business Owner",
      company: "Thompson Enterprises",
      image: "/api/placeholder/100/100",
      rating: 5,
      date: "3 weeks ago",
      content: `Marcus is a true craftsman. His beard sculpting skills are unmatched—he created the perfect shape that complements my face perfectly. The atmosphere is professional yet relaxing.`,
      service: "Beard Sculpting",
      gradient: "from-emerald-500 to-teal-600",
      bgGlow: "bg-emerald-500/10",
      accent: "text-emerald-400",
      visits: 31,
      transformation: "Masculine Refinement"
    },
    {
      id: 4,
      name: "Robert Wilson",
      role: "Real Estate Agent",
      company: "Prime Properties",
      image: "/api/placeholder/100/100",
      rating: 5,
      date: "1 week ago",
      content: `As someone who meets clients daily, my appearance is crucial. Marcus understands this and always delivers a cut that looks professional and polished. His classic cut technique is perfect.`,
      service: "Classic Cut",
      gradient: "from-amber-500 to-orange-600",
      bgGlow: "bg-amber-500/10",
      accent: "text-amber-400",
      visits: 15,
      transformation: "Executive Presence"
    },
  ]

  const current = testimonials[currentTestimonial]

  const stats = [
    { number: "4.9/5", label: "Average Rating", icon: Star, gradient: "from-yellow-500 to-amber-600", count: "1,247 Reviews" },
    { number: "500+", label: "5-Star Reviews", icon: Heart, gradient: "from-rose-500 to-pink-600", count: "This Month" },
    { number: "98%", label: "Client Retention", icon: Users, gradient: "from-blue-500 to-indigo-600", count: "Yearly Average" },
    { number: "100%", label: "Satisfaction Rate", icon: ThumbsUp, gradient: "from-emerald-500 to-teal-600", count: "Guaranteed" },
  ]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-amber-600/5 to-orange-600/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-8 py-4 mb-8 hover:scale-105 transition-all duration-300">
            <Award className="w-6 h-6 text-blue-400 animate-pulse" />
            <span className="font-bold text-blue-300 tracking-wider text-sm uppercase">Client Success Stories</span>
            <Crown className="w-5 h-5 text-yellow-400" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-8 leading-tight">
            Transformation
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              Success Stories
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Real clients, real transformations, real stories. These testimonials represent the 
            <span className="text-blue-400 font-semibold"> trust and satisfaction</span> that drives my passion for 
            <span className="text-purple-400 font-semibold"> excellence</span>.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 lg:p-16 shadow-2xl border border-gray-700/50 mb-20 relative overflow-hidden transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient} opacity-5 animate-pulse`}></div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            
            {/* Enhanced Testimonial Content */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-gray-500 transition-all duration-300">
                      <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{current.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-1">
                      {current.name}
                    </h3>
                    <p className="text-gray-400 font-medium">{current.role}</p>
                    <p className="text-gray-500 text-sm">{current.company}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex space-x-1 mb-2">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current animate-pulse"
                        style={{animationDelay: `${i * 100}ms`}}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">{current.visits} visits</div>
                </div>
              </div>

              {/* Quote Section */}
              <div className="space-y-6 relative">
                <div className="relative">
                  <Quote className="w-12 h-12 text-blue-400 opacity-60 mb-4" />
                  <div className="absolute -top-2 -left-2 w-16 h-16 bg-blue-500/20 rounded-full animate-ping"></div>
                </div>
                
                <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed font-light italic relative">
                  "{current.content}"
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-700/50">
                  <div className={`flex items-center space-x-2 bg-gradient-to-r ${current.gradient} bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-600/30`}>
                    <Scissors className={`w-4 h-4 ${current.accent}`} />
                    <span className={`text-sm font-bold ${current.accent}`}>
                      {current.service}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${current.accent} mb-1`}>{current.transformation}</div>
                    <div className="text-xs text-gray-500">{current.date}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Before/After Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h4 className="text-2xl lg:text-3xl font-black text-white mb-4 flex items-center justify-center space-x-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <span>Transformation Result</span>
                </h4>
                <p className="text-gray-400">See the incredible difference</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center group">
                  <div className="aspect-square rounded-3xl overflow-hidden mb-4 shadow-2xl relative border-2 border-gray-700 group-hover:border-gray-500 transition-all duration-300">
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative">
                      <Camera className="w-12 h-12 text-gray-500" />
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        BEFORE
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    Before
                  </span>
                </div>
                
                <div className="text-center group relative">
                  <div className="aspect-square rounded-3xl overflow-hidden mb-4 shadow-2xl relative border-2 border-yellow-500/50 group-hover:border-yellow-400 transition-all duration-300">
                    <div className="w-full h-full bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center relative">
                      <Crown className="w-12 h-12 text-white" />
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>AFTER</span>
                      </div>
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl opacity-30 group-hover:opacity-50 animate-pulse blur-sm"></div>
                  </div>
                  <span className={`text-sm font-bold ${current.accent} uppercase tracking-wider`}>
                    After
                  </span>
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-black px-3 py-1 rounded-full animate-bounce">
                    WOW!
                  </div>
                </div>
              </div>

              {/* Transformation Metrics */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className={`text-2xl font-black ${current.accent} mb-1`}>+95%</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Confidence</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-black ${current.accent} mb-1`}>10/10</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Style Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <div className="flex items-center justify-center space-x-6 mt-12">
            <button
              onClick={() => {
                prevTestimonial()
                setAutoPlay(false)
              }}
              className="group w-14 h-14 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-gray-500/50 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </button>

            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTestimonial(index)
                    setAutoPlay(false)
                  }}
                  className={`relative transition-all duration-500 ${
                    index === currentTestimonial 
                      ? `w-12 h-4 bg-gradient-to-r ${current.gradient} rounded-full` 
                      : "w-4 h-4 bg-gray-600 hover:bg-gray-500 rounded-full hover:scale-125"
                  }`}
                >
                  {index === currentTestimonial && (
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                nextTestimonial()
                setAutoPlay(false)
              }}
              className="group w-14 h-14 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-gray-500/50 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </button>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/80 text-center hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Floating Particles */}
              {hoveredCard === index && (
                <div className="absolute inset-0 overflow-hidden">
                  {[1,2,3].map(i => (
                    <div 
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${stat.gradient} rounded-full animate-ping`}
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${i * 200}ms`
                      }}
                    ></div>
                  ))}
                </div>
              )}

              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className={`text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-3`}>
                  {stat.number}
                </div>
                
                <div className="text-white font-bold text-lg mb-2 group-hover:text-gray-200 transition-colors duration-300">
                  {stat.label}
                </div>
                
                <div className="text-gray-500 text-sm font-medium">
                  {stat.count}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Testimonials Grid */}
        <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
              What Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Clients Say</span>
            </h3>
            <p className="text-gray-400 text-lg">Join hundreds of satisfied clients who've experienced the transformation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="group bg-gray-800/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/80 hover:scale-105 transition-all duration-500 cursor-pointer relative overflow-hidden"
                onClick={() => setCurrentTestimonial(index)}
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-600 group-hover:border-gray-500 transition-all duration-300">
                      <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">{testimonial.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-black text-white group-hover:text-gray-200 transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 text-sm font-medium">{testimonial.role}</p>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300 line-clamp-3">
                    "{testimonial.content}"
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className={`${testimonial.bgGlow} ${testimonial.accent} px-3 py-1 rounded-full text-xs font-bold border border-gray-600/30`}>
                      {testimonial.service}
                    </span>
                    <div className="flex items-center space-x-2 text-gray-500 text-xs">
                      <TrendingUp className="w-3 h-3" />
                      <span>{testimonial.date}</span>
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 mt-4">
                    <button className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-white font-bold py-3 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300">
                      <span>View Full Story</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className={`text-center mt-20 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/30">
            <h3 className="text-3xl font-black text-white mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Experience the same level of transformation and satisfaction. Book your appointment today and become our next success story.
            </p>
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black px-12 py-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center space-x-2">
                <span>Book Your Transformation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )

  function nextTestimonial() {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  function prevTestimonial() {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }
}

export default TestimonialsSection