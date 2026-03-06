"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"

export function DemoModeBanner() {
  const [mongoOk, setMongoOk] = useState<boolean | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    let cancelled = false
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setMongoOk(Boolean(data?.mongoConfigured))
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMongoOk(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (mongoOk !== false) {
    return null
  }

  return (
    <div className="w-full bg-blue-50 border-b border-blue-200 text-blue-900 py-3 text-center text-sm z-60">
      <strong>{t("demoModeTitle")}</strong> {t("demoModeDescription")}
    </div>
  )
}
