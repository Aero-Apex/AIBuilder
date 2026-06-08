"use client"

import React from "react"
import type { Part } from "@/lib/types"

const categoryIcons: Record<string, React.ReactNode> = {
  CPU: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  GPU: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Motherboard: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  RAM: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  Storage: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8M2 10h20" />
    </svg>
  ),
  PSU: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Case: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Cooler: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3M5.636 5.636l2.121 2.121m8.486 8.486l2.121 2.121M5.636 18.364l2.121-2.121m8.486-8.486l2.121-2.121" />
    </svg>
  ),
  OS: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Monitor: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Peripherals: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
}

interface PartCardProps {
  part: Part
  index: number
}

export function PartCard({ part, index }: PartCardProps) {
  return (
    <div className="animate-slide-up opacity-0" style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}>
      <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 hover:border-accent-500/20 transition-all duration-300 group">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center text-accent-400 flex-shrink-0">
              {categoryIcons[part.category] || (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-accent-400 uppercase tracking-wider">
                {part.category}
              </p>
              <p className="text-sm font-semibold text-surface-100 mt-0.5 leading-snug break-words">
                {part.name}
              </p>
              <p className="text-xs text-surface-400 mt-1.5 leading-relaxed">
                {part.reason}
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-lg font-bold text-cyber-400">
              {part.currency} {part.price.toFixed(2)}
            </p>
          </div>
        </div>

        {(part.amazonUrl || part.ebayUrl || part.pcpartpickerSearchUrl) && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-surface-700/50">
            {part.amazonUrl && (
              <a
                href={part.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-700/50 text-surface-300 text-xs font-medium hover:bg-surface-600/50 hover:text-surface-100 transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.483 0a13.483 13.483 0 00-8.34 4.73L3.08 6.96l-.01.01c-.44.54-.85 1.1-1.23 1.68a.24.24 0 00.04.32c.17.14.34.29.51.43l.01.01a.78.78 0 001.06-.08l.01-.01c.62-.64 1.28-1.24 1.97-1.8a12.033 12.033 0 014.38-2.2c2.67-.74 5.46-.52 7.99.63 1.63.75 3.03 1.9 4.08 3.33l.01.01c.18.25.44.38.72.38.24 0 .48-.1.66-.28l.01-.01a.96.96 0 00.2-1.07l-.02-.03-.01-.02a13.66 13.66 0 00-5.19-4.82A13.39 13.39 0 0013.483 0zm5.86 7.31a.24.24 0 00-.11.09l-.01.02a.24.24 0 00-.04.14c0 .05.02.1.05.14v.01c.43.5.82 1.03 1.17 1.59.52.83.93 1.72 1.21 2.66a10.86 10.86 0 01.55 3.35c0 3.01-1.16 5.86-3.25 7.99l-.01.01a.24.24 0 00-.07.18c0 .07.03.14.08.19l.01.01c.07.07.17.1.27.08.09-.02.17-.09.22-.17l.01-.01a12.03 12.03 0 003.58-5.59c.53-2.03.58-4.16.15-6.22a11.24 11.24 0 00-1.8-4.04.24.24 0 00-.22-.1.24.24 0 00-.17.07l-.01.01z" />
                </svg>
                Amazon
              </a>
            )}
            {part.ebayUrl && (
              <a
                href={part.ebayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-700/50 text-surface-300 text-xs font-medium hover:bg-surface-600/50 hover:text-surface-100 transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.572 2.382c-1.424 0-2.86.22-4.2.668-1.34.447-2.52 1.13-3.503 1.998-.982.868-1.76 1.88-2.27 2.988-.51 1.108-.767 2.286-.767 3.458 0 1.668.478 3.2 1.433 4.532.956 1.332 2.254 2.168 3.894 2.608 1.387.373 2.86.56 4.398.56 1.45 0 2.9-.163 4.34-.488 1.303-.294 2.52-.74 3.647-1.335.126-.066.2-.17.2-.3 0-.13-.074-.234-.2-.3-.792-.4-1.446-.92-1.958-1.558-.085-.12-.222-.16-.362-.13-.136.03-.24.13-.26.268-.12.87-.528 1.64-1.178 2.29-1.14 1.14-2.74 1.71-4.79 1.71-1.71 0-3.26-.46-4.5-1.35-.79-.57-1.3-1.28-1.56-2.13-.02-.08-.08-.16-.18-.18-.1-.02-.2.02-.24.1-.73 1.45-1.91 2.65-3.45 3.46-.12.06-.18.17-.18.3 0 .13.06.24.18.3.79.4 1.46.91 1.98 1.55.09.12.22.19.36.19.02 0 .04 0 .06-.01.16-.02.3-.12.36-.26.43-.93.98-1.46 1.66-1.78 1.08-.51 2.27-.76 3.49-.76 1.8 0 3.42.35 4.81 1.04.26.13.5.27.73.42.07.04.15.08.22.12.09.05.2.04.28-.03.07-.07.1-.17.08-.27-.01-.1-.06-.18-.12-.24-1-1.06-2.18-1.79-3.5-2.02-1.08-.19-2.2-.28-3.32-.28h-.07c-1.01 0-2.01.1-2.99.3-.7.15-1.37.38-2 .69zm11.09 2.78c-.1.57-.28 1.1-.52 1.6-.25.5-.57.96-.95 1.37-.38.41-.82.75-1.3 1-.49.26-1.03.39-1.58.39-.56 0-1.1-.13-1.59-.39-.49-.25-.93-.59-1.31-1-.38-.41-.7-.87-.95-1.37-.24-.5-.42-1.03-.52-1.6-.03-.15-.15-.26-.3-.28-.15-.02-.3.04-.39.17-.7.96-1.08 2.03-1.16 3.12-.01.15.07.28.2.35.63.33 1.16.81 1.56 1.4.4.59.64 1.26.7 1.95.01.12.09.22.2.26.12.04.25.01.34-.07.48-.43.84-.96 1.05-1.55.07-.19.22-.33.42-.38.19-.05.39-.01.55.1.31.21.66.37 1.03.47.18.05.37.08.56.08.19 0 .38-.03.56-.08.37-.1.72-.26 1.03-.47.16-.11.36-.15.55-.1.2.05.35.19.42.38.21.59.57 1.12 1.05 1.55.09.08.22.11.34.07.11-.04.19-.14.2-.26.06-.69.3-1.36.7-1.95.4-.59.93-1.07 1.56-1.4.13-.07.21-.2.2-.35-.08-1.09-.46-2.16-1.16-3.12-.09-.13-.24-.19-.39-.17-.15.02-.27.13-.3.28z" />
                </svg>
                eBay
              </a>
            )}
            {part.pcpartpickerSearchUrl && (
              <a
                href={part.pcpartpickerSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-700/50 text-surface-300 text-xs font-medium hover:bg-surface-600/50 hover:text-surface-100 transition-all ml-auto"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                PCPartPicker
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
