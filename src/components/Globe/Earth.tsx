"use client";

import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { EARTH_TEXTURES } from "@/utils/constants";

export function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);

  const dayTexture = useLoader(
    THREE.TextureLoader,
    EARTH_TEXTURES.day
  );
  const bumpTexture = useLoader(
    THREE.TextureLoader,
    EARTH_TEXTURES.bump
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshPhongMaterial
        map={dayTexture}
        bumpMap={bumpTexture}
        bumpScale={0.05}
        shininess={5}
      />
    </mesh>
  );
}
