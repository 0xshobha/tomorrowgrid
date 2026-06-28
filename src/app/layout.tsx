import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TomorrowGrid — Build the City of Tomorrow",
  description:
    "Community-powered urban resilience platform for FutureHacks 2026. Report hazards, prioritize response, and simulate future city infrastructure.",
  keywords: ["FutureHacks", "smart city", "civic tech", "urban resilience"],
  icons: {
    icon: "/tomorrowgrid-logo.png",
    apple: "/tomorrowgrid-logo.png",
  },
  openGraph: {
    title: "TomorrowGrid — Build the City of Tomorrow",
    description:
      "Community-powered urban resilience platform. Report city hazards, prioritize response, and simulate future infrastructure.",
    type: "website",
    images: ["/tomorrowgrid-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TomorrowGrid",
    description: "The operating system for tomorrow's cities.",
    images: ["/tomorrowgrid-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-slate-50 text-slate-900"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
