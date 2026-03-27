"use client";

import { useEffect, useState } from "react";
import { useGlobeStore } from "./useGlobeStore";
import type { CountryData } from "./useGlobeStore";

const LOCAL_API = "/api/countries";
const EXTERNAL_CORE =
  "https://restcountries.com/v3.1/all?fields=name,cca2,capital,population,area,region,subregion,flags,latlng";
const EXTERNAL_DETAIL =
  "https://restcountries.com/v3.1/all?fields=name,cca2,currencies,languages";

let cachedData: CountryData[] | null = null;

export function useCountryData() {
  const { setCountries, setIsLoading } = useGlobeStore();
  const [isLoading, setLocalLoading] = useState(!cachedData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedData) {
      setCountries(cachedData);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchCountries() {
      try {
        // Try local API first (cached on server), fall back to external
        let res = await fetch(LOCAL_API);
        let data;
        if (res.ok) {
          data = await res.json();
        } else {
          // Fallback: fetch core + detail separately from external API
          const [coreRes, detailRes] = await Promise.all([
            fetch(EXTERNAL_CORE),
            fetch(EXTERNAL_DETAIL),
          ]);
          if (!coreRes.ok) throw new Error(`HTTP ${coreRes.status}`);
          data = await coreRes.json();
          if (detailRes.ok) {
            const detailData = await detailRes.json();
            const detailMap = new Map(
              detailData.map((d: { cca2: string }) => [d.cca2, d])
            );
            for (const country of data) {
              const detail = detailMap.get(country.cca2) as
                | { currencies?: unknown; languages?: unknown }
                | undefined;
              if (detail) {
                country.currencies = detail.currencies;
                country.languages = detail.languages;
              }
            }
          }
        }
        if (cancelled) return;

        // Validate data is an array with expected shape
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Invalid data format");
        }

        cachedData = data;
        setCountries(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load");
          console.error("Failed to fetch countries:", err);
        }
      } finally {
        if (!cancelled) {
          setLocalLoading(false);
          setIsLoading(false);
        }
      }
    }

    fetchCountries();
    return () => {
      cancelled = true;
    };
  }, [setCountries, setIsLoading]);

  return { isLoading, error };
}
