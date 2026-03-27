# Interactive 3D Globe Explorer

An interactive 3D globe built with Next.js and Three.js that lets you explore countries with real-time data overlays, animated flight paths, and a day/night cycle visualization.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-r170-black?logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)

## Features

- **3D Globe** — Textured earth with bump mapping, atmospheric glow, and starfield background
- **Day/Night Cycle** — Real-time shadow overlay simulating sunlight across the globe
- **Flight Paths** — Animated arc connections between major cities with particle effects
- **Country Search** — Autocomplete search with flag previews and click-to-zoom navigation
- **Country Cards** — Detailed info cards with population, area, capital, currency, languages, and live weather
- **Data Overlays** — Toggle population density, GDP indicators, weather data, and flight path visualizations
- **Country Comparison** — Side-by-side comparison with visual bar charts
- **Mini Map** — Orientation indicator showing current camera direction

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| 3D Rendering | React Three Fiber v9 + Drei |
| State | Zustand |
| Animations | Framer Motion |
| Charts | Recharts |
| Styling | Tailwind CSS |
| Language | TypeScript |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/KaranChandekar/interactive-world-map.git
cd interactive-world-map
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Data Sources

- **Country data** — [REST Countries API](https://restcountries.com)
- **Weather** — [Open-Meteo API](https://open-meteo.com)
- **Earth textures** — [three-globe](https://github.com/vasturiano/three-globe)

## Controls

| Input | Action |
|-------|--------|
| Drag | Rotate globe |
| Scroll | Zoom in/out |
| Click marker | Select country |
| Esc | Deselect / close |

## Project Structure

```
src/
├── app/
│   ├── api/            # Server routes (countries, weather)
│   ├── page.tsx        # Main page
│   └── layout.tsx      # Root layout
├── components/
│   ├── Globe/          # 3D components (Earth, Atmosphere, FlightPaths, etc.)
│   └── UI/             # Overlay components (SearchBar, CountryCard, DataPanel, etc.)
├── hooks/              # Zustand store, data fetching hooks
└── utils/              # Geo math, formatting, constants
```

## License

MIT
