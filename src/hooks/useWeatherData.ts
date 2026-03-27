"use client";

import { useEffect } from "react";
import { useGlobeStore } from "./useGlobeStore";

export function useWeatherData(lat: number | null, lon: number | null) {
  const { setWeatherData } = useGlobeStore();

  useEffect(() => {
    if (lat === null || lon === null) {
      setWeatherData(null);
      return;
    }

    let cancelled = false;

    async function fetchWeather() {
      try {
        const res = await fetch(
          `/api/weather?lat=${lat}&lon=${lon}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        setWeatherData({
          temperature: data.temperature,
          weatherCode: data.weatherCode,
        });
      } catch {
        if (!cancelled) setWeatherData(null);
      }
    }

    fetchWeather();
    return () => {
      cancelled = true;
    };
  }, [lat, lon, setWeatherData]);
}
