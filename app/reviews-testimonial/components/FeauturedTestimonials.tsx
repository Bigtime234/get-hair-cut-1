"use client";

import { useState, useEffect } from "react";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Scissors,
  Trophy,
  Calendar,
  Camera,
  Award,
} from "lucide-react";

interface Testimonial {
  rating: number;
  quote: string;
  clientAvatar: string;
  clientName: string;
  clientTitle: string;
  location: string;
  service: string;
  date: string;
  showcaseImage?: string;
  beforeAfter?: {
    before: string;
    after: string;
  };
}

interface Props {
  testimonials: Testimonial[];
}

// Mock data using your barber images
const mockTestimonials: Testimonial[] = [
  {
    rating: 5,
    quote: "Absolutely incredible experience! The attention to detail and precision in my haircut was unmatched. I've never felt more confident walking out of a barbershop.",
    clientAvatar: "Barber3.jpg",
    clientName: "Marcus Johnson",
    clientTitle: "Business Executive",
    location: "Downtown Lagos",
    service: "Premium Cut & Styling",
    date: "2 weeks ago",
    showcaseImage: "Barber1.jpg",
    beforeAfter: {
      before: "Barber8.jpg",
      after: "Barber2.jpg"
    }
  },
  {
    rating: 5,
    quote: "The beard sculpting service transformed my entire look. Professional, clean, and exactly what I envisioned. Worth every naira!",
    clientAvatar: "Barber5.jpg",
    clientName: "David Adebayo",
    clientTitle: "Creative Director",
    location: "Victoria Island",
    service: "Beard Sculpting & Trim",
    date: "1 week ago",
    showcaseImage: "Barber4.jpg",
    beforeAfter: {
      before: "Barber9.jpg",
      after: "Barber6.jpg"
    }
  },
  {
    rating: 5,
    quote: "From booking to finishing touches, everything was seamless. The barber understood exactly what I wanted and delivered perfection.",
    clientAvatar: "Barber7.jpg",
    clientName: "Emmanuel Okafor",
    clientTitle: "Tech Entrepreneur",
    location: "Lekki Phase 1",
    service: "Signature Fade",
    date: "3 days ago",
    showcaseImage: "Barber10.jpg"
  },
  {
    rating: 5,
    quote: "Best barbershop experience in Lagos! The atmosphere is premium and the skills are unmatched. I'm a client for life!",
    clientAvatar: "Barber11.jpg",
    clientName: "Ahmed Yakubu",
    clientTitle: "Fashion Designer",
    location: "Ikeja GRA",
    service: "Classic Cut & Shave",
    date: "5 days ago",
    showcaseImage: "Barber1.jpg",
    beforeAfter: {
      before: "Barber3.jpg",
      after: "Barber4.jpg"
    }
  }
];

export default function FeaturedTestimonials({
  testimonials = mockTestimonials,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextTestimonial();
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const currentTestimonial = testimonials[currentIndex];

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={`${
          index < rating 
            ? "text-yellow-400 fill-yellow-400 drop-shadow-sm" 
            : "text-gray-300"
        } transition-colors duration-200`}
      />
    ));

  return (
    <div className="relative">
      {/* Main Container */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-8 right-8 animate-pulse">
            <Scissors size={100} className="text-white rotate-12" />
          </div>
          <div className="absolute bottom-8 left-8 animate-pulse">
            <Quote size={80} className="text-white -rotate-12" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin">
            <div className="w-32 h-32 border border-white/10 rounded-full"></div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10"></div>

        {/* Header */}
        <div className="relative z-10 mb-10 flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Trophy size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-3xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Client Transformations
                </h3>
                <p className="text-gray-300 font-medium">Premium cuts, premium results</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-400 mr-4">
              {currentIndex + 1} of {testimonials.length}
            </div>
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-105 border border-white/20"
              disabled={testimonials.length <= 1}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-105 border border-white/20"
              disabled={testimonials.length <= 1}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Testimonial Content */}
        <div className={`relative z-10 transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(currentTestimonial?.rating || 0)}
                </div>
                <span className="text-yellow-400 font-semibold ml-2">
                  {currentTestimonial?.rating}.0
                </span>
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl leading-relaxed font-light text-gray-100 relative">
                <span className="text-4xl text-amber-400 absolute -top-2 -left-2">"</span>
                <span className="pl-6">{currentTestimonial?.quote}</span>
                <span className="text-4xl text-amber-400 ml-1">"</span>
              </blockquote>

              {/* Client Info Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={currentTestimonial?.clientAvatar || "Barber1.jpg"}
                      alt={currentTestimonial?.clientName ? `${currentTestimonial.clientName} avatar` : "Client avatar"}
                      className="w-16 h-16 rounded-full object-cover border-3 border-amber-400 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white">
                      {currentTestimonial?.clientName}
                    </h4>
                    <p className="text-gray-300 font-medium">{currentTestimonial?.clientTitle}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <MapPin size={14} className="text-amber-400" />
                      <span className="text-sm text-gray-300">
                        {currentTestimonial?.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Service & Date Info */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg text-sm font-semibold text-white shadow-md">
                    <Scissors size={14} className="inline mr-2" />
                    {currentTestimonial?.service}
                  </span>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar size={14} />
                    <span className="text-sm">{currentTestimonial?.date}</span>
                  </div>
                </div>
              </div>

              {/* Gallery CTA */}
              <button className="group inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg border border-indigo-500/50">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Camera size={18} />
                </div>
                <span className="font-semibold">View More Work</span>
              </button>
            </div>

            {/* Image Showcase */}
            <div className="relative">
              {currentTestimonial?.beforeAfter ? (
                <div className="relative">
                  {/* Before/After Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="relative group">
                      <img
                        src={currentTestimonial.beforeAfter.before}
                        alt="Before styling"
                        className="w-full h-72 object-cover rounded-xl shadow-xl transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-500/90 backdrop-blur-sm text-white text-sm font-bold rounded-lg shadow-md">
                        BEFORE
                      </div>
                      <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Camera size={16} className="text-white" />
                      </div>
                    </div>
                    <div className="relative group">
                      <img
                        src={currentTestimonial.beforeAfter.after}
                        alt="After styling"
                        className="w-full h-72 object-cover rounded-xl shadow-xl transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-green-500/90 backdrop-blur-sm text-white text-sm font-bold rounded-lg shadow-md">
                        AFTER
                      </div>
                      <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Award size={16} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Transformation Badge */}
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-6 py-3 rounded-full shadow-xl border-4 border-white">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                        <span className="font-bold text-sm tracking-wider">TRANSFORMATION</span>
                        <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <img
                    src={currentTestimonial?.showcaseImage || "Barber1.jpg"}
                    alt="Professional barber work showcase"
                    className="w-full h-80 object-cover rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
                  
                  {/* Showcase Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-lg shadow-md backdrop-blur-sm">
                    ✨ FEATURED WORK
                  </div>
                  
                  {/* Service Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-black shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {renderStars(currentTestimonial?.rating || 0)}
                        </div>
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                          {currentTestimonial?.date}
                        </span>
                      </div>
                      <p className="font-bold text-lg text-slate-800">{currentTestimonial?.service}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {currentTestimonial?.location}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Indicators */}
        <div className="relative z-10 flex items-center justify-center space-x-3 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 300);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-10 h-3 bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg"
                  : "w-3 h-3 bg-white/30 hover:bg-white/50 hover:scale-110"
              }`}
            />
          ))}
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-12 w-8 h-8 bg-gradient-to-br from-amber-400/30 to-orange-500/30 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 left-6 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
          <div className="text-2xl font-bold text-slate-800 mb-1">500+</div>
          <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
          <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mt-2"></div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
          <div className="text-2xl font-bold text-slate-800 mb-1">4.9★</div>
          <div className="text-sm text-gray-600 font-medium">Average Rating</div>
          <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mt-2"></div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
          <div className="text-2xl font-bold text-slate-800 mb-1">3 Yrs</div>
          <div className="text-sm text-gray-600 font-medium">Excellence</div>
          <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mt-2"></div>
        </div>
      </div>

      {/* Additional Gallery Preview */}
      <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-lg text-slate-800">Recent Work Gallery</h4>
          <button className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {["Barber2.jpg", "Barber5.jpg", "Barber8.jpg", "Barber11.jpg"].map((img, idx) => (
            <div key={idx} className="relative group cursor-pointer">
              <img
                src={img}
                alt={`Gallery image ${idx + 1}`}
                className="w-full h-20 object-cover rounded-lg shadow-md transition-transform duration-200 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 rounded-lg flex items-center justify-center">
                <Camera size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}