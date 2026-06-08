"use client"

import React from "react"
import { Textarea } from "@/components/ui/Textarea"
import { Slider } from "@/components/ui/Slider"
import type { WizardData } from "@/lib/types"

interface StepPurposeProps {
  data: WizardData
  updateData: (partial: Partial<WizardData>) => void
}

export function StepPurpose({ data, updateData }: StepPurposeProps) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-xl font-bold text-surface-100">What will you use this PC for?</h2>
        <p className="text-sm text-surface-400 mt-1">
          Describe your workflow, games you play, software you use. Be specific — the AI uses this to tailor the build.
        </p>
      </div>

      <Textarea
        placeholder="e.g. I play Call of Duty, Fortnite, and AAA single-player games at high settings. I also edit 4K video in DaVinci Resolve and stream on Twitch. I'm a computer science student and run VMs for my coursework..."
        value={data.purpose}
        onChange={(e) => updateData({ purpose: e.target.value })}
        rows={5}
      />

      <div>
        <p className="text-sm font-medium text-surface-300 mb-4">
          Prioritize how this PC will be used
        </p>
        <div className="space-y-4">
          <Slider
            label="Gaming"
            value={data.useCasePriorities.gaming}
            onChange={(v) =>
              updateData({
                useCasePriorities: { ...data.useCasePriorities, gaming: v },
              })
            }
            color="accent"
          />
          <Slider
            label="Productivity (Video/Photo/3D)"
            value={data.useCasePriorities.productivity}
            onChange={(v) =>
              updateData({
                useCasePriorities: { ...data.useCasePriorities, productivity: v },
              })
            }
            color="cyber"
          />
          <Slider
            label="Streaming"
            value={data.useCasePriorities.streaming}
            onChange={(v) =>
              updateData({
                useCasePriorities: { ...data.useCasePriorities, streaming: v },
              })
            }
            color="cyber"
          />
          <Slider
            label="Software Development"
            value={data.useCasePriorities.development}
            onChange={(v) =>
              updateData({
                useCasePriorities: { ...data.useCasePriorities, development: v },
              })
            }
            color="cyber"
          />
        </div>
      </div>
    </div>
  )
}
