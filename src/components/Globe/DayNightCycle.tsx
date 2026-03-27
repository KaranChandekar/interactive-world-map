"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = `
  uniform vec3 uSunDirection;
  varying vec3 vWorldPosition;
  void main() {
    vec3 normal = normalize(vWorldPosition);
    float sunDot = dot(normal, uSunDirection);
    float shadow = smoothstep(-0.1, 0.1, -sunDot);
    gl_FragColor = vec4(0.0, 0.0, 0.05, shadow * 0.35);
  }
`;

export function DayNightCycle() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(() => {
    if (!materialRef.current) return;
    const now = new Date();
    const hours = now.getUTCHours() + now.getUTCMinutes() / 60;
    const angle = ((hours / 24) * Math.PI * 2) - Math.PI;
    materialRef.current.uniforms.uSunDirection.value.set(
      Math.cos(angle),
      0,
      Math.sin(angle)
    );
  });

  return (
    <mesh>
      <sphereGeometry args={[1.002, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        uniforms={{
          uSunDirection: { value: new THREE.Vector3(1, 0, 0) },
        }}
      />
    </mesh>
  );
}
