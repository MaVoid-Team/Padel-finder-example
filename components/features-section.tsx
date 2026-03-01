"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Court Booking",
      description: "Browse available courts and book your preferred time slot instantly",
      items: ["4 Premium Courts", "Real-time availability", "Flexible time slots", "Instant confirmation"],
    },
    {
      title: "Booking Management",
      description: "Track and manage all your reservations in one place",
      items: ["View all bookings", "Cancel anytime", "Booking history", "Player details"],
    },
    {
      title: "Admin Dashboard",
      description: "Complete control over court operations and analytics",
      items: [
        "Revenue tracking",
        "Court management",
        "Booking calendar",
        "User analytics",
        "Reports & insights",
      ],
    },
    {
      title: "User Management",
      description: "Track player information and usage patterns",
      items: ["Player profiles", "Booking history", "Performance stats", "Contact info"],
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Demo Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore all the features of PadelClub. This is a fully functional demo with realistic data and interactions.
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
            <CardTitle>How to Use This Demo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">1. Book a Court</h4>
              <p className="text-muted-foreground">
                Go to "Book Courts" and select a court, date, and time slot. Fill in your details and complete the booking.
                Data is saved locally in your browser.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2. Check Your Bookings</h4>
              <p className="text-muted-foreground">
                Visit "My Bookings" and search for your email to see all your reservations. You can cancel bookings here.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">3. Admin Dashboard</h4>
              <p className="text-muted-foreground">
                Access the "Admin" section to see analytics, manage courts, view user bookings, and generate reports. All
                features are fully interactive!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
