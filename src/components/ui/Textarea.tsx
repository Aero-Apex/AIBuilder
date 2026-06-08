"use client"

import React from "react"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className = "", ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-surface-300">{label}</label>
      )}
      <textarea
        className={`w-full rounded-lg bg-surface-800 border border-surface-600 text-surface-100 placeholder-surface-500
          px-3 py-2.5 text-sm min-h-[100px] resize-y
          focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 focus:outline-none
          transition-all duration-200
          ${error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : ""}
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
