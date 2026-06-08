import { NextRequest, NextResponse } from "next/server"
import { chatCompletion } from "@/lib/ai"
import { searchWeb } from "@/lib/search"
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompt"
import { buildPCPartPickerUrls } from "@/lib/pcpartpicker"
import type { BuildResult, WizardData } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { data }: { data: WizardData } = await request.json()

    if (!data) {
      return NextResponse.json({ error: "Missing build data" }, { status: 400 })
    }

    let searchContext: string | undefined

    if (data.preferences.usedParts) {
      try {
        const searchResults = await searchWeb(
          `${data.budget.amount} ${data.budget.currency} gaming PC build parts 2024`
        )
        searchContext = searchResults
          .map((r) => `- ${r.title}: ${r.snippet}`)
          .join("\n")
      } catch {
        console.warn("Web search unavailable, proceeding without pricing context")
      }
    }

    const systemPrompt = buildSystemPrompt()
    const userPrompt = buildUserPrompt(data, searchContext)

    const rawResponse = await chatCompletion([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ])

    let buildResult: BuildResult
    try {
      buildResult = JSON.parse(rawResponse)
    } catch {
      console.error("Failed to parse AI response as JSON:", rawResponse)
      return NextResponse.json(
        { error: "AI returned invalid JSON. Please try again." },
        { status: 500 }
      )
    }

    if (!buildResult.parts || !Array.isArray(buildResult.parts) || buildResult.parts.length === 0) {
      console.error("AI returned empty or invalid parts list:", buildResult)
      return NextResponse.json(
        { error: "AI generated an empty build. Please try again with more specific requirements." },
        { status: 500 }
      )
    }

    buildResult.parts = buildResult.parts.map(buildPCPartPickerUrls)

    buildResult.totalPrice = buildResult.parts.reduce(
      (sum, part) => sum + (part.price || 0),
      0
    )

    return NextResponse.json({ build: buildResult })
  } catch (error: any) {
    console.error("Build generation failed:", error)
    return NextResponse.json(
      { error: error.message || "Failed to generate build. Check your AI API key and try again." },
      { status: 500 }
    )
  }
}
