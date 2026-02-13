"use client"

import { type Activity } from "@/lib/booking-data"
import { Clock, ExternalLink, MapPin, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface StepTimeslotsProps {
  selectedActivities: Activity[]
  bookedSlots: Record<string, string>
  onSlotBooked: (activityId: string, time: string) => void
}

export function StepTimeslots({ selectedActivities, bookedSlots, onSlotBooked }: StepTimeslotsProps) {
  const handleOpenCal = (activity: Activity) => {
    window.open(activity.calUrl, "_blank", "noopener,noreferrer")

    const simulatedTime = activity.meetingTime || "TBD"
    setTimeout(() => {
      onSlotBooked(activity.id, simulatedTime)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-foreground text-balance">
          Choose Your Times
        </h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Book each activity on Cal.com. A new tab will open for each one.
        </p>
      </div>

      <div className="grid gap-3">
        {selectedActivities.map((activity) => {
          const isBooked = !!bookedSlots[activity.id]

          return (
            <div
              key={activity.id}
              className={cn(
                "flex flex-col gap-3 rounded-xl border-2 p-4 md:p-5 transition-all duration-200",
                isBooked ? "border-primary/40 bg-primary/5" : "border-border bg-card"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium text-card-foreground">{activity.name}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {activity.duration} min
                    </span>
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

                {isBooked && (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                )}
              </div>

              <Button
                onClick={() => handleOpenCal(activity)}
                variant={isBooked ? "secondary" : "default"}
                className="w-full gap-2"
              >
                {isBooked ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Booked — Change Time
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4" />
                    Choose Time on Cal.com
                  </>
                )}
              </Button>
            </div>
          )
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        After booking on Cal.com, come back to this page to continue.
      </p>
    </div>
  )
}
