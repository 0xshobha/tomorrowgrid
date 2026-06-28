"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ReportForm from "@/components/ReportForm";

export default function ReportPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Report a City Issue
        </h1>
        <p className="mb-8 text-slate-600">
          Your report becomes a live data point on TomorrowGrid. Multiple
          confirmations auto-verify high-impact hazards for city responders.
        </p>
        <ReportForm onSubmitted={() => router.push("/map")} />
      </main>
    </div>
  );
}
