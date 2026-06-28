"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CityMapWrapper from "@/components/CityMapWrapper";
import { loadReports } from "@/lib/storage";
import { categoryLabel } from "@/lib/scoring";
import type { HazardReport } from "@/lib/types";

export default function MapPageClient() {
  const [reports] = useState<HazardReport[]>(() => loadReports());
  const [selected, setSelected] = useState<HazardReport | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">Live City Map</h1>
        <p className="mb-6 text-slate-600">
          Every marker is a citizen report. Size reflects community confirmations.
        </p>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CityMapWrapper
              reports={reports}
              height="560px"
              onSelect={setSelected}
            />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-900">Selected Report</h2>
            {selected ? (
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-lg font-medium text-slate-900">
                  {selected.title}
                </p>
                <p className="text-slate-600">{selected.description}</p>
                <p className="font-medium text-cyan-600">
                  {categoryLabel(selected.category)}
                </p>
                <p className="text-slate-500">{selected.neighborhood}</p>
                <p className="font-mono text-violet-600">
                  Priority {selected.priorityScore}/100
                </p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                Click a marker on the map to inspect details.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
