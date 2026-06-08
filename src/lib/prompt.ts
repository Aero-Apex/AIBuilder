import type { WizardData } from "./types"

export function buildSystemPrompt(): string {
  return `You are an expert PC builder and hardware consultant with deep knowledge of current PC components, compatibility, pricing, and performance. Your task is to recommend a complete, balanced PC build based on the user's requirements.

You MUST respond in valid JSON only, using this exact structure:
{
  "parts": [
    {
      "name": "string - exact product name with model number",
      "category": "CPU | GPU | Motherboard | RAM | Storage | PSU | Case | Cooler | OS | Monitor | Peripherals",
      "price": number - estimated price in the user's currency,
      "reason": "string - concise explanation of why this part was chosen for their specific use case",
      "amazonUrl": "string - Amazon search URL for this part (https://www.amazon.com/s?k={url_encoded_part_name})",
      "ebayUrl": "string - eBay search URL for this part (https://www.ebay.com/sch/i.html?_nkw={url_encoded_part_name})"
    }
  ],
  "totalPrice": number,
  "estimatedPerformance": "string - e.g. '1440p Ultra at 100+ fps in modern games, excellent for 4K video editing'",
  "totalWattage": number - estimated total power consumption in watts,
  "summary": "string - 2-3 sentence overview of the build",
  "upgradePath": ["string - suggested future upgrade 1", "string - suggested future upgrade 2"],
  "buildExplanation": "string - detailed explanation of the build philosophy and part choices"
}

CRITICAL RULES:
1. COMPATIBILITY: All parts MUST be compatible — correct socket, chipset, RAM generation, PSU wattage headroom, case clearance for GPU/cooler
2. BALANCE: Distribute budget wisely — GPU 30-40%, CPU 20-30%, rest for other components. Never overspend on one component at the expense of others
3. USE CASE: Prioritize components based on the user's specific use case (gaming needs strong GPU, productivity needs more cores/RAM, etc.)
4. PRICING: Provide realistic current prices. If used parts allowed, factor ~20-30% savings on GPU/CPU
5. LINKS: Always include Amazon and eBay search URLs for each part
6. REALISM: Recommend parts that are actually available and in stock. Avoid discontinued or mythical "paper launch" products
7. COMPLETENESS: Include ALL necessary components for a working PC. Only include OS/Monitor/Peripherals if the user requested them
8. FUTURE-PROOF: Recommend components that leave room for future upgrades when possible`
}

export function buildUserPrompt(data: WizardData, searchContext?: string): string {
  const usedNote = data.preferences.usedParts
    ? "\n\nNOTE: Used parts are allowed. Factor in ~20-30% savings on GPU and CPU from used market (eBay, Amazon Warehouse). Include eBay links for these components."
    : ""

  const osNote = data.preferences.includeOS
    ? "\nInclude Windows 11 license in the build."
    : ""

  const monitorNote = data.preferences.includeMonitor
    ? "\nInclude a monitor suitable for the resolution target."
    : ""

  const peripheralsNote = data.preferences.includePeripherals
    ? "\nInclude keyboard, mouse, and headset/speakers in the build."
    : ""

  const searchContextBlock = searchContext
    ? `\n\nReal-time pricing context from web search (use this to inform your price estimates):\n${searchContext}`
    : ""

  return `Please generate a complete PC build with these requirements:

BUDGET: ${data.budget.amount} ${data.budget.currency}
RESOLUTION TARGET: ${data.resolution}
FRAME RATE TARGET: ${data.targetFps} FPS
USE CASE / PURPOSE: ${data.purpose}

USE CASE PRIORITIES (1-10 scale):
- Gaming: ${data.useCasePriorities.gaming}/10
- Productivity (video/photo editing, 3D rendering): ${data.useCasePriorities.productivity}/10
- Streaming: ${data.useCasePriorities.streaming}/10
- Software Development: ${data.useCasePriorities.development}/10

PREFERENCES:
- CPU Brand: ${data.preferences.brandPreferenceCPU.toUpperCase()}
- GPU Brand: ${data.preferences.brandPreferenceGPU.toUpperCase()}
- RGB Lighting: ${data.preferences.rgb ? "Yes" : "No"}
- Form Factor: ${data.preferences.formFactor}
- Storage: ${data.preferences.storageType}
- Used Parts Allowed: ${data.preferences.usedParts ? "Yes" : "No"}${usedNote}${osNote}${monitorNote}${peripheralsNote}${searchContextBlock}

Respond with valid JSON only.`
}
