"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage()

  return (
    <Button
      variant="outline"
      size="sm"
      className={className}
      onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
      aria-label={t("languageLabel")}
    >
      {t("languageToggle")}
    </Button>
  )
}
