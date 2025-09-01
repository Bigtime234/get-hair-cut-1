"use client"

import { useState } from "react"
import Image from "next/image"
import { Shield, Check, Users, GraduationCap, Crown, MapPin, Trophy, Heart, Lightbulb, Award, Calendar, Star, Sparkles, ChevronRight } from "lucide-react"

export default function CredentialsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('certifications')

  const certifications = [
    {
      title: "Master Barber Certification",
      issuer: "International Barber Institute",
      year: "2018",
      description: "Advanced certification in traditional and modern barbering techniques",
      badge: "/Barber3.jpg",
      verified: true,
      prestige: "Elite",
      rarity: "Top 5%"
    },
    {
      title: "Straight Razor Specialist",
      issuer: "Classic Shaving Academy",
      year: "2016",
      description: "Specialized training in traditional straight razor techniques and safety",
      badge: "/Barber7.jpg",
      verified: true,
      prestige: "Master",
      rarity: "Top 10%"
    },
    {
      title: "Advanced Hair Design",
      issuer: "Metropolitan Beauty Institute",
      year: "2019",
      description: "Contemporary styling techniques and trend analysis certification",
      badge: "/Barber8.jpg",
      verified: true,
      prestige: "Expert",
      rarity: "Top 15%"
    },
    {
      title: "Business Excellence Award",
      issuer: "City Chamber of Commerce",
      year: "2023",
      description: "Recognition for outstanding customer service and business practices",
      badge: "/Barber9.jpg",
      verified: true,
      prestige: "Distinguished",
      rarity: "Top 3%"
    },
  ]

  const affiliations = [
    { name: "Professional Barbers Association", role: "Senior Member", since: "2015", icon: Users, color: "from-blue-500 to-blue-600" },
    { name: "International Grooming Council", role: "Certified Instructor", since: "2020", icon: GraduationCap, color: "from-purple-500 to-purple-600" },
    { name: "Master Craftsmen Guild", role: "Board Member", since: "2021", icon: Crown, color: "from-amber-500 to-amber-600" },
    { name: "Local Business Alliance", role: "Community Ambassador", since: "2019", icon: MapPin, color: "from-emerald-500 to-emerald-600" },
  ]

  const achievements = [
    { title: "Best Barber in the City", source: "Metro Style Magazine", year: "2023", icon: Trophy, gradient: "from-yellow-400 to-orange-500" },
    { title: "Customer Choice Award", source: "Local Business Review", year: "2022", icon: Heart, gradient: "from-pink-400 to-red-500" },
    { title: "Innovation in Service", source: "Barber Industry Journal", year: "2021", icon: Lightbulb, gradient: "from-blue-400 to-indigo-500" },
    { title: "Community Service Recognition", source: "City Council", year: "2020", icon: Award, gradient: "from-purple-400 to-purple-600" },
  ]

  const trustStats = [
    { number: "15+", label: "Years Licensed", icon: Calendar, color: "text-blue-600" },
    { number: "12", label: "Certifications", icon: Award, color: "text-purple-600" },
    { number: "4", label: "Professional Bodies", icon: Users, color: "text-emerald-600" },
    { number: "100%", label: "Insured & Bonded", icon: Shield, color: "text-amber-600" },
  ]

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-8 py-3 mb-8">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="font-semibold text-amber-300 tracking-wide">CREDENTIALS & MASTERY</span>
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-orange-300 mb-8 leading-tight">
            Proven Excellence
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Decades of mastery backed by elite certifications, industry recognition, and an unwavering commitment to the ancient art of barbering.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50">
            {['certifications', 'affiliations', 'achievements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer"
                onMouseEnter={() => setHoveredCard(`cert-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Prestige Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                    {cert.prestige}
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-2xl overflow-hidden ring-4 transition-all duration-300 ${
                      hoveredCard === `cert-${index}` ? 'ring-amber-400 scale-110' : 'ring-slate-600'
                    }`}>
                      <Image src={cert.badge} alt={cert.title} width={80} height={80} className="object-cover" />
                    </div>
                    {cert.verified && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {cert.title}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-amber-400 font-semibold mb-2">{cert.issuer}</p>
                    <p className="text-slate-300 text-sm mb-3 leading-relaxed">{cert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Earned {cert.year}</span>
                      <span className="bg-slate-700/50 text-amber-300 px-2 py-1 rounded-lg text-xs font-medium">
                        {cert.rarity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Affiliations Tab */}
        {activeTab === 'affiliations' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {affiliations.map((aff, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700/50 hover:border-amber-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${aff.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <aff.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">{aff.name}</h4>
                <p className="text-amber-400 font-semibold text-sm mb-2">{aff.role}</p>
                <p className="text-slate-400 text-xs">Member Since {aff.since}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight className="w-5 h-5 text-amber-400 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {achievements.map((ach, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${ach.gradient} rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 overflow-hidden`}
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700 delay-100"></div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <ach.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Sparkles className="w-5 h-5 text-white animate-pulse" />
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold tracking-wide">
                        {ach.year}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-2xl font-black mb-3 group-hover:scale-105 transition-transform duration-300">
                    {ach.title}
                  </h4>
                  <p className="text-white/90 font-medium text-lg">{ach.source}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trust Indicators - Always Visible */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-slate-700/50">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-6 py-2 mb-6">
                <Shield className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-amber-300 tracking-wide">TRUST & EXCELLENCE</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200 mb-4">
                Why 10,000+ Clients Choose Me
              </h3>
              <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
                These aren't just numbers—they're a testament to decades of dedication, continuous learning, and an obsession with perfection.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {trustStats.map((stat, index) => (
                <div
                  key={index}
                  className="group text-center transform hover:-translate-y-2 transition-all duration-300"
                  onMouseEnter={() => setHoveredCard(`stat-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    hoveredCard === `stat-${index}`
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl shadow-amber-500/50 scale-110'
                      : 'bg-gradient-to-br from-slate-700 to-slate-800 shadow-xl'
                  }`}>
                    <stat.icon className={`w-8 h-8 transition-colors duration-300 ${
                      hoveredCard === `stat-${index}` ? 'text-white' : stat.color
                    }`} />
                  </div>
                  <div className={`text-4xl lg:text-5xl font-black mb-2 transition-all duration-300 ${
                    hoveredCard === `stat-${index}`
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 scale-110'
                      : 'text-white'
                  }`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm font-medium transition-colors duration-300 ${
                    hoveredCard === `stat-${index}` ? 'text-amber-300' : 'text-slate-400'
                  }`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold px-12 py-4 rounded-2xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-400/40 transition-all duration-300 cursor-pointer group">
            <Trophy className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-lg tracking-wide">BOOK WITH A MASTER</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
          <p className="text-slate-400 mt-4 text-sm">
            Join thousands of satisfied clients who trust in proven excellence
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-0"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-300"></div>
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-700"></div>
    </section>
  )
}