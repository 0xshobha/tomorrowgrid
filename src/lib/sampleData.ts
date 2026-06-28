import { calculatePriorityScore } from "./scoring";
import type { HazardReport } from "./types";

const seed: Omit<HazardReport, "priorityScore">[] = [
  {
    id: "r1",
    title: "Street flooding after rain",
    description: "Water pooling blocks pedestrian crossing near the school.",
    category: "flooding",
    lat: 19.076,
    lng: 72.8777,
    neighborhood: "Downtown",
    createdAt: "2026-06-28T08:15:00.000Z",
    confirmations: 6,
    status: "verified",
  },
  {
    id: "r2",
    title: "Broken streetlight",
    description: "Dark alley with no lighting for 3 nights.",
    category: "safety",
    lat: 19.082,
    lng: 72.885,
    neighborhood: "Riverside",
    createdAt: "2026-06-28T07:30:00.000Z",
    confirmations: 4,
    status: "open",
  },
  {
    id: "r3",
    title: "Extreme heat on bus stop",
    description: "No shade — surface temp feels unsafe for elderly riders.",
    category: "heat",
    lat: 19.07,
    lng: 72.87,
    neighborhood: "Transit Hub",
    createdAt: "2026-06-28T06:00:00.000Z",
    confirmations: 8,
    status: "verified",
  },
  {
    id: "r4",
    title: "Cracked sidewalk ramp",
    description: "Wheelchair users cannot safely enter the metro station.",
    category: "accessibility",
    lat: 19.065,
    lng: 72.89,
    neighborhood: "Metro East",
    createdAt: "2026-06-28T04:30:00.000Z",
    confirmations: 3,
    status: "open",
  },
  {
    id: "r5",
    title: "Poor air near construction",
    description: "Dust clouds visible during morning commute hours.",
    category: "air_quality",
    lat: 19.088,
    lng: 72.865,
    neighborhood: "Industrial Edge",
    createdAt: "2026-06-28T03:00:00.000Z",
    confirmations: 5,
    status: "open",
  },
  {
    id: "r6",
    title: "Pothole cluster on main road",
    description: "Multiple potholes slowing emergency vehicle routes.",
    category: "infrastructure",
    lat: 19.06,
    lng: 72.88,
    neighborhood: "Central Loop",
    createdAt: "2026-06-28T01:30:00.000Z",
    confirmations: 7,
    status: "verified",
  },
];

export const defaultReports: HazardReport[] = seed.map((report) => ({
  ...report,
  priorityScore: calculatePriorityScore(report.category, report.confirmations),
}));

export const CITY_CENTER = { lat: 19.076, lng: 72.8777 };
