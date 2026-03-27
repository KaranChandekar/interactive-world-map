export function formatPopulation(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toString();
}

export function formatArea(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M km\u00B2";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K km\u00B2";
  return n + " km\u00B2";
}

export function formatGDP(billions: number): string {
  if (billions >= 1000) return "$" + (billions / 1000).toFixed(1) + "T";
  return "$" + billions.toFixed(0) + "B";
}

export function getWeatherDescription(code: number): {
  emoji: string;
  description: string;
} {
  if (code === 0) return { emoji: "\u2600\uFE0F", description: "Clear sky" };
  if (code <= 3) return { emoji: "\u26C5", description: "Partly cloudy" };
  if (code <= 48) return { emoji: "\uD83C\uDF2B\uFE0F", description: "Foggy" };
  if (code <= 55) return { emoji: "\uD83C\uDF26\uFE0F", description: "Drizzle" };
  if (code <= 65) return { emoji: "\uD83C\uDF27\uFE0F", description: "Rain" };
  if (code <= 75) return { emoji: "\uD83C\uDF28\uFE0F", description: "Snow" };
  if (code <= 82) return { emoji: "\uD83C\uDF27\uFE0F", description: "Showers" };
  if (code >= 95) return { emoji: "\u26C8\uFE0F", description: "Thunderstorm" };
  return { emoji: "\uD83C\uDF24\uFE0F", description: "Unknown" };
}
