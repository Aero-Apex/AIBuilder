import type { SearchResult } from "./types"

const SEARXNG_BASE_URL = process.env.SEARXNG_BASE_URL || "http://localhost:4000"

export async function searchWeb(query: string): Promise<SearchResult[]> {
  try {
    const url = new URL(`${SEARXNG_BASE_URL}/search`)
    url.searchParams.set("q", query)
    url.searchParams.set("format", "json")
    url.searchParams.set("language", "en-US")

    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      console.warn(`SearXNG returned ${response.status}, falling back to empty results`)
      return []
    }

    const data = await response.json()
    return (data.results || []).slice(0, 10).map((r: any) => ({
      title: r.title || "",
      url: r.url || "",
      snippet: r.content || r.snippet || "",
    }))
  } catch (error) {
    console.warn("SearXNG search failed (is the service running?):", error)
    return []
  }
}

export async function searchPrices(
  partName: string,
  used: boolean = false
): Promise<{ amazonUrl?: string; ebayUrl?: string; estimatedPrice?: number }> {
  const prefix = used ? "used" : "new"
  const amazonQuery = `${partName} ${prefix} price`
  const ebayQuery = `${partName} ${used ? "used" : ""}`

  const [amazonResults, ebayResults] = await Promise.all([
    searchWeb(`${amazonQuery} site:amazon.com`),
    searchWeb(`${ebayQuery} site:ebay.com`),
  ])

  const amazonUrl = amazonResults[0]?.url
  const ebayUrl = ebayResults[0]?.url

  const priceResults = await searchWeb(`${partName} price USD`)
  const priceMatches: number[] = []
  for (const r of priceResults) {
    const regex = /\$(\d{2,4}(?:\.\d{2})?)/g
    let match = regex.exec(r.snippet)
    while (match !== null) {
      priceMatches.push(parseFloat(match[1]))
      match = regex.exec(r.snippet)
    }
  }
  const priceMatch = priceMatches
    .filter((p) => p > 50 && p < 10000)
    .sort((a, b) => a - b)

  const estimatedPrice = priceMatch.length > 0 ? priceMatch[Math.floor(priceMatch.length / 2)] : undefined

  return { amazonUrl, ebayUrl, estimatedPrice }
}
