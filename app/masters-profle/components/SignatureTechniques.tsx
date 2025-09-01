// app/homepage/SignatureTechniques.tsx
"use client"

import React, { useState, useEffect } from "react"
import {
  Scissors,
  Zap,
  Paintbrush,
  Flame,
  Sparkles,
  Clock,
  Wrench,
  Calendar,
  Play,
  MessageCircle,
  Droplets,
  Star,
  Award,
  ChevronRight,
  Eye,
  Timer,
  Crown
} from "lucide-react"

export default function SignatureTechniques() {
  const [activeTab, setActiveTab] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredProcess, setHoveredProcess] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const techniques = [
    {
      id: "classic-cuts",
      name: "Classic Cuts",
      icon: Scissors,
      description: "Timeless styles that never go out of fashion, executed with precision and attention to detail.",
      longDescription: `Master the art of classic barbering with techniques passed down through generations. From the perfect pompadour to the distinguished side part, every classic cut requires understanding of hair growth patterns, face shapes, and styling preferences.\n\nUsing traditional tools like straight razors and quality shears, I create clean lines and perfect proportions that enhance your natural features while maintaining that timeless appeal that looks as good today as it did decades ago.`,
      image: "/api/placeholder/600/400",
      tools: ["Straight Razor", "Professional Shears", "Fine-tooth Comb", "Premium Pomade"],
      duration: "45-60 minutes",
      price: "From ₦30,000",
      gradient: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      accentColor: "text-amber-600",
      borderColor: "border-amber-200",
      specialty: "Traditional Excellence"
    },
    {
      id: "modern-fades",
      name: "Modern Fades",
      icon: Zap,
      description: "Contemporary fade techniques that blend seamlessly from skin to length with mathematical precision.",
      longDescription: `Modern fades require technical precision and artistic vision. Whether it's a low, mid, or high fade, each transition must be perfectly blended to create that seamless gradient effect.\n\nI use advanced clipper techniques, multiple guard sizes, and careful blending methods to achieve fades that look sharp immediately and grow out naturally. The key is understanding how different hair types respond to various cutting angles and techniques.`,
      image: "/api/placeholder/600/400",
      tools: ["Professional Clippers", "Multiple Guards", "Blending Shears", "Texturizing Tools"],
      duration: "30-45 minutes",
      price: "From ₦25,000",
      gradient: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      accentColor: "text-blue-600",
      borderColor: "border-blue-200",
      specialty: "Precision Artistry"
    },
    {
      id: "beard-sculpting",
      name: "Beard Sculpting",
      icon: Paintbrush,
      description: "Precision beard shaping that complements your facial structure and personal style.",
      longDescription: `Beard sculpting is an art form that requires understanding facial geometry, hair growth patterns, and personal style preferences. It's not just about trimming—it's about creating a masterpiece that enhances your masculine features.\n\nFrom defining sharp lines to creating natural-looking gradients, every beard tells a story. I work with your natural growth patterns while correcting asymmetries and creating the perfect frame for your face.`,
      image: "/api/placeholder/600/400",
      tools: ["Precision Trimmers", "Straight Edge", "Beard Oil", "Styling Balm"],
      duration: "20-30 minutes",
      price: "From ₦20,000",
      gradient: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      accentColor: "text-emerald-600",
      borderColor: "border-emerald-200",
      specialty: "Masculine Refinement"
    },
    {
      id: "hot-towel-treatment",
      name: "Hot Towel Treatment",
      icon: Flame,
      description: "Luxurious hot towel service that opens pores and prepares skin for the perfect shave.",
      longDescription: `The hot towel treatment is where luxury meets functionality. This traditional service opens pores, softens facial hair, and prepares your skin for the closest, most comfortable shave possible.\n\nUsing premium towels heated to the perfect temperature and infused with essential oils, this treatment not only enhances the shaving experience but provides a moment of relaxation and rejuvenation in your busy day.`,
      image: "/api/placeholder/600/400",
      tools: ["Premium Towels", "Essential Oils", "Hot Towel Warmer", "Pre-shave Oil"],
      duration: "10-15 minutes",
      price: "From ₦15,000",
      gradient: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-50",
      accentColor: "text-rose-600",
      borderColor: "border-rose-200",
      specialty: "Luxury Experience"
    },
  ]

  const currentTechnique = techniques[activeTab]

  const processSteps = [
    {
      step: "01",
      title: "Consultation & Analysis",
      description: "We discuss your style goals, face shape, lifestyle and perform detailed hair analysis to determine the perfect approach for your unique features.",
      icon: MessageCircle,
      color: "from-purple-500 to-indigo-600"
    },
    {
      step: "02",
      title: "Premium Preparation",
      description: "Hair is washed with luxury products, conditioned, and prepared using specialized treatments for optimal cutting results.",
      icon: Droplets,
      color: "from-cyan-500 to-blue-600"
    },
    {
      step: "03",
      title: "Masterful Execution",
      description: "The technique is performed with surgical precision, artistic vision, and years of expertise to create your perfect look.",
      icon: Scissors,
      color: "from-amber-500 to-orange-600"
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-slate-800 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-600/10 to-orange-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-emerald-600/5 to-teal-600/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-8 py-4 mb-8 hover:scale-105 transition-all duration-300">
            <Award className="w-6 h-6 text-amber-400 animate-pulse" />
            <span className="font-bold text-amber-300 tracking-wider text-sm uppercase">Signature Techniques</span>
            <Crown className="w-5 h-5 text-amber-400" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-8 leading-tight">
            Mastery in
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Every Method
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Years of dedication have refined these signature techniques. Each method represents a perfect blend of 
            <span className="text-amber-400 font-semibold"> traditional craftsmanship</span> and 
            <span className="text-blue-400 font-semibold"> modern innovation</span>.
          </p>
        </div>

        {/* Enhanced Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-16 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {techniques.map((technique, index) => (
            <button
              key={technique.id}
              onClick={() => setActiveTab(index)}
              className={`group relative flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all duration-500 overflow-hidden ${
                activeTab === index
                  ? `bg-gradient-to-r ${technique.gradient} text-white shadow-2xl scale-110 shadow-${technique.accentColor.split('-')[1]}-500/50`
                  : "bg-gray-800/50 backdrop-blur-sm text-gray-300 border border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600/50 hover:scale-105"
              }`}
            >
              {activeTab === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
              )}
              <technique.icon className={`w-6 h-6 relative z-10 ${activeTab === index ? 'animate-pulse' : 'group-hover:scale-110'} transition-transform duration-300`} />
              <span className="relative z-10">{technique.name}</span>
              {activeTab === index && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              )}
            </button>
          ))}
        </div>

        {/* Enhanced Active Technique */}
        <div className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 lg:p-16 shadow-2xl border border-gray-700/50 mb-20 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Enhanced Image Section */}
            <div className="relative group">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative">
                {/* Placeholder for image */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <Eye className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg font-medium">{currentTechnique.name} Preview</p>
                  </div>
                </div>
                
                {/* Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Floating Action Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                  <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
              </div>

              {/* Enhanced Badges */}
              <div className="absolute top-6 right-6 space-y-3">
                <div className={`bg-gradient-to-r ${currentTechnique.gradient} text-white rounded-2xl px-6 py-3 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300`}>
                  <div className="font-black text-xl">{currentTechnique.price}</div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-xl">
                  <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">{currentTechnique.specialty}</div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6">
                <div className="bg-black/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <Timer className={`w-5 h-5 ${currentTechnique.accentColor} animate-pulse`} />
                    <span className="text-white font-bold">{currentTechnique.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Content */}
            <div className="space-y-10">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${currentTechnique.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <currentTechnique.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-black text-white mb-2">
                      {currentTechnique.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-gray-400 text-sm ml-2">Master Level</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {currentTechnique.description}
                </p>
                
                <div className="text-gray-400 leading-relaxed space-y-4">
                  {currentTechnique.longDescription.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Enhanced Tools Section */}
              <div>
                <h4 className="text-xl font-black text-white mb-6 flex items-center space-x-3">
                  <Wrench className={`w-6 h-6 ${currentTechnique.accentColor}`} />
                  <span>Professional Tools & Products</span>
                </h4>
                <div className="flex flex-wrap gap-3">
                  {currentTechnique.tools.map((tool, index) => (
                    <span
                      key={index}
                      className={`${currentTechnique.bgColor} ${currentTechnique.accentColor} px-4 py-2 rounded-full text-sm font-bold border ${currentTechnique.borderColor} hover:scale-110 transition-transform duration-300 cursor-pointer`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enhanced CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className={`group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r ${currentTechnique.gradient} text-white font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <Calendar className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Book This Service</span>
                </button>
                
                <button className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gray-800/50 border border-gray-600/50 font-bold text-gray-300 hover:bg-gray-700/50 hover:text-white hover:scale-105 transition-all duration-300">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Watch Technique</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Process Steps */}
        <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
              The <span className={`bg-gradient-to-r ${currentTechnique.gradient} bg-clip-text text-transparent`}>{currentTechnique.name}</span> Process
            </h3>
            <p className="text-gray-400 text-lg">Experience the journey from consultation to transformation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {processSteps.map((process, index) => (
              <div 
                key={index} 
                className="group text-center relative cursor-pointer"
                onMouseEnter={() => setHoveredProcess(index)}
                onMouseLeave={() => setHoveredProcess(null)}
              >
                <div className={`relative mb-8 transform transition-all duration-500 ${hoveredProcess === index ? 'scale-110' : 'hover:scale-105'}`}>
                  
                  {/* Main Icon Container */}
                  <div className={`w-24 h-24 bg-gradient-to-r ${process.color} rounded-3xl flex items-center justify-center mx-auto text-white shadow-2xl relative overflow-hidden`}>
                    <process.icon className="w-10 h-10 relative z-10" />
                    
                    {/* Animated Glow */}
                    {hoveredProcess === index && (
                      <div className="absolute inset-0 bg-white/20 animate-pulse rounded-3xl"></div>
                    )}
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 font-black text-sm shadow-lg border-4 border-gray-800">
                    {process.step}
                  </div>

                  {/* Connecting Line (except last item) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-700 to-gray-600 transform -translate-y-1/2"></div>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl lg:text-2xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                    {process.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {process.description}
                  </p>
                </div>

                {/* Hover Effect */}
                {hoveredProcess === index && (
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-800/20 to-transparent rounded-2xl pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}