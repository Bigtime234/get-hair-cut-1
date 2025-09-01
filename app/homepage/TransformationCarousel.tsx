"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Scissors,
  Clock,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Award,
  TrendingUp,
  Zap,
  Crown,
  ArrowRight,
  Eye,
  Heart,
  Share2,
  BookOpen,
  Timer,
  Sparkles,
  CheckCircle,
  Camera,
  Users,
  Trophy
} from "lucide-react";

const TransformationCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<'before' | 'after' | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const transformations = [
    {
      id: 1,
      beforeImage: "/Barber2.jpg",
      afterImage: "/Barber1.jpg",
      clientName: "Marcus Johnson",
      service: "Executive Fade & Beard Sculpt",
      story: "Transformed for his promotion interview. The precision cut and beard sculpting gave him the confidence to land his dream job as Creative Director at a Fortune 500 company.",
      rating: 5,
      duration: "90 minutes",
      price: "$85",
      beforeDescription: "Outdated style, uneven beard",
      afterDescription: "Sharp executive look, sculpted beard",
      transformation: "Complete professional makeover",
      satisfaction: 100,
      bookingIncrease: "+40%",
      category: "Executive",
      difficulty: "Advanced",
      technique: "Precision Fade + Hot Towel"
    },
    {
      id: 2,
      beforeImage: "/Barber4.jpg",
      afterImage: "/Barber5.jpg",
      clientName: "David Rodriguez",
      service: "Classic Pompadour Style",
      story: "Wedding day transformation that made headlines. The classic pompadour with modern touches became the talk of the wedding, with guests asking for our business card.",
      rating: 5,
      duration: "75 minutes",
      price: "$75",
      beforeDescription: "Flat, lifeless hair",
      afterDescription: "Voluminous pompadour perfection",
      transformation: "Wedding day excellence",
      satisfaction: 100,
      bookingIncrease: "+35%",
      category: "Classic",
      difficulty: "Expert",
      technique: "Pompadour Styling + Texture Work"
    },
    {
      id: 3,
      beforeImage: "/Barber2.jpg",
      afterImage: "/Barber1.jpg",
      clientName: "James Wilson",
      service: "Modern Textured Cut",
      story: "Complete style makeover for his new tech startup launch. The modern textured cut perfectly matches his innovative spirit and helped him make powerful first impressions with investors.",
      rating: 5,
      duration: "60 minutes",
      price: "$65",
      beforeDescription: "Generic, boring cut",
      afterDescription: "Dynamic textured masterpiece",
      transformation: "Entrepreneur ready",
      satisfaction: 98,
      bookingIncrease: "+50%",
      category: "Modern",
      difficulty: "Advanced",
      technique: "Texture Cut + Styling"
    },
    {
      id: 4,
      beforeImage: "/Barber4.jpg",
      afterImage: "/Barber5.jpg",
      clientName: "Michael Chen",
      service: "Precision Fade & Styling",
      story: "Monthly VIP client whose consistent transformations have made him a social media influencer. His before/after photos regularly go viral, bringing us hundreds of new clients.",
      rating: 5,
      duration: "45 minutes",
      price: "$55",
      beforeDescription: "Grown out, messy hair",
      afterDescription: "Crisp fade perfection",
      transformation: "Influencer approved",
      satisfaction: 100,
      bookingIncrease: "+60%",
      category: "Precision",
      difficulty: "Master",
      technique: "Fade + Detail Work"
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % transformations.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, transformations.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % transformations.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + transformations.length) % transformations.length
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentTransformation = transformations[currentSlide];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm0 0c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Enhanced Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full mb-8 border border-yellow-400/30">
            <Camera className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-300 font-medium">Featured Transformations</span>
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-8">
            Witness the Magic
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Every transformation tells a story of precision, expertise, and life-changing confidence. See how our master barbers turn ordinary into extraordinary.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Users, label: "Clients Transformed", value: "5,000+" },
              { icon: Trophy, label: "Success Rate", value: "99.8%" },
              { icon: Star, label: "Average Rating", value: "4.98" },
              { icon: TrendingUp, label: "Viral Posts", value: "150+" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Enhanced Before/After Images */}
                <div className="space-y-8">
                  {/* Main Images Grid */}
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Before Image */}
                      <div 
                        className="relative group cursor-pointer"
                        onMouseEnter={() => setHoveredImage('before')}
                        onMouseLeave={() => setHoveredImage(null)}
                      >
                        <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
                          <Image
                            src={currentTransformation.beforeImage}
                            alt={`${currentTransformation.clientName} before transformation`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                          <div className="absolute inset-0 bg-red-500/20 group-hover:bg-red-500/40 transition-colors duration-500"></div>
                        </div>
                        
                        {/* Before Label */}
                        <div className="absolute top-4 left-4 bg-red-500/90 text-white px-4 py-2 rounded-lg font-bold text-sm backdrop-blur-sm">
                          BEFORE
                        </div>

                        {/* Before Description */}
                        <div className={`absolute bottom-4 left-4 right-4 text-white transform transition-all duration-500 ${hoveredImage === 'before' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                          <p className="text-sm font-medium bg-black/50 backdrop-blur-sm rounded-lg p-2">
                            {currentTransformation.beforeDescription}
                          </p>
                        </div>
                      </div>

                      {/* After Image */}
                      <div 
                        className="relative group cursor-pointer"
                        onMouseEnter={() => setHoveredImage('after')}
                        onMouseLeave={() => setHoveredImage(null)}
                      >
                        <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
                          <Image
                            src={currentTransformation.afterImage}
                            alt={`${currentTransformation.clientName} after transformation`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                          <div className="absolute inset-0 bg-green-500/20 group-hover:bg-green-500/40 transition-colors duration-500"></div>
                        </div>
                        
                        {/* After Label */}
                        <div className="absolute top-4 left-4 bg-green-500/90 text-white px-4 py-2 rounded-lg font-bold text-sm backdrop-blur-sm">
                          AFTER
                        </div>

                        {/* Transformation Badge */}
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                          <Sparkles className="w-3 h-3 inline mr-1" />
                          VIRAL
                        </div>

                        {/* After Description */}
                        <div className={`absolute bottom-4 left-4 right-4 text-white transform transition-all duration-500 ${hoveredImage === 'after' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                          <p className="text-sm font-medium bg-black/50 backdrop-blur-sm rounded-lg p-2">
                            {currentTransformation.afterDescription}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Transformation Arrow */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg animate-pulse">
                        <ArrowRight className="w-6 h-6 text-gray-800" />
                      </div>
                    </div>
                  </div>

                  {/* Service Details Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                      <div className="flex items-center space-x-3 mb-2">
                        <Scissors className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold text-white text-sm">Service</span>
                      </div>
                      <p className="text-gray-300 text-sm">{currentTransformation.service}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                      <div className="flex items-center space-x-3 mb-2">
                        <Timer className="w-5 h-5 text-blue-400" />
                        <span className="font-bold text-white text-sm">Duration</span>
                      </div>
                      <p className="text-gray-300 text-sm">{currentTransformation.duration}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                      <div className="flex items-center space-x-3 mb-2">
                        <Crown className="w-5 h-5 text-purple-400" />
                        <span className="font-bold text-white text-sm">Category</span>
                      </div>
                      <p className="text-gray-300 text-sm">{currentTransformation.category}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                      <div className="flex items-center space-x-3 mb-2">
                        <Zap className="w-5 h-5 text-green-400" />
                        <span className="font-bold text-white text-sm">Price</span>
                      </div>
                      <p className="text-gray-300 text-sm font-bold">{currentTransformation.price}</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Story Content */}
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-3xl md:text-4xl font-bold text-white">
                        {currentTransformation.clientName}
                      </h3>
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                        {currentTransformation.difficulty}
                      </div>
                    </div>

                    {/* Enhanced Rating */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        {[...Array(currentTransformation.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                        <span className="text-yellow-300 font-bold ml-2">Perfect Rating</span>
                      </div>
                      <div className="text-green-400 font-bold text-sm">
                        Bookings {currentTransformation.bookingIncrease}
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  <blockquote className="text-gray-300 text-lg leading-relaxed italic border-l-4 border-yellow-400 pl-6 bg-black/20 backdrop-blur-sm rounded-r-2xl p-6">
                    "{currentTransformation.story}"
                  </blockquote>

                  {/* Technique Details */}
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
                    <h4 className="text-white font-bold mb-3 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                      Technique Used
                    </h4>
                    <p className="text-blue-200">{currentTransformation.technique}</p>
                  </div>

                  {/* Satisfaction Meter */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Client Satisfaction</span>
                      <span className="text-green-400 font-bold">{currentTransformation.satisfaction}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                        style={{ width: `${currentTransformation.satisfaction}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 group bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-center space-x-2">
                        <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Book This Service</span>
                      </div>
                    </button>
                    
                    <button className="flex-1 bg-white/10 backdrop-blur-sm text-white font-medium py-4 px-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <div className="flex items-center justify-center space-x-2">
                        <Share2 className="w-5 h-5" />
                        <span>Share Story</span>
                      </div>
                    </button>
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>2.4K views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span>189 likes</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Verified Result</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Controls */}
          <div className="flex items-center justify-between mt-8 px-4">
            {/* Previous/Next Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={prevSlide}
                className="group bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Previous transformation"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={nextSlide}
                className="group bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Next transformation"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Enhanced Dots Indicator */}
            <div className="flex space-x-3">
              {transformations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? "w-12 h-4 bg-gradient-to-r from-yellow-400 to-orange-500"
                      : "w-4 h-4 bg-white/30 hover:bg-white/50 hover:scale-125"
                  }`}
                  aria-label={`Go to transformation ${index + 1}`}
                />
              ))}
            </div>

            {/* Enhanced Auto-play Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`group p-4 rounded-full border transition-all duration-300 hover:scale-110 ${
                isAutoPlaying 
                  ? "bg-green-500/20 border-green-400/50 text-green-400" 
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? (
                <Pause className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Progress Bar */}
          {isAutoPlaying && (
            <div className="mt-4 w-full bg-white/10 rounded-full h-1 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1 rounded-full transition-all duration-100 ease-linear"
                style={{
                  animation: 'progress 6s linear infinite'
                }}
              ></div>
            </div>
          )}
        </div>

        {/* Call to Action Banner */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 backdrop-blur-lg rounded-3xl p-12 border border-yellow-400/20 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready for Your Transformation?
            </h3>
            <p className="text-gray-300 mb-8 text-lg max-w-3xl mx-auto">
              Join thousands of satisfied clients who've experienced life-changing transformations. Your story could be next!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Book Your Transformation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white font-medium py-4 px-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                View All Services
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default TransformationCarousel;