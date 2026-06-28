"use client";

import dynamic from "next/dynamic";
import PageLoader from "@/components/PageLoader";

const MapPageClient = dynamic(() => import("@/components/MapPageClient"), {
  ssr: false,
  loading: () => <PageLoader />,
});

export default function MapPage() {
  return <MapPageClient />;
}
