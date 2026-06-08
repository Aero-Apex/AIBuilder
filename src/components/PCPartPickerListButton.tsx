"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/Button"
import { generateBuildListText } from "@/lib/pcpartpicker"
import type { BuildResult } from "@/lib/types"

interface PCPartPickerListButtonProps {
  build: BuildResult
}

export function PCPartPickerListButton({ build }: PCPartPickerListButtonProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const text = generateBuildListText(build)
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Button
      variant="secondary"
      onClick={handleCopy}
      icon={
        copied ? (
          <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        )
      }
    >
      {copied ? "Copied!" : "Copy for PCPartPicker"}
    </Button>
  )
}
