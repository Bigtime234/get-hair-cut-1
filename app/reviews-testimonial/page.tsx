"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Users,
  Shield,
  Search,
  RotateCcw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FeauturedTestimonials from "./components/FeauturedTestimonials";
import ReviewCard from "./components/ReviewCard";
import ReviewFilters from "./components/ReviewFilters";
// import ReviewStats from "./components/ReviewStats";
import TrustSignals from "./components/TrustSignals";

// Main Reviews Page
export default function ReviewsTestimonials() {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [photoViewerIndex, setPhotoViewerIndex] = useState(0);
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);

  const [filters, setFilters] = useState({
    service: "all",
    rating: "all",
    source: "all",
    sortBy: "newest",
    hasPhotos: false,
    isVerified: false,
    hasResponse: false,
  });

  // ✅ Mock data (replace with API later)
  const mockStats = {
    averageRating: 4.8,
    totalReviews: 127,
    verifiedReviews: 98,
  };

  const mockReviews = [
    {
      id: 1,
      clientName: "James Mitchell",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      date: "2025-01-15T10:30:00Z",
      service: "Signature Cut & Style",
      comment:
        "Absolutely exceptional service! Marcus transformed my look completely.",
      photos: [
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400",
      ],
      source: "google",
      isVerified: true,
      helpfulCount: 12,
    },
  ];

  const mockTestimonials = [
    {
      id: 1,
      clientName: "Jonathan Hayes",
      clientTitle: "Business Executive",
      clientAvatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
      location: "London, UK",
      rating: 5,
      service: "Signature Cut & Style",
      date: "January 2025",
      quote:
        "Marcus completely transformed my professional image. The precision and artistry in his work is unmatched.",
      hasVideo: true,
      videoUrl: "#",
      beforeAfter: {
        before:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        after:
          "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400",
      },
    },
  ];

  const mockAwards = [
    {
      title: "Best Barber 2024",
      organization: "London Grooming Awards",
      year: "2024",
    },
  ];

  const mockCertifications = [
    {
      name: "Advanced Barbering Techniques",
      issuer: "London Barbering Institute",
      expiry: "2026",
    },
  ];

  const mockMediaFeatures = [
    {
      headline: "The Art of Modern Barbering",
      publication: "London Style Magazine",
      date: "March 2024",
      logo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100",
    },
  ];

  const mockAssociations = [
    {
      name: "UK Barbering Association",
      logo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100",
    },
  ];

  // ✅ Filters
  const filteredReviews = mockReviews.filter(() => true);
  const sortedReviews = [...filteredReviews];

  // ✅ Handlers
  const handleFilterChange = (filterType: string, value: any) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      service: "all",
      rating: "all",
      source: "all",
      sortBy: "newest",
      hasPhotos: false,
      isVerified: false,
      hasResponse: false,
    });
  };

  const handleViewPhotos = (photos: string[], startIndex = 0) => {
    setSelectedPhotos(photos);
    setPhotoViewerIndex(startIndex);
    setShowPhotoViewer(true);
  };

  const nextPhoto = () => {
    setPhotoViewerIndex((prev) => (prev + 1) % selectedPhotos.length);
  };

  const prevPhoto = () => {
    setPhotoViewerIndex(
      (prev) => (prev - 1 + selectedPhotos.length) % selectedPhotos.length
    );
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPhotoViewer(false);
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    if (showPhotoViewer) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [showPhotoViewer, selectedPhotos.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16 lg:py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Star className="text-yellow-400 fill-yellow-400 w-8 h-8" />
            <span className="text-6xl font-bold">{mockStats.averageRating}</span>
            <Star className="text-yellow-400 fill-yellow-400 w-8 h-8" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Client Reviews & Testimonials
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8">
            Discover why clients trust BarberBook Pro for their grooming needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>{mockStats.totalReviews}+ Reviews</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>{mockStats.verifiedReviews} Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-16 lg:py-24 container mx-auto px-6">
       //
      </section>

      {/* Reviews + Sidebar */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-6 grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Simple ReviewStats display */}
              <div className="bg-white rounded-lg border p-6 mb-4">
                <h3 className="text-lg font-bold mb-2">Review Stats</h3>
                <div className="flex flex-col gap-2">
                  <span>Average Rating: <b>{mockStats.averageRating}</b></span>
                  <span>Total Reviews: <b>{mockStats.totalReviews}</b></span>
                  <span>Verified Reviews: <b>{mockStats.verifiedReviews}</b></span>
                </div>
              </div>
              <TrustSignals
                awards={mockAwards}
                certifications={mockCertifications}
                mediaFeatures={mockMediaFeatures}
                associations={mockAssociations}
              />
            </div>

          {/* Main Reviews */}
          <div className="lg:col-span-3 space-y-8">
            <ReviewFilters
              filters={filters}
              onFilterChangeAction={handleFilterChange}
              onClearFiltersAction={handleClearFilters}
              totalReviews={mockReviews.length}
              filteredCount={sortedReviews.length}
            />
            
            {/* Reviews List */}
            <div className="space-y-6">
              {sortedReviews.length > 0 ? (
                sortedReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                      onViewPhotosAction={handleViewPhotos}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-card rounded-lg border">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Reviews Found</h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters to see more reviews.
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    <RotateCcw className="mr-2 w-4 h-4" /> Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Load More */}
            {sortedReviews.length >= 10 && (
              <div className="text-center">
                <Button variant="outline">
                  Load More Reviews <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Experience Excellence?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust BarberBook Pro.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => (window.location.href = "/booking-engine")}
              className="bg-primary text-white hover:bg-primary/90"
            >
              <Calendar className="mr-2 w-5 h-5" /> Book Your Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Viewer Modal */}
      {showPhotoViewer && selectedPhotos.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setShowPhotoViewer(false)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2"
            >
              <X className="text-white w-5 h-5" />
            </button>
            {selectedPhotos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3"
                >
                  <ChevronLeft className="text-white w-6 h-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3"
                >
                  <ChevronRight className="text-white w-6 h-6" />
                </button>
              </>
            )}
            <Image
              src={selectedPhotos[photoViewerIndex]}
              alt={`Photo ${photoViewerIndex + 1}`}
              width={800}
              height={600}
              className="w-full h-full object-contain"
            />
            {selectedPhotos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {photoViewerIndex + 1} / {selectedPhotos.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}