"use client";

import { motion } from "framer-motion";
import type { Overlays, CountryData } from "@/hooks/useGlobeStore";
import { formatPopulation } from "@/utils/format";

interface DataPanelProps {
  overlays: Overlays;
  onToggle: (key: keyof Overlays) => void;
  selectedCountry: CountryData | null;
}

const OVERLAY_ITEMS: {
  key: keyof Overlays;
  label: string;
  description: string;
}[] = [
  { key: "population", label: "Population Density", description: "Color-coded by population size" },
  { key: "gdp", label: "GDP Indicators", description: "Economic output markers" },
  { key: "weather", label: "Weather Data", description: "Live temperature overlays" },
  { key: "flightPaths", label: "Flight Paths", description: "Animated global connections" },
];

export function DataPanel({
  overlays,
  onToggle,
  selectedCountry,
}: DataPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-5 w-[280px] shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-5">
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-display font-bold text-white">
          Data Overlays
        </h3>
      </div>

      <div className="space-y-4">
        {OVERLAY_ITEMS.map(({ key, label, description }) => (
          <div key={key} className="flex items-start gap-3">
            <button
              onClick={() => onToggle(key)}
              className={`toggle-switch mt-0.5 shrink-0 ${overlays[key] ? "active" : ""}`}
            >
              <div className="toggle-knob" />
            </button>
            <div>
              <p className="text-sm text-white font-medium">{label}</p>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedCountry && (
        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="text-xs text-gray-400 mb-2">Selected Country</p>
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedCountry.flags.svg}
              alt=""
              className="w-6 h-4 rounded-sm object-cover"
            />
            <p className="text-sm text-white font-medium">
              {selectedCountry.name.common}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Pop: {formatPopulation(selectedCountry.population)}
          </p>
        </div>
      )}
    </motion.div>
  );
}
