"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Clock, MapPin, Star } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"
import { initializeDemoData, getDemoCourts, getDemoAvailability } from "@/lib/demo-data"
import type { Court } from "@/lib/models/Court"
import { useLanguage } from "@/components/language-provider"
import { localizeCourtDescription, localizeCourtName } from "@/lib/i18n"

interface TimeSlot {
  time: string
  duration: number
  isAvailable: boolean
}

export function CourtBooking() {
  const { t, locale, language } = useLanguage()
  const [courts, setCourts] = useState<Court[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null)
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("🔧 Initializing demo data...")
    initializeDemoData()
    const demoCourts = getDemoCourts()
    console.log("✓ Courts loaded:", demoCourts.length, demoCourts)
    setCourts(demoCourts)
    if (demoCourts.length > 0) {
      setSelectedCourt(demoCourts[0])
      console.log("✓ Court selected:", demoCourts[0].name)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (selectedCourt && selectedDate) {
      fetchAvailability()
    }
  }, [selectedCourt, selectedDate])

  const fetchAvailability = () => {
    if (!selectedCourt) {
      console.error("❌ No court selected for availability check")
      return
    }
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
    const day = String(selectedDate.getDate()).padStart(2, "0")
    const dateStr = `${year}-${month}-${day}`
    console.log(`🔍 Fetching availability for ${selectedCourt.name} on ${dateStr}...`)
    const slots = getDemoAvailability(selectedCourt._id!, dateStr)
    console.log(`✓ Available slots: ${slots.filter(s => s.isAvailable).length}/${slots.length}`, slots)
    setAvailableSlots(slots)
  }

  const handleBookSlot = (slot: TimeSlot) => {
    if (!selectedCourt) {
      console.error("❌ No court selected")
      return
    }
    if (!slot.isAvailable) {
      console.error("❌ Slot is not available")
      return
    }
    console.log("✓ Booking slot:", slot, "Court:", selectedCourt.name)
    setSelectedSlot(slot)
    setShowBookingModal(true)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <section id="court-booking" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="court-booking" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t("bookingTitle")}</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            {t("bookingSubtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Court Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">{t("availableCourts")}</h3>
              <div className="grid gap-4">
                {courts.length > 0 ? (
                  courts.map((court) => (
                    <Card
                      key={court._id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedCourt?._id === court._id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedCourt(court)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-xl font-semibold">{localizeCourtName(court.name, language)}</h4>
                              <Badge variant="secondary" className="bg-primary/10 text-primary">
                                ${court.pricePerHour}{t("perHour")}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-3">{localizeCourtDescription(court.description || "", language)}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {court.openTime} - {court.closeTime}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{t("ratingLabel")}</span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="w-24 h-16 bg-cover bg-center rounded-lg ml-4"
                            style={{
                              backgroundImage: "url('/padel-court-aerial-view-with-glass-walls.jpg')",
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">{t("noCourts")}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Time Slots */}
            {selectedCourt && (
              <div>
                <h3 className="text-2xl font-semibold mb-4">{t("availableTimesFor")} {formatDate(selectedDate)}</h3>
                {availableSlots.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={slot.isAvailable ? "outline" : "ghost"}
                        disabled={!slot.isAvailable}
                        className={`h-16 flex flex-col items-center justify-center transition-colors ${
                          slot.isAvailable
                            ? "hover:bg-primary hover:text-primary-foreground bg-transparent"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                        onClick={() => handleBookSlot(slot)}
                      >
                        <span className="font-semibold">{slot.time}</span>
                        <span className="text-xs opacity-75">{slot.duration} {t("minutesShort")}</span>
                      </Button>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground">{t("noSlotsDate")}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Calendar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {t("selectDate")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border-0"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedCourt && selectedSlot && (
        <BookingModal
          court={selectedCourt}
          date={selectedDate}
          timeSlot={selectedSlot}
          onClose={() => {
            setShowBookingModal(false)
            setSelectedSlot(null)
          }}
          onSuccess={() => {
            setShowBookingModal(false)
            setSelectedSlot(null)
            // Small delay to ensure state updates before refreshing
            setTimeout(() => {
              fetchAvailability() // Refresh availability
            }, 300)
          }}
        />
      )}
    </section>
  )
}
