# AI PC Builder

An intelligent PC building assistant that uses AI to generate custom PC builds based on your needs, budget, and preferences.

## Features

- **AI-Powered Builds** — Describe your use case, and the AI generates a complete, compatible parts list
- **Multi-Step Wizard** — Budget → Purpose → Preferences → Review flow
- **Used Parts Support** — Option to include used/refurbished parts from Amazon & eBay
- **Web Search** — SearXNG integration for real-time pricing context
- **PDF Export** — Download a professional build report
- **PCPartPicker Integration** — Copy parts list for PCPartPicker compatibility checking
- **OpenAI-Compatible** — Works with OpenAI, Anthropic (via proxy), Ollama, vLLM, LM Studio, or any OpenAI-compatible endpoint
- **Dark Theme** — Modern, tech-inspired UI with a dark color scheme

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- An AI API key (OpenAI, Anthropic, or any OpenAI-compatible provider)
- (Optional) A [SearXNG](https://docs.searxng.org/) instance for web search

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/Aero-Apex/AIBuilder.git
cd AIBuilder
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your settings:

```env
# AI Provider (OpenAI-compatible)
AI_API_KEY=sk-your-api-key-here
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini

# Web Search (SearXNG) — optional
SEARXNG_BASE_URL=http://localhost:4000

# Default currency (USD, EUR, GBP, PLN, CAD, AUD)
CURRENCY=USD
```

4. **Run the development server**

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Usage

1. **Budget** — Enter your budget, currency, resolution target, and desired FPS
2. **Purpose** — Describe what you'll use the PC for (gaming, video editing, streaming, development, etc.) and set priorities
3. **Preferences** — Toggle used parts, choose brand preferences, form factor, RGB, and extras (OS, monitor, peripherals)
4. **Review** — Double-check your selections and generate the build
5. **Results** — View your complete build with part details, pricing, shopping links, and download a PDF report

## AI Provider Setup

### OpenAI
```
AI_API_KEY=sk-...
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
```

### Anthropic (via OpenAI-compatible proxy)
```
AI_API_KEY=sk-ant-...
AI_BASE_URL=https://api.anthropic.com/v1
AI_MODEL=claude-sonnet-4-20250514
```

### Ollama (local)
```
AI_API_KEY=ollama
AI_BASE_URL=http://localhost:11434/v1
AI_MODEL=llama3.1
```

### LM Studio
```
AI_API_KEY=not-needed
AI_BASE_URL=http://localhost:1234/v1
AI_MODEL=local-model
```

## SearXNG Setup (Optional)

SearXNG provides real-time pricing data. You can:

- **Run locally** via Docker: `docker run --rm -d -p 4000:8080 searxng/searxng`
- **Use a public instance**: Set `SEARXNG_BASE_URL` to any public SearXNG instance URL

If no SearXNG instance is available, the app will still work — it will just skip the web search step.

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

Set the environment variables (`AI_API_KEY`, `AI_BASE_URL`, `AI_MODEL`) in the Vercel dashboard.

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [Zod](https://zod.dev/)
- [Lucide Icons](https://lucide.dev/)

## License

MIT
