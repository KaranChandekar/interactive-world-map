"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { TOP_COUNTRIES } from "@/utils/constants";
import { latLonToVector3 } from "@/utils/geo";
import type { CountryData } from "@/hooks/useGlobeStore";

interface CountryMarkersProps {
  countries: CountryData[];
  selectedCountry: CountryData | null;
  onSelect: (country: CountryData) => void;
  overlayMode: "none" | "population" | "gdp";
}

function getPopulationColor(pop: number): string {
  if (pop > 500000000) return "#ef4444";
  if (pop > 100000000) return "#f59e0b";
  if (pop > 50000000) return "#eab308";
  return "#3b82f6";
}

function getGDPColor(gdp: number): string {
  if (gdp > 5000) return "#f59e0b";
  if (gdp > 1000) return "#eab308";
  if (gdp > 500) return "#22c55e";
  return "#16a34a";
}

export function CountryMarkers({
  countries,
  selectedCountry,
  onSelect,
  overlayMode,
}: CountryMarkersProps) {
  const markers = useMemo(() => {
    // Match REST Countries data to our top countries for positioning
    return TOP_COUNTRIES.map((tc) => {
      const matched = countries.find((c) =>
        c.name.common.toLowerCase().includes(tc.name.toLowerCase()) ||
        tc.name.toLowerCase().includes(c.name.common.toLowerCase())
      );
      return { ...tc, countryData: matched };
    });
  }, [countries]);

  return (
    <group>
      {markers.map((marker) => {
        const pos = latLonToVector3(marker.lat, marker.lon, 1.01);
        const isSelected =
          selectedCountry?.name.common
            .toLowerCase()
            .includes(marker.name.toLowerCase()) ?? false;

        let color = "#ff6b6b";
        if (overlayMode === "population") {
          color = getPopulationColor(marker.population);
        } else if (overlayMode === "gdp") {
          color = getGDPColor(marker.gdp);
        }

        const scale = isSelected ? 1.8 : 1;

        return (
          <mesh
            key={marker.name}
            position={pos}
            scale={scale}
            onClick={(e) => {
              e.stopPropagation();
              if (marker.countryData) {
                onSelect(marker.countryData);
              }
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            <sphereGeometry args={[0.015, 16, 16]} />
            <meshBasicMaterial
              color={isSelected ? "#ffd700" : color}
              transparent
              opacity={isSelected ? 1 : 0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}
