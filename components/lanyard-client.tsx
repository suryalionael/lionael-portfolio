"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, PerspectiveCamera } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function LanyardCard() {
  const groupRef = useRef<THREE.Group>(null);
  
  const frontTexture = useTexture("/portrait-lanyard.png");

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.08 + 0.1;
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.03;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.08, 0.1, 0]}>
      {/* Front */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 2.2, 0.015]} />
        <meshStandardMaterial 
          map={frontTexture} 
          side={THREE.FrontSide} 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0, -0.015]} rotation={[0, Math.PI, 0]}>
        <boxGeometry args={[1.6, 2.2, 0.015]} />
        <meshStandardMaterial 
          color="#0a0a0a"
          side={THREE.FrontSide}
          roughness={0.3}
          metalness={0.1}
        >
          <primitive attach="map" object={createBackTexture()} />
        </meshStandardMaterial>
      </mesh>
      {/* Lanyard string */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>
    </group>
  );
}

function createBackTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Background
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, 800, 1000);

  // Border
  ctx.strokeStyle = '#2a2a2a';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, 760, 960);

  // Name
  ctx.fillStyle = '#fafafa';
  ctx.font = 'bold 48px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('LIONAEL SURYA', 400, 150);

  // Tagline
  ctx.font = '28px monospace';
  ctx.fillStyle = '#8a8a8a';
  ctx.fillText('Built Like Production.', 400, 220);

  // Large monogram
  ctx.font = 'bold 200px monospace';
  ctx.fillStyle = '#1a1a1a';
  ctx.fillText('LS', 400, 550);

  // Grid lines
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 0.5;
  ctx.globalAlpha = 0.3;
  [650, 700, 750].forEach(y => {
    ctx.beginPath();
    ctx.moveTo(100, y);
    ctx.lineTo(700, y);
    ctx.stroke();
  });
  ctx.globalAlpha = 1;

  // Footer text
  ctx.font = '18px monospace';
  ctx.fillStyle = '#4a4a4a';
  ctx.fillText('DATA & SOFTWARE ENGINEERING', 400, 850);
  ctx.fillText('TORONTO, CANADA', 400, 890);

  // Accent dot
  ctx.fillStyle = '#3e63dd';
  ctx.beginPath();
  ctx.arc(100, 920, 4, 0, Math.PI * 2);
  ctx.fill();

  // Small label
  ctx.font = '14px monospace';
  ctx.fillStyle = '#4a4a4a';
  ctx.textAlign = 'left';
  ctx.fillText('SYSTEMS ENGINEER', 120, 925);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function LanyardClient() {
  return (
    <div className="h-[400px] w-full md:h-[480px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 3.8]} fov={45} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 4, 4]} intensity={0.9} castShadow />
        <directionalLight position={[-2, -2, -2]} intensity={0.2} />
        <Suspense fallback={null}>
          <LanyardCard />
        </Suspense>
      </Canvas>
    </div>
  );
}

