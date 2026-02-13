"use client"

import { useState, useCallback } from "react"
import { type Activity, type Formula } from "@/lib/booking-data"
import { StepIndicator } from "./step-indicator"
import { StepFormula } from "./step-formula"
import { StepActivities } from "./step-activities"
import { StepTimeslots } from "./step-timeslots"
import { StepReview } from "./step-review"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

const STEP_LABELS = ["Choose Flow", "Activities", "Time Slots", "Confirm"]

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null)
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([])
  const [bookedSlots, setBookedSlots] = useState<Record<string, string>>({})
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleFormulaSelect = useCallback((formula: Formula) => {
    setSelectedFormula(formula)
    setSelectedActivities([])
    setBookedSlots({})
  }, [])

  const handleActivityToggle = useCallback((activity: Activity) => {
    setSelectedActivities((prev) => {
      const exists = prev.some((a) => a.id === activity.id)
      if (exists) {
        setBookedSlots((slots) => {
          const next = { ...slots }
          delete next[activity.id]
          return next
        })
        return prev.filter((a) => a.id !== activity.id)
      }
      return [...prev, activity]
    })
  }, [])

  const handleSlotBooked = useCallback((activityId: string, time: string) => {
    setBookedSlots((prev) => ({ ...prev, [activityId]: time }))
  }, [])

  const handleConfirm = useCallback(async () => {
    if (!selectedFormula) return
    setIsSending(true)

    try {
      const response = await fetch("/api/send-recap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          formula: {
            name: selectedFormula.name,
            price: selectedFormula.price,
          },
          activities: selectedActivities.map((a) => ({
            name: a.name,
            duration: a.duration,
            time: bookedSlots[a.id] || "TBD",
            meetingPoint: a.meetingPoint,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      setIsSent(true)
    } catch (error) {
      console.error("Error sending recap:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSending(false)
    }
  }, [selectedFormula, selectedActivities, bookedSlots, firstName, email])

  const canGoNext = (() => {
    switch (currentStep) {
      case 1:
        return selectedFormula !== null
      case 2:
        return selectedActivities.length > 0
      case 3:
        return true
      default:
        return false
    }
  })()

  const goNext = () => {
    if (canGoNext && currentStep < 4) {
      setCurrentStep((s) => s + 1)
    }
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <StepIndicator currentStep={currentStep} totalSteps={4} labels={STEP_LABELS} />

      <div className="min-h-[400px]">
        {currentStep === 1 && (
          <StepFormula selectedFormula={selectedFormula} onSelect={handleFormulaSelect} />
        )}
        {currentStep === 2 && selectedFormula && (
          <StepActivities
            formula={selectedFormula}
            selectedActivities={selectedActivities}
            onToggle={handleActivityToggle}
          />
        )}
        {currentStep === 3 && (
          <StepTimeslots
            selectedActivities={selectedActivities}
            bookedSlots={bookedSlots}
            onSlotBooked={handleSlotBooked}
          />
        )}
        {currentStep === 4 && selectedFormula && (
          <StepReview
            formula={selectedFormula}
            selectedActivities={selectedActivities}
            bookedSlots={bookedSlots}
            firstName={firstName}
            email={email}
            onFirstNameChange={setFirstName}
            onEmailChange={setEmail}
            onConfirm={handleConfirm}
            isSending={isSending}
            isSent={isSent}
          />
        )}
      </div>

      {/* Navigation */}
      {!isSent && (
        <div className="flex items-center justify-between">
          {currentStep > 1 ? (
            <Button variant="ghost" onClick={goBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 && (
            <Button onClick={goNext} disabled={!canGoNext} className="gap-2">
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
