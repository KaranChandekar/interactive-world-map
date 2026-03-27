"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { MAJOR_CITIES, FLIGHT_ROUTES } from "@/utils/constants";
import { latLonToVector3 } from "@/utils/geo";

interface FlightPathsProps {
  visible: boolean;
}

export function FlightPaths({ visible }: FlightPathsProps) {
  const particlesRef = useRef<THREE.Points>(null);

  const { curves, particleCount } = useMemo(() => {
    const curves = FLIGHT_ROUTES.map(([fromIdx, toIdx]) => {
      const [, fromLat, fromLon] = MAJOR_CITIES[fromIdx];
      const [, toLat, toLon] = MAJOR_CITIES[toIdx];

      const start = new THREE.Vector3(...latLonToVector3(fromLat, fromLon, 1.01));
      const end = new THREE.Vector3(...latLonToVector3(toLat, toLon, 1.01));

      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(1.01 + dist * 0.4);

      return new THREE.QuadraticBezierCurve3(start, mid, end);
    });

    return { curves, particleCount: curves.length };
  }, []);

  const linePoints = useMemo(
    () => curves.map((c) => c.getPoints(50)),
    [curves]
  );

  useFrame((state) => {
    if (!particlesRef.current || !visible) return;
    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;

    curves.forEach((curve, i) => {
      const t = ((state.clock.elapsedTime * 0.3 + i * 0.15) % 1);
      const point = curve.getPoint(t);
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    });

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!visible) return null;

  return (
    <group>
      {linePoints.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#ff6b6b"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(particleCount * 3), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#ff6b6b"
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
