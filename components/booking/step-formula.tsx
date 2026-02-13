"use client"

import { cn } from "@/lib/utils"
import { formulas, type Formula } from "@/lib/booking-data"
import { Check, Waves, Users, Sparkles } from "lucide-react"

const formulaIcons: Record<string, React.ReactNode> = {
  "easy-flow": <Waves className="h-6 w-6" />,
  "social-flow": <Users className="h-6 w-6" />,
  "full-flow": <Sparkles className="h-6 w-6" />,
}

interface StepFormulaProps {
  selectedFormula: Formula | null
  onSelect: (formula: Formula) => void
}

export function StepFormula({ selectedFormula, onSelect }: StepFormulaProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-foreground text-balance">
          Choose Your Flow
        </h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Every journey starts with a single wave. Pick the flow that feels right for you.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {formulas.map((formula) => {
          const isSelected = selectedFormula?.id === formula.id
          return (
            <button
              key={formula.id}
              onClick={() => onSelect(formula)}
              className={cn(
                "group relative flex flex-col items-center gap-4 rounded-xl border-2 p-6 text-center transition-all duration-300 cursor-pointer",
                "hover:shadow-lg hover:border-primary/50",
                isSelected
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border bg-card"
              )}
              aria-pressed={isSelected}
            >
              {isSelected && (
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3.5 w-3.5" />
                </div>
              )}

              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full transition-colors duration-300",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}
              >
                {formulaIcons[formula.id]}
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {formula.tagline}
                </p>
                <h3 className="font-serif text-xl text-card-foreground">{formula.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {formula.description}
                </p>
              </div>

              <div className="mt-auto flex flex-col items-center gap-1 pt-2">
                <span className="text-2xl font-bold text-foreground">{formula.price} MAD</span>
                <span className="text-xs text-muted-foreground">
                  up to {formula.maxActivities} {formula.maxActivities === 1 ? "activity" : "activities"}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
