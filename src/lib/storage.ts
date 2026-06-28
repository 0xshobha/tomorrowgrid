"use client";

import { defaultReports } from "./sampleData";
import { calculatePriorityScore } from "./scoring";
import type { HazardReport } from "./types";

const STORAGE_KEY = "tomorrowgrid-reports";

export function loadReports(): HazardReport[] {
  if (typeof window === "undefined") return defaultReports;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReports));
      return defaultReports;
    }
    return JSON.parse(raw) as HazardReport[];
  } catch {
    return defaultReports;
  }
}

export function saveReports(reports: HazardReport[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export function addReport(
  report: Omit<HazardReport, "id" | "createdAt" | "priorityScore" | "confirmations" | "status">,
): HazardReport {
  const newReport: HazardReport = {
    ...report,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    confirmations: 1,
    status: "open",
    priorityScore: calculatePriorityScore(report.category, 1),
  };

  const reports = loadReports();
  reports.unshift(newReport);
  saveReports(reports);
  return newReport;
}

export function confirmReport(id: string): HazardReport | null {
  const reports = loadReports();
  const index = reports.findIndex((r) => r.id === id);
  if (index === -1) return null;

  const updated = {
    ...reports[index],
    confirmations: reports[index].confirmations + 1,
  };
  updated.priorityScore = calculatePriorityScore(
    updated.category,
    updated.confirmations,
  );
  if (updated.confirmations >= 3 && updated.status === "open") {
    updated.status = "verified";
  }

  reports[index] = updated;
  saveReports(reports);
  return updated;
}
