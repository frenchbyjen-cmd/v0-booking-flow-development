"use client"

import { type Activity, type Formula } from "@/lib/booking-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Send, Loader2 } from "lucide-react"

interface StepReviewProps {
  formula: Formula
  selectedActivities: Activity[]
  bookedSlots: Record<string, string>
  firstName: string
  email: string
  onFirstNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onConfirm: () => void
  isSending: boolean
  isSent: boolean
}

export function StepReview({
  formula,
  selectedActivities,
  bookedSlots,
  firstName,
  email,
  onFirstNameChange,
  onEmailChange,
  onConfirm,
  isSending,
  isSent,
}: StepReviewProps) {
  const isValid = firstName.trim().length > 0 && email.includes("@") && email.includes(".")

  if (isSent) {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Send className="h-8 w-8 text-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground">
            {"You're"} all set, {firstName}!
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
            Your Flow recap has been sent to <strong className="text-foreground">{email}</strong>.
            Check your inbox for all the details.
          </p>
        </div>
        <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-left w-full max-w-md">
          <p className="text-sm font-medium text-foreground">Quick reminder:</p>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Please arrive 5-10 minutes before the start time at your meeting point. See you in Tamraght!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-foreground text-balance">
          Review & Confirm
        </h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Almost there! Double-check everything and get your recap by email.
        </p>
      </div>

      {/* Booking Summary Card */}
      <div className="rounded-xl border-2 border-border bg-card p-5 md:p-6">
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Your Flow</p>
            <h3 className="font-serif text-xl text-card-foreground">{formula.name}</h3>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-foreground">{formula.price}</span>
            <span className="text-sm text-muted-foreground ml-1">MAD</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Your Activities</p>
          {selectedActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col gap-1 rounded-lg bg-secondary/50 p-3"
            >
              <h4 className="font-medium text-sm text-card-foreground">{activity.name}</h4>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {activity.duration} min {bookedSlots[activity.id] ? `at ${bookedSlots[activity.id]}` : ""}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {activity.meetingPoint}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground text-center">
          Where should we send your recap?
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="firstName" className="text-sm font-medium text-foreground">
              First Name
            </label>
            <Input
              id="firstName"
              placeholder="Jen"
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              className="bg-card"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="bg-card"
            />
          </div>
        </div>
      </div>

      {/* Confirm CTA */}
      <Button
        onClick={onConfirm}
        disabled={!isValid || isSending}
        size="lg"
        className="w-full text-base py-6 gap-2"
      >
        {isSending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending your recap...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            {"I'm Ready to Flow"}
          </>
        )}
      </Button>
    </div>
  )
}
