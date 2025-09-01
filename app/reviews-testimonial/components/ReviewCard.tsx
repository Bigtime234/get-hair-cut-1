"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  Check,
  Scissors,
  Camera,
  MapPin,
  ThumbsUp,
  Quote,
  Award,
} from "lucide-react";

interface Review {
  clientName: string;
  avatar: string;
  isVerified?: boolean;
  rating: number;
  date: string;
  source?: "google" | string;
  isLocal?: boolean;
  service?: string;
  comment?: string;
  photos?: string[];
  barberResponse?: string;
  helpfulCount?: number;
}

interface ReviewCardProps {
  review: Review;
  onViewPhotosAction: (photos: string[], index: number) => void;
}

const ReviewCard = ({ review, onViewPhotosAction }: ReviewCardProps) => {
  const [showFullText, setShowFullText] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={18}
        className={`transition-all duration-200 ${
          index < rating 
            ? "text-amber-400 fill-amber-400 drop-shadow-sm" 
            : "text-gray-300"
        }`}
      />
    ));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const commentText = review.comment ?? "";
  const shouldTruncate = commentText.length > 180;
  const displayText =
    shouldTruncate && !showFullText
      ? `${commentText.substring(0, 180)}...`
      : commentText;

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (rating >= 3.5) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getServiceIcon = (service: string) => {
    const lowerService = service.toLowerCase();
    if (lowerService.includes("haircut") || lowerService.includes("cut")) {
      return <Scissors size={14} className="text-blue-600" />;
    }
    if (lowerService.includes("beard") || lowerService.includes("trim")) {
      return <Award size={14} className="text-purple-600" />;
    }
    return <Scissors size={14} className="text-gray-600" />;
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-500 transform hover:-translate-y-1 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full ring-2 ring-gray-100 ring-offset-2 overflow-hidden">
                <Image
                  src={review.avatar}
                  alt={review.clientName}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {review.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center ring-2 ring-white shadow-lg">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-bold text-gray-900 text-lg">{review.clientName}</h4>
                {review.isLocal && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                    <MapPin size={10} className="text-white" />
                    <span className="text-xs font-semibold text-white">Local</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                  <span className="ml-2 font-bold text-gray-800">{review.rating}</span>
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  {formatDate(review.date)}
                </span>
              </div>
            </div>
          </div>

          {/* Source Badge */}
          <div className="flex flex-col items-end space-y-2">
            {review.source === "google" && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-md">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-xs font-bold text-white">Google Review</span>
              </div>
            )}
            <div className={`px-3 py-1 rounded-full border-2 ${getRatingColor(review.rating)}`}>
              <span className="text-xs font-bold">{review.rating}/5</span>
            </div>
          </div>
        </div>

        {/* Service Badge */}
        {review.service && (
          <div className="mb-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-gray-100 border border-gray-200 shadow-sm">
              {getServiceIcon(review.service)}
              <span className="ml-2 text-sm font-semibold text-gray-700">
                {review.service}
              </span>
            </div>
          </div>
        )}

        {/* Review Content with Quote styling */}
        {commentText && (
          <div className="mb-5 relative">
            <Quote size={24} className="absolute -top-2 -left-1 text-gray-300 z-0" />
            <blockquote className="relative z-10 pl-6">
              <p className="text-gray-700 leading-relaxed text-base font-medium italic">
                {displayText}
              </p>
              {shouldTruncate && (
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-semibold mt-3 transition-colors duration-200 hover:underline"
                >
                  {showFullText ? "Show less" : "Read full review"}
                </button>
              )}
            </blockquote>
          </div>
        )}

        {/* Photos */}
        {review.photos && review.photos.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
                <Camera size={16} className="text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-700">
                  {review.photos.length} photo{review.photos.length > 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {review.photos.slice(0, 4).map((photo, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 cursor-pointer group/photo"
                  onClick={() => onViewPhotosAction(review.photos!, index)}
                >
                  <div className="w-28 h-28 rounded-xl overflow-hidden ring-2 ring-gray-100 ring-offset-1 group-hover/photo:ring-blue-300 transition-all duration-300">
                    <Image
                      src={photo}
                      alt={`Review photo ${index + 1}`}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/photo:scale-110"
                    />
                  </div>
                  {index === 3 && review.photos!.length > 4 && (
                    <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        +{review.photos!.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Barber Response */}
        {review.barberResponse && (
          <div className="mb-4 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border-l-4 border-blue-500 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Scissors size={14} className="text-white" />
              </div>
              <h5 className="text-sm font-bold text-gray-800">
                Response from Barber
              </h5>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed font-medium pl-10">
              {review.barberResponse}
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsHelpful(!isHelpful)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                isHelpful
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <ThumbsUp size={14} className={isHelpful ? "fill-current" : ""} />
              <span className="text-sm font-semibold">
                Helpful {review.helpfulCount ? `(${review.helpfulCount + (isHelpful ? 1 : 0)})` : ""}
              </span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span className="px-2 py-1 bg-gray-50 rounded-full font-medium">
              Verified Review
            </span>
          </div>
        </div>
      </div>

      {/* Premium Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default ReviewCard;