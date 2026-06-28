"use client";

import { useMemo, useState } from "react";
import { projectFutureScore } from "@/lib/scoring";
import type { FutureScenario } from "@/lib/types";
import { Leaf, Sun, Bike, Radio } from "lucide-react";

type FutureSimulatorProps = {
  baseScore: number;
};

const sliders: {
  key: keyof FutureScenario;
  label: string;
  icon: typeof Leaf;
  unit: string;
}[] = [
  { key: "greenRoofs", label: "Green Roof Coverage", icon: Leaf, unit: "%" },
  { key: "solarPanels", label: "Solar Installations", icon: Sun, unit: " districts" },
  { key: "bikeLanes", label: "Protected Bike Lanes", icon: Bike, unit: " km" },
  { key: "smartSensors", label: "Smart City Sensors", icon: Radio, unit: " nodes" },
];

export default function FutureSimulator({ baseScore }: FutureSimulatorProps) {
  const [scenario, setScenario] = useState<FutureScenario>({
    greenRoofs: 20,
    solarPanels: 5,
    bikeLanes: 15,
    smartSensors: 10,
  });

  const projection = useMemo(
    () => projectFutureScore(baseScore, scenario),
    [baseScore, scenario],
  );

  return (
    <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Future City Simulator</h2>
      <p className="mt-1 text-sm text-slate-600">
        Adjust infrastructure investments and see projected resilience impact by 2035.
      </p>

      <div className="mt-6 space-y-5">
        {sliders.map(({ key, label, icon: Icon, unit }) => (
          <div key={key}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-700">
                <Icon className="h-4 w-4 text-violet-600" />
                {label}
              </span>
              <span className="font-mono text-violet-700">
                {scenario[key]} {unit}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={key === "bikeLanes" ? 50 : key === "smartSensors" ? 40 : 100}
              value={scenario[key]}
              onChange={(e) =>
                setScenario((s) => ({ ...s, [key]: Number(e.target.value) }))
              }
              className="w-full accent-violet-600"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">Projected Resilience</p>
          <p className="text-2xl font-bold text-violet-700">
            {projection.projectedScore}
            <span className="text-sm text-emerald-600">
              {" "}
              (+{projection.projectedScore - baseScore})
            </span>
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">CO₂ Reduced / yr</p>
          <p className="text-2xl font-bold text-emerald-600">
            {projection.co2ReductionTons}t
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">Heat Reduction</p>
          <p className="text-2xl font-bold text-orange-600">
            −{projection.heatReductionC}°C
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">Faster Response</p>
          <p className="text-2xl font-bold text-cyan-600">
            {projection.responseTimeImprovement}%
          </p>
        </div>
      </div>
    </div>
  );
}
