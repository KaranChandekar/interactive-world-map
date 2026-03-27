"use client";

import { Suspense, useRef, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { Earth } from "./Earth";
import { Atmosphere } from "./Atmosphere";
import { DayNightCycle } from "./DayNightCycle";
import { FlightPaths } from "./FlightPaths";
import { CountryMarkers } from "./CountryMarkers";
import { useGlobeStore } from "@/hooks/useGlobeStore";
import type { CountryData } from "@/hooks/useGlobeStore";
import { getCameraPositionForCountry } from "@/utils/geo";

function CameraAnimator() {
  const { camera } = useThree();
  const targetPosition = useGlobeStore((s) => s.targetPosition);

  useFrame(() => {
    if (!targetPosition) return;
    camera.position.lerp(
      new THREE.Vector3(...targetPosition),
      0.02
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function GlobeScene() {
  const controlsRef = useRef(null);
  const countries = useGlobeStore((s) => s.countries);
  const selectedCountry = useGlobeStore((s) => s.selectedCountry);
  const setSelectedCountry = useGlobeStore((s) => s.setSelectedCountry);
  const setTargetPosition = useGlobeStore((s) => s.setTargetPosition);
  const overlays = useGlobeStore((s) => s.overlays);

  const handleSelect = useCallback(
    (country: CountryData) => {
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

  const overlayMode = overlays.population
    ? "population"
    : overlays.gdp
      ? "gdp"
      : "none";

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 2.5]} fov={75} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} />

      <Stars
        radius={200}
        depth={60}
        count={2000}
        factor={4}
        saturation={0.2}
        fade
      />

      <Earth />
      <Atmosphere />
      <DayNightCycle />
      <FlightPaths visible={overlays.flightPaths} />
      <CountryMarkers
        countries={countries}
        selectedCountry={selectedCountry}
        onSelect={handleSelect}
        overlayMode={overlayMode as "none" | "population" | "gdp"}
      />

      <CameraAnimator />

      <OrbitControls
        ref={controlsRef}
        enableZoom
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minDistance={1.5}
        maxDistance={4}
        zoomSpeed={0.8}
        rotateSpeed={0.5}
      />
    </>
  );
}

export function GlobeCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
        dpr={[1, 2]}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
        style={{ background: "#050510" }}
      >
        <Suspense fallback={null}>
          <GlobeScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
