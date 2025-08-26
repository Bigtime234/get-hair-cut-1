"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Bell, Mail, MessageSquare, Clock, CheckCircle } from "lucide-react"
import { toast } from "sonner"

type NotificationPreferences = {
  emailBookingConfirmation: boolean
  emailStatusUpdates: boolean
  emailReminders: boolean
  smsReminders: boolean
  pushNotifications: boolean
}

type BookingNotificationsProps = {
  userId: string
  initialPreferences?: NotificationPreferences
}

export default function BookingNotifications({ 
  userId, 
  initialPreferences 
}: BookingNotificationsProps) {
  const [preferences, setPreferences] = useState<NotificationPreferences>(
    initialPreferences || {
      emailBookingConfirmation: true,
      emailStatusUpdates: true,
      emailReminders: true,
      smsReminders: false,
      pushNotifications: false,
    }
  )
  const [isLoading, setIsLoading] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const handlePreferenceChange = (key: keyof NotificationPreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const savePreferences = async () => {
    setIsLoading(true)
    
    try {
      // Here you would typically call an API to save preferences
      // await updateNotificationPreferences(userId, preferences)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setLastSaved(new Date())
      toast.success("Notification preferences saved successfully")
    } catch (error) {
      toast.error("Failed to save notification preferences")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-600" />
          Notification Preferences
        </CardTitle>
        <CardDescription>
          Manage how you want to receive booking updates and reminders
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Email Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <Label className="text-base font-medium">Email Notifications</Label>
            <Badge variant="secondary" className="text-xs">Recommended</Badge>
          </div>
          
          <div className="ml-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-confirmation" className="text-sm font-normal">
                  Booking confirmations
                </Label>
                <p className="text-xs text-muted-foreground">
                  Receive email when bookings are confirmed or cancelled
                </p>
              </div>
              <Switch
                id="email-confirmation"
                checked={preferences.emailBookingConfirmation}
                onCheckedChange={(value) => handlePreferenceChange('emailBookingConfirmation', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-updates" className="text-sm font-normal">
                  Status updates
                </Label>
                <p className="text-xs text-muted-foreference">
                  Get notified when your booking status changes
                </p>
              </div>
              <Switch
                id="email-updates"
                checked={preferences.emailStatusUpdates}
                onCheckedChange={(value) => handlePreferenceChange('emailStatusUpdates', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-reminders" className="text-sm font-normal">
                  Appointment reminders
                </Label>
                <p className="text-xs text-muted-foreground">
                  24-hour reminder before your scheduled appointment
                </p>
              </div>
              <Switch
                id="email-reminders"
                checked={preferences.emailReminders}
                onCheckedChange={(value) => handlePreferenceChange('emailReminders', value)}
              />
            </div>
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-gray-500" />
            <Label className="text-base font-medium">SMS Notifications</Label>
            <Badge variant="outline" className="text-xs">Coming Soon</Badge>
          </div>
          
          <div className="ml-6">
            <div className="flex items-center justify-between opacity-50">
              <div className="space-y-0.5">
                <Label htmlFor="sms-reminders" className="text-sm font-normal">
                  SMS reminders
                </Label>
                <p className="text-xs text-muted-foreground">
                  Text message reminders for your appointments
                </p>
              </div>
              <Switch
                id="sms-reminders"
                checked={preferences.smsReminders}
                onCheckedChange={(value) => handlePreferenceChange('smsReminders', value)}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-gray-500" />
            <Label className="text-base font-medium">Push Notifications</Label>
            <Badge variant="outline" className="text-xs">Coming Soon</Badge>
          </div>
          
          <div className="ml-6">
            <div className="flex items-center justify-between opacity-50">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications" className="text-sm font-normal">
                  Browser notifications
                </Label>
                <p className="text-xs text-muted-foreground">
                  Instant notifications in your browser
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={preferences.pushNotifications}
                onCheckedChange={(value) => handlePreferenceChange('pushNotifications', value)}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {lastSaved && (
              <>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Last saved {lastSaved.toLocaleTimeString()}</span>
              </>
            )}
          </div>
          
          <Button onClick={savePreferences} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Notification History Component
type NotificationHistoryProps = {
  userId: string
}

export function NotificationHistory({ userId }: NotificationHistoryProps) {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "booking_confirmed",
      title: "Booking Confirmed",
      message: "Your appointment for Classic Haircut has been confirmed for tomorrow at 2:00 PM",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
    },
    {
      id: "2", 
      type: "booking_reminder",
      title: "Appointment Reminder",
      message: "Don't forget your appointment tomorrow at 2:00 PM for Classic Haircut",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
      read: false,
    },
    {
      id: "3",
      type: "booking_completed",
      title: "Service Completed",
      message: "Thank you for your visit! Please rate your experience with our Classic Haircut service",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
    },
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_confirmed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'booking_reminder':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'booking_completed':
        return <CheckCircle className="h-4 w-4 text-purple-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60))
    
    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours}h ago`
    
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) return `${diffDays}d ago`
    
    return timestamp.toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-600" />
          Recent Notifications
        </CardTitle>
        <CardDescription>
          Your notification history from the last 30 days
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
                
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}