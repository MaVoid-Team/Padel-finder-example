"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, User, Mail, Phone } from "lucide-react"
import type { Booking } from "@/lib/models/Booking"
import { useLanguage } from "@/components/language-provider"
import { localizeStatus } from "@/lib/i18n"

interface UserManagementProps {
  bookings: Booking[]
}

interface UserProfile {
  email: string
  name: string
  phone?: string
  totalBookings: number
  totalSpent: number
  lastBooking: string
  status: "active" | "inactive"
}

export function UserManagement({ bookings }: UserManagementProps) {
  const { t, language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")

  const users = useMemo(() => {
    const userMap = new Map<string, UserProfile>()

    bookings.forEach((booking) => {
      const existing = userMap.get(booking.playerEmail)
      if (existing) {
        existing.totalBookings += 1
        existing.totalSpent += booking.totalPrice
        if (booking.date > existing.lastBooking) {
          existing.lastBooking = booking.date
        }
      } else {
        userMap.set(booking.playerEmail, {
          email: booking.playerEmail,
          name: booking.playerName,
          phone: booking.playerPhone,
          totalBookings: 1,
          totalSpent: booking.totalPrice,
          lastBooking: booking.date,
          status: "active",
        })
      }
    })

    return Array.from(userMap.values())
  }, [bookings])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("userManagement")}</h2>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={t("searchUsers")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.email}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>{localizeStatus(user.status, language)}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{user.totalBookings}</div>
                  <div className="text-sm text-muted-foreground">{t("totalBookings")}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">${user.totalSpent}</div>
                  <div className="text-sm text-muted-foreground">{t("totalSpent")}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{user.lastBooking}</div>
                  <div className="text-sm text-muted-foreground">{t("lastBooking")}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <User className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">{t("noUsersFound")}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
