"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import FutureSimulator from "@/components/FutureSimulator";
import { loadReports } from "@/lib/storage";
import { calculateResilienceScore, categoryLabel } from "@/lib/scoring";
import type { HazardReport } from "@/lib/types";

export default function InsightsPageClient() {
  const [reports] = useState<HazardReport[]>(() => loadReports());

  const baseScore = useMemo(
    () => calculateResilienceScore(reports),
    [reports],
  );

  const byCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of reports) {
      const label = categoryLabel(r.category);
      counts[label] = (counts[label] ?? 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [reports]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">Future Lab</h1>
        <p className="mb-8 text-slate-600">
          Model how infrastructure investments change your city&apos;s resilience
          score — the kind of planning tool smart cities will need by 2035.
        </p>

        <FutureSimulator baseScore={baseScore} />

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Report Breakdown
          </h2>
          <div className="mt-4 space-y-3">
            {byCategory.map(([label, count]) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-32 text-sm text-slate-600">{label}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                    style={{
                      width: `${Math.min(100, (count / reports.length) * 100 * 2)}%`,
                    }}
                  />
                </div>
                <span className="w-8 text-right font-mono text-sm text-cyan-600">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
