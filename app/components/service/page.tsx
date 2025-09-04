import { db } from "@/server"
import { services } from "@/server/schema"
import { eq, desc } from "drizzle-orm"
import ServiceType from "./service-type"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, Calendar, Scissors, Camera, Eye, Play, Zap, Award } from "lucide-react"
import placeholder from "@/public/Barber2.jpg"
import ServiceShowcase from "./service-showcase"

export const metadata = {
  title: "Our Services - Professional Barber Services",
  description: "Discover our range of professional barber services including haircuts, beard care, styling, and treatments.",
}

   export const revalidate = 30;

export default async function ServicesPage() {
  // Enhanced querying like your product example
  const allServices = await db.query.services.findMany({
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
  })

  if (!allServices || allServices.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Our Services</h1>
          <p className="text-slate-600">No services available at the moment.</p>
        </div>
      </main>
    )
  }

  // Format price helper
  const formatPrice = (price: string | number) => {
    const priceValue = typeof price === 'string' ? parseFloat(price) : price
    return new Intl.NumberFormat("en-NG", {
      currency: "NGN",
      style: "currency",
    }).format(isNaN(priceValue) ? 0 : priceValue)
  }

  // Enhanced category configuration with professional barber styling - EXACTLY like homepage
  const categoryConfig = {
    haircut: { 
      color: "bg-gradient-to-br from-blue-500 to-blue-600 text-white border border-blue-400/50", 
      icon: <Scissors className="w-4 h-4" />,
      label: "Premium Cut",
      accent: "blue"
    },
    beard: { 
      color: "bg-gradient-to-br from-amber-500 to-orange-600 text-white border border-orange-400/50", 
      icon: "🧔",
      label: "Beard Mastery",
      accent: "amber"
    },
    styling: { 
      color: "bg-gradient-to-br from-purple-500 to-purple-600 text-white border border-purple-400/50", 
      icon: "💇‍♂️",
      label: "Style Expert",
      accent: "purple"
    },
    wash: { 
      color: "bg-gradient-to-br from-cyan-500 to-teal-600 text-white border border-teal-400/50", 
      icon: "🚿",
      label: "Deep Cleanse",
      accent: "cyan"
    },
    treatment: { 
      color: "bg-gradient-to-br from-emerald-500 to-green-600 text-white border border-green-400/50", 
      icon: "🧴",
      label: "Treatment Pro",
      accent: "emerald"
    },
    combo: { 
      color: "bg-gradient-to-br from-rose-500 to-pink-600 text-white border border-pink-400/50", 
      icon: "🎯",
      label: "Ultimate Package",
      accent: "rose"
    },
  }

  return (
    <main className="space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
          <Award className="w-5 h-5" />
          ALL SERVICES
          <Zap className="w-4 h-4" />
        </div>
        <h1 className="text-5xl font-black  mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Master Barber Services
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Experience the artistry of premium barbering with our handcrafted services designed to elevate your style
        </p>
      </div>

      {/* Service Categories */}
      <ServiceType services={allServices} />

      {/* Premium Services Grid - EXACTLY like homepage */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {allServices.map((service) => {
              // Parse gallery images
              let galleryUrls: string[] = []
              try {
                if (service.galleryUrls && service.galleryUrls !== "null") {
                  galleryUrls = JSON.parse(service.galleryUrls)
                }
              } catch (error) {
                galleryUrls = []
              }

              // Determine main image
              const hasValidImage = service.imageUrl && 
                service.imageUrl !== "" && 
                !service.imageUrl.includes("placeholder") && 
                !service.imageUrl.includes("Barber2.jpg")
              
              const mainImage: string = hasValidImage ? (service.imageUrl as string) : placeholder.src

              // Category styling
              const categoryStyle = service.category 
                ? categoryConfig[service.category as keyof typeof categoryConfig] || {
                    color: "bg-gradient-to-br from-slate-600 to-slate-700 text-white border border-slate-500/50",
                    icon: "📋",
                    label: "Premium Service",
                    accent: "slate"
                  }
                : {
                    color: "bg-gradient-to-br from-slate-600 to-slate-700 text-white border border-slate-500/50",
                    icon: "📋", 
                    label: "Premium Service",
                    accent: "slate"
                  }

              // Rating display
              const averageRating = service.averageRating ? parseFloat(service.averageRating.toString()) : 0
              const totalRatings = service.totalRatings || 0

              return (
                <div key={service.id} className="group">
                  <Card className="h-full bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden hover:scale-[1.02] transform p-0 m-0">
                    {/* Full-Width Image Section - Optimized Height */}
                    <div className="relative w-full h-[300px] overflow-hidden m-0 p-0 rounded-t-2xl">
                      {galleryUrls.length > 1 ? (
                        // Use ServiceShowcase for multiple images
                        <div className="w-full h-full">
                          <ServiceShowcase 
                            images={[mainImage, ...galleryUrls].filter(Boolean)}
                            serviceName={service.name}
                          />
                        </div>
                      ) : (
                        // Single image display - Zero padding, full coverage
                        <div className="absolute inset-0 w-full h-full m-0 p-0">
                          <Image
                            src={mainImage as string}
                            alt={service.name}
                            fill
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={true}
                          />
                          
                          {/* Professional Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        </div>
                      )}
                      
                      {/* Floating Badges - Only for single images */}
                      {galleryUrls.length <= 1 && (
                        <>
                          {/* Category Badge - Floating Top Left */}
                          <div className="absolute top-4 left-4 z-20">
                            <Badge className={`${categoryStyle.color} shadow-xl font-black px-4 py-2 text-xs tracking-wider backdrop-blur-sm`}>
                              <span className="mr-2">{categoryStyle.icon}</span>
                              {categoryStyle.label}
                            </Badge>
                          </div>

                          {/* Rating Badge - Top Right */}
                          {totalRatings > 0 && (
                            <div className="absolute top-4 right-4 z-20">
                              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-xl shadow-xl backdrop-blur-sm border border-white/20">
                                <div className="flex items-center gap-2 font-black text-sm">
                                  <Star className="h-4 w-4 fill-current" />
                                  {averageRating.toFixed(1)}
                                  <span className="text-xs opacity-80">({totalRatings})</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Price Badge - Floating Bottom Right */}
                          <div className="absolute bottom-4 right-4 z-20">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-white/30 backdrop-blur-sm">
                              <div className="text-xl font-black tracking-tight">
                                {formatPrice(service.price)}
                              </div>
                            </div>
                          </div>

                          {/* Duration Badge - Bottom Left */}
                          <div className="absolute bottom-4 left-4 z-20">
                            <div className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/20 shadow-xl">
                              <div className="flex items-center gap-2 text-sm font-bold">
                                <Clock className="w-4 h-4 text-amber-400" />
                                {service.duration} min
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Gallery Indicator */}
                      {galleryUrls.length > 1 && (
                        <div className="absolute top-4 right-4 z-30 bg-black/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-white/20">
                          <Play className="w-4 h-4 text-amber-400" />
                          {galleryUrls.length + 1} Photos
                        </div>
                      )}
                    </div>

                    {/* Enhanced Content Section - Compact */}
                    <CardContent className="p-4 space-y-3">
                      {/* Header for Gallery Cards */}
                      {galleryUrls.length > 1 && (
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                          <Badge className={`${categoryStyle.color} shadow-lg font-black px-4 py-2 text-xs tracking-wider`}>
                            <span className="mr-2">{categoryStyle.icon}</span>
                            {categoryStyle.label}
                          </Badge>
                          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl shadow-lg">
                            <div className="text-lg font-black">
                              {formatPrice(service.price)}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Service Title & Meta */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-black text-xl text-slate-900 group-hover:text-amber-700 transition-colors duration-300 leading-tight line-clamp-2">
                            {service.name}
                          </h3>
                          {galleryUrls.length > 1 && (
                            <div className="bg-slate-100 text-slate-700 px-3 py-2 rounded-xl flex items-center gap-2 text-sm font-bold whitespace-nowrap">
                              <Clock className="w-4 h-4 text-amber-600" />
                              {service.duration}m
                            </div>
                          )}
                        </div>

                        {/* Enhanced Rating & Social Proof */}
                        <div className="flex items-center justify-between">
                          {totalRatings > 0 ? (
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-xl border border-orange-200/50">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < Math.round(averageRating) 
                                        ? 'fill-yellow-400 text-yellow-400' 
                                        : 'fill-slate-200 text-slate-200'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="font-black text-orange-800">
                                  {averageRating.toFixed(1)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-slate-500 text-sm font-medium">
                                <Users className="h-4 w-4" />
                                {totalRatings} reviews
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">
                              <Star className="h-4 w-4 text-slate-400" />
                              <span className="text-sm font-bold text-slate-600">New Service</span>
                            </div>
                          )}

                          {galleryUrls.length > 1 && (
                            <div className="flex items-center gap-2 text-amber-600 text-sm font-bold bg-amber-50 px-3 py-2 rounded-xl border border-amber-200">
                              <Eye className="w-4 h-4" />
                              Gallery
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Professional Description - Compact */}
                      {service.description && (
                        <div className="text-slate-600 leading-relaxed text-xs line-clamp-2 bg-slate-50 p-3 rounded-lg">
                          <div dangerouslySetInnerHTML={{ __html: service.description }} />
                        </div>
                      )}

                      {/* Compact Action Buttons */}
                      <div className="flex gap-2 pt-3">
                        <Link 
                          href={`/${service.id}`}
                          className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white font-bold py-3 px-3 rounded-lg text-center transition-all duration-300 hover:shadow-lg group/btn border border-slate-700 text-sm"
                        >
                          <div className="flex items-center justify-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>Details</span>
                          </div>
                        </Link>
                        <Link
                          href={`/book/${service.id}`}
                          className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-3 rounded-lg text-center transition-all duration-300 hover:shadow-lg group/btn border border-orange-500 text-sm"
                        >
                          <div className="flex items-center justify-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Book</span>
                          </div>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Premium Call to Action */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black py-20 rounded-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.03&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
        
        <div className="relative container mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full text-sm font-black shadow-xl">
            <Award className="w-5 h-5" />
            PREMIUM EXPERIENCE AWAITS
            <Zap className="w-4 h-4" />
          </div>
          
          <h2 className="text-5xl font-black text-white">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Our master barbers specialize in custom cuts and personalized grooming experiences. 
            Let's discuss your vision and craft something unique.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link 
              href="/contact"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-orange-600 hover:to-red-600 text-white font-black py-5 px-10 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 inline-flex items-center justify-center gap-3 group text-lg border border-orange-500"
            >
              <span>Contact Master Barber</span>
              <div className="w-2 h-2 bg-white rounded-full group-hover:w-8 transition-all duration-300"></div>
            </Link>
            <Link 
              href="/about"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-black py-5 px-10 rounded-2xl transition-all duration-300 inline-flex items-center justify-center gap-3 group text-lg hover:shadow-2xl hover:shadow-white/20"
            >
              <span>Meet Our Barbers</span>
              <div className="w-2 h-2 bg-current rounded-full group-hover:w-8 transition-all duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}