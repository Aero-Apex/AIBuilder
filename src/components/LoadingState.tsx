"use client"

import React, { useState, useEffect } from "react"

const LOADING_MESSAGES = [
  "Analyzing your requirements...",
  "Consulting hardware database...",
  "Checking part compatibility...",
  "Optimizing price-to-performance...",
  "Researching current market prices...",
  "Balancing your build...",
  "Calculating power requirements...",
  "Finalizing your custom build...",
]

export function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Animated PC icon */}
        <div className="relative mb-12">
          <div className="w-24 h-24 mx-auto relative">
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/20 to-cyber-600/20 loading-pulse" />
            <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-accent-500/30 to-cyber-600/30 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-12 h-12 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-xl font-bold text-surface-100 mb-2">Building Your PC</h2>
        <p className="text-sm text-surface-400 transition-all duration-300 h-6" key={messageIndex}>
          {LOADING_MESSAGES[messageIndex]}
        </p>

        {/* Progress bar */}
        <div className="mt-8 w-full bg-surface-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-500 to-cyber-500 rounded-full animate-pulse"
            style={{ width: "60%" }}
          />
        </div>

        <p className="text-xs text-surface-600 mt-4">This usually takes 10–30 seconds</p>
      </div>
    </div>
  )
}
