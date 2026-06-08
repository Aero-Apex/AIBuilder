import { NextRequest, NextResponse } from "next/server"
import { searchWeb, searchPrices } from "@/lib/search"

export async function POST(request: NextRequest) {
  try {
    const { query, used } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Missing search query" }, { status: 400 })
    }

    const results = await searchWeb(query)
    const prices = await searchPrices(query, used)

    return NextResponse.json({
      results,
      prices,
    })
  } catch (error: any) {
    console.error("Search failed:", error)
    return NextResponse.json(
      { error: error.message || "Search failed" },
      { status: 500 }
    )
  }
}
