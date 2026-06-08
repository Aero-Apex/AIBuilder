const API_KEY = process.env.AI_API_KEY || ""
const BASE_URL = process.env.AI_BASE_URL || "https://api.openai.com/v1"
const MODEL = process.env.AI_MODEL || "gpt-4o-mini"

interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

interface ChatCompletionRequest {
  model: string
  messages: ChatMessage[]
  temperature?: number
  max_tokens?: number
  response_format?: { type: "json_object" }
}

interface ChatCompletionResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

export async function chatCompletion(
  messages: ChatMessage[],
  options?: { temperature?: number; max_tokens?: number }
): Promise<string> {
  const body: ChatCompletionRequest = {
    model: MODEL,
    messages,
    temperature: options?.temperature ?? 0.7,
    max_tokens: options?.max_tokens ?? 4096,
    response_format: { type: "json_object" },
  }

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`AI API error (${response.status}): ${errorText}`)
  }

  const data: ChatCompletionResponse = await response.json()
  return data.choices[0].message.content
}
