"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Award,
  Users,
  Star,
  Heart,
  GraduationCap,
  Shield,
  Trophy,
  ShieldCheck,
  Calendar,
  Crown,
  Sparkles,
  Scissors,
  CheckCircle,
  TrendingUp,
  MapPin,
  Clock,
  Target,
  Zap,
  Medal,
  BookOpen,
  Coffee,
  Globe,
  Phone,
  Instagram,
  Facebook,
  ArrowRight,
  Verified
} from "lucide-react";

const TrustSignals = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      id: 1,
      number: "15+",
      label: "Years Experience",
      icon: Award,
      description: "Master craftsman with over a decade of expertise in precision cutting",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-500/20",
      detail: "Since 2008"
    },
    {
      id: 2,
      number: "12,500+",
      label: "Satisfied Clients",
      icon: Users,
      description: "Building lasting relationships through exceptional quality service",
      color: "from-blue-400 to-purple-500",
      bgColor: "bg-blue-500/20",
      detail: "Active Clients"
    },
    {
      id: 3,
      number: "4.98/5",
      label: "Average Rating",
      icon: Star,
      description: "Consistently excellent reviews across all major platforms",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-500/20",
      detail: "2,847 Reviews"
    },
    {
      id: 4,
      number: "97%",
      label: "Client Retention",
      icon: Heart,
      description: "Clients who return for regular appointments and refer friends",
      color: "from-pink-400 to-red-500",
      bgColor: "bg-pink-500/20",
      detail: "Monthly Return Rate"
    },
  ];

  const certifications = [
    {
      id: 1,
      name: "Master Barber Certification",
      issuer: "International Barber Association",
      year: "2019",
      icon: Award,
      level: "Master Level",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10"
    },
    {
      id: 2,
      name: "Advanced Fade Techniques",
      issuer: "Professional Barber Academy",
      year: "2021",
      icon: GraduationCap,
      level: "Expert Certified",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      id: 3,
      name: "Straight Razor Specialist",
      issuer: "Traditional Barbering Institute",
      year: "2020",
      icon: Shield,
      level: "Specialist",
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      id: 4,
      name: "Business Excellence Award",
      issuer: "Local Chamber of Commerce",
      year: "2023",
      icon: Trophy,
      level: "Gold Winner",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      id: 5,
      name: "Safety & Hygiene Certified",
      issuer: "Health Department",
      year: "2023",
      icon: ShieldCheck,
      level: "AAA+ Rating",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10"
    },
    {
      id: 6,
      name: "Customer Service Excellence",
      issuer: "Service Industry Association",
      year: "2022",
      icon: Crown,
      level: "Platinum",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10"
    },
  ];

  const partnerships = [
    {
      id: 1,
      name: "Wahl Professional",
      logo: "/Barber6.jpg",
      description: "Official partner for premium cutting tools and equipment",
      type: "Exclusive Partner",
      since: "2020"
    },
    {
      id: 2,
      name: "Layrite Pomade",
      logo: "/Barber7.jpg",
      description: "Authorized retailer of luxury grooming products",
      type: "Premium Dealer",
      since: "2019"
    },
    {
      id: 3,
      name: "Barber Network Pro",
      logo: "/Barber8.jpg",
      description: "Member of elite international barbering professionals",
      type: "Elite Member",
      since: "2021"
    },
  ];

  const achievements = [
    { icon: Medal, label: "City's Best Barber", year: "2023", color: "text-yellow-400" },
    { icon: Trophy, label: "Excellence in Service", year: "2022", color: "text-blue-400" },
    { icon: Crown, label: "Master Craftsman", year: "2021", color: "text-purple-400" },
    { icon: Star, label: "5-Star Business", year: "2020", color: "text-green-400" },
  ];

  const features = [
    {
      icon: Clock,
      title: "Punctual Service",
      description: "On-time appointments, every time"
    },
    {
      icon: Shield,
      title: "Health & Safety",
      description: "Highest hygiene standards maintained"
    },
    {
      icon: CheckCircle,
      title: "Quality Guarantee",
      description: "100% satisfaction or service redo"
    },
    {
      icon: Sparkles,
      title: "Premium Products",
      description: "Only the finest grooming products used"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm0 0c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Enhanced Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-8 border border-blue-500/30">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Trusted Excellence</span>
            <Verified className="w-5 h-5 text-blue-400" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-8">
            Why 12,500+ Clients Trust Us
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Built on years of dedication, continuous learning, and an unwavering commitment to craftsmanship. Every cut tells a story of excellence.
          </p>

          {/* Quick Stats Banner */}
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Downtown Location</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Mon-Sat 9AM-7PM</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Book 24/7 Online</span>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics with Animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`group relative transform transition-all duration-700 hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Icon Container */}
                <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <stat.icon size={32} className="text-white drop-shadow-sm" />
                </div>

                <div className="space-y-3 relative z-10">
                  <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.number}
                  </div>
                  <div className="font-bold text-xl text-white">
                    {stat.label}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {stat.description}
                  </p>
                  <div className="text-xs text-gray-400 font-medium bg-white/5 rounded-full px-3 py-1 inline-block">
                    {stat.detail}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.color} animate-pulse`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Certifications & Awards */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full mb-6 border border-yellow-400/30">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-300 font-medium">Professional Credentials</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Certified Excellence
            </h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Continuous education and professional development ensure the highest standards of service and cutting-edge techniques
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className={`group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 ${cert.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <cert.icon size={24} className={cert.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-white text-sm">
                        {cert.name}
                      </h4>
                      <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">
                        {cert.year}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">
                      {cert.issuer}
                    </p>
                    <span className={`text-xs ${cert.color} font-medium bg-white/5 px-2 py-1 rounded-full`}>
                      {cert.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Partnerships */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mb-6 border border-purple-500/30">
              <Globe className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300 font-medium">Industry Partnerships</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Trusted by Industry Leaders
            </h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Collaborating with the world's finest brands to bring you premium products and cutting-edge techniques
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnerships.map((partner, index) => (
              <div
                key={partner.id}
                className={`group bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 text-center transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-24 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 overflow-hidden group-hover:bg-white/20 transition-colors duration-300">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={80}
                    height={50}
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-white text-lg">
                    {partner.name}
                  </h4>
                  <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                    Since {partner.since}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  {partner.description}
                </p>
                <div className="text-xs text-yellow-400 font-medium bg-yellow-500/20 px-3 py-1 rounded-full inline-block">
                  {partner.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Features Grid */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What Makes Us Different
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Awards Showcase */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-white text-center mb-12">Recognition & Awards</h3>
          <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <achievement.icon className={`w-6 h-6 ${achievement.color} group-hover:scale-110 transition-transform duration-300`} />
                <div>
                  <div className="text-white font-medium text-sm">{achievement.label}</div>
                  <div className="text-gray-400 text-xs">{achievement.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Quality Guarantee */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 backdrop-blur-lg rounded-3xl p-12 md:p-16 border border-yellow-400/20 shadow-2xl relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-500/5"></div>
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <ShieldCheck size={40} className="text-white drop-shadow-sm" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6">
                100% Satisfaction Guarantee
              </h3>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
                Your satisfaction is our commitment. If you're not completely thrilled with your service, we'll make it right. That's our promise to you.
              </p>

              {/* Guarantee Features */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">Service Redo</h4>
                  <p className="text-sm text-gray-300">Free touch-up within 7 days</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">Care Promise</h4>
                  <p className="text-sm text-gray-300">Personal attention to every detail</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">Quality Assurance</h4>
                  <p className="text-sm text-gray-300">Consistently excellent results</p>
                </div>
              </div>

              {/* Action Button */}
              <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Experience the Difference</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>

              {/* Social Proof */}
              <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Instagram className="w-4 h-4" />
                  <span>45.2K followers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Facebook className="w-4 h-4" />
                  <span>12.8K fans</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>2,847 reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;