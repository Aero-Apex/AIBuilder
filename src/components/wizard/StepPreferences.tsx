"use client"

import React from "react"
import { Toggle } from "@/components/ui/Toggle"
import { Select } from "@/components/ui/Select"
import type { WizardData, FormFactor, StorageType } from "@/lib/types"

interface StepPreferencesProps {
  data: WizardData
  updateData: (partial: Partial<WizardData>) => void
}

export function StepPreferences({ data, updateData }: StepPreferencesProps) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-xl font-bold text-surface-100">Preferences</h2>
        <p className="text-sm text-surface-400 mt-1">
          Fine-tune your build with these optional settings.
        </p>
      </div>

      <div className="space-y-5">
        <Toggle
          label="Allow used parts"
          description="Search Amazon Warehouse &amp; eBay for used/refurbished CPU and GPU deals to save 20-30%"
          checked={data.preferences.usedParts}
          onChange={(v) =>
            updateData({
              preferences: { ...data.preferences, usedParts: v },
            })
          }
        />

        <div className="border-t border-surface-700 pt-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="CPU Brand Preference"
              options={[
                { value: "any", label: "No Preference" },
                { value: "intel", label: "Intel" },
                { value: "amd", label: "AMD" },
              ]}
              value={data.preferences.brandPreferenceCPU}
              onChange={(e) =>
                updateData({
                  preferences: { ...data.preferences, brandPreferenceCPU: e.target.value as any },
                })
              }
            />
            <Select
              label="GPU Brand Preference"
              options={[
                { value: "any", label: "No Preference" },
                { value: "nvidia", label: "NVIDIA" },
                { value: "amd", label: "AMD" },
              ]}
              value={data.preferences.brandPreferenceGPU}
              onChange={(e) =>
                updateData({
                  preferences: { ...data.preferences, brandPreferenceGPU: e.target.value as any },
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Form Factor"
              options={[
                { value: "ATX", label: "ATX (Full Size)" },
                { value: "mATX", label: "mATX (Compact)" },
                { value: "ITX", label: "ITX (Small Form Factor)" },
              ]}
              value={data.preferences.formFactor}
              onChange={(e) =>
                updateData({
                  preferences: { ...data.preferences, formFactor: e.target.value as FormFactor },
                })
              }
            />
            <Select
              label="Storage Type"
              options={[
                { value: "SSD", label: "SSD Only" },
                { value: "SSD+HDD", label: "SSD + HDD Combo" },
              ]}
              value={data.preferences.storageType}
              onChange={(e) =>
                updateData({
                  preferences: { ...data.preferences, storageType: e.target.value as StorageType },
                })
              }
            />
          </div>
        </div>

        <div className="border-t border-surface-700 pt-5 space-y-4">
          <Toggle
            label="RGB Lighting"
            description="Include RGB components and a case with tempered glass side panel"
            checked={data.preferences.rgb}
            onChange={(v) =>
              updateData({
                preferences: { ...data.preferences, rgb: v },
              })
            }
          />
          <Toggle
            label="Include Windows 11 License"
            description="Add a Windows 11 Home license (~$120) to the build"
            checked={data.preferences.includeOS}
            onChange={(v) =>
              updateData({
                preferences: { ...data.preferences, includeOS: v },
              })
            }
          />
          <Toggle
            label="Include Monitor"
            description="Add a monitor matching your resolution target to the total"
            checked={data.preferences.includeMonitor}
            onChange={(v) =>
              updateData({
                preferences: { ...data.preferences, includeMonitor: v },
              })
            }
          />
          <Toggle
            label="Include Peripherals"
            description="Add keyboard, mouse, and headset to the build"
            checked={data.preferences.includePeripherals}
            onChange={(v) =>
              updateData({
                preferences: { ...data.preferences, includePeripherals: v },
              })
            }
          />
        </div>
      </div>
    </div>
  )
}
