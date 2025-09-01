"use client"

import { useMemo } from "react"
import {
  Filter,
  X,
  Camera,
  Check,
  Shield,
  MessageCircle,
  Star,
  Clock,
  Scissors,
  Award,
  Sparkles,
  TrendingUp,
  Users,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ReviewFiltersProps = {
  filters: any
  onFilterChangeAction: (key: string, value: any) => void
  onClearFiltersAction: () => void
  totalReviews: number
  filteredCount: number
}

export default function ReviewFilters({
  filters,
  onFilterChangeAction,
  onClearFiltersAction,
  totalReviews,
  filteredCount,
}: ReviewFiltersProps) {
  const serviceOptions = [
    { value: "all", label: "All Services", icon: Scissors },
    { value: "signature-cut", label: "Signature Cut & Style", icon: Award },
    { value: "beard-sculpting", label: "Beard Sculpting", icon: Scissors },
    { value: "hot-towel-shave", label: "Hot Towel Shave", icon: Sparkles },
    { value: "hair-wash", label: "Hair Wash & Treatment", icon: Users },
    { value: "styling", label: "Hair Styling", icon: TrendingUp },
    { value: "consultation", label: "Style Consultation", icon: MessageCircle },
  ]

  const ratingOptions = [
    { value: "all", label: "All Ratings", stars: 0 },
    { value: "5", label: "5 Stars", stars: 5 },
    { value: "4", label: "4+ Stars", stars: 4 },
    { value: "3", label: "3+ Stars", stars: 3 },
    { value: "2", label: "2+ Stars", stars: 2 },
    { value: "1", label: "1+ Stars", stars: 1 },
  ]

  const sortOptions = [
    { value: "newest", label: "Most Recent", icon: Clock },
    { value: "oldest", label: "Oldest First", icon: Clock },
    { value: "highest-rating", label: "Top Rated", icon: Star },
    { value: "lowest-rating", label: "Lowest Rating", icon: Star },
    { value: "most-helpful", label: "Most Helpful", icon: TrendingUp },
  ]

  const sourceOptions = [
    { value: "all", label: "All Sources", icon: Search },
    { value: "google", label: "Google Reviews", icon: Star },
    { value: "local", label: "Direct Reviews", icon: Users },
    { value: "verified", label: "Verified Only", icon: Shield },
  ]

  const hasActiveFilters = useMemo(() => {
    return (
      filters?.service !== "all" ||
      filters?.rating !== "all" ||
      filters?.source !== "all" ||
      filters?.hasPhotos ||
      filters?.isVerified ||
      filters?.hasResponse
    )
  }, [filters])

  const getFilterPercentage = () => {
    return totalReviews > 0 ? Math.round((filteredCount / totalReviews) * 100) : 0
  }

  return (
    <div className="relative bg-white rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30" />
      
      {/* Premium accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      
      <div className="relative z-10 p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-2xl text-gray-900 tracking-tight">
                Filter Reviews
              </h3>
              <p className="text-gray-600 font-medium">
                Find exactly what you're looking for
              </p>
            </div>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFiltersAction}
              className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 transition-all duration-300"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-semibold">Clear All</span>
            </Button>
          )}
        </div>

        {/* Results Statistics */}
        <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-gray-900">{filteredCount}</span>
                <span className="text-lg text-gray-600">of {totalReviews} reviews</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700 ease-out"
                    style={{ width: `${getFilterPercentage()}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-blue-600">
                  {getFilterPercentage()}% shown
                </span>
              </div>
            </div>
            
            {hasActiveFilters && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500 rounded-full shadow-md">
                <Filter className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white">Active</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Filter Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Service Filter */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Scissors className="w-5 h-5 text-blue-600" />
              <label className="text-sm font-bold text-gray-800">
                Service Type
              </label>
            </div>
            <Select
              value={filters?.service || "all"}
              onValueChange={(value) => onFilterChangeAction("service", value)}
            >
              <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-blue-300 rounded-xl bg-white shadow-sm transition-all duration-300">
                <SelectValue placeholder="Choose service type" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-xl border-0">
                {serviceOptions.map((opt) => {
                  const IconComponent = opt.icon
                  return (
                    <SelectItem 
                      key={opt.value} 
                      value={opt.value}
                      className="flex items-center py-3 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent size={16} className="text-blue-600" />
                        <span className="font-medium">{opt.label}</span>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Rating Filter */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <label className="text-sm font-bold text-gray-800">
                Minimum Rating
              </label>
            </div>
            <Select
              value={filters?.rating || "all"}
              onValueChange={(value) => onFilterChangeAction("rating", value)}
            >
              <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-amber-300 rounded-xl bg-white shadow-sm transition-all duration-300">
                <SelectValue placeholder="Choose rating" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-xl border-0">
                {ratingOptions.map((opt) => (
                  <SelectItem 
                    key={opt.value} 
                    value={opt.value}
                    className="flex items-center py-3 hover:bg-amber-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex">
                        {Array.from({ length: opt.stars || 1 }, (_, i) => (
                          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <span className="font-medium">{opt.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Source Filter */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <label className="text-sm font-bold text-gray-800">
                Review Source
              </label>
            </div>
            <Select
              value={filters?.source || "all"}
              onValueChange={(value) => onFilterChangeAction("source", value)}
            >
              <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-green-300 rounded-xl bg-white shadow-sm transition-all duration-300">
                <SelectValue placeholder="Choose source" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-xl border-0">
                {sourceOptions.map((opt) => {
                  const IconComponent = opt.icon
                  return (
                    <SelectItem 
                      key={opt.value} 
                      value={opt.value}
                      className="flex items-center py-3 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent size={16} className="text-green-600" />
                        <span className="font-medium">{opt.label}</span>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Filter */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <label className="text-sm font-bold text-gray-800">
                Sort Order
              </label>
            </div>
            <Select
              value={filters?.sortBy || "newest"}
              onValueChange={(value) => onFilterChangeAction("sortBy", value)}
            >
              <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-purple-300 rounded-xl bg-white shadow-sm transition-all duration-300">
                <SelectValue placeholder="Choose sort order" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-xl border-0">
                {sortOptions.map((opt) => {
                  const IconComponent = opt.icon
                  return (
                    <SelectItem 
                      key={opt.value} 
                      value={opt.value}
                      className="flex items-center py-3 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent size={16} className="text-purple-600" />
                        <span className="font-medium">{opt.label}</span>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Premium Toggle Filters */}
        <div className="space-y-4 mt-8">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h4 className="font-bold text-gray-900">Premium Filters</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Photos Filter */}
            <button
              onClick={() => onFilterChangeAction("hasPhotos", !filters?.hasPhotos)}
              className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                filters?.hasPhotos
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-500 shadow-lg shadow-blue-500/25"
                  : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  filters?.hasPhotos ? "bg-white/20" : "bg-blue-50"
                }`}>
                  <Camera className={`w-5 h-5 ${
                    filters?.hasPhotos ? "text-white" : "text-blue-600"
                  }`} />
                </div>
                <span className={`text-sm font-bold ${
                  filters?.hasPhotos ? "text-white" : "text-gray-700"
                }`}>
                  With Photos
                </span>
                {filters?.hasPhotos && (
                  <Check className="w-4 h-4 text-white absolute top-2 right-2" />
                )}
              </div>
            </button>

            {/* Verified Filter */}
            <button
              onClick={() => onFilterChangeAction("isVerified", !filters?.isVerified)}
              className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                filters?.isVerified
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 border-green-500 shadow-lg shadow-green-500/25"
                  : "bg-white border-gray-200 hover:border-green-300 hover:shadow-md"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  filters?.isVerified ? "bg-white/20" : "bg-green-50"
                }`}>
                  <Shield className={`w-5 h-5 ${
                    filters?.isVerified ? "text-white" : "text-green-600"
                  }`} />
                </div>
                <span className={`text-sm font-bold ${
                  filters?.isVerified ? "text-white" : "text-gray-700"
                }`}>
                  Verified Only
                </span>
                {filters?.isVerified && (
                  <Check className="w-4 h-4 text-white absolute top-2 right-2" />
                )}
              </div>
            </button>

            {/* Response Filter */}
            <button
              onClick={() => onFilterChangeAction("hasResponse", !filters?.hasResponse)}
              className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                filters?.hasResponse
                  ? "bg-gradient-to-r from-purple-500 to-indigo-600 border-purple-500 shadow-lg shadow-purple-500/25"
                  : "bg-white border-gray-200 hover:border-purple-300 hover:shadow-md"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  filters?.hasResponse ? "bg-white/20" : "bg-purple-50"
                }`}>
                  <MessageCircle className={`w-5 h-5 ${
                    filters?.hasResponse ? "text-white" : "text-purple-600"
                  }`} />
                </div>
                <span className={`text-sm font-bold ${
                  filters?.hasResponse ? "text-white" : "text-gray-700"
                }`}>
                  With Response
                </span>
                {filters?.hasResponse && (
                  <Check className="w-4 h-4 text-white absolute top-2 right-2" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Quick Action Filters */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="w-5 h-5 text-gold-600" />
            <h4 className="font-bold text-gray-900">Quick Filters</h4>
            <span className="px-2 py-1 bg-gold-100 text-gold-600 text-xs font-bold rounded-full">
              POPULAR
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => {
                onFilterChangeAction("rating", "5")
                onFilterChangeAction("hasPhotos", true)
              }}
              className="group p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl hover:from-amber-100 hover:to-yellow-100 hover:border-amber-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="font-bold text-amber-700">5★ with Photos</span>
              </div>
            </button>

            <button
              onClick={() => {
                onFilterChangeAction("source", "verified")
                onFilterChangeAction("hasResponse", true)
              }}
              className="group p-4 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl hover:from-emerald-100 hover:to-green-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-emerald-700">Premium Reviews</span>
              </div>
            </button>

            <button
              onClick={() => {
                onFilterChangeAction("sortBy", "newest")
                onFilterChangeAction("rating", "4")
              }}
              className="group p-4 bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl hover:from-violet-100 hover:to-purple-100 hover:border-violet-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5 text-violet-600" />
                <span className="font-bold text-violet-700">Recent & High</span>
              </div>
            </button>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-blue-800">
                  Active filters applied
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {Object.values(filters || {}).filter(Boolean).length} active
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-100/50 to-transparent rounded-full -mr-16 -mb-16" />
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-100/50 to-transparent rounded-full -ml-12 -mt-12" />
    </div>
  )
}