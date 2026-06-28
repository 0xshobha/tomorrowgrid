"use client";

import dynamic from "next/dynamic";
import type { HazardReport } from "@/lib/types";

const CityMap = dynamic(() => import("./CityMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-100">
      <p className="text-sm text-slate-500">Loading city map…</p>
    </div>
  ),
});

type CityMapWrapperProps = {
  reports: HazardReport[];
  height?: string;
  onSelect?: (report: HazardReport) => void;
};

export default function CityMapWrapper(props: CityMapWrapperProps) {
  return <CityMap {...props} />;
}
