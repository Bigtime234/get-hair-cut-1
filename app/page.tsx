import React from 'react'
import HeroSection from "@/app/homepage/HeroSection"
import ServiceShowcase from "@/app/components/service/service-showcase"
import { db } from "@/server"
import { services } from "@/server/schema"
import { eq, desc } from "drizzle-orm"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, ArrowRight, Calendar, Scissors, Play, Eye } from "lucide-react"
import placeholder from "@/public/Barber2.jpg"

const HomePage = async () => {
  // Get featured services (top rated or most popular)
  const featuredServices = await db.query.services.findMany({
    where: eq(services.isActive, true),
    with: {
      bookings: {
        with: {
          customer: true,
          rating: true,
        },
      },
    },
    orderBy: [desc(services.averageRating), desc(services.totalRatings)],
    limit: 6, // Show only 6 services on homepage
  })

  // Format price helper
  const formatPrice = (price: string | number) => {
    const priceValue = typeof price === 'string' ? parseFloat(price) : price
    return new Intl.NumberFormat("en-NG", {
      currency: "NGN",
      style: "currency",
    }).format(isNaN(priceValue) ? 0 : priceValue)
  }

  // Enhanced category configuration with professional barber styling (matching services page)
  const categoryConfig = {
    haircut: { 
      color: "bg-gradient-to-r from-blue-600 to-blue-700 text-white", 
      icon: <Scissors className="w-4 h-4" />,
      label: "Haircut"
    },
    beard: { 
      color: "bg-gradient-to-r from-amber-600 to-amber-700 text-white", 
      icon: "🧔",
      label: "Beard Care"
    },
    styling: { 
      color: "bg-gradient-to-r from-purple-600 to-purple-700 text-white", 
      icon: "💇‍♂️",
      label: "Styling"
    },
    wash: { 
      color: "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white", 
      icon: "🚿",
      label: "Hair Wash"
    },
    treatment: { 
      color: "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white", 
      icon: "🧴",
      label: "Treatment"
    },
    combo: { 
      color: "bg-gradient-to-r from-rose-600 to-rose-700 text-white", 
      icon: "🎯",
      label: "Combo Deal"
    },
  }

  return (
    <div className='min-h-screen'>
      <HeroSection />
      
      {/* Featured Services Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Scissors className="w-4 h-4" />
            FEATURED SERVICES
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Our Most Popular Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Experience premium barber services with our most loved treatments crafted by master barbers
          </p>
        </div>

        {featuredServices.length > 0 ? (
          <>
            {/* Enhanced Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
              {featuredServices.map((service) => {
                // Parse gallery images
                let galleryUrls: string[] = []
                try {
                  if (service.galleryUrls && service.galleryUrls !== "null") {
                    galleryUrls = JSON.parse(service.galleryUrls)
                  }
                } catch (error) {
                  galleryUrls = []
                }

                // Determine main image - Fixed null handling
                const hasValidImage = service.imageUrl && 
                  service.imageUrl !== "" && 
                  !service.imageUrl.includes("placeholder") && 
                  !service.imageUrl.includes("Barber2.jpg")
                
                const mainImage: string = hasValidImage ? (service.imageUrl as string) : placeholder.src

                // Category styling - Fixed undefined handling
                const categoryStyle = service.category 
                  ? categoryConfig[service.category as keyof typeof categoryConfig] || {
                      color: "bg-gradient-to-r from-slate-600 to-slate-700 text-white",
                      icon: "📋",
                      label: "Service"
                    }
                  : {
                      color: "bg-gradient-to-r from-slate-600 to-slate-700 text-white",
                      icon: "📋",
                      label: "Service"
                    }

                // Rating display
                const averageRating = service.averageRating ? parseFloat(service.averageRating.toString()) : 0
                const totalRatings = service.totalRatings || 0

                return (
                  <div key={service.id} className="group">
                    <Card className="h-full bg-white hover:bg-gradient-to-br hover:from-white hover:to-slate-50 border-2 border-slate-200 hover:border-amber-300 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden">
                      {/* Enhanced Image Section with ServiceShowcase Integration */}
                      <div className="relative">
                        {galleryUrls.length > 1 ? (
                          // Use ServiceShowcase for multiple images
                          <div className="aspect-[16/12] relative">
                            <ServiceShowcase 
                              images={[mainImage, ...galleryUrls].filter(Boolean)}
                              serviceName={service.name}
                            />
                          </div>
                        ) : (
                          // Single image display
                          <div className="aspect-[16/12] relative overflow-hidden">
                            <Image
                              src={mainImage as string}
                              alt={service.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            
                            {/* Premium Dark Overlay for single images */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                          </div>
                        )}
                        
                        {/* Overlay Content (only for single images) */}
                        {galleryUrls.length <= 1 && (
                          <>
                            {/* Category Badge - Top Left */}
                            <div className="absolute top-4 left-4 z-10">
                              <Badge className={`${categoryStyle.color} shadow-lg font-bold px-3 py-2 text-sm border-0`}>
                                <span className="mr-2">{categoryStyle.icon}</span>
                                {categoryStyle.label}
                              </Badge>
                            </div>

                            {/* Rating Badge - Top Right (if no gallery) */}
                            {totalRatings > 0 && (
                              <div className="absolute top-4 right-4 z-10 bg-amber-500 text-white px-3 py-2 rounded-lg shadow-lg">
                                <div className="flex items-center gap-1 font-bold text-sm">
                                  <Star className="h-4 w-4 fill-current" />
                                  {averageRating.toFixed(1)}
                                </div>
                              </div>
                            )}

                            {/* Price Badge - Bottom Right */}
                            <div className="absolute bottom-4 right-4 z-10">
                              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-2 rounded-xl shadow-2xl border-2 border-white/20">
                                <div className="text-xl font-black tracking-tight">
                                  {formatPrice(service.price)}
                                </div>
                              </div>
                            </div>

                            {/* Duration Badge - Bottom Left */}
                            <div className="absolute bottom-4 left-4 z-10 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
                              <div className="flex items-center gap-2 text-sm font-semibold">
                                <Clock className="w-4 h-4 text-amber-400" />
                                {service.duration} min
                              </div>
                            </div>
                          </>
                        )}

                        {/* Gallery Indicator for carousel */}
                        {galleryUrls.length > 1 && (
                          <div className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            Gallery ({galleryUrls.length + 1})
                          </div>
                        )}
                      </div>

                      {/* Enhanced Content Section */}
                      <CardContent className="p-6 space-y-5">
                        {/* Service Header with Category and Price for carousel cards */}
                        {galleryUrls.length > 1 && (
                          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <Badge className={`${categoryStyle.color} shadow-sm font-bold px-3 py-2 text-sm border-0`}>
                              <span className="mr-2">{categoryStyle.icon}</span>
                              {categoryStyle.label}
                            </Badge>
                            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-2 rounded-xl shadow-lg">
                              <div className="text-lg font-black tracking-tight">
                                {formatPrice(service.price)}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Service Name & Duration */}
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h3 className="font-black text-2xl text-slate-800 group-hover:text-amber-700 transition-colors duration-300 leading-tight flex-1">
                              {service.name}
                            </h3>
                            {galleryUrls.length > 1 && (
                              <div className="ml-4 bg-slate-100 text-slate-700 px-3 py-1 rounded-lg flex items-center gap-2 text-sm font-semibold">
                                <Clock className="w-4 h-4 text-amber-600" />
                                {service.duration} min
                              </div>
                            )}
                          </div>

                          {/* Rating & Reviews */}
                          <div className="flex items-center justify-between">
                            {totalRatings > 0 ? (
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`h-4 w-4 ${i < Math.round(averageRating) 
                                          ? 'fill-amber-400 text-amber-400' 
                                          : 'fill-slate-200 text-slate-200'}`} 
                                      />
                                    ))}
                                  </div>
                                  <span className="font-bold text-amber-800 ml-2">
                                    {averageRating.toFixed(1)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-slate-500 text-sm">
                                  <Users className="h-4 w-4" />
                                  {totalRatings} reviews
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-slate-400">
                                <Star className="h-5 w-5" />
                                <span className="text-sm font-medium">New Service</span>
                              </div>
                            )}

                            {/* Gallery indicator for carousel cards */}
                            {galleryUrls.length > 1 && (
                              <div className="flex items-center gap-1 text-amber-600 text-sm font-medium">
                                <Eye className="w-4 h-4" />
                                Interactive Gallery
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        {service.description && (
                          <div className="text-slate-600 leading-relaxed text-sm line-clamp-2">
                            <div dangerouslySetInnerHTML={{ __html: service.description }} />
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          <Link 
                            href={`/${service.id}`}
                            className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white font-bold py-4 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:shadow-slate-500/25 group"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <span>View Details</span>
                              <div className="w-2 h-2 bg-white rounded-full group-hover:w-6 transition-all duration-300"></div>
                            </div>
                          </Link>
                          <Link
                            href={`/booking/${service.id}`}
                            className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/25 group"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Calendar className="w-5 h-5" />
                              <span>Book Now</span>
                            </div>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>

            {/* Enhanced View All Services Button */}
            <div className="text-center">
              <Link 
                href="/service"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-500/25 group"
              >
                <span>View All Services</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-12 shadow-lg border-2 border-dashed border-slate-300">
              <Scissors className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">No Services Available</h3>
              <p className="text-slate-500">We're working on adding amazing services for you. Check back soon!</p>
            </div>
          </div>
        )}
      </section>

      {/* Premium Call to Action Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
        
        <div className="relative container mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            <Scissors className="w-4 h-4" />
            PREMIUM EXPERIENCE AWAITS
          </div>
          
          <h2 className="text-4xl font-black text-white">
            Ready for Your Next Look?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Book your appointment today and experience the craftsmanship of our master barbers. 
            Your perfect style is just a click away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link 
              href="/service"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/25 inline-flex items-center justify-center gap-2 group"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link 
              href="/about"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 group"
            >
              <span>About Our Barbers</span>
              <div className="w-2 h-2 bg-current rounded-full group-hover:w-6 transition-all duration-300"></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage