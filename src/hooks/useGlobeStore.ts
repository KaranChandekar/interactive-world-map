import { create } from "zustand";

export interface CountryData {
  name: { common: string; official: string };
  cca2: string;
  capital?: string[];
  population: number;
  area: number;
  region: string;
  subregion?: string;
  currencies?: Record<string, { name: string; symbol: string }>;
  languages?: Record<string, string>;
  flags: { svg: string; png: string };
  latlng: [number, number];
}

export interface WeatherData {
  temperature: number;
  weatherCode: number;
}

export interface Overlays {
  population: boolean;
  gdp: boolean;
  weather: boolean;
  flightPaths: boolean;
}

interface GlobeState {
  countries: CountryData[];
  setCountries: (countries: CountryData[]) => void;

  selectedCountry: CountryData | null;
  setSelectedCountry: (country: CountryData | null) => void;

  compareCountries: [CountryData, CountryData] | null;
  setCompareCountries: (countries: [CountryData, CountryData] | null) => void;

  overlays: Overlays;
  toggleOverlay: (key: keyof Overlays) => void;

  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData | null) => void;

  targetPosition: [number, number, number] | null;
  setTargetPosition: (pos: [number, number, number] | null) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useGlobeStore = create<GlobeState>((set) => ({
  countries: [],
  setCountries: (countries) => set({ countries }),

  selectedCountry: null,
  setSelectedCountry: (country) => set({ selectedCountry: country }),

  compareCountries: null,
  setCompareCountries: (countries) => set({ compareCountries: countries }),

  overlays: {
    population: false,
    gdp: false,
    weather: false,
    flightPaths: true,
  },
  toggleOverlay: (key) =>
    set((state) => ({
      overlays: { ...state.overlays, [key]: !state.overlays[key] },
    })),

  weatherData: null,
  setWeatherData: (data) => set({ weatherData: data }),

  targetPosition: null,
  setTargetPosition: (pos) => set({ targetPosition: pos }),

  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
