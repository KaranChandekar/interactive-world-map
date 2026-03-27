---
name: interactive-world-map
description: Build an interactive 3D globe explorer with click-to-zoom country navigation, real-time data overlays (population, weather, GDP), animated data cards, flight path particles, and day/night cycle visualization. Use this skill when building interactive maps, globe visualizations, geospatial data apps, or country exploration tools. Trigger when the user mentions world map, interactive globe, 3D earth, country explorer, geospatial visualization, map data overlay, or globe navigation.
---

# Interactive World Map Explorer Skill

## Overview
This skill guides the development of a sophisticated 3D interactive globe explorer that combines advanced 3D graphics with real-world geospatial data visualization. The application allows users to explore countries, view live data overlays, and interact with a beautiful representation of Earth with day/night cycle simulation and flight path animations.

## Core Technology Stack

### Frontend Framework & 3D Graphics
- **Next.js 15**: App Router for routing, API routes for data aggregation, server-side rendering
- **React 18**: Component-based architecture with hooks for state management
- **Three.js 0.160+**: Low-level 3D graphics library for WebGL rendering
- **React Three Fiber (R3F)**: React renderer for Three.js, enables declarative 3D component syntax
- **Drei**: Utility library for React Three Fiber with pre-built components (Sphere, Glow, Stars, etc.)
- **TypeScript**: Full type safety across 3D objects, data structures, and React components

### Data Visualization & UI
- **Framer Motion**: React-native animations for UI transitions and card entrance effects
- **Recharts 2.10+**: Composable charting library for data visualization (line charts, bar charts)
- **Tailwind CSS 3.4+**: Utility-first styling for UI components and layout
- **Zustand**: Lightweight state management for globe state, selected country, overlay mode

### Geospatial Data & APIs
- **Natural Earth GeoJSON**: Free, public domain geographic data (countries, coastlines, boundaries)
- **REST Countries API**: Country metadata (name, capital, population, area, currencies, languages)
- **Open-Meteo API**: Free, no-auth weather data API with global coverage
- **Mapbox GL JS (optional)**: For 2D map fallback on mobile
- **NASA Visible Earth**: Public domain Earth textures (day/night maps, Blue Marble)

### Animation & Interaction
- **GSAP 3.12+** (optional): Timeline-based animation for complex sequences (camera movements)
- **Orbit Controls**: Built-in to Drei for user-controlled globe rotation and zoom
- **React Spring**: Physics-based animation alternative to Framer Motion
- **Pointer Events**: Native browser events for mouse/touch interaction with 3D objects

### Map Styling & Appearance
- **Google Fonts**: Inter (body), Space Grotesk (headings)
- **CSS Gradient**: Glassmorphism for panels and overlays
- **Three.js Shaders**: Custom GLSL shaders for atmosphere glow and day/night terminator line

## Project Structure

```
11-interactive-world-map/
├── app/
│   ├── layout.tsx                 # Root layout with fonts, global styles
│   ├── page.tsx                   # Main page with globe canvas + UI
│   ├── api/
│   │   ├── countries/route.ts     # Aggregate country data from REST API
│   │   └── weather/route.ts       # Fetch weather data from Open-Meteo
│   └── fallback-map/
│       └── page.tsx               # 2D map fallback for mobile/low-end devices
├── components/
│   ├── Globe/
│   │   ├── GlobeCanvas.tsx        # R3F canvas component with Earth sphere
│   │   ├── Earth.tsx              # Three.js sphere geometry with textures
│   │   ├── Atmosphere.tsx         # Atmosphere glow shader
│   │   ├── CountryMarkers.tsx     # 3D mesh instances for country markers
│   │   ├── FlightPaths.tsx        # Animated particle arcs between cities
│   │   └── DayNightCycle.tsx      # Shadow plane for day/night terminator
│   ├── UI/
│   │   ├── CountryCard.tsx        # Animated card with country metadata
│   │   ├── SearchBar.tsx          # Typeahead search with highlights
│   │   ├── DataPanel.tsx          # Side panel with overlays toggle
│   │   ├── MiniMap.tsx            # 2D map indicator in corner
│   │   ├── CompareMode.tsx        # Side-by-side country comparison
│   │   ├── ChartPanel.tsx         # Recharts for GDP/population trends
│   │   └── LoadingSpinner.tsx     # Loading indicator
│   ├── Layout/
│   │   ├── Navbar.tsx             # Top navigation bar
│   │   └── Footer.tsx             # Footer with info/controls
│   └── Mobile/
│       └── MobileMapFallback.tsx  # 2D map for mobile devices
├── hooks/
│   ├── useGlobeState.ts           # Zustand store for globe state
│   ├── useCountryData.ts          # Fetch country data from API
│   ├── useWeatherData.ts          # Fetch weather for selected country
│   ├── useGlobeCamera.ts          # Camera animation helper
│   └── useOrbitControls.ts        # Encapsulate orbit controls logic
├── utils/
│   ├── geocoding.ts               # Convert country names to lat/lon
│   ├── colorScheme.ts             # Color palette for overlays
│   ├── dataProcessing.ts          # Format API data for display
│   ├── shaders.ts                 # GLSL shader definitions
│   └── constants.ts               # Constant values, API endpoints
├── lib/
│   ├── three-helpers.ts           # Three.js utility functions
│   ├── geo-utils.ts               # Geographic calculations
│   └── animation-helpers.ts       # Animation timeline builders
├── public/
│   ├── textures/
│   │   ├── earth-day.jpg          # NASA Earth texture (day)
│   │   ├── earth-night.jpg        # NASA Earth texture (night)
│   │   ├── earth-bump.jpg         # Bump map for surface relief
│   │   ├── clouds.png             # Animated cloud texture
│   │   └── stars-bg.jpg           # Space background
│   ├── geo-data/
│   │   └── countries.geojson      # Natural Earth GeoJSON
│   └── icons/
│       ├── search.svg
│       ├── menu.svg
│       └── location.svg
├── styles/
│   ├── globals.css                # Global styles, CSS variables
│   ├── glassmorphism.css          # Glassmorphic panel styles
│   └── animations.css             # Keyframe animations
└── package.json
```

## Core 3D Components

### 1. Globe Canvas with React Three Fiber

**GlobeCanvas.tsx:**

```typescript
import { Canvas } from '@react-three/fiber';
import { Earth, Atmosphere, CountryMarkers, FlightPaths } from './Globe';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';

export function GlobeCanvas() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 2.5],
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1000,
      }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        alpha: true,
      }}
      className="w-full h-full"
    >
      <PerspectiveCamera makeDefault position={[0, 0, 2.5]} />

      {/* Scene lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 3, 5]} intensity={1} />

      {/* 3D elements */}
      <Stars radius={200} count={1000} factor={4} saturation={0.2} />
      <Earth />
      <Atmosphere />
      <CountryMarkers />
      <FlightPaths />

      {/* Interaction */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minDistance={1.5}
        maxDistance={4}
        zoomSpeed={1}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
```

### 2. Earth Sphere with Textures

**Earth.tsx:**

```typescript
import * as THREE from 'three';
import { useTexture, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);

  const textures = useTexture({
    map: '/textures/earth-day.jpg',
    bumpMap: '/textures/earth-bump.jpg',
    normalMap: '/textures/earth-normal.jpg',
  });

  // Rotate Earth continuously
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0002; // Slow rotation
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 128, 128]} /> {/* High detail for smooth appearance */}
      <meshPhongMaterial
        map={textures.map}
        bumpMap={textures.bumpMap}
        bumpScale={0.15}
        normalMap={textures.normalMap}
        shininess={0} {/* Matte Earth surface */}
      />
    </mesh>
  );
}
```

### 3. Atmosphere Glow Effect

**Atmosphere.tsx:**

Custom shader material for atmospheric glow:

```typescript
import * as THREE from 'three';
import { useRef } from 'react';

const atmosphereVertexShader = `
  varying vec3 vertexNormal;
  void main() {
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vertexNormal;
  void main() {
    float intensity = pow(0.7 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 0.5) * intensity;
  }
`;

export function Atmosphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} scale={1.05}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}
```

Atmosphere appears as a subtle blue glow around Earth's edge when viewed from the side.

### 4. Country Markers and Hit Detection

**CountryMarkers.tsx:**

Using InstancedMesh for efficient rendering of 190+ country markers:

```typescript
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export function CountryMarkers({ countries, onCountryClick }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const countries_count = countries.length;

  // Create transformation matrix for each country
  const matrix = useMemo(() => {
    const tempObject = new THREE.Object3D();
    const matrices = [];

    countries.forEach((country, idx) => {
      const { lat, lon } = country.coordinates;

      // Convert lat/lon to 3D position on sphere
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);

      tempObject.position.set(x, y, z);
      tempObject.scale.setScalar(0.02);
      tempObject.updateMatrix();

      matrices.push(tempObject.matrix.clone());
    });

    return matrices;
  }, [countries]);

  // Animate marker scale on hover
  const handlePointerMove = (event) => {
    // Raycast to find hovered country
    // Update instance color/scale for hover effect
  };

  useFrame(() => {
    if (meshRef.current) {
      // Update instance matrices for animation
      matrix.forEach((m, idx) => {
        meshRef.current!.setMatrixAt(idx, m);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, countries_count]}
      onClick={handleCountryClick}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={0xff6b6b} />
    </instancedMesh>
  );
}
```

Alternatively, use raycasting for precise hit detection and only create meshes for visible countries.

### 5. Flight Paths with Particle Arcs

**FlightPaths.tsx:**

Animated curves between major cities with particle visualization:

```typescript
import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';

export function FlightPaths({ flightRoutes }: Props) {
  const particlesRef = useRef<THREE.Points>(null);

  // Create bezier curves between city pairs
  const paths = useMemo(
    () =>
      flightRoutes.map((route) => {
        const { start, end } = route;
        const startVec = new THREE.Vector3(...start);
        const endVec = new THREE.Vector3(...end);

        // Create control point above arc midpoint for bezier curve
        const midpoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
        const controlPoint = midpoint.normalize().multiplyScalar(1.5);

        // Create bezier curve
        const curve = new THREE.CubicBezierCurve3(
          startVec,
          controlPoint,
          controlPoint,
          endVec
        );

        return curve;
      }),
    [flightRoutes]
  );

  useFrame((state) => {
    if (particlesRef.current) {
      // Animate particles along paths
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

      paths.forEach((path, pathIdx) => {
        const progress = (state.clock.elapsedTime + pathIdx * 0.5) % 2; // Loop duration 2s
        const point = path.getPoint(progress > 1 ? 2 - progress : progress);

        const particleIdx = pathIdx * 3;
        positions[particleIdx] = point.x;
        positions[particleIdx + 1] = point.y;
        positions[particleIdx + 2] = point.z;
      });

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {paths.map((path, idx) => (
        <Line
          key={`path-${idx}`}
          points={path.getPoints(50)}
          color="#ff6b6b"
          lineWidth={0.5}
          transparent
          opacity={0.3}
        />
      ))}

      {/* Particle points */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={flightRoutes.length}
            array={new Float32Array(flightRoutes.length * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#ff6b6b" />
      </points>
    </group>
  );
}
```

### 6. Day/Night Cycle with Shadow Plane

**DayNightCycle.tsx:**

Realistic sun position calculation and shadow hemisphere:

```typescript
import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function DayNightCycle() {
  const shadowMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (shadowMeshRef.current) {
      // Calculate sun position based on UTC time
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const timeZone = Math.floor((utc / 3600000) % 24);

      // Sun position (simplified)
      const sunLongitude = (timeZone * 15 - 180) * (Math.PI / 180);

      // Rotate shadow plane to follow sun position
      shadowMeshRef.current.rotation.z = sunLongitude;
    }
  });

  return (
    <mesh ref={shadowMeshRef}>
      <sphereGeometry args={[1.001, 64, 64]} />
      <meshBasicMaterial
        color={0x000000}
        transparent
        opacity={0.4}
        side={THREE.BackSide}
      />
    </mesh>
  );
}
```

This creates a semi-transparent black hemisphere that rotates based on actual sun position.

## UI Components

### 1. Country Data Card (Animated)

**CountryCard.tsx:**

```typescript
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CountryData {
  name: string;
  capital: string;
  population: number;
  area: number;
  currency: string;
  flag: string;
}

export function CountryCard({ country }: { country: CountryData }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="backdrop-blur-md bg-white/10 rounded-lg p-6 w-96 border border-white/20"
    >
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={country.flag}
          alt={country.name}
          width={48}
          height={32}
          className="rounded"
        />
        <h2 className="text-2xl font-bold">{country.name}</h2>
      </div>

      <div className="space-y-3 text-sm text-gray-200">
        <p><span className="font-semibold">Capital:</span> {country.capital}</p>
        <p><span className="font-semibold">Population:</span> {(country.population / 1e6).toFixed(1)}M</p>
        <p><span className="font-semibold">Area:</span> {(country.area / 1e6).toFixed(1)} km²</p>
        <p><span className="font-semibold">Currency:</span> {country.currency}</p>
      </div>

      {/* Weather widget if integrated */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mt-4 w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        View Details
      </motion.button>
    </motion.div>
  );
}
```

Card flies in from the side with Framer Motion, displays country flag, and key statistics.

### 2. Search Bar with Typeahead

**SearchBar.tsx:**

```typescript
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SearchBar({ countries, onSelect }: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      query
        ? countries.filter((c) =>
            c.name.toLowerCase().includes(query.toLowerCase())
          )
        : [],
    [query, countries]
  );

  return (
    <div className="relative w-96">
      <input
        type="text"
        placeholder="Search countries..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 bg-white/10 rounded border border-white/20 focus:border-blue-500"
      />

      <AnimatePresence>
        {filtered.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded border border-white/20 max-h-64 overflow-y-auto"
          >
            {filtered.map((country) => (
              <motion.li
                key={country.id}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                onClick={() => {
                  onSelect(country);
                  setQuery('');
                }}
                className="px-4 py-2 cursor-pointer"
              >
                {country.name}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
```

### 3. Data Panel with Toggle Overlays

**DataPanel.tsx:**

```typescript
export function DataPanel({ onToggleOverlay }: Props) {
  const [overlays, setOverlays] = useState({
    population: false,
    gdp: false,
    weather: false,
    flightPaths: true,
  });

  const toggleOverlay = (key: keyof typeof overlays) => {
    setOverlays((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      onToggleOverlay(updated);
      return updated;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      className="backdrop-blur-md bg-white/10 rounded-lg p-6 w-80 border border-white/20"
    >
      <h3 className="text-lg font-bold mb-4">Data Overlays</h3>

      {Object.entries(overlays).map(([key, enabled]) => (
        <label key={key} className="flex items-center gap-3 mb-3 cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={() => toggleOverlay(key as keyof typeof overlays)}
            className="w-4 h-4"
          />
          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
        </label>
      ))}
    </motion.div>
  );
}
```

### 4. Mini Map (2D Orientation Indicator)

**MiniMap.tsx:**

```typescript
import { useGlobeState } from '@/hooks/useGlobeState';

export function MiniMap() {
  const { camera } = useGlobeState();

  return (
    <div className="absolute bottom-6 right-6 w-32 h-32 rounded-lg border-2 border-white/30 overflow-hidden bg-black/50">
      <svg className="w-full h-full" viewBox="0 0 360 180">
        {/* Simple world map outline */}
        <circle cx="180" cy="90" r="88" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />

        {/* Camera frustum indicator */}
        <g transform={`rotate(${camera.rotation} 180 90)`}>
          <path d="M 180 90 L 150 60 L 150 120 Z" fill="none" stroke="blue" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
```

### 5. Compare Mode (Side-by-Side Countries)

**CompareMode.tsx:**

```typescript
export function CompareMode({ country1, country2 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 gap-8 p-8 bg-black/80 rounded-lg"
    >
      {[country1, country2].map((country) => (
        <div key={country.id} className="space-y-4">
          <h3 className="text-xl font-bold">{country.name}</h3>
          <div className="space-y-2 text-sm">
            <p>Population: {(country.population / 1e6).toFixed(1)}M</p>
            <p>GDP: ${(country.gdp / 1e12).toFixed(2)}T</p>
            <p>Area: {(country.area / 1e6).toFixed(1)} km²</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
```

## Data Integration

### 1. REST Countries API Integration

**Fetch country metadata:**

```typescript
async function fetchCountryData(countryName: string) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
  const data = await res.json();

  return {
    name: data[0].name.common,
    capital: data[0].capital?.[0],
    population: data[0].population,
    area: data[0].area,
    currency: Object.keys(data[0].currencies)[0],
    flag: data[0].flags.svg,
    coordinates: data[0].latlng,
  };
}
```

### 2. Open-Meteo API for Weather

**Fetch real-time weather data (no API key required):**

```typescript
async function fetchWeather(lat: number, lon: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
  );
  return res.json();
}
```

### 3. Natural Earth GeoJSON for Country Boundaries

Load GeoJSON file and parse for country borders and data visualization.

## State Management with Zustand

**useGlobeState.ts:**

```typescript
import create from 'zustand';

interface GlobeState {
  selectedCountry: CountryData | null;
  setSelectedCountry: (country: CountryData | null) => void;

  overlays: {
    population: boolean;
    gdp: boolean;
    weather: boolean;
    flightPaths: boolean;
  };
  toggleOverlay: (key: string, enabled: boolean) => void;

  compareMode: [CountryData, CountryData] | null;
  setCompareMode: (countries: [CountryData, CountryData] | null) => void;

  camera: { position: [number, number, number]; rotation: number };
  updateCamera: (position: [number, number, number], rotation: number) => void;
}

export const useGlobeState = create<GlobeState>((set) => ({
  selectedCountry: null,
  setSelectedCountry: (country) => set({ selectedCountry: country }),

  overlays: {
    population: false,
    gdp: false,
    weather: false,
    flightPaths: true,
  },
  toggleOverlay: (key, enabled) =>
    set((state) => ({
      overlays: { ...state.overlays, [key]: enabled },
    })),

  compareMode: null,
  setCompareMode: (countries) => set({ compareMode: countries }),

  camera: { position: [0, 0, 2.5], rotation: 0 },
  updateCamera: (position, rotation) =>
    set({ camera: { position, rotation } }),
}));
```

## Performance Optimization

1. **LOD (Level of Detail)**:
   - Use Three.js LOD system for sphere geometry
   - High detail for close-up viewing, low detail for distant viewing

2. **Instanced Rendering**:
   - Use InstancedMesh for country markers instead of individual meshes
   - Reduces draw calls from 190+ to 1

3. **Lazy Loading**:
   - Load country data only when needed
   - Implement virtualization for country list

4. **Canvas Optimization**:
   - Use `pixelRatio={Math.min(window.devicePixelRatio, 2)}` to cap quality on high-DPI displays
   - Enable automatic pixel ratio scaling

## Mobile Fallback

For mobile devices or browsers without WebGL support, provide a 2D map alternative:

```typescript
export function MobileFallback() {
  return (
    <MapContainer center={[20, 0]} zoom={2} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup>
        {countries.map((country) => (
          <Marker key={country.id} position={country.coordinates}>
            <Popup>{country.name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
```

## Accessibility

- Keyboard navigation for globe (arrow keys rotate, +/- zoom)
- Screen reader support for data cards
- High contrast mode option
- Keyboard shortcuts legend

## Color Scheme

- **Dark theme**: Deep space dark (#050510), glassmorphic panels
- **Accent colors**: Bright red (#ff6b6b) for markers, blue for overlays
- **Text**: Light gray (#e0e0e0) for body, white for headings

This skill provides a comprehensive foundation for building interactive, data-rich 3D globe applications with modern React and Three.js.
