"use client"

import React from "react"

interface ToggleProps {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative mt-0.5 flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-10 h-6 rounded-full bg-surface-700 peer-checked:bg-accent-500 transition-colors duration-200 peer-focus:ring-2 peer-focus:ring-accent-500/50" />
        <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 peer-checked:translate-x-4" />
      </div>
      <div>
        <span className="block text-sm font-medium text-surface-200 group-hover:text-surface-100 transition-colors">
          {label}
        </span>
        {description && (
          <span className="block text-xs text-surface-400 mt-0.5">{description}</span>
        )}
      </div>
    </label>
  )
}
