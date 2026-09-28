"use client";

import React, { useState } from "react";
import { Sliders, Check, RefreshCw } from "lucide-react";
import { updateTraderPreferences } from "@/app/actions/preferences";
import { ASSET_CLASS_LABELS } from "@/lib/constants";

const REGIONAL_BLOCS = [
  { id: "ECOWAS", label: "ECOWAS (West Africa)", desc: "NGN, GHS, CFA markets" },
  { id: "SADC", label: "SADC (Southern Africa)", desc: "JSE, ZAR, BWP liquidity" },
  { id: "EAC", label: "EAC (East Africa)", desc: "KES, UGX micro-indicators" },
  { id: "MAGHREB", label: "Maghreb (North Africa)", desc: "EGP, MAD macro variables" },
];

const ASSET_CLASSES = Object.entries(ASSET_CLASS_LABELS).map(([id, label]) => ({ id, label }));

const DELIVERY_VALUES = {
  TERMINAL_ONLY: "terminal-only",
  SMS: "sms",
  ALL: "all",
} as const;

export interface SavedPreferences {
  regions: string[];
  assetClasses: string[];
  delivery: keyof typeof DELIVERY_VALUES;
}

export default function PreferencesPanel({ initial }: { initial?: SavedPreferences | null }) {
  const [feedback, setFeedback] = useState<{
    success: boolean;
    msg: string;
  } | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const data = new FormData(e.currentTarget);
    const result = await updateTraderPreferences(data);

    setSaving(false);
    setFeedback({
      success: result.success,
      msg: result.success
        ? (result.message ?? "Saved.")
        : (result.error ?? "An error occurred."),
    });
  }

  return (
    <div className="w-full max-w-2xl bg-af-panel border border-af-border rounded-xl text-slate-900 p-6 shadow-panel">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-af-border mb-6">
        <Sliders className="w-5 h-5 text-blue-500" />
        <div>
          <h2 className="text-base font-bold tracking-tight">
            Terminal Filtering Parameters
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Configure wire isolation matching your desk allocation directives.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Regional blocs */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">
            African Regional Blocs
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {REGIONAL_BLOCS.map((bloc) => (
              <label
                key={bloc.id}
                className="flex items-start gap-3 p-3 bg-af-bg border border-af-border rounded-xl cursor-pointer hover:border-slate-300 transition group"
              >
                <input
                  type="checkbox"
                  name="regions"
                  value={bloc.id}
                  defaultChecked={!initial || initial.regions.includes(bloc.id)}
                  className="mt-1 rounded bg-af-panel border-af-border text-blue-600 focus:ring-0 focus:ring-offset-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 group-hover:text-slate-900 transition">
                    {bloc.label}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {bloc.desc}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Asset classes */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">
            Asset Core Classes
          </label>
          <div className="flex flex-wrap gap-2.5">
            {ASSET_CLASSES.map((asset) => (
              <label
                key={asset.id}
                className="px-3 py-2 bg-af-bg border border-af-border rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer hover:bg-af-panel transition"
              >
                <input
                  type="checkbox"
                  name="assets"
                  value={asset.id}
                  defaultChecked={!initial || initial.assetClasses.includes(asset.id)}
                  className="rounded bg-af-panel border-af-border text-blue-600 focus:ring-0"
                />
                <span>{asset.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Delivery mode */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">
            Alert Delivery Mode
          </label>
          <select
            name="delivery"
            defaultValue={initial ? DELIVERY_VALUES[initial.delivery] : "terminal-only"}
            className="bg-af-bg border border-af-border rounded-lg px-3 py-2 text-xs font-medium w-full max-w-xs focus:outline-none focus:border-blue-500 text-slate-800"
          >
            <option value="terminal-only">Terminal Only</option>
            <option value="sms">Terminal + SMS</option>
            <option value="all">All Channels (UI, SMS, Webhook)</option>
          </select>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`p-3.5 rounded-lg text-xs font-medium ${
              feedback.success
                ? "bg-emerald-50 border border-emerald-200 text-emerald-600"
                : "bg-rose-50 border border-rose-200 text-rose-600"
            }`}
          >
            {feedback.msg}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-500 text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-panel shadow-blue-600/10 transition ml-auto"
        >
          {saving ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Check className="w-3.5 h-3.5" />
          )}
          Commit Filter Config
        </button>
      </form>
    </div>
  );
}
