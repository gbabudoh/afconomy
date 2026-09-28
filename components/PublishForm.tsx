"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, Tag, Send, Save, LineChart } from "lucide-react";
import { publishPolicyBrief, type PublishResult } from "@/app/actions/news";
import { CATEGORY_LABELS, REGION_LABELS } from "@/lib/constants";

const input =
  "w-full bg-af-bg border border-af-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition";
const label = "block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider";

export default function PublishForm({ authorName }: { authorName: string }) {
  const [result, setResult] = useState<PublishResult | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    // Which button submitted: publish or save as draft
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    if (submitter?.value) data.set("intent", submitter.value);

    setPending(true);
    setResult(null);
    const res = await publishPolicyBrief(data);
    setPending(false);
    setResult(res);
    if (res.success) form.reset();
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-af-panel border border-af-border rounded-2xl shadow-panel">
      <div className="flex items-center gap-3 mb-6 border-b border-af-border pb-4">
        <FileText className="w-6 h-6 text-blue-500" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Newsroom Dispatch</h1>
          <p className="text-xs text-slate-500">Filing as {authorName}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={label}>Title</label>
          <input name="title" required maxLength={500} placeholder="e.g. AfCFTA Trade Volumes Surge Across ECOWAS" className={input} />
        </div>

        <div>
          <label className={label}>Standfirst</label>
          <input name="excerpt" maxLength={1000} placeholder="One-line summary shown on the wire" className={input} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={label}>Category</label>
            <select name="category" required className={input}>
              {Object.entries(CATEGORY_LABELS).map(([key, text]) => (
                <option key={key} value={key}>{text}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Regional bloc</label>
            <select name="region" required className={input}>
              {Object.entries(REGION_LABELS).map(([key, text]) => (
                <option key={key} value={key}>{text}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={label}>Tags (comma-separated)</label>
            <div className="relative">
              <Tag className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input name="tags" placeholder="Inflation, Trade, Central Bank" className={`${input} pl-10`} />
            </div>
          </div>
          <div>
            <label className={label}>Linked tickers (comma-separated)</label>
            <div className="relative">
              <LineChart className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input name="symbols" placeholder="USD/NGN, NGX:DANGCEM" className={`${input} pl-10 font-mono`} />
            </div>
          </div>
        </div>

        <div>
          <label className={label}>Content</label>
          <textarea
            name="content"
            required
            rows={12}
            placeholder="Separate paragraphs with a blank line."
            className={input}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="isPremium" className="rounded" />
          Premium subscribers only
        </label>

        {result && (
          <div
            className={`p-4 rounded-lg text-sm font-medium ${
              result.success
                ? "bg-emerald-50 border border-emerald-200 text-emerald-600"
                : "bg-rose-50 border border-rose-200 text-rose-600"
            }`}
          >
            {result.success ? (
              <>
                {result.message}{" "}
                <Link href={`/news/${result.slug}`} className="underline">View</Link>
              </>
            ) : (
              result.error
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            value="draft"
            disabled={pending}
            className="flex-1 bg-af-bg border border-af-border hover:border-slate-300 disabled:opacity-50 font-medium rounded-lg py-3 flex items-center justify-center gap-2 text-sm transition"
          >
            <Save className="w-4 h-4" /> Save draft
          </button>
          <button
            type="submit"
            value="publish"
            disabled={pending}
            className="flex-[2] bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-500 font-medium rounded-lg py-3 flex items-center justify-center gap-2 text-sm transition"
          >
            <Send className="w-4 h-4" />
            {pending ? "Publishing…" : "Publish brief"}
          </button>
        </div>
      </form>
    </div>
  );
}
