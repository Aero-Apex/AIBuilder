"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/Button"
import type { WizardData, BuildResult } from "@/lib/types"
import { StepBudget } from "./StepBudget"
import { StepPurpose } from "./StepPurpose"
import { StepPreferences } from "./StepPreferences"
import { StepReview } from "./StepReview"
import { BuildResult as BuildResultComponent } from "@/components/BuildResult"
import { LoadingState } from "@/components/LoadingState"

const STEPS = ["Budget", "Purpose", "Preferences", "Review"]

const defaultData: WizardData = {
  budget: { amount: 1500, currency: "USD" },
  purpose: "",
  resolution: "1440p",
  targetFps: "144",
  useCasePriorities: { gaming: 8, productivity: 3, streaming: 2, development: 5 },
  preferences: {
    usedParts: false,
    brandPreferenceCPU: "any",
    brandPreferenceGPU: "any",
    rgb: false,
    formFactor: "ATX",
    storageType: "SSD",
    includeOS: true,
    includeMonitor: false,
    includePeripherals: false,
  },
}

export function WizardShell() {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<WizardData>(defaultData)
  const [result, setResult] = useState<BuildResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function updateData(partial: Partial<WizardData>) {
    setData((prev) => ({ ...prev, ...partial }))
  }

  async function handleSubmit() {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/generate-build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      })

      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.error || "Failed to generate build")
      }

      setResult(json.build)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  function handleReset() {
    setResult(null)
    setCurrentStep(0)
    setData(defaultData)
    setError(null)
  }

  if (result) {
    return <BuildResultComponent build={result} onReset={handleReset} />
  }

  if (isLoading) {
    return <LoadingState />
  }

  const stepComponents = [
    <StepBudget key="budget" data={data} updateData={updateData} />,
    <StepPurpose key="purpose" data={data} updateData={updateData} />,
    <StepPreferences key="preferences" data={data} updateData={updateData} />,
    <StepReview key="review" data={data} onSubmit={handleSubmit} setError={setError} />,
  ]

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <header className="border-b border-surface-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-cyber-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-gradient">AI PC Builder</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {STEPS.map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex items-center gap-2">
                  <div
                    className={
                      `step-indicator ${
                        i < currentStep
                          ? "step-completed"
                          : i === currentStep
                          ? "step-active"
                          : "step-inactive"
                      }`
                    }
                  >
                    {i < currentStep ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span
                    className={`hidden sm:block text-sm font-medium ${
                      i === currentStep ? "text-accent-400" : "text-surface-500"
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-12 h-0.5 ${i < currentStep ? "bg-accent-500" : "bg-surface-700"}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step content */}
          <div className="card-gradient rounded-2xl p-8 glow-border animate-fade-in">
            {stepComponents[currentStep]}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 rounded-lg bg-red-900/20 border border-red-800/50 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <span className="text-sm text-surface-500">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            {currentStep < STEPS.length - 1 ? (
              <Button onClick={() => setCurrentStep((prev) => Math.min(STEPS.length - 1, prev + 1))}>
                Continue
              </Button>
            ) : (
              <Button onClick={handleSubmit} loading={isLoading}>
                Generate Build
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
