"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Clock, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { saveDemoCourt } from "@/lib/demo-data"
import type { Court } from "@/lib/models/Court"
import { useLanguage } from "@/components/language-provider"
import { localizeCourtDescription, localizeCourtName } from "@/lib/i18n"

interface CourtManagementProps {
  courts: Court[]
  onUpdate: () => void
}

export function CourtManagement({ courts, onUpdate }: CourtManagementProps) {
  const { t, language } = useLanguage()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingCourt, setEditingCourt] = useState<Court | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    openTime: "08:00",
    closeTime: "22:00",
    pricePerHour: 50,
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 400))

    try {
      const newCourt = saveDemoCourt({
        _id: editingCourt?._id,
        name: formData.name,
        description: formData.description,
        openTime: formData.openTime,
        closeTime: formData.closeTime,
        pricePerHour: formData.pricePerHour,
        isActive: true,
        createdAt: editingCourt?.createdAt || new Date(),
        updatedAt: new Date(),
      })

      toast({
        title: editingCourt ? t("courtUpdated") : t("courtCreated"),
        description: editingCourt 
          ? t("courtUpdatedSuccess")
          : t("courtCreatedSuccess"),
      })

      setShowAddDialog(false)
      setEditingCourt(null)
      setFormData({
        name: "",
        description: "",
        openTime: "08:00",
        closeTime: "22:00",
        pricePerHour: 50,
      })
      onUpdate()
    } catch (error) {
      toast({
        title: t("error"),
        description: t("failedSaveCourt"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (court: Court) => {
    setEditingCourt(court)
    setFormData({
      name: court.name,
      description: court.description || "",
      openTime: court.openTime,
      closeTime: court.closeTime,
      pricePerHour: court.pricePerHour,
    })
    setShowAddDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("courtManagement")}</h2>
        <Dialog open={showAddDialog} onOpenChange={(open) => {
          setShowAddDialog(open)
          if (!open) {
            setEditingCourt(null)
            setFormData({
              name: "",
              description: "",
              openTime: "08:00",
              closeTime: "22:00",
              pricePerHour: 50,
            })
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              {t("addCourt")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCourt ? t("editCourt") : t("addNewCourt")}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("courtName")}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("courtNameExample")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">{t("description")}</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={t("courtDescriptionPlaceholder")}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="openTime">{t("openTime")}</Label>
                  <Input
                    id="openTime"
                    type="time"
                    value={formData.openTime}
                    onChange={(e) => setFormData({ ...formData, openTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closeTime">{t("closeTime")}</Label>
                  <Input
                    id="closeTime"
                    type="time"
                    value={formData.closeTime}
                    onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pricePerHour">{t("pricePerHourLabel")}</Label>
                <Input
                  id="pricePerHour"
                  type="number"
                  value={formData.pricePerHour}
                  onChange={(e) => setFormData({ ...formData, pricePerHour: Number(e.target.value) })}
                  min="0"
                  step="5"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                  className="flex-1"
                  disabled={loading}
                >
                  {t("cancel")}
                </Button>
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading ? (editingCourt ? t("updating") : t("creating")) : (editingCourt ? t("updateCourt") : t("createCourt"))}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {courts.map((court) => (
          <Card key={court._id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  {localizeCourtName(court.name, language)}
                  <Badge variant={court.isActive ? "default" : "secondary"}>
                    {court.isActive ? t("active") : t("inactive")}
                  </Badge>
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => handleEdit(court)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {t("edit")}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">{localizeCourtDescription(court.description || "", language)}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>
                      {court.openTime} - {court.closeTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span>${court.pricePerHour}{t("perHour")}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
