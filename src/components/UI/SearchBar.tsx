"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CountryData } from "@/hooks/useGlobeStore";

interface SearchBarProps {
  countries: CountryData[];
  onSelect: (country: CountryData) => void;
}

export function SearchBar({ countries, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return countries
      .filter((c) => c.name.common.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, countries]);

  useEffect(() => {
    setIsOpen(filtered.length > 0);
  }, [filtered]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  function highlightMatch(name: string) {
    const idx = name.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return name;
    return (
      <>
        {name.slice(0, idx)}
        <span className="bg-blue-500/30 rounded px-0.5">
          {name.slice(idx, idx + query.length)}
        </span>
        {name.slice(idx + query.length)}
      </>
    );
  }

  return (
    <div className="relative w-[400px]">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search countries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white placeholder-gray-400 outline-none focus:border-blue-500/50 transition-colors"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50 max-h-[320px] overflow-y-auto"
          >
            {filtered.map((country) => (
              <li
                key={country.cca2}
                onClick={() => {
                  onSelect(country);
                  setQuery("");
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={country.flags.svg}
                  alt=""
                  className="w-6 h-4 rounded-sm object-cover"
                />
                <span className="text-gray-100">
                  {highlightMatch(country.name.common)}
                </span>
                <span className="ml-auto text-xs text-gray-500">
                  {country.region}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
