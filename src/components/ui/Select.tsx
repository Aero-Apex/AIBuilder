"use client"

import React from "react"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export function Select({ label, error, options, placeholder, className = "", ...props }: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-surface-300">
          {label}
        </label>
      )}
      <select
        className={`w-full rounded-lg bg-surface-800 border border-surface-600 text-surface-100 px-3 py-2.5 text-sm
          focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 focus:outline-none
          transition-all duration-200 appearance-none cursor-pointer
          ${error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : ""}
          ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
