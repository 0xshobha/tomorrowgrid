"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  Shield,
  Thermometer,
  ArrowRight,
  Leaf,
} from "lucide-react";
import Header from "@/components/Header";
import MetricCard from "@/components/MetricCard";
import CityMapWrapper from "@/components/CityMapWrapper";
import HazardFeed from "@/components/HazardFeed";
import { loadReports } from "@/lib/storage";
import { calculateResilienceScore } from "@/lib/scoring";
import type { HazardReport } from "@/lib/types";

type WeatherData = {
  temperature: number;
  humidity: number;
  heatIndex: number;
};

export default function DashboardClient() {
  const [reports, setReports] = useState<HazardReport[]>(() => loadReports());
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((r) => r.json())
      .then(setWeather)
      .catch(() => null);
  }, []);

  const resilienceScore = useMemo(
    () => calculateResilienceScore(reports),
    [reports],
  );

  const openCount = reports.filter((r) => r.status === "open").length;
  const verifiedCount = reports.filter((r) => r.status === "verified").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <section className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-600">
            FutureHacks 2026 · Intermediate Track
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            The operating system for{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              tomorrow&apos;s cities
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            TomorrowGrid turns citizen reports into prioritized, actionable
            intelligence — helping cities respond faster to flooding, heat,
            safety, and infrastructure issues.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/report"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-cyan-500/25"
            >
              Report an issue
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Explore future scenarios
            </Link>
          </div>
        </section>

        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="City Resilience Score"
            value={resilienceScore}
            subtext="Higher = healthier urban systems"
            icon={Shield}
            accent="cyan"
          />
          <MetricCard
            label="Open Reports"
            value={openCount}
            subtext={`${verifiedCount} verified by community`}
            icon={AlertTriangle}
            accent="orange"
          />
          <MetricCard
            label="Live Heat Index"
            value={weather ? `${weather.heatIndex}°C` : "—"}
            subtext={
              weather
                ? `${weather.temperature}°C · ${weather.humidity}% humidity`
                : "Fetching weather data…"
            }
            icon={Thermometer}
            accent="orange"
          />
          <MetricCard
            label="Active Neighborhoods"
            value={new Set(reports.map((r) => r.neighborhood)).size}
            subtext="Community sensor network"
            icon={Activity}
            accent="green"
          />
        </section>

        <section className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Live Hazard Map
              </h2>
              <Link
                href="/map"
                className="text-sm font-medium text-cyan-600 hover:underline"
              >
                Full screen →
              </Link>
            </div>
            <CityMapWrapper reports={reports} />
          </div>

          <div className="lg:col-span-2">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">
              Priority Queue
            </h2>
            <HazardFeed reports={reports} onUpdate={setReports} />
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex items-start gap-4">
            <Leaf className="mt-1 h-8 w-8 text-emerald-600" />
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Why this matters
              </h2>
              <p className="mt-2 text-slate-600">
                Less than 20% of residents use official 311 apps, yet hazards
                appear on social media within minutes. TomorrowGrid bridges that
                gap — giving future cities a decentralized intelligence layer
                that works even when central systems lag behind.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
