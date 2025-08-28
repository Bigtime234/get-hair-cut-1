// NEW FILE: app/components/services/service-showcase.tsx
// CREATE THIS FILE: app/components/services/service-showcase.tsx
// Service image carousel/gallery component
"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, ImageIcon, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import placeholder from "@/public/Barber2.jpg"

type ServiceShowcaseProps = {
  images: string[]
  serviceName: string
}

export default function ServiceShowcase({ images, serviceName }: ServiceShowcaseProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Filter out empty or placeholder images and add fallback
  const validImages = images.filter(img => img && img.trim() !== "") 
  const displayImages = validImages.length > 0 ? validImages : [placeholder.src]
  
  const handlePreviousImage = useCallback(() => {
    setSelectedImageIndex(prev => 
      prev === 0 ? displayImages.length - 1 : prev - 1
    )
  }, [displayImages.length])
  
  const handleNextImage = useCallback(() => {
    setSelectedImageIndex(prev => 
      prev === displayImages.length - 1 ? 0 : prev + 1
    )
  }, [displayImages.length])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || displayImages.length <= 1) return

    const interval = setInterval(() => {
      handleNextImage()
    }, 3000) // 3 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, displayImages.length, handleNextImage])

  // Pause auto-play on manual navigation
  const handleManualPrevious = () => {
    setIsAutoPlaying(false)
    handlePreviousImage()
  }

  const handleManualNext = () => {
    setIsAutoPlaying(false)
    handleNextImage()
  }

  const handleThumbnailClick = (index: number) => {
    setIsAutoPlaying(false)
    setSelectedImageIndex(index)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative group">
        <div className="aspect-square w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg bg-slate-50">
          <Image
            src={displayImages[selectedImageIndex]}
            alt={`${serviceName} - Image ${selectedImageIndex + 1}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          
          {/* Image Counter */}
          {displayImages.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
              {selectedImageIndex + 1} / {displayImages.length}
            </div>
          )}

          {/* Auto-play Control */}
          {displayImages.length > 1 && (
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleAutoPlay}
                className="bg-black/60 hover:bg-black/80 text-white border-0 rounded-full px-3"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-1" />
                    <span className="text-xs">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-1" />
                    <span className="text-xs">Play</span>
                  </>
                )}
              </Button>
            </div>
          )}
          
          {/* Navigation Arrows */}
          {displayImages.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg"
                onClick={handleManualPrevious}
              >
                <ChevronLeft className="h-6 w-6 text-slate-700" />
              </Button>
              
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg"
                onClick={handleManualNext}
              >
                <ChevronRight className="h-6 w-6 text-slate-700" />
              </Button>
            </>
          )}

          {/* Progress Bar for Auto-play */}
          {displayImages.length > 1 && isAutoPlaying && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="w-full bg-white/20 rounded-full h-1">
                <div 
                  className="bg-white h-1 rounded-full transition-all duration-75 ease-linear"
                  style={{
                    animation: isAutoPlaying ? 'progress 3s linear infinite' : 'none'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Thumbnail Navigation */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 justify-center overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200",
                selectedImageIndex === index
                  ? "border-amber-500 ring-2 ring-amber-200 scale-110"
                  : "border-slate-300 hover:border-amber-300 hover:scale-105"
              )}
            >
              <Image
                src={image}
                alt={`${serviceName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {/* Thumbnail indicator for auto-playing image */}
              {selectedImageIndex === index && isAutoPlaying && (
                <div className="absolute inset-0 bg-amber-500/20 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      )}
      
      {/* Auto-play Status Indicator */}
      {displayImages.length > 1 && (
        <div className="text-center">
          <span className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors",
            isAutoPlaying 
              ? "bg-green-100 text-green-800" 
              : "bg-gray-100 text-gray-600"
          )}>
            {isAutoPlaying ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Auto-playing every 3 seconds
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-2" />
                Auto-play paused
              </>
            )}
          </span>
        </div>
      )}
      
      {/* No Images Placeholder */}
      {validImages.length === 0 && (
        <div className="text-center py-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300">
          <ImageIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">No images available for this service</p>
          <p className="text-slate-400 text-sm">Using placeholder image</p>
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}