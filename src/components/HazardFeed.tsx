"use client";

import { categoryColor, categoryLabel } from "@/lib/scoring";
import type { HazardReport } from "@/lib/types";
import { confirmReport, loadReports } from "@/lib/storage";
import { CheckCircle2, Clock } from "lucide-react";

type HazardFeedProps = {
  reports: HazardReport[];
  onUpdate: (reports: HazardReport[]) => void;
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function HazardFeed({ reports, onUpdate }: HazardFeedProps) {
  const sorted = [...reports].sort(
    (a, b) => b.priorityScore - a.priorityScore,
  );

  function handleConfirm(id: string) {
    confirmReport(id);
    onUpdate(loadReports());
  }

  return (
    <div className="space-y-3">
      {sorted.map((report) => (
        <article
          key={report.id}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-cyan-300 hover:shadow-md"
        >
          <div className="mb-2 flex items-start justify-between gap-3">
            <div>
              <span
                className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: `${categoryColor(report.category)}18`,
                  color: categoryColor(report.category),
                }}
              >
                {categoryLabel(report.category)}
              </span>
              <h3 className="mt-2 font-semibold text-slate-900">{report.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{report.description}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-cyan-600">
                {report.priorityScore}
              </p>
              <p className="text-xs text-slate-400">priority</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {timeAgo(report.createdAt)} · {report.neighborhood}
            </span>
            <span className="capitalize">{report.status}</span>
          </div>

          <button
            type="button"
            onClick={() => handleConfirm(report.id)}
            className="mt-3 flex items-center gap-1.5 rounded-lg bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-700 transition hover:bg-cyan-100"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Confirm ({report.confirmations})
          </button>
        </article>
      ))}
    </div>
  );
}
