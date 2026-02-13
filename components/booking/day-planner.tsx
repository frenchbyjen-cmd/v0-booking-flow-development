"use client"

import { useState } from "react"
import { activities, type Activity } from "@/lib/booking-data"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Clock,
  MapPin,
  Check,
  CalendarDays,
  ArrowRight,
  Mail,
  Loader2,
} from "lucide-react"

const MAX_ACTIVITIES = 2
const CAL_LINK = "https://cal.com/sportswithjen-flow?redirect=false"

export function DayPlanner() {
  const [selected, setSelected] = useState<Activity[]>([])
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [sending, setSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState("")

  const isAtLimit = selected.length >= MAX_ACTIVITIES
  const total = selected.reduce((sum, a) => sum + a.price, 0)

  const toggleActivity = (activity: Activity) => {
    setSelected((prev) => {
      const exists = prev.some((a) => a.id === activity.id)
      if (exists) return prev.filter((a) => a.id !== activity.id)
      if (prev.length >= MAX_ACTIVITIES) return prev
      return [...prev, activity]
    })
    setEmailSent(false)
    setEmailError("")
  }

  const sendRecap = async () => {
    setEmailError("")

    if (!firstName.trim()) {
      setEmailError("Please enter your first name.")
      return
    }
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address.")
      return
    }

    setSending(true)
    try {
      const res = await fetch("/api/send-recap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          activities: selected.map((a) => ({
            name: a.name,
            duration: a.duration,
            price: a.price,
            meetingPoint: a.meetingPoint,
            meetingTime: a.meetingTime ?? "TBD",
          })),
          total,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? "Something went wrong")
      }

      setEmailSent(true)
    } catch (err: unknown) {
      setEmailError(err instanceof Error ? err.message : "Failed to send recap.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Activity Selection */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl text-foreground">Select Activities</h3>
          <Badge
            variant="secondary"
            className={cn(
              "px-3 py-1.5 text-sm font-medium transition-colors",
              isAtLimit && "bg-primary/10 text-primary"
            )}
          >
            {selected.length} / {MAX_ACTIVITIES} selected
          </Badge>
        </div>

        <div className="grid gap-3">
          {activities.map((activity) => {
            const isSelected = selected.some((a) => a.id === activity.id)
            const isDisabled = !isSelected && isAtLimit

            return (
              <div
                key={activity.id}
                role="checkbox"
                aria-checked={isSelected}
                aria-disabled={isDisabled}
                tabIndex={isDisabled ? -1 : 0}
                onClick={() => {
                  if (!isDisabled) toggleActivity(activity)
                }}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !isDisabled) {
                    e.preventDefault()
                    toggleActivity(activity)
                  }
                }}
                className={cn(
                  "flex items-start gap-4 rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer select-none",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30",
                  isDisabled && "opacity-40 cursor-not-allowed hover:border-border"
                )}
              >
                {/* Checkbox indicator */}
                <div className="pt-0.5">
                  <div
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30 bg-card"
                    )}
                    aria-hidden="true"
                  >
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                  </div>
                </div>

                {/* Activity info */}
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={cn(
                        "font-medium text-card-foreground",
                        isSelected && "text-foreground"
                      )}
                    >
                      {activity.name}
                    </h4>
                    <span className={cn(
                      "shrink-0 text-sm font-semibold",
                      isSelected ? "text-primary" : "text-muted-foreground"
                    )}>
                      {activity.price} MAD
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {activity.duration} min
                    </span>
                    {activity.meetingTime && (
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {activity.meetingTime}
                      </span>
                    )}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.meetingPoint)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 underline underline-offset-2 hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      {activity.meetingPoint}
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {isAtLimit && (
          <p className="text-center text-sm text-muted-foreground">
            Maximum reached. Deselect one to swap.
          </p>
        )}
      </div>

      {/* Day Schedule */}
      {selected.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-xl text-foreground">Your Day Schedule</h3>

          <div className="relative rounded-xl border-2 border-border bg-card overflow-hidden">
            {/* Timeline */}
            {selected.map((activity, index) => (
              <div
                key={activity.id}
                className={cn(
                  "flex gap-4 p-4 md:p-5",
                  index < selected.length - 1 && "border-b border-border"
                )}
              >
                {/* Timeline dot and line */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                  {index < selected.length - 1 && (
                    <div className="w-0.5 flex-1 bg-primary/20" />
                  )}
                </div>

                {/* Activity details */}
                <div className="flex flex-1 flex-col gap-2 pb-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium text-foreground">{activity.name}</h4>
                    <span className="shrink-0 text-sm font-semibold text-primary">
                      {activity.price} MAD
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {activity.duration} min
                    </span>
                    {activity.meetingTime && (
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Starts at {activity.meetingTime}
                      </span>
                    )}
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.meetingPoint)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    {activity.meetingPoint}
                  </a>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-4 py-3 md:px-5">
              <span className="font-medium text-foreground">Total</span>
              <span className="text-lg font-bold text-primary">{total} MAD</span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Payment is made on arrival at the activity location.
          </p>

          {/* Email Recap Section */}
          <div className="rounded-xl border-2 border-border bg-card p-4 md:p-5">
            <h4 className="flex items-center gap-2 font-medium text-foreground">
              <Mail className="h-4 w-4 text-primary" />
              Get Your Booking Recap
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              We will send you a summary with the activities, prices, and meeting points.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <Input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                  setEmailError("")
                  setEmailSent(false)
                }}
                className="bg-background"
              />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailError("")
                  setEmailSent(false)
                }}
                className="bg-background"
              />

              {emailError && (
                <p className="text-sm text-destructive">{emailError}</p>
              )}

              {emailSent && (
                <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm text-primary">
                  <Check className="h-4 w-4 shrink-0" />
                  Recap sent! Check your inbox.
                </div>
              )}

              <Button
                onClick={sendRecap}
                disabled={sending}
                variant="outline"
                className="w-full gap-2"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" />
                    Send Recap by Email
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* CTA to Cal.com */}
          <Button
            asChild
            size="lg"
            className="w-full py-6 text-base gap-2"
          >
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Your Time Slot
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Opens Cal.com in a new tab to select your preferred time.
          </p>
        </div>
      )}

      {/* Empty state */}
      {selected.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <CalendarDays className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            Select an activity above to start building your day.
          </p>
        </div>
      )}
    </div>
  )
}
