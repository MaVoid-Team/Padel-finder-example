"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Users, DollarSign, Clock, Plus, Settings, BarChart3 } from "lucide-react"
import { CourtManagement } from "@/components/admin/court-management"
import { UserManagement } from "@/components/admin/user-management"
import { ReportsSection } from "@/components/admin/reports-section"
import { AdvancedReports } from "@/components/admin/advanced-reports"
import { initializeDemoData, getDemoBookings, getDemoCourts, getDashboardStats } from "@/lib/demo-data"
import type { Booking } from "@/lib/models/Booking"
import type { Court } from "@/lib/models/Court"
import { useLanguage } from "@/components/language-provider"
import { localizeCourtName, localizeStatus } from "@/lib/i18n"

interface DashboardStats {
  totalBookings: number
  totalRevenue: number
  activeUsers: number
  averageBookingDuration: number
  activeCourts?: number
  totalCourts?: number
}

export function AdminDashboard() {
  const { t, language } = useLanguage()
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalRevenue: 0,
    activeUsers: 0,
    averageBookingDuration: 0,
  })
  const [allBookings, setAllBookings] = useState<Booking[]>([])
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])
  const [courts, setCourts] = useState<Court[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeDemoData()
    fetchDashboardData()
  }, [])

  const fetchDashboardData = () => {
    const demoStats = getDashboardStats()
    const demoBookings = getDemoBookings()
    const demoCourts = getDemoCourts()

    setStats({
      totalBookings: demoStats.totalBookings,
      totalRevenue: Math.round(demoStats.totalRevenue * 100) / 100,
      activeUsers: demoStats.activeUsers,
      averageBookingDuration: demoStats.averageBookingDuration,
      activeCourts: demoStats.activeCourts,
      totalCourts: demoStats.totalCourts,
    })

    setAllBookings(demoBookings)
    setRecentBookings(demoBookings.slice(0, 5))
    setCourts(demoCourts)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-muted rounded w-64 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t("adminDashboard")}</h1>
            <p className="text-sm md:text-base text-muted-foreground">{t("adminSubtitle")}</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            {t("quickActions")}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("totalBookings")}</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">{t("allTimeBookings")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("totalRevenue")}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{t("totalEarnings")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("activeUsers")}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">{t("uniquePlayers")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("avgSession")}</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.averageBookingDuration} {t("minutesShort")}</div>
              <p className="text-xs text-muted-foreground">{t("averageDuration")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="reports" className="space-y-6">
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <TabsList className="inline-flex w-full md:grid md:grid-cols-4 min-w-max md:min-w-0 h-auto md:h-10">

                <TabsTrigger value="courts" className="flex items-center gap-2 px-4 py-3 md:py-2 whitespace-nowrap">
                  <Settings className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm md:text-base">{t("courtsTab")}</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2 px-4 py-3 md:py-2 whitespace-nowrap">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm md:text-base">{t("usersTab")}</span>
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-2 px-4 py-3 md:py-2 whitespace-nowrap">
                  <BarChart3 className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm md:text-base">{t("reportsTab")}</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2 px-4 py-3 md:py-2 whitespace-nowrap">
                  <BarChart3 className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm md:text-base">{t("analyticsTab")}</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="courts">
            <CourtManagement courts={courts} onUpdate={fetchDashboardData} />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement bookings={allBookings} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsSection bookings={allBookings} stats={stats} />
          </TabsContent>

          <TabsContent value="analytics">
            <AdvancedReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
