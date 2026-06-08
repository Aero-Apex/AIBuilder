export type Currency = "USD" | "EUR" | "GBP" | "PLN" | "CAD" | "AUD"

export type Resolution = "1080p" | "1440p" | "4K" | "ultrawide"

export type TargetFps = "60" | "120" | "144" | "240"

export type BrandPreference = "any" | "intel" | "amd" | "nvidia"

export type FormFactor = "ATX" | "mATX" | "ITX"

export type StorageType = "SSD" | "SSD+HDD"

export interface BudgetData {
  amount: number
  currency: Currency
}

export interface UseCasePriorities {
  gaming: number
  productivity: number
  streaming: number
  development: number
}

export interface PreferencesData {
  usedParts: boolean
  brandPreferenceCPU: "any" | "intel" | "amd"
  brandPreferenceGPU: "any" | "nvidia" | "amd"
  rgb: boolean
  formFactor: FormFactor
  storageType: StorageType
  includeOS: boolean
  includeMonitor: boolean
  includePeripherals: boolean
}

export interface WizardData {
  budget: BudgetData
  purpose: string
  resolution: Resolution
  targetFps: TargetFps
  useCasePriorities: UseCasePriorities
  preferences: PreferencesData
}

export type PartCategory =
  | "CPU"
  | "GPU"
  | "Motherboard"
  | "RAM"
  | "Storage"
  | "PSU"
  | "Case"
  | "Cooler"
  | "OS"
  | "Monitor"
  | "Peripherals"

export interface Part {
  name: string
  category: PartCategory
  price: number
  currency: string
  reason: string
  amazonUrl?: string
  ebayUrl?: string
  pcpartpickerSearchUrl?: string
}

export interface BuildResult {
  parts: Part[]
  totalPrice: number
  currency: string
  estimatedPerformance: string
  totalWattage: number
  summary: string
  upgradePath: string[]
  buildExplanation: string
}

export interface SearchResult {
  title: string
  url: string
  snippet: string
}

export interface BuildRequest {
  data: WizardData
}
