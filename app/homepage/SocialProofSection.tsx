"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Star,
  Check,
  Heart,
  Instagram,
  Award,
  TrendingUp,
  Users,
  Calendar,
  Scissors,
  MapPin,
  Clock
} from "lucide-react";

export default function SocialProofSection() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Alexander Thompson",
      avatar: "/Barber3.jpg",
      rating: 5,
      review: "Absolutely phenomenal experience! The attention to detail and precision is unmatched. I've been coming here for 2 years and never disappointed. The booking system makes it so easy!",
      service: "Executive Fade + Beard Trim",
      date: "2 days ago",
      verified: true,
      location: "Downtown Studio"
    },
    {
      id: 2,
      name: "Robert Martinez",
      avatar: "/Barber4.jpg",
      rating: 5,
      review: "The master craftsman approach really shows. Every cut is perfect, and the atmosphere is professional yet welcoming. Best investment in my grooming routine!",
      service: "Classic Pompadour + Hot Towel",
      date: "1 week ago",
      verified: true,
      location: "Midtown Location"
    },
    {
      id: 3,
      name: "James Wilson",
      avatar: "/Barber2.jpg",
      rating: 5,
      review: "Best barber experience I've ever had. The booking system is seamless, and the quality is consistently excellent. Worth every penny and more!",
      service: "Beard Sculpting + Styling",
      date: "3 days ago",
      verified: true,
      location: "Uptown Branch"
    },
  ];

  const instagramPosts = [
    {
      id: 1,
      image: "/Barber8.jpg",
      likes: 1234,
      comments: 89,
      caption: "Fresh fade transformation ✂️ Clean lines, sharp style #PrecisionCut #BarberArt",
      hashtags: ["#fade", "#barberlife", "#transformation"]
    },
    {
      id: 2,
      image: "/Barber9.jpg",
      likes: 2189,
      comments: 156,
      caption: "Classic gentleman's cut never goes out of style 💫 #TimelessElegance",
      hashtags: ["#classic", "#gentleman", "#style"]
    },
    {
      id: 3,
      image: "/Barber2.jpg",
      likes: 1856,
      comments: 123,
      caption: "Beard sculpting artistry in motion 🎨 Precision meets passion #BeardMaster",
      hashtags: ["#beard", "#artistry", "#craftsmanship"]
    },
    {
      id: 4,
      image: "/Barber3.jpg",
      likes: 2278,
      comments: 234,
      caption: "Tools of mastery ⚔️ Quality equipment for premium results #CraftsmanTools",
      hashtags: ["#tools", "#quality", "#precision"]
    },
  ];

  const stats = [
    { icon: Users, label: "Happy Clients", value: "10,000+", color: "text-blue-600" },
    { icon: Calendar, label: "Bookings/Month", value: "2,500+", color: "text-green-600" },
    { icon: Award, label: "Years Experience", value: "15+", color: "text-purple-600" },
    { icon: TrendingUp, label: "Growth Rate", value: "250%", color: "text-orange-600" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm0 0c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header with enhanced styling */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-6">
            <Award className="w-5 h-5 text-amber-600" />
            <span className="text-amber-700 font-medium text-sm">Trusted by 10,000+ Clients</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Real transformations, real reviews. Discover why BarberBook Pro is the ultimate destination for the modern gentleman.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className={`transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Enhanced Reviews Section */}
          <div className="space-y-8">
            {/* Overall Rating with glassmorphism */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                      4.9
                    </span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 text-yellow-500 fill-yellow-500 drop-shadow-sm animate-pulse"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 font-medium">Based on 2,470+ verified reviews</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                      alt="Google Reviews"
                      width={28}
                      height={28}
                    />
                    <span className="text-sm text-gray-600 font-medium">Google Reviews</span>
                  </div>
                  <div className="text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                    Verified Business
                  </div>
                </div>
              </div>

              {/* Enhanced Rating Breakdown */}
              <div className="space-y-4">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700 font-medium w-8">{stars}</span>
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full h-3 transition-all duration-1000 ease-out shadow-sm"
                        style={{
                          width: stars === 5 ? "94%" : stars === 4 ? "4%" : stars === 3 ? "1%" : stars === 2 ? "1%" : "0%",
                          animationDelay: `${(5-stars) * 200}ms`
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium w-12 text-right">
                      {stars === 5 ? "94%" : stars === 4 ? "4%" : stars === 3 ? "1%" : stars === 2 ? "1%" : "0%"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Featured Review */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 transform transition-all duration-700 hover:scale-105">
              <div className="flex items-start space-x-5 mb-6">
                <div className="relative">
                  <Image
                    src={reviews[currentReviewIndex].avatar}
                    alt={reviews[currentReviewIndex].name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                  {reviews[currentReviewIndex].verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900 text-lg">
                      {reviews[currentReviewIndex].name}
                    </h4>
                    <span className="text-sm text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-full">
                      {reviews[currentReviewIndex].date}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex space-x-1">
                      {[...Array(reviews[currentReviewIndex].rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-500 fill-yellow-500"
                        />
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{reviews[currentReviewIndex].location}</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center space-x-1 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 rounded-full">
                    <Scissors className="w-3 h-3 text-blue-600" />
                    <span className="text-sm text-blue-700 font-medium">
                      {reviews[currentReviewIndex].service}
                    </span>
                  </div>
                </div>
              </div>

              <blockquote className="text-gray-700 text-lg leading-relaxed italic font-medium">
                "{reviews[currentReviewIndex].review}"
              </blockquote>

              {/* Review indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentReviewIndex
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setCurrentReviewIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Instagram Feed */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-3 mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg">
                <Instagram className="w-6 h-6" />
                <h3 className="text-2xl font-bold">@BarberBookPro</h3>
              </div>
              <p className="text-gray-600 text-lg mb-2">
                Follow our daily transformations and behind-the-scenes content
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>45.2K followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>98.5% engagement</span>
                </div>
              </div>
            </div>

            {/* Enhanced Instagram Grid */}
            <div className="grid grid-cols-2 gap-4">
              {instagramPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                    index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'
                  }`}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={post.image}
                      alt="Instagram post"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                  </div>

                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                            <span className="text-sm font-medium">{post.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-4 h-4 rounded-sm border border-white/50 flex items-center justify-center">
                              <div className="w-2 h-2 border border-white/70 rounded-sm"></div>
                            </div>
                            <span className="text-sm">{post.comments}</span>
                          </div>
                        </div>
                        <Instagram className="w-4 h-4" />
                      </div>
                      <p className="text-sm leading-relaxed mb-2">{post.caption}</p>
                      <div className="flex flex-wrap gap-1">
                        {post.hashtags.map((tag, i) => (
                          <span key={i} className="text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Live indicator */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>LIVE</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Follow Button */}
            <div className="text-center space-y-4">
              <button className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 hover:-translate-y-1">
                <Instagram className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Follow @BarberBookPro</span>
                <div className="w-2 h-2 bg-white/30 rounded-full group-hover:bg-white transition-colors duration-300"></div>
              </button>
              
              <p className="text-sm text-gray-500">
                Join 45.2K followers for daily inspiration & exclusive offers
              </p>

              {/* Social proof badges */}
              <div className="flex items-center justify-center space-x-4 mt-6">
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-blue-700 font-medium">Featured Business</span>
                </div>
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full">
                  <Check className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-700 font-medium">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 text-white shadow-2xl transform hover:scale-105 transition-all duration-500">
            <h3 className="text-3xl font-bold mb-4">Ready to Experience Excellence?</h3>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied clients who trust BarberBook Pro for their grooming needs.
            </p>
            <button className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Calendar className="w-5 h-5" />
              <span>Book Your Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}