"use client"

import React from "react"

interface SliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  color?: "accent" | "cyber"
}

export function Slider({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
  step = 1,
  color = "accent",
}: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100
  const colorClass = color === "accent" ? "bg-accent-500" : "bg-cyber-500"

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-surface-300">{label}</label>
        <span className={`text-sm font-bold ${color === "accent" ? "text-accent-400" : "text-cyber-400"}`}>
          {value}/10
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-700
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-surface-50
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-accent-500
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-surface-50
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-accent-500
            [&::-moz-range-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${color === "accent" ? "#06b6d4" : "#a855f7"} ${percent}%, #334155 ${percent}%)`,
          }}
        />
      </div>
    </div>
  )
}
