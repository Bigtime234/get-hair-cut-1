"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  MoreHorizontal, CheckCircle, X, AlertTriangle, 
  Clock, Eye, Loader2 
} from "lucide-react"
import { updateBookingStatus } from "@/lib/actions/update-booking-status"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type BookingStatusActionsProps = {
  bookingId: string
  currentStatus: string
  isAdmin: boolean
  onStatusChange?: () => void
}

export function BookingStatusActions({ 
  bookingId, 
  currentStatus, 
  isAdmin,
  onStatusChange 
}: BookingStatusActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const handleStatusUpdate = async (
    newStatus: "pending" | "confirmed" | "completed" | "cancelled" | "no_show",
    reason?: string
  ) => {
    setIsLoading(true)
    
    try {
      await updateBookingStatus(bookingId, newStatus, reason)
      toast.success(`Booking ${newStatus} successfully`)
      onStatusChange?.()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update booking")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelWithReason = async () => {
    if (!cancelReason.trim()) {
      toast.error("Please provide a cancellation reason")
      return
    }
    
    await handleStatusUpdate("cancelled", cancelReason)
    setShowCancelDialog(false)
    setCancelReason("")
  }

  if (!isAdmin) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />

          {/* Pending Status Actions */}
          {currentStatus === "pending" && (
            <>
              <DropdownMenuItem 
                onClick={() => handleStatusUpdate("confirmed")}
                className="text-blue-600 focus:text-blue-600"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirm Booking
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setShowCancelDialog(true)}
                className="text-red-600 focus:text-red-600"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel Booking
              </DropdownMenuItem>
            </>
          )}

          {/* Confirmed Status Actions */}
          {currentStatus === "confirmed" && (
            <>
              <DropdownMenuItem 
                onClick={() => handleStatusUpdate("completed")}
                className="text-green-600 focus:text-green-600"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark Completed
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleStatusUpdate("no_show", "Customer did not show up")}
                className="text-orange-600 focus:text-orange-600"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Mark No-Show
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setShowCancelDialog(true)}
                className="text-red-600 focus:text-red-600"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel Booking
              </DropdownMenuItem>
            </>
          )}

          {/* Reset to Pending for Completed/Cancelled */}
          {(currentStatus === "completed" || currentStatus === "cancelled" || currentStatus === "no_show") && (
            <DropdownMenuItem 
              onClick={() => handleStatusUpdate("pending")}
              className="text-yellow-600 focus:text-yellow-600"
            >
              <Clock className="mr-2 h-4 w-4" />
              Reset to Pending
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Cancel with Reason Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Please provide a reason for cancelling this booking. The customer will be notified.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="cancel-reason">Cancellation Reason *</Label>
              <Textarea
                id="cancel-reason"
                placeholder="Please explain why you're cancelling this booking..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
                className="mt-2"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowCancelDialog(false)
                setCancelReason("")
              }}
              disabled={isLoading}
            >
              Keep Booking
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleCancelWithReason}
              disabled={isLoading || !cancelReason.trim()}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <X className="mr-2 h-4 w-4" />
              )}
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Status Badge Component
type StatusBadgeProps = {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-yellow-100 text-yellow-800 border-yellow-200": status === "pending",
          "bg-blue-100 text-blue-800 border-blue-200": status === "confirmed", 
          "bg-green-100 text-green-800 border-green-200": status === "completed",
          "bg-red-100 text-red-800 border-red-200": status === "cancelled",
          "bg-gray-100 text-gray-800 border-gray-200": status === "no_show",
        },
        className
      )}
    >
      {status === "no_show" ? "No Show" : status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

// Quick Status Actions for Admin Dashboard
type QuickActionsProps = {
  bookingId: string
  currentStatus: string
  compact?: boolean
  onStatusChange?: () => void
}

export function QuickStatusActions({ 
  bookingId, 
  currentStatus, 
  compact = false,
  onStatusChange 
}: QuickActionsProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleQuickUpdate = async (
    newStatus: "confirmed" | "completed" | "cancelled"
  ) => {
    setIsLoading(true)
    
    try {
      let reason = undefined
      if (newStatus === "cancelled") {
        reason = "Quick cancellation by admin"
      }
      
      await updateBookingStatus(bookingId, newStatus, reason)
      toast.success(`Booking ${newStatus} successfully`)
      onStatusChange?.()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update booking")
    } finally {
      setIsLoading(false)
    }
  }

  if (currentStatus === "pending") {
    return (
      <div className={cn("flex gap-1", { "flex-col": !compact })}>
        <Button 
          size="sm" 
          onClick={() => handleQuickUpdate("confirmed")}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <CheckCircle className="mr-1 h-3 w-3" />
          Confirm
        </Button>
        <Button 
          size="sm" 
          variant="destructive"
          onClick={() => handleQuickUpdate("cancelled")}
          disabled={isLoading}
        >
          <X className="mr-1 h-3 w-3" />
          Cancel
        </Button>
      </div>
    )
  }

  if (currentStatus === "confirmed") {
    return (
      <Button 
        size="sm" 
        onClick={() => handleQuickUpdate("completed")}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        <CheckCircle className="mr-1 h-3 w-3" />
        Complete
      </Button>
    )
  }

  return null
}