"use client";

import { useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { useGlobeStore } from "@/hooks/useGlobeStore";
import { useCountryData } from "@/hooks/useCountryData";
import { useWeatherData } from "@/hooks/useWeatherData";
import { getCameraPositionForCountry } from "@/utils/geo";
import { SearchBar } from "@/components/UI/SearchBar";
import { CountryCard } from "@/components/UI/CountryCard";
import { DataPanel } from "@/components/UI/DataPanel";
import { CompareMode } from "@/components/UI/CompareMode";
import { ChartPanel } from "@/components/UI/ChartPanel";
import { MiniMap } from "@/components/UI/MiniMap";
import { ControlsLegend } from "@/components/UI/ControlsLegend";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";

const GlobeCanvas = dynamic(
  () =>
    import("@/components/Globe/GlobeCanvas").then((mod) => mod.GlobeCanvas),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export default function HomePage() {
  const {
    countries,
    selectedCountry,
    setSelectedCountry,
    setTargetPosition,
    compareCountries,
    setCompareCountries,
    overlays,
    toggleOverlay,
    weatherData,
    isLoading,
  } = useGlobeStore();

  const { isLoading: countriesLoading } = useCountryData();

  const selectedLat = selectedCountry?.latlng?.[0];
  const selectedLon = selectedCountry?.latlng?.[1];
  useWeatherData(selectedLat ?? null, selectedLon ?? null);

  const handleCountrySelect = useCallback(
    (country: (typeof countries)[0]) => {
      setSelectedCountry(country);
      if (country.latlng) {
        const pos = getCameraPositionForCountry(
          country.latlng[0],
          country.latlng[1],
          2
        );
        setTargetPosition(pos);
      }
    },
    [setSelectedCountry, setTargetPosition]
  );

  const handleCompare = useCallback(() => {
    if (selectedCountry && countries.length > 0) {
      const other = countries.find(
        (c) => c.cca2 !== selectedCountry.cca2 && c.population > 50000000
      );
      if (other) {
        setCompareCountries([selectedCountry, other]);
      }
    }
  }, [selectedCountry, countries, setCompareCountries]);

  const handleCloseCard = useCallback(() => {
    setSelectedCountry(null);
  }, [setSelectedCountry]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCountry(null);
        setCompareCountries(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedCountry, setCompareCountries]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-space-dark">
      {/* 3D Globe */}
      <div className="globe-container">
        <GlobeCanvas />
      </div>

      {/* UI Overlay */}
      <div className="ui-overlay">
        {/* Top: Search Bar */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
          <SearchBar countries={countries} onSelect={handleCountrySelect} />
        </div>

        {/* Left: Data Panel */}
        <div className="absolute top-24 left-6 z-10">
          <DataPanel
            overlays={overlays}
            onToggle={(key) => toggleOverlay(key)}
            selectedCountry={selectedCountry}
          />
        </div>

        {/* Right: Country Card */}
        <AnimatePresence>
          {selectedCountry && (
            <div className="absolute top-24 right-6 z-10">
              <CountryCard
                country={selectedCountry}
                weather={weatherData}
                onClose={handleCloseCard}
                onCompare={handleCompare}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Right below card: Chart Panel */}
        <AnimatePresence>
          {selectedCountry && (
            <div className="absolute bottom-32 right-6 z-10">
              <ChartPanel
                countryName={selectedCountry.name.common}
                population={selectedCountry.population}
                area={selectedCountry.area}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Bottom right: Mini Map */}
        <MiniMap cameraAzimuth={0} />

        {/* Bottom left: Controls Legend */}
        <ControlsLegend />

        {/* Compare Mode Overlay */}
        <AnimatePresence>
          {compareCountries && (
            <CompareMode
              country1={compareCountries[0]}
              country2={compareCountries[1]}
              onClose={() => setCompareCountries(null)}
            />
          )}
        </AnimatePresence>

        {/* Loading overlay */}
        {(isLoading || countriesLoading) && (
          <div className="absolute inset-0 flex items-center justify-center bg-space-dark/80 z-50">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </main>
  );
}
