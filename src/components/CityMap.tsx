"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import type { HazardReport } from "@/lib/types";
import { categoryColor, categoryLabel } from "@/lib/scoring";
import { CITY_CENTER } from "@/lib/sampleData";

type CityMapProps = {
  reports: HazardReport[];
  height?: string;
  onSelect?: (report: HazardReport) => void;
};

function FitBounds({ reports }: { reports: HazardReport[] }) {
  const map = useMap();

  useEffect(() => {
    if (reports.length === 0) return;
    const bounds = reports.map((r) => [r.lat, r.lng] as [number, number]);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [map, reports]);

  return null;
}

export default function CityMap({
  reports,
  height = "420px",
  onSelect,
}: CityMapProps) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50"
      style={{ height }}
    >
      <MapContainer
        center={[CITY_CENTER.lat, CITY_CENTER.lng]}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <FitBounds reports={reports} />
        {reports.map((report) => (
          <CircleMarker
            key={report.id}
            center={[report.lat, report.lng]}
            radius={8 + report.confirmations}
            pathOptions={{
              color: categoryColor(report.category),
              fillColor: categoryColor(report.category),
              fillOpacity: 0.75,
              weight: 2,
            }}
            eventHandlers={{
              click: () => onSelect?.(report),
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-slate-900">{report.title}</p>
                <p className="text-slate-600">{categoryLabel(report.category)}</p>
                <p className="mt-1 text-slate-500">{report.neighborhood}</p>
                <p className="mt-2 font-medium text-slate-800">
                  Priority: {report.priorityScore}/100
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
