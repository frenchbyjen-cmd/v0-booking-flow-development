import { BookingFlow } from "@/components/booking/booking-flow"
import { Waves } from "lucide-react"

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Waves className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-serif text-lg leading-tight text-card-foreground">
                Sports With Jen
              </h1>
              <p className="text-xs text-muted-foreground">Tamraght, Morocco</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary/5 border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-8 md:py-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground text-balance">
            Book Your Flow
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Surf, yoga, movement, and connection by the ocean. Choose your pace and flow through Tamraght your way.
          </p>
        </div>
      </section>

      {/* Booking Flow */}
      <section className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <BookingFlow />
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-3xl px-4 py-6 text-center">
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
