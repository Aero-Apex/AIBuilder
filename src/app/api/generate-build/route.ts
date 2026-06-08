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

      if (!buildResult || typeof buildResult !== "object" || Array.isArray(buildResult)) {
        throw new Error("AI response is not a valid build object")
      }
      if (!buildResult.parts || !Array.isArray(buildResult.parts) || buildResult.parts.length === 0) {
        throw new Error("AI returned an empty or invalid parts list")
      }
    } catch (parseError: any) {
      console.error("=== AI RAW RESPONSE ===")
      console.error(rawResponse)
      console.error("=== PARSE ERROR ===", parseError)
      const message = parseError.message === "AI response is not a valid build object" || parseError.message === "AI returned an empty or invalid parts list"
        ? parseError.message
        : "AI returned invalid JSON. Please try again."
      return NextResponse.json({ error: message }, { status: 500 })
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
