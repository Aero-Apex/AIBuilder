"use client"

import React from "react"
import type { WizardData } from "@/lib/types"

interface StepReviewProps {
  data: WizardData
  onSubmit: () => void
  setError: (error: string | null) => void
}

const brandLabels: Record<string, string> = {
  any: "No Preference",
  intel: "Intel",
  amd: "AMD",
  nvidia: "NVIDIA",
}

export function StepReview({ data, onSubmit, setError }: StepReviewProps) {
  function handleSubmit() {
    if (!data.purpose.trim()) {
      setError("Please describe what you'll use this PC for in the previous step.")
      return
    }
    if (data.budget.amount < 100) {
      setError("Budget must be at least 100.")
      return
    }
    onSubmit()
  }

  const highestPriority = Object.entries(data.useCasePriorities)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-xl font-bold text-surface-100">Review Your Build</h2>
        <p className="text-sm text-surface-400 mt-1">
          Double-check everything before the AI generates your build.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <SummaryCard
            label="Budget"
            value={`${data.budget.currency} ${data.budget.amount.toLocaleString()}`}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <SummaryCard
            label="Target"
            value={`${data.resolution} @ ${data.targetFps} FPS`}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />
        </div>

        <div className="p-4 rounded-xl bg-surface-800/50 border border-surface-700/50">
          <p className="text-sm font-medium text-surface-300 mb-1">Use Case</p>
          <p className="text-sm text-surface-400 leading-relaxed">
            {data.purpose || (
              <span className="text-surface-600 italic">Not specified</span>
            )}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {highestPriority.map((p) => (
              <span
                key={p}
                className="px-2.5 py-0.5 rounded-full bg-accent-500/10 text-accent-400 text-xs font-medium border border-accent-500/20"
              >
                Priority: {p}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {renderTag(data.preferences.usedParts ? "Used Parts Allowed" : "New Parts Only")}
          {renderTag(`${data.preferences.formFactor}`)}
          {renderTag(data.preferences.storageType)}
          {renderTag(`CPU: ${brandLabels[data.preferences.brandPreferenceCPU]}`)}
          {renderTag(`GPU: ${brandLabels[data.preferences.brandPreferenceGPU]}`)}
          {data.preferences.rgb && renderTag("RGB", "accent")}
          {data.preferences.includeOS && renderTag("Windows 11")}
          {data.preferences.includeMonitor && renderTag("Monitor")}
          {data.preferences.includePeripherals && renderTag("Peripherals")}
        </div>
      </div>

      <div className="p-4 rounded-lg bg-cyber-500/10 border border-cyber-500/20">
        <p className="text-xs text-cyber-300 leading-relaxed">
          <span className="font-semibold">Ready?</span> The AI will generate a complete,
          compatible parts list with estimated prices and shopping links.
          This usually takes 10–30 seconds.
        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-500 to-cyber-600 text-white font-semibold text-sm
          hover:from-accent-600 hover:to-cyber-700 transition-all duration-200
          shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40
          focus:outline-none focus:ring-2 focus:ring-accent-500/50"
      >
        Generate My Build
      </button>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="p-4 rounded-xl bg-surface-800/50 border border-surface-700/50">
      <div className="flex items-center gap-2 text-surface-400 text-xs mb-1.5">
        {icon}
        {label}
      </div>
      <p className="text-lg font-bold text-surface-100">{value}</p>
    </div>
  )
}

function renderTag(label: string, color: "accent" | "surface" = "surface") {
  const colorClass =
    color === "accent"
      ? "bg-accent-500/10 text-accent-400 border-accent-500/20"
      : "bg-surface-700/50 text-surface-300 border-surface-600/50"

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}
    >
      {label}
    </span>
  )
}
