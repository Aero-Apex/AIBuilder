"use client"

import React from "react"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import type { WizardData, Currency, Resolution, TargetFps } from "@/lib/types"

interface StepBudgetProps {
  data: WizardData
  updateData: (partial: Partial<WizardData>) => void
}

const currencies: { value: Currency; label: string }[] = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "PLN", label: "PLN (zł)" },
  { value: "CAD", label: "CAD (C$)" },
  { value: "AUD", label: "AUD (A$)" },
]

const resolutions: { value: Resolution; label: string }[] = [
  { value: "1080p", label: "1080p (Full HD)" },
  { value: "1440p", label: "1440p (QHD)" },
  { value: "4K", label: "4K (UHD)" },
  { value: "ultrawide", label: "Ultrawide (3440×1440)" },
]

const fpsOptions: { value: TargetFps; label: string }[] = [
  { value: "60", label: "60 FPS — Smooth" },
  { value: "120", label: "120 FPS — Very Smooth" },
  { value: "144", label: "144 FPS — High Refresh" },
  { value: "240", label: "240 FPS — Competitive" },
]

export function StepBudget({ data, updateData }: StepBudgetProps) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-xl font-bold text-surface-100">Budget &amp; Resolution</h2>
        <p className="text-sm text-surface-400 mt-1">
          Set your budget and performance targets.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Budget Amount"
          type="number"
          min={100}
          max={100000}
          value={data.budget.amount}
          onChange={(e) =>
            updateData({
              budget: { ...data.budget, amount: parseInt(e.target.value) || 0 },
            })
          }
          icon={
            <span className="text-surface-400 text-sm">
              {data.budget.currency === "USD" && "$"}
              {data.budget.currency === "EUR" && "€"}
              {data.budget.currency === "GBP" && "£"}
              {data.budget.currency === "PLN" && "zł"}
              {data.budget.currency === "CAD" && "C$"}
              {data.budget.currency === "AUD" && "A$"}
            </span>
          }
        />
        <Select
          label="Currency"
          options={currencies}
          value={data.budget.currency}
          onChange={(e) =>
            updateData({
              budget: { ...data.budget, currency: e.target.value as Currency },
            })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Resolution Target"
          options={resolutions}
          value={data.resolution}
          onChange={(e) =>
            updateData({ resolution: e.target.value as Resolution })
          }
        />
        <Select
          label="Target FPS"
          options={fpsOptions}
          value={data.targetFps}
          onChange={(e) =>
            updateData({ targetFps: e.target.value as TargetFps })
          }
        />
      </div>

      <div className="p-4 rounded-lg bg-surface-800/50 border border-surface-700/50">
        <p className="text-xs text-surface-400 leading-relaxed">
          <span className="text-accent-400 font-semibold">Tip:</span> For 1080p gaming, a budget of{" "}
          <strong className="text-surface-200">$800–$1,200</strong> is usually sufficient.
          1440p targets typically need <strong className="text-surface-200">$1,200–$2,000</strong>,
          while 4K builds often start at <strong className="text-surface-200">$2,000+</strong>.
        </p>
      </div>
    </div>
  )
}
