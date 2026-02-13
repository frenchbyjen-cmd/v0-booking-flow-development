"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <nav aria-label="Booking progress" className="w-full">
      <ol className="flex items-center justify-between gap-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCompleted = step < currentStep
          const isCurrent = step === currentStep
          return (
            <li key={step} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full items-center">
                {step > 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-colors duration-300",
                      isCompleted ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : step}
                </div>
                {step < totalSteps && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-colors duration-300",
                      isCompleted ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  "text-center text-xs font-medium transition-colors duration-300 hidden sm:block",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {labels[step - 1]}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
