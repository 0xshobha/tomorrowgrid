export type HazardCategory =
  | "flooding"
  | "heat"
  | "infrastructure"
  | "air_quality"
  | "safety"
  | "accessibility";

export type HazardReport = {
  id: string;
  title: string;
  description: string;
  category: HazardCategory;
  lat: number;
  lng: number;
  neighborhood: string;
  createdAt: string;
  confirmations: number;
  priorityScore: number;
  status: "open" | "verified" | "resolved";
};

export type CityMetrics = {
  resilienceScore: number;
  openReports: number;
  verifiedReports: number;
  avgResponseHours: number;
  greenCoveragePercent: number;
  heatIndex: number;
};

export type FutureScenario = {
  greenRoofs: number;
  solarPanels: number;
  bikeLanes: number;
  smartSensors: number;
};
