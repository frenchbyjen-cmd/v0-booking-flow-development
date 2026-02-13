import { DayPlanner } from "@/components/booking/day-planner"
import { Waves, MapPin } from "lucide-react"

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Waves className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-serif text-lg leading-tight text-card-foreground">
                Sports With Jen
              </h1>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Tamraght+Morocco"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <MapPin className="h-3 w-3" />
                Tamraght, Morocco
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-primary/5 border-b border-border">
        <div className="mx-auto max-w-2xl px-4 py-8 md:py-10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground text-balance">
            Plan Your Day
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Pick up to 2 activities for today and book your time slot. Simple, sunny, and straightforward.
          </p>
        </div>
      </section>

      {/* Day Planner */}
      <section className="mx-auto max-w-2xl px-4 py-8 md:py-10">
        <DayPlanner />
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-2xl px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Sports With Jen &middot; Tamraght, Morocco
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            All activities are weather-dependent. Arrive 5-10 min early.
          </p>
        </div>
      </footer>
    </main>
  )
}
