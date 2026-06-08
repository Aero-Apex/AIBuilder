"use client"

import React from "react"
import type { BuildResult as BuildResultType } from "@/lib/types"
import { PartCard } from "@/components/PartCard"
import { Button } from "@/components/ui/Button"
import { PDFExportButton } from "@/components/PDFExportButton"
import { PCPartPickerListButton } from "@/components/PCPartPickerListButton"

interface BuildResultProps {
  build: BuildResultType
  onReset: () => void
}

export function BuildResult({ build, onReset }: BuildResultProps) {
  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <header className="border-b border-surface-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-cyber-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-gradient">Your Build Is Ready</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={onReset}>
            Start Over
          </Button>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <SummaryStat
              label="Total Price"
              value={`${build.currency} ${build.totalPrice.toFixed(2)}`}
              accent
            />
            <SummaryStat
              label="Performance"
              value={build.estimatedPerformance.split(" ").slice(0, 3).join(" ")}
            />
            <SummaryStat
              label="Power Draw"
              value={`${build.totalWattage}W`}
            />
            <SummaryStat
              label="Components"
              value={`${build.parts.length} parts`}
            />
          </div>

          {/* Summary + Explanation */}
          <div className="card-gradient rounded-2xl p-6 glow-border space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-accent-400 uppercase tracking-wider mb-2">Summary</h2>
              <p className="text-sm text-surface-300 leading-relaxed">{build.summary}</p>
            </div>
            <div className="border-t border-surface-700 pt-4">
              <h2 className="text-sm font-semibold text-accent-400 uppercase tracking-wider mb-2">Build Philosophy</h2>
              <p className="text-sm text-surface-300 leading-relaxed">{build.buildExplanation}</p>
            </div>
          </div>

          {/* Upgrade path */}
          {build.upgradePath.length > 0 && (
            <div className="card-gradient rounded-2xl p-6 border border-surface-700/50 space-y-3">
              <h2 className="text-sm font-semibold text-cyber-400 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Upgrade Path
              </h2>
              <ul className="space-y-2">
                {build.upgradePath.map((upgrade, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-surface-300">
                    <span className="text-cyber-400 mt-0.5">•</span>
                    {upgrade}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Parts list */}
          <div>
            <h2 className="text-lg font-bold text-surface-100 mb-4">Parts List</h2>
            <div className="space-y-3">
              {build.parts.map((part, i) => (
                <PartCard key={`${part.category}-${i}`} part={part} index={i} />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-surface-800">
            <PDFExportButton build={build} />
            <PCPartPickerListButton build={build} />
            <span className="text-xs text-surface-500 ml-auto">
              Prices are estimates. Always verify compatibility and current pricing.
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}

function SummaryStat({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
      <p className="text-xs text-surface-500 mb-1">{label}</p>
      <p className={`text-lg font-bold ${accent ? "text-accent-400" : "text-surface-100"}`}>
        {value}
      </p>
    </div>
  )
}
