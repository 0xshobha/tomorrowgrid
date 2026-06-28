"use client";

import dynamic from "next/dynamic";
import PageLoader from "@/components/PageLoader";

const DashboardClient = dynamic(() => import("@/components/DashboardClient"), {
  ssr: false,
  loading: () => <PageLoader />,
});

export default function Home() {
  return <DashboardClient />;
}
