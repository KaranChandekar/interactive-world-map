"use client";

import { motion } from "framer-motion";
import type { CountryData, WeatherData } from "@/hooks/useGlobeStore";
import { formatPopulation, formatArea, getWeatherDescription } from "@/utils/format";

interface CountryCardProps {
  country: CountryData;
  weather: WeatherData | null;
  onClose: () => void;
  onCompare: () => void;
}

export function CountryCard({
  country,
  weather,
  onClose,
  onCompare,
}: CountryCardProps) {
  const currencyName = country.currencies
    ? Object.values(country.currencies)[0]?.name
    : "N/A";
  const languageList = country.languages
    ? Object.values(country.languages).slice(0, 2).join(", ")
    : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 w-[380px] shadow-2xl"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-14 h-10 rounded-md object-cover shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold font-display text-white">
            {country.name.common}
          </h2>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-300">
            {country.region}
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <StatItem label="Capital" value={country.capital?.[0] ?? "N/A"} />
        <StatItem label="Population" value={formatPopulation(country.population)} />
        <StatItem label="Area" value={formatArea(country.area)} />
        <StatItem label="Currency" value={currencyName} />
        <StatItem label="Languages" value={languageList} />
        <StatItem label="Subregion" value={country.subregion ?? "N/A"} />
      </div>

      {/* Weather */}
      {weather && (
        <div className="bg-white/5 rounded-xl p-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {getWeatherDescription(weather.weatherCode).emoji}
            </span>
            <div>
              <p className="text-2xl font-bold text-white">
                {weather.temperature.toFixed(1)}°C
              </p>
              <p className="text-sm text-gray-400">
                {getWeatherDescription(weather.weatherCode).description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onCompare}
          className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm font-medium transition-colors"
        >
          Compare
        </button>
        <button className="flex-1 px-4 py-2.5 border border-white/20 hover:bg-white/10 rounded-xl text-white text-sm font-medium transition-colors">
          Details
        </button>
      </div>
    </motion.div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm text-gray-100 font-medium">{value}</p>
    </div>
  );
}
