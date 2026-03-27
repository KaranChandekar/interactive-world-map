"use client";

import { motion } from "framer-motion";
import type { CountryData } from "@/hooks/useGlobeStore";
import { formatPopulation, formatArea } from "@/utils/format";

interface CompareModeProps {
  country1: CountryData;
  country2: CountryData;
  onClose: () => void;
}

function CompareBar({
  label,
  val1,
  val2,
  format,
}: {
  label: string;
  val1: number;
  val2: number;
  format: (n: number) => string;
}) {
  const max = Math.max(val1, val2) || 1;
  const pct1 = (val1 / max) * 100;
  const pct2 = (val2 / max) * 100;

  return (
    <div className="mb-4">
      <p className="text-xs text-gray-400 mb-1.5">{label}</p>
      <div className="flex gap-2 items-center">
        <span className="text-xs text-blue-300 w-16 text-right shrink-0">
          {format(val1)}
        </span>
        <div className="flex-1 flex gap-1 h-5">
          <div
            className="bg-blue-500/60 rounded-l"
            style={{ width: `${pct1}%` }}
          />
          <div
            className="bg-orange-500/60 rounded-r"
            style={{ width: `${pct2}%` }}
          />
        </div>
        <span className="text-xs text-orange-300 w-16 shrink-0">
          {format(val2)}
        </span>
      </div>
    </div>
  );
}

export function CompareMode({ country1, country2, onClose }: CompareModeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-2xl w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-white">
            Country Comparison
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Country headers */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {[country1, country2].map((country, i) => (
            <div key={country.cca2} className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={country.flags.svg}
                alt=""
                className="w-10 h-7 rounded-md object-cover"
              />
              <div>
                <p className="text-white font-bold">{country.name.common}</p>
                <p className="text-xs text-gray-400">{country.region}</p>
              </div>
              <div
                className={`ml-auto w-3 h-3 rounded-full ${
                  i === 0 ? "bg-blue-500" : "bg-orange-500"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Comparison bars */}
        <CompareBar
          label="Population"
          val1={country1.population}
          val2={country2.population}
          format={formatPopulation}
        />
        <CompareBar
          label="Area"
          val1={country1.area}
          val2={country2.area}
          format={formatArea}
        />
        <CompareBar
          label="Population Density (per km²)"
          val1={country1.area ? country1.population / country1.area : 0}
          val2={country2.area ? country2.population / country2.area : 0}
          format={(n) => n.toFixed(1)}
        />
      </motion.div>
    </motion.div>
  );
}
