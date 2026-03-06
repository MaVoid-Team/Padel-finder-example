"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Clock, User, MapPin } from "lucide-react"
import type { Booking } from "@/lib/models/Booking"
import { useLanguage } from "@/components/language-provider"
import { localizeCourtName, localizeStatus } from "@/lib/i18n"
import { arSA, enUS } from "date-fns/locale"

interface BookingsCalendarProps {
  bookings: Booking[]
}

export function BookingsCalendar({ bookings }: BookingsCalendarProps) {
  const { t, locale, language, dir } = useLanguage()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const toLocalDateKey = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const getBookingsForDate = (date: Date) => {
    const dateStr = toLocalDateKey(date)
    return bookings.filter((booking) => booking.date === dateStr)
  }

  const selectedDateBookings = getBookingsForDate(selectedDate)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <MapPin className="w-5 h-5 text-primary" />
            {t("calendarView")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            locale={language === "ar" ? arSA : enUS}
            dir={dir}
            className="rounded-md border-0"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">{t("bookingsForDate")} {formatDate(selectedDate)}</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateBookings.length > 0 ? (
            <div className="space-y-3 md:space-y-4 max-h-[500px] overflow-y-auto">
              {selectedDateBookings
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((booking) => (
                  <div key={booking._id} className="p-4 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-medium">{booking.time}</span>
                      </div>
                      <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>{localizeStatus(booking.status, language)}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{booking.playerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{localizeCourtName(booking.courtName, language)}</span>
                    </div>
                    <div className="text-sm font-medium text-primary">${booking.totalPrice}</div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{t("noBookingsDate")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
