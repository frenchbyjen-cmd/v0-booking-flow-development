"use client"

import { cn } from "@/lib/utils"
import { activities, type Activity, type Formula } from "@/lib/booking-data"
import { Clock, MapPin, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StepActivitiesProps {
  formula: Formula
  selectedActivities: Activity[]
  onToggle: (activity: Activity) => void
}

export function StepActivities({ formula, selectedActivities, onToggle }: StepActivitiesProps) {
  const selectedCount = selectedActivities.length
  const maxCount = formula.maxActivities
  const isAtLimit = selectedCount >= maxCount

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-foreground text-balance">
          Pick Your Activities
        </h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          All activities take place in beautiful Tamraght, Morocco.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <Badge
          variant="secondary"
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            isAtLimit ? "bg-primary/10 text-primary border-primary/20" : ""
          )}
        >
          {selectedCount} / {maxCount} {maxCount === 1 ? "activity" : "activities"} selected
        </Badge>
      </div>

      <div className="grid gap-3">
        {activities.map((activity) => {
          const isSelected = selectedActivities.some((a) => a.id === activity.id)
          const isDisabled = !isSelected && isAtLimit

          return (
            <div
              key={activity.id}
              role="checkbox"
              aria-checked={isSelected}
              aria-disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
              onClick={() => {
                if (!isDisabled || isSelected) {
                  onToggle(activity)
                }
              }}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && (!isDisabled || isSelected)) {
                  e.preventDefault()
                  onToggle(activity)
                }
              }}
              className={cn(
                "flex items-start gap-4 rounded-xl border-2 p-4 md:p-5 text-left transition-all duration-200 cursor-pointer select-none",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/30",
                isDisabled && "opacity-40 cursor-not-allowed hover:border-border"
              )}
            >
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

              <div className="flex flex-1 flex-col gap-1.5">
                <h3 className={cn(
                  "font-medium text-card-foreground",
                  isSelected && "text-foreground"
                )}>
                  {activity.name}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {activity.duration} min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    Tamraght
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {isAtLimit && (
        <p className="text-center text-sm text-muted-foreground">
          {"You've"} reached the maximum for {formula.name}. Deselect one to swap.
        </p>
      )}
    </div>
  )
}
