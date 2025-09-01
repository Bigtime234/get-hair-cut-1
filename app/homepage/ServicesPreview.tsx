"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Zap,
  Crown,
  Minus,
  Target,
  Sparkles,
  Clock,
  Check,
  Calendar,
  ArrowRight,
  Star,
  Award,
  Shield,
  Flame,
  TrendingUp,
  Compass,
} from "lucide-react";

// Map service icon names to Lucide icons
const iconMap: Record<string, React.ElementType> = {
  Scissors,
  Zap,
  Crown,
  Minus,
  Target,
  Compass,
  Flame,
  Sparkles,
  Clock,
  Check,
  Calendar,
  ArrowRight,
  Star,
  Award,
  Shield,
  TrendingUp,
};

const ServicesPreview = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [visibleTechniques, setVisibleTechniques] = useState<number[]>([]);

  const services = [
    {
      id: 1,
      name: "Signature Fade",
      tagline: "The Perfect Blend",
      description: "Master-crafted precision fades that seamlessly transition from sharp to smooth. Our signature technique that's made us legendary.",
      icon: "Scissors",
      price: "From $65",
      originalPrice: "$85",
      duration: "50-65 min",
      features: ["Personal Consultation", "Precision Fade Cut", "Hot Towel Treatment", "Premium Styling", "Beard Trim"],
      popular: true,
      difficulty: "Master Level",
      bookings: "2,847 bookings",
      satisfaction: "99%",
      gradient: "from-amber-400 via-orange-500 to-red-500",
      bgPattern: "bg-gradient-to-br from-amber-50 to-orange-50",
      avatar: "/Barber1.jpg", // Next.js public path
    },
    {
      id: 2,
      name: "Beard Architecture",
      tagline: "Sculpted Perfection",
      description: "Transform your facial hair into a masterpiece with our advanced beard sculpting techniques and premium grooming.",
      icon: "Zap",
      price: "From $55",
      originalPrice: "$70",
      duration: "40-55 min",
      features: ["3D Face Mapping", "Custom Shape Design", "Precision Trimming", "Beard Oil Treatment", "Style Guidance"],
      popular: false,
      difficulty: "Expert Level",
      bookings: "1,924 bookings",
      satisfaction: "98%",
      gradient: "from-blue-400 via-purple-500 to-indigo-600",
      bgPattern: "bg-gradient-to-br from-blue-50 to-purple-50",
      avatar: "/Barber1.jpg", // You can use different images for each service
    },
    {
      id: 3,
      name: "Royal Treatment",
      tagline: "Ultimate Luxury",
      description: "The complete gentleman's experience. Full grooming service with premium products and unmatched attention to detail.",
      icon: "Crown",
      price: "From $125",
      originalPrice: "$160",
      duration: "105-135 min",
      features: ["VIP Consultation", "Complete Cut & Style", "Deluxe Beard Service", "Face Massage", "Premium Aftercare", "Complimentary Drink"],
      popular: false,
      difficulty: "Master Level",
      bookings: "856 bookings",
      satisfaction: "100%",
      gradient: "from-purple-400 via-pink-500 to-red-500",
      bgPattern: "bg-gradient-to-br from-purple-50 to-pink-50",
      avatar: "/Barber1.jpg",
    },
    {
      id: 4,
      name: "Classic Straight Razor",
      tagline: "Traditional Excellence",
      description: "Experience the art of traditional barbering with our straight razor service. Hot towels, premium lather, and expert technique.",
      icon: "Minus",
      price: "From $1000",
      originalPrice: "$95",
      duration: "70-85 min",
      features: [
        "Hot Towel Preparation",
        "Premium Lather",
        "Straight Razor Shave",
        "Cooling Treatment",
        "Moisturizing",
      ],
      popular: true,
      difficulty: "Master Level",
      bookings: "1,634 bookings",
      satisfaction: "99%",
      gradient: "from-green-400 via-teal-500 to-blue-500",
      bgPattern: "bg-gradient-to-br from-green-50 to-teal-50",
      avatar: "/Barber1.jpg",
    },
  ];

  const signatureTechniques = [
    {
      name: "Precision Fade Technology",
      description: "18-step fade process with seamless blending",
      icon: "Target",
      stat: "0.5mm precision",
    },
    {
      name: "3D Beard Mapping",
      description: "Face geometry analysis for perfect shaping",
      icon: "Award",
      stat: "15-point analysis",
    },
    {
      name: "Hot Towel Ritual",
      description: "Traditional preparation for optimal results",
      icon: "Flame",
      stat: "5-layer process",
    },
    {
      name: "Master Finishing",
      description: "Premium products and expert styling",
      icon: "Sparkles",
      stat: "Professional grade",
    },
  ];

  // Sample reviews data with Next.js paths
  const reviews = [
    {
      id: 1,
      name: "Alexander Thompson",
      avatar: "/Barber1.jpg", // Next.js public path
      rating: 5,
      review: "Absolutely phenomenal experience! The attention to detail and precision is unmatched. I've been coming here for 2 years and never disappointed.",
      service: "Executive Fade",
      date: "2 days ago",
      verified: true,
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      avatar: "/Barber1.jpg", // You can add more images like /barber2.jpg, /barber3.jpg etc.
      rating: 5,
      review: "Best barbershop in the city! The Royal Treatment is worth every penny. Professional, clean, and incredible results every time.",
      service: "Royal Treatment",
      date: "1 week ago",
      verified: true,
    },
    {
      id: 3,
      name: "David Chen",
      avatar: "/Barber1.jpg",
      rating: 5,
      review: "The beard sculpting is an art form here. They transformed my facial hair into something I never thought possible. Highly recommended!",
      service: "Beard Architecture",
      date: "3 days ago",
      verified: true,
    }
  ];

  const testimonialRotation = [
    "Absolutely phenomenal experience!",
    "Incredible attention to detail!",
    "Best barbershop in the city!",
    "Truly masterful craftsmanship!",
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialRotation.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleTechniques([0, 1, 2, 3]);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.05),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,204,112,0.05),_transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        {/* Dynamic Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-2 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span className="text-amber-800 font-medium text-sm">Master Crafted Services</span>
          </motion.div>
          
          <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 bg-clip-text text-transparent mb-6 leading-tight">
            Signature Services
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Where traditional barbering artistry meets modern precision. Each service is a masterpiece crafted with 
            <span className="text-amber-600 font-semibold"> uncompromising attention to detail</span>.
          </p>

          {/* Live Testimonial Rotation */}
          <motion.div 
            key={currentTestimonial}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 text-slate-500 italic"
          >
            "{testimonialRotation[currentTestimonial]}"
          </motion.div>
        </motion.div>

        {/* Enhanced Services Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-24">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            const isHovered = hoveredService === service.id;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  damping: 20
                }}
                viewport={{ once: true }}
                className="relative group perspective-1000"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Floating Popular Badge */}
                <AnimatePresence>
                  {service.popular && (
                    <motion.div
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: -12 }}
                      className="absolute -top-4 -right-4 z-20"
                    >
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span>MOST POPULAR</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Discount Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="absolute -top-3 -left-3 z-20"
                >
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    SAVE 25%
                  </div>
                </motion.div>

                {/* Main Card */}
                <motion.div
                  className={`h-full rounded-3xl overflow-hidden shadow-xl transition-all duration-500 transform-gpu ${
                    service.popular 
                      ? "bg-white ring-2 ring-amber-200 shadow-amber-100/50" 
                      : "bg-white hover:shadow-2xl"
                  }`}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    rotateX: 5,
                    rotateY: isHovered ? 2 : 0
                  }}
                  style={{
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Gradient Header with Barber Image */}
                  <div className={`h-32 bg-gradient-to-r ${service.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Barber Avatar */}
                    <motion.div
                      className="absolute top-4 left-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      <img
                        src={service.avatar}
                        alt="Master Barber"
                        className="w-12 h-12 rounded-full border-2 border-white/50 object-cover shadow-lg"
                      />
                    </motion.div>
                    
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{ rotate: isHovered ? 360 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </motion.div>
                    
                    {/* Floating Particles */}
                    <motion.div
                      className="absolute inset-0"
                      initial={false}
                      animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                    >
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/30 rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 2) * 40}%`,
                          }}
                          animate={isHovered ? {
                            y: [-10, -20, -10],
                            opacity: [0.3, 1, 0.3],
                          } : {}}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  <div className="p-8">
                    {/* Service Header */}
                    <div className="mb-6">
                      <motion.h3 
                        className="text-2xl font-bold text-slate-800 mb-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        {service.name}
                      </motion.h3>
                      <p className="text-amber-600 font-semibold text-sm uppercase tracking-wide">
                        {service.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                      {service.description}
                    </p>

                    {/* Pricing & Stats */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-slate-800">{service.price}</span>
                          <span className="text-sm text-slate-400 line-through">{service.originalPrice}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-slate-500 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{service.duration}</span>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="flex items-center space-x-1 text-green-600">
                          <TrendingUp className="w-3 h-3" />
                          <span>{service.bookings}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-amber-600">
                          <Shield className="w-3 h-3" />
                          <span>{service.satisfaction} satisfaction</span>
                        </div>
                      </div>

                      {/* Difficulty Badge */}
                      <div className="inline-flex items-center space-x-1 bg-slate-100 px-3 py-1 rounded-full text-xs text-slate-600">
                        <Award className="w-3 h-3" />
                        <span>{service.difficulty}</span>
                      </div>
                    </div>

                    {/* Features with Animation */}
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-center space-x-3 group/feature"
                        >
                          <motion.div
                            className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center"
                            whileHover={{ scale: 1.2, backgroundColor: "#10b981" }}
                          >
                            <Check className="w-3 h-3 text-green-600 group-hover/feature:text-white transition-colors" />
                          </motion.div>
                          <span className="text-sm text-slate-600 group-hover/feature:text-slate-800 transition-colors">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Enhanced Book Button */}
                    <motion.button
                      className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 relative overflow-hidden group ${
                        service.popular
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25"
                          : "bg-slate-800 text-white hover:bg-slate-900"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Next.js navigation
                        window.location.href = '/booking-engine';
                      }}
                    >
                      {/* Button Background Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      <div className="relative flex items-center justify-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Book This Experience</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Signature Techniques */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Background with Glassmorphism */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-16 border border-white/20 shadow-2xl">
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-100 to-slate-200 px-6 py-3 rounded-full mb-8"
              >
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span className="text-slate-700 font-semibold">What Makes Us Legendary</span>
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 bg-clip-text text-transparent mb-6">
                Signature Techniques
              </h3>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Precision methods refined over decades, exclusively available at our barbershop
              </p>
            </div>

            {/* Techniques Grid with Staggered Animation */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
              {signatureTechniques.map((technique, index) => {
                const Icon = iconMap[technique.icon];
                const isVisible = visibleTechniques.includes(index);
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: -20 }}
                    animate={isVisible ? { 
                      opacity: 1, 
                      y: 0, 
                      rotateX: 0 
                    } : {}}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2,
                      type: "spring",
                      damping: 25
                    }}
                    className="group text-center relative"
                  >
                    {/* Floating Card */}
                    <motion.div
                      className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg border border-slate-100 h-full"
                      whileHover={{ 
                        y: -10, 
                        scale: 1.05
                      }}
                      transition={{ type: "spring", damping: 20 }}
                    >
                      {/* Animated Icon Container */}
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                        whileHover={{ 
                          rotate: [0, -10, 10, -5, 0],
                          scale: 1.1
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>

                      <h4 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-amber-600 transition-colors">
                        {technique.name}
                      </h4>
                      
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {technique.description}
                      </p>

                      {/* Stat Badge */}
                      <motion.div
                        className="inline-flex items-center bg-gradient-to-r from-slate-100 to-slate-200 px-4 py-2 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-xs font-semibold text-slate-700">
                          {technique.stat}
                        </span>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Enhanced CTA Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center relative"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-xl" />
              
              <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-12">
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready for the Ultimate Experience?
                </h4>
                <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of satisfied clients who trust us with their style. Book now and discover why we're the city's premier destination for exceptional grooming.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.button
                    className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-amber-500/25 flex items-center space-x-2 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Next.js navigation
                      window.location.href = '/components-service';
                    }}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Book Your Appointment</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  
                  <motion.button
                    className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Next.js navigation
                      window.location.href = '';
                    }}
                  >
                    <span>View Full Menu</span>
                  </motion.button>
                </div>

                {/* Trust Indicators */}
                <div className="flex justify-center items-center space-x-8 mt-8 text-slate-400 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>5,000+ Happy Clients</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span>Award Winning</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Client Reviews Section with Local Images */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              What Our Clients Say
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Real reviews from our satisfied clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-800">{review.name}</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  {review.verified && (
                    <div className="ml-auto">
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                        Verified
                      </div>
                    </div>
                  )}
                </div>
                
                <p className="text-slate-600 mb-4 leading-relaxed">
                  "{review.review}"
                </p>
                
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span className="font-semibold text-amber-600">{review.service}</span>
                  <span>{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;