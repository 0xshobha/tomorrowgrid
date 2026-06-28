import type { FutureScenario, HazardCategory, HazardReport } from "./types";

const categoryWeights: Record<HazardCategory, number> = {
  flooding: 95,
  safety: 90,
  infrastructure: 75,
  heat: 70,
  air_quality: 65,
  accessibility: 60,
};

export function calculatePriorityScore(
  category: HazardCategory,
  confirmations: number,
): number {
  const base = categoryWeights[category];
  const confirmationBoost = Math.min(confirmations * 4, 20);
  return Math.min(100, base + confirmationBoost);
}

export function calculateResilienceScore(reports: HazardReport[]): number {
  if (reports.length === 0) return 82;

  const openWeight = reports.filter((r) => r.status === "open").length * 3;
  const verifiedWeight = reports.filter((r) => r.status === "verified").length * 5;
  const resolvedBonus = reports.filter((r) => r.status === "resolved").length * 2;

  const raw = 88 - openWeight + resolvedBonus - verifiedWeight * 0.5;
  return Math.max(42, Math.min(96, Math.round(raw)));
}

export function projectFutureScore(
  baseScore: number,
  scenario: FutureScenario,
): {
  projectedScore: number;
  co2ReductionTons: number;
  heatReductionC: number;
  responseTimeImprovement: number;
} {
  const greenBoost = scenario.greenRoofs * 0.08;
  const solarBoost = scenario.solarPanels * 0.06;
  const bikeBoost = scenario.bikeLanes * 0.05;
  const sensorBoost = scenario.smartSensors * 0.07;

  const projectedScore = Math.min(
    99,
    Math.round(baseScore + greenBoost + solarBoost + bikeBoost + sensorBoost),
  );

  return {
    projectedScore,
    co2ReductionTons: Math.round(
      scenario.solarPanels * 12 + scenario.bikeLanes * 8 + scenario.greenRoofs * 5,
    ),
    heatReductionC: Number(
      (scenario.greenRoofs * 0.15 + scenario.bikeLanes * 0.05).toFixed(1),
    ),
    responseTimeImprovement: Math.round(scenario.smartSensors * 0.4),
  };
}

export function categoryLabel(category: HazardCategory): string {
  const labels: Record<HazardCategory, string> = {
    flooding: "Flooding",
    heat: "Heat Zone",
    infrastructure: "Infrastructure",
    air_quality: "Air Quality",
    safety: "Public Safety",
    accessibility: "Accessibility",
  };
  return labels[category];
}

export function categoryColor(category: HazardCategory): string {
  const colors: Record<HazardCategory, string> = {
    flooding: "#3b82f6",
    heat: "#f97316",
    infrastructure: "#a855f7",
    air_quality: "#64748b",
    safety: "#ef4444",
    accessibility: "#22c55e",
  };
  return colors[category];
}
