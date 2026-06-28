"use client";

import { useState } from "react";
import { addReport } from "@/lib/storage";
import { CITY_CENTER } from "@/lib/sampleData";
import type { HazardCategory } from "@/lib/types";
import { Send } from "lucide-react";

const categories: { value: HazardCategory; label: string }[] = [
  { value: "flooding", label: "Flooding" },
  { value: "heat", label: "Heat Zone" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "air_quality", label: "Air Quality" },
  { value: "safety", label: "Public Safety" },
  { value: "accessibility", label: "Accessibility" },
];

export default function ReportForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<HazardCategory>("infrastructure");
  const [neighborhood, setNeighborhood] = useState("");
  const [lat, setLat] = useState(CITY_CENTER.lat.toString());
  const [lng, setLng] = useState(CITY_CENTER.lng.toString());
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addReport({
      title,
      description,
      category,
      neighborhood: neighborhood || "Unknown",
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    });
    setSuccess(true);
    setTitle("");
    setDescription("");
    setNeighborhood("");
    onSubmitted?.();
    setTimeout(() => setSuccess(false), 3000);
  }

  function useMyLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude.toFixed(5));
      setLng(pos.coords.longitude.toFixed(5));
    });
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Issue title
        </label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Flooded crosswalk near school"
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What happened? Who is affected?"
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as HazardCategory)}
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Neighborhood
          </label>
          <input
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            placeholder="Downtown, Riverside…"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Latitude
          </label>
          <input
            required
            type="number"
            step="any"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Longitude
          </label>
          <input
            required
            type="number"
            step="any"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={useMyLocation}
        className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
      >
        Use my current location
      </button>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-md shadow-cyan-500/25 transition hover:opacity-90"
      >
        <Send className="h-4 w-4" />
        Submit to TomorrowGrid
      </button>

      {success && (
        <p className="text-center text-sm font-medium text-emerald-600">
          Report submitted! It will appear on the live map instantly.
        </p>
      )}
    </form>
  );
}
