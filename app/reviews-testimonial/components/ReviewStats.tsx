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
  TrendingUp,
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
    { value: "all", label: "All Services", icon: "✂️" },
    { value: "signature-cut", label: "Signature Cut & Style", icon: "💼" },
    { value: "beard-sculpting", label: "Beard Sculpting", icon: "🧔" },
    { value: "hot-towel-shave", label: "Hot Towel Shave", icon: "🔥" },
    { value: "hair-wash", label: "Hair Wash & Treatment", icon: "🧴" },
    { value: "styling", label: "Hair Styling", icon: "✨" },
    { value: "consultation", label: "Style Consultation", icon: "💬" },
  ]

  const ratingOptions = [
    { value: "all", label: "All Ratings" },
    { value: "5", label: "⭐⭐⭐⭐⭐ (5 Stars)" },
    { value: "4", label: "⭐⭐⭐⭐ (4+ Stars)" },
    { value: "3", label: "⭐⭐⭐ (3+ Stars)" },
    { value: "2", label: "⭐⭐ (2+ Stars)" },
    { value: "1", label: "⭐ (1+ Stars)" },
  ]

  const sortOptions = [
    { value: "newest", label: "Newest First", icon: Clock },
    { value: "oldest", label: "Oldest First", icon: Clock },
    { value: "highest-rating", label: "Highest Rating", icon: Star },
    { value: "lowest-rating", label: "Lowest Rating", icon: Star },
    { value: "most-helpful", label: "Most Helpful", icon: TrendingUp },
  ]

  const sourceOptions = [
    { value: "all", label: "All Sources" },
    { value: "google", label: "Google Reviews" },
    { value: "local", label: "Direct Reviews" },
    { value: "verified", label: "Verified Only" },
  ]

  const hasActiveFilters =
    filters?.service !== "all" ||
    filters?.rating !== "all" ||
    filters?.source !== "all" ||
    filters?.hasPhotos

  const filterPercentage = totalReviews > 0 ? Math.round((filteredCount / totalReviews) * 100) : 0

  return (
    <div className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-2xl border-2 border-slate-200/50 dark:border-slate-700/50 shadow-xl backdrop-blur-sm">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100/30 to-transparent dark:from-amber-900/20 rounded-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-slate-100/40 to-transparent dark:from-slate-800/40 rounded-2xl"></div>
      
      <div className="relative p-8">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-xl shadow-lg">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-2xl bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Filter Reviews
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Find exactly what you're looking for
              </p>
            </div>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFiltersAction}
              className="flex items-center space-x-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-200 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2"
            >
              <X className="w-4 h-4" />
              <span className="font-medium">Clear All</span>
            </Button>
          )}
        </div>

        {/* Enhanced Results Count */}
        <div className="mb-8 p-5 bg-gradient-to-r from-slate-100/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-700/80 rounded-xl border border-slate-200/50 dark:border-slate-600/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-500 p-2 rounded-lg">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  {filteredCount} Reviews Found
                </span>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Out of {totalReviews} total reviews ({filterPercentage}%)
                </p>
              </div>
            </div>
            {hasActiveFilters && (
              <div className="flex items-center space-x-2 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                <Filter className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  Filtered
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Filter Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Service Filter */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Scissors className="w-4 h-4 text-amber-500" />
              <span>Service Type</span>
            </label>
            <Select
              value={filters?.service}
              onValueChange={(value) => onFilterChangeAction("service", value)}
            >
              <SelectTrigger className="h-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:border-amber-300 dark:hover:border-amber-600 transition-colors duration-200 bg-white/50 dark:bg-slate-800/50">
                <SelectValue placeholder="Choose a service" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 border-slate-200 dark:border-slate-600">
                {serviceOptions.map((opt) => (
                  <SelectItem 
                    key={opt.value} 
                    value={opt.value}
                    className="hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg m-1"
                  >
                    <span className="flex items-center space-x-2">
                      <span>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Rating</span>
            </label>
            <Select
              value={filters?.rating}
              onValueChange={(value) => onFilterChangeAction("rating", value)}
            >
              <SelectTrigger className="h-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:border-amber-300 dark:hover:border-amber-600 transition-colors duration-200 bg-white/50 dark:bg-slate-800/50">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 border-slate-200 dark:border-slate-600">
                {ratingOptions.map((opt) => (
                  <SelectItem 
                    key={opt.value} 
                    value={opt.value}
                    className="hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg m-1"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Source Filter */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Shield className="w-4 h-4 text-amber-500" />
              <span>Review Source</span>
            </label>
            <Select
              value={filters?.source}
              onValueChange={(value) => onFilterChangeAction("source", value)}
            >
              <SelectTrigger className="h-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:border-amber-300 dark:hover:border-amber-600 transition-colors duration-200 bg-white/50 dark:bg-slate-800/50">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 border-slate-200 dark:border-slate-600">
                {sourceOptions.map((opt) => (
                  <SelectItem 
                    key={opt.value} 
                    value={opt.value}
                    className="hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg m-1"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Filter */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>Sort By</span>
            </label>
            <Select
              value={filters?.sortBy}
              onValueChange={(value) => onFilterChangeAction("sortBy", value)}
            >
              <SelectTrigger className="h-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:border-amber-300 dark:hover:border-amber-600 transition-colors duration-200 bg-white/50 dark:bg-slate-800/50">
                <SelectValue placeholder="Choose sort order" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 border-slate-200 dark:border-slate-600">
                {sortOptions.map((opt) => {
                  const IconComponent = opt.icon
                  return (
                    <SelectItem 
                      key={opt.value} 
                      value={opt.value}
                      className="hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg m-1"
                    >
                      <span className="flex items-center space-x-2">
                        <IconComponent className="w-4 h-4" />
                        <span>{opt.label}</span>
                      </span>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Enhanced Additional Filters */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-slate-600 to-slate-500 p-2 rounded-lg">
              <Award className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">
              Advanced Filters
            </h4>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Photos Filter */}
            <Button
              variant={filters?.hasPhotos ? "default" : "outline"}
              size="lg"
              onClick={() => onFilterChangeAction("hasPhotos", !filters?.hasPhotos)}
              className={`
                relative overflow-hidden transition-all duration-300 rounded-xl border-2 h-14 px-6
                ${filters?.hasPhotos 
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 border-amber-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40" 
                  : "border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 hover:border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <Camera className="w-5 h-5" />
                <span className="font-medium">With Photos</span>
                {filters?.hasPhotos && (
                  <div className="bg-white/20 rounded-full p-1">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            </Button>

            {/* Verified Filter */}
            <Button
              variant={filters?.isVerified ? "default" : "outline"}
              size="lg"
              onClick={() => onFilterChangeAction("isVerified", !filters?.isVerified)}
              className={`
                relative overflow-hidden transition-all duration-300 rounded-xl border-2 h-14 px-6
                ${filters?.isVerified 
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40" 
                  : "border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Verified Only</span>
                {filters?.isVerified && (
                  <div className="bg-white/20 rounded-full p-1">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            </Button>

            {/* Response Filter */}
            <Button
              variant={filters?.hasResponse ? "default" : "outline"}
              size="lg"
              onClick={() => onFilterChangeAction("hasResponse", !filters?.hasResponse)}
              className={`
                relative overflow-hidden transition-all duration-300 rounded-xl border-2 h-14 px-6
                ${filters?.hasResponse 
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40" 
                  : "border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">With Response</span>
                {filters?.hasResponse && (
                  <div className="bg-white/20 rounded-full p-1">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* Enhanced Quick Filters */}
        <div className="mt-8 pt-8 border-t-2 border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">
              Quick Filters
            </h4>
            <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full font-medium">
              Popular
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                onFilterChangeAction("rating", "5")
                onFilterChangeAction("hasPhotos", true)
              }}
              className="h-16 border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:border-amber-300 hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100 dark:hover:from-amber-900/20 dark:hover:to-amber-800/20 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center space-y-1">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 group-hover:scale-110 transition-transform" />
                  <Camera className="w-4 h-4 text-slate-600 group-hover:text-amber-600" />
                </div>
                <span className="font-medium text-sm">5-Star with Photos</span>
              </div>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                onFilterChangeAction("source", "verified")
                onFilterChangeAction("hasResponse", true)
              }}
              className="h-16 border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:border-emerald-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-100 dark:hover:from-emerald-900/20 dark:hover:to-emerald-800/20 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center space-y-1">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <MessageCircle className="w-4 h-4 text-slate-600 group-hover:text-emerald-600" />
                </div>
                <span className="font-medium text-sm">Verified with Response</span>
              </div>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                onFilterChangeAction("sortBy", "newest")
                onFilterChangeAction("rating", "4")
              }}
              className="h-16 border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center space-y-1">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                  <Star className="w-4 h-4 text-slate-600 group-hover:text-blue-600" />
                </div>
                <span className="font-medium text-sm">Recent High Ratings</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Filter Summary Bar */}
        {hasActiveFilters && (
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-amber-500 p-1 rounded">
                  <Filter className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  Active filters applied
                </span>
              </div>
              <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                {filterPercentage}% of reviews match
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}