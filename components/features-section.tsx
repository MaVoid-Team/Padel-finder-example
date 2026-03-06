"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      title: t("featureCard1Title"),
      description: t("featureCard1Desc"),
      items: [t("featureCard1Item1"), t("featureCard1Item2"), t("featureCard1Item3"), t("featureCard1Item4")],
    },
    {
      title: t("featureCard2Title"),
      description: t("featureCard2Desc"),
      items: [t("featureCard2Item1"), t("featureCard2Item2"), t("featureCard2Item3"), t("featureCard2Item4")],
    },
    {
      title: t("featureCard3Title"),
      description: t("featureCard3Desc"),
      items: [
        t("featureCard3Item1"),
        t("featureCard3Item2"),
        t("featureCard3Item3"),
        t("featureCard3Item4"),
        t("featureCard3Item5"),
      ],
    },
    {
      title: t("featureCard4Title"),
      description: t("featureCard4Desc"),
      items: [t("featureCard4Item1"), t("featureCard4Item2"), t("featureCard4Item3"), t("featureCard4Item4")],
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("featuresTitle")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("featuresSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {feature.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>{t("howToUseDemo")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">{t("howToStep1Title")}</h4>
              <p className="text-muted-foreground">
                {t("howToStep1Desc")}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{t("howToStep2Title")}</h4>
              <p className="text-muted-foreground">
                {t("howToStep2Desc")}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{t("howToStep3Title")}</h4>
              <p className="text-muted-foreground">
                {t("howToStep3Desc")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
