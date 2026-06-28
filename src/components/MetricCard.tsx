import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  accent?: "cyan" | "orange" | "green" | "purple";
};

const accentStyles = {
  cyan: "from-cyan-50 to-blue-50 border-cyan-200 text-cyan-600",
  orange: "from-orange-50 to-amber-50 border-orange-200 text-orange-600",
  green: "from-emerald-50 to-green-50 border-emerald-200 text-emerald-600",
  purple: "from-violet-50 to-purple-50 border-violet-200 text-violet-600",
};

export default function MetricCard({
  label,
  value,
  subtext,
  icon: Icon,
  accent = "cyan",
}: MetricCardProps) {
  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br p-5 shadow-sm ${accentStyles[accent]}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <Icon className="h-5 w-5 opacity-80" />
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      {subtext && <p className="mt-1 text-xs text-slate-500">{subtext}</p>}
    </div>
  );
}
