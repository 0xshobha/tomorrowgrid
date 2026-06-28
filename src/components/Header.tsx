import Image from "next/image";
import Link from "next/link";
import { MapPin, LayoutDashboard, FileWarning, Sparkles } from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/map", label: "Live Map", icon: MapPin },
  { href: "/report", label: "Report", icon: FileWarning },
  { href: "/insights", label: "Future Lab", icon: Sparkles },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/tomorrowgrid-logo.png"
            alt="TomorrowGrid logo"
            width={44}
            height={44}
            className="rounded-xl shadow-md shadow-cyan-500/20"
            priority
          />
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900">
              TomorrowGrid
            </p>
            <p className="text-xs text-cyan-600">
              Build the city of tomorrow, today
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-700"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-cyan-50"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
