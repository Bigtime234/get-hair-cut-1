// app/homepage/HeroSection.tsx
"use client"

import Image from "next/image"
import { Award, Clock, Users, Star, Calendar, Play, Trophy, Scissors } from "lucide-react"

interface HeroSectionProps {
  onBookNow?: () => void
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary to-accent text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          {/* Content */}
          <div className="space-y-8">
            {/* Title + Badge */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <span className="text-accent font-medium">Master Craftsman</span>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Meet Marcus Thompson
              </h1>
              <p className="text-2xl lg:text-3xl text-accent">
                Where Artistry Meets Excellence
              </p>
            </div>

            {/* Description + Mini Badges */}
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed text-white/90">
                For over 15 years, I've dedicated my craft to the intersection of traditional barbering artistry and
                modern convenience. Every cut tells a story, every client becomes part of my legacy.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-sm">15+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-sm">5000+ Satisfied Clients</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2">
                  <Star className="w-5 h-5 text-accent" />
                  <span className="text-sm">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBookNow}
                className="flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium"
              >
                <Calendar className="w-5 h-5" />
                Experience the Difference
              </button>
              <button className="flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium">
                <Play className="w-5 h-5" />
                Watch My Story
              </button>
            </div>
          </div>

          {/* Image + Floating Stats */}
          <div className="relative">
            <div className="relative z-10">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&crop=face"
                  alt="Marcus Thompson - Master Barber"
                  width={600}
                  height={750}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Stat 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-primary">2023</div>
                    <div className="text-sm text-gray-600">City's Best Barber</div>
                  </div>
                </div>
              </div>

              {/* Floating Stat 2 */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                    <Scissors className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-primary">50K+</div>
                    <div className="text-sm text-gray-600">Cuts Completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background layers */}
            <div className="absolute inset-0 bg-accent/20 rounded-2xl rotate-3 -z-10"></div>
            <div className="absolute inset-0 bg-primary/20 rounded-2xl -rotate-3 -z-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
