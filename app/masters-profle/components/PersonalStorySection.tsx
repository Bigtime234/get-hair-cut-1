"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  Heart,
  Lightbulb,
  Users,
  Target,
  MapPin,
  Zap,
  Shield,
  Quote,
  Sparkles,
  Crown,
  Flame,
  Eye,
  BookOpen,
  Coffee,
  Star,
  ArrowRight,
  Play,
  Volume2
} from "lucide-react"

const PersonalStorySection = () => {
  const [activeStory, setActiveStory] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const sectionRef = useRef(null)

  const storyCards = [
    {
      icon: Lightbulb,
      title: "The Divine Spark",
      subtitle: "Where Legends Begin",
      story: "I was 16, watching my grandfather transform at Tony's Barbershop on Main Street. He walked in exhausted from the steel mill, shoulders heavy with the weight of responsibility. But as Tony worked his magic—the precise snip of scissors, the warm lather, the gentle scrape of the razor—something incredible happened. My grandfather didn't just get a haircut; he got his dignity back, his confidence restored. That moment changed everything.",
      gradient: "from-amber-400 to-orange-600",
      emotion: "Wonder",
      impact: "Life-Changing Moment"
    },
    {
      icon: Heart,
      title: "The Sacred Connection",
      subtitle: "Beyond the Chair",
      story: "I discovered barbering isn't about hair—it's about healing. In my chair, CEOs become vulnerable, teenagers find confidence, fathers reconnect with their sons. Every snip carries dreams, every shave holds stories. I realized I wasn't just cutting hair; I was crafting confidence, sculpting self-esteem, and building bridges between who you are and who you want to become.",
      gradient: "from-rose-400 to-pink-600",
      emotion: "Love",
      impact: "Deeper Purpose Found"
    },
    {
      icon: Target,
      title: "The Sacred Mission",
      subtitle: "Purpose Crystallized",
      story: "My mission crystallized during a moment with James, a client who'd lost his job and confidence. After his cut, he looked in the mirror and said, 'I feel ready to face the world again.' That's when I knew: I don't just cut hair—I restore souls. Every client deserves to walk out feeling invincible, transformed not just in appearance but in spirit.",
      gradient: "from-emerald-400 to-teal-600",
      emotion: "Purpose",
      impact: "Mission Defined"
    }
  ]

  const values = [
    {
      icon: Heart,
      title: "Genuine Soul Care",
      description: "Every person who sits in my chair becomes family. I listen to your dreams, understand your struggles, and craft a look that amplifies your inner greatness.",
      gradient: "from-pink-400 to-rose-600",
      benefit: "Personal Connection"
    },
    {
      icon: Crown,
      title: "Relentless Mastery",
      description: "Perfection isn't a destination—it's a journey. I invest thousands in training, study under masters worldwide, and never settle for 'good enough' when excellence is possible.",
      gradient: "from-amber-400 to-yellow-600",
      benefit: "World-Class Skill"
    },
    {
      icon: Shield,
      title: "Unbreakable Trust",
      description: "Your trust is sacred. Transparent pricing, honest advice, consistent quality, and a promise: if you're not 100% thrilled, I'll make it right or refund every penny.",
      gradient: "from-blue-400 to-indigo-600",
      benefit: "Peace of Mind"
    }
  ]

  const quotes = [
    {
      text: "When you love what you do, it shows in every detail. My passion isn't just about the craft—it's about being honored to shape your confidence journey.",
      context: "On Passion"
    },
    {
      text: "Every client teaches me something new. In 15 years, I've learned that great barbering isn't about the perfect cut—it's about the perfect experience.",
      context: "On Learning"
    },
    {
      text: "I don't just see hair when you sit down. I see potential, dreams, and the person you're becoming. My job is to make the outside match the greatness inside.",
      context: "On Vision"
    }
  ]

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [quotes.length])

  // Auto-advance story cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % storyCards.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [storyCards.length])

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Hearts */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-rose-400 rounded-full animate-pulse opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Emotional Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm border border-rose-500/30 rounded-full px-8 py-3 mb-8">
            <Heart className="w-5 h-5 text-rose-400 animate-pulse" />
            <span className="font-bold text-rose-300 tracking-wide">THE SOUL BEHIND THE SCISSORS</span>
            <Heart className="w-5 h-5 text-rose-400 animate-pulse" />
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-pink-300 mb-8 leading-tight">
            Why I Chose
            <br />
            <span className="text-4xl lg:text-6xl bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
              This Sacred Craft
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Every master has an origin story. Mine isn't just about becoming a barber—
            it's about discovering my calling to transform lives, one perfect cut at a time.
          </p>

          {/* Emotional Impact Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500 mb-1">15+</div>
              <div className="text-xs text-slate-400">Years of Passion</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-1">10K+</div>
              <div className="text-xs text-slate-400">Lives Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-1">∞</div>
              <div className="text-xs text-slate-400">Stories Shared</div>
            </div>
          </div>
        </div>

        {/* Interactive Story Journey */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Story Cards */}
          <div className="space-y-6">
            {/* Story Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50 flex space-x-2">
                {storyCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStory(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      index === activeStory
                        ? `bg-gradient-to-r ${storyCards[activeStory].gradient} scale-125 shadow-lg`
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Active Story Card */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${storyCards[activeStory].gradient} rounded-3xl blur-xl opacity-20`}></div>
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
                <div className="flex items-start space-x-6 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${storyCards[activeStory].gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {React.createElement(storyCards[activeStory].icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-2xl font-black text-white">{storyCards[activeStory].title}</h3>
                      <div className={`px-3 py-1 bg-gradient-to-r ${storyCards[activeStory].gradient} text-black text-xs font-bold rounded-full`}>
                        {storyCards[activeStory].emotion}
                      </div>
                    </div>
                    <p className="text-rose-300 font-semibold text-lg mb-4">{storyCards[activeStory].subtitle}</p>
                  </div>
                </div>
                
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  {storyCards[activeStory].story}
                </p>

                <div className="flex items-center justify-between">
                  <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl px-4 py-2">
                    <span className="text-amber-400 font-bold text-sm">Impact: </span>
                    <span className="text-white font-semibold">{storyCards[activeStory].impact}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400 text-sm">
                    <BookOpen className="w-4 h-4" />
                    <span>Chapter {activeStory + 1} of 3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Story */}
          <div className="space-y-6">
            {/* Main Portrait */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/30 to-pink-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=625&fit=crop&crop=face"
                  alt="Marcus Thompson - The man behind the craft"
                  width={500}
                  height={625}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    <div className="flex items-center space-x-3">
                      <Coffee className="w-5 h-5 text-amber-400" />
                      <span className="text-white font-semibold">Every story starts with a moment...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Moments Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl group">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=300&h=300&fit=crop"
                    alt="The tools of transformation"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-amber-500 text-black px-2 py-1 rounded-lg text-xs font-bold">
                      Sacred Tools
                    </div>
                  </div>
                </div>
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl group">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=300&fit=crop"
                    alt="Traditional craftsmanship"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-emerald-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                      Time-Honored
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values - Transformed */}
        <div className="relative mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-amber-500/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-slate-700/50">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-6 py-3 mb-6">
                <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
                <span className="font-bold text-amber-300 tracking-wide">THE SACRED PRINCIPLES</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200 mb-6">
                Values That Define Every Cut
              </h3>
              <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
                These aren't just words on a wall—they're the foundation of every interaction, every service, every moment you spend in my chair.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="group text-center transform hover:-translate-y-2 transition-all duration-300">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${value.gradient} flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    {value.description}
                  </p>
                  <div className="inline-flex items-center space-x-2 bg-slate-700/50 backdrop-blur-sm rounded-full px-4 py-2">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 font-semibold text-sm">{value.benefit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rotating Quotes Section */}
        <div className="text-center mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-slate-700/50">
              {/* Quote Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-xl">
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Quote Content */}
              <div className="pt-8">
                <div className="mb-6">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm border border-rose-500/30 rounded-full px-4 py-2 mb-4">
                    <Eye className="w-4 h-4 text-rose-400" />
                    <span className="text-rose-300 font-semibold text-sm">{quotes[currentQuote].context}</span>
                  </div>
                </div>
                
                <blockquote className="text-2xl lg:text-3xl xl:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-pink-300 mb-8 leading-tight">
                  "{quotes[currentQuote].text}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-amber-500/50">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
                      alt="Marcus Thompson"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white text-lg">Marcus Thompson</div>
                    <div className="text-amber-400 font-semibold">Master Barber & Soul Sculptor</div>
                  </div>
                </div>

                {/* Quote Navigation */}
                <div className="flex justify-center space-x-2 mt-8">
                  {quotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuote(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentQuote
                          ? 'bg-rose-400 scale-125'
                          : 'bg-slate-600 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emotional CTA */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-black text-white mb-6">
              Ready to Experience the Difference?
            </h3>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              When you book with me, you're not just getting a haircut—you're investing in an experience 
              that will leave you feeling confident, refreshed, and ready to conquer the world.
            </p>
            
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-black px-12 py-4 rounded-2xl shadow-2xl shadow-rose-500/30 hover:shadow-rose-400/40 transition-all duration-300 cursor-pointer group">
              <Heart className="w-6 h-6 group-hover:scale-125 transition-transform duration-300" />
              <span className="text-lg tracking-wide">START YOUR TRANSFORMATION</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
            
            <div className="flex items-center justify-center space-x-2 mt-6 text-slate-400 text-sm">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Join the family of clients who've discovered their best selves</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PersonalStorySection