"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, CreditCard, User, Mail, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { addDemoBooking } from "@/lib/demo-data"
import type { Court } from "@/lib/models/Court"
import { useLanguage } from "@/components/language-provider"
import { interpolate, localizeCourtName } from "@/lib/i18n"

interface TimeSlot {
  time: string
  duration: number
  isAvailable: boolean
}

interface BookingModalProps {
  court: Court
  date: Date
  timeSlot: TimeSlot
  onClose: () => void
  onSuccess: () => void
}

export function BookingModal({ court, date, timeSlot, onClose, onSuccess }: BookingModalProps) {
    const toLocalDateKey = (value: Date) => {
      const year = value.getFullYear()
      const month = String(value.getMonth() + 1).padStart(2, "0")
      const day = String(value.getDate()).padStart(2, "0")
      return `${year}-${month}-${day}`
    }

  const { t, locale, language } = useLanguage()
  const [formData, setFormData] = useState({
    playerName: "",
    playerEmail: "",
    playerPhone: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const totalPrice = (court.pricePerHour * timeSlot.duration) / 60

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.playerName.trim()) {
      toast({
        title: t("validationError"),
        description: t("enterNameError"),
        variant: "destructive",
      })
      return
    }
    
    if (!formData.playerEmail.trim()) {
      toast({
        title: t("validationError"),
        description: t("enterEmailError"),
        variant: "destructive",
      })
      return
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.playerEmail)) {
      toast({
        title: t("validationError"),
        description: t("validEmailError"),
        variant: "destructive",
      })
      return
    }
    
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 600))

      const booking = addDemoBooking({
        courtId: court._id!,
        courtName: court.name,
        date: toLocalDateKey(date),
        time: timeSlot.time,
        duration: timeSlot.duration,
        playerName: formData.playerName,
        playerEmail: formData.playerEmail,
        playerPhone: formData.playerPhone,
        totalPrice,
        status: "confirmed",
      })

      console.log("✓ Booking created successfully:", booking)

      toast({
        title: t("bookingConfirmedTitle"),
        description: interpolate(t("bookingConfirmedDescription"), {
          date: date.toLocaleDateString(locale),
          time: timeSlot.time,
          email: formData.playerEmail,
        }),
      })

      // Reset form
      setFormData({ playerName: '', playerEmail: '', playerPhone: '' })
      
      // Delay closing to let user see the success message
      setTimeout(() => {
        onSuccess()
      }, 800)
    } catch (error) {
      console.error("❌ Booking error:", error)
      toast({
        title: t("bookingFailed"),
        description: error instanceof Error ? error.message : t("tryAgain"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">{t("bookingModalTitle")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-medium">{formatDate(date)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium">{timeSlot.time} ({timeSlot.duration} {t("minutesWord")})</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="w-4 h-4 text-primary" />
                <span className="font-medium">{localizeCourtName(court.name, language)}</span>
              </div>
              <div className="pt-2 border-t border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{t("totalPrice")}</span>
                  <span className="text-xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="playerName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {t("fullName")}
              </Label>
              <Input
                id="playerName"
                type="text"
                required
                value={formData.playerName}
                onChange={(e) => setFormData({ ...formData, playerName: e.target.value })}
                placeholder={t("enterFullName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="playerEmail" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t("emailAddress")}
              </Label>
              <Input
                id="playerEmail"
                type="email"
                required
                value={formData.playerEmail}
                onChange={(e) => setFormData({ ...formData, playerEmail: e.target.value })}
                placeholder={t("enterEmail")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="playerPhone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {t("phoneOptional")}
              </Label>
              <Input
                id="playerPhone"
                type="tel"
                value={formData.playerPhone}
                onChange={(e) => setFormData({ ...formData, playerPhone: e.target.value })}
                placeholder={t("enterPhone")}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
                disabled={loading}
              >
                {t("cancel")}
              </Button>
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? t("bookingProgress") : `${t("bookFor")} $${totalPrice.toFixed(2)}`}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
