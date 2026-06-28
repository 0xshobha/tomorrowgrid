"use client";

import dynamic from "next/dynamic";
import PageLoader from "@/components/PageLoader";

const InsightsPageClient = dynamic(
  () => import("@/components/InsightsPageClient"),
  {
    ssr: false,
    loading: () => <PageLoader />,
  },
);

export default function InsightsPage() {
  return <InsightsPageClient />;
}
