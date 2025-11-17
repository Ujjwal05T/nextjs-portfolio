"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export function GalaxyModel() {
  const blobRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create edges geometry for wireframe
  const edgesGeometry = useMemo(() => {
    const icosahedron = new THREE.IcosahedronGeometry(1.62, 32);
    return new THREE.EdgesGeometry(icosahedron);
  }, []);

  // Smooth professional animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Main blob - slow elegant rotation
    if (blobRef.current) {
      blobRef.current.rotation.y = t * 0.15;
      blobRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;

      // Very subtle scale breathing
      const breathe = 1 + Math.sin(t * 0.5) * 0.03;
      blobRef.current.scale.set(breathe, breathe, breathe);
    }

    // Wireframe overlay rotation
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = t * 0.12;
      wireframeRef.current.rotation.x = Math.sin(t * 0.18) * 0.08;
    }

    // Rings counter-rotation
    if (ringsRef.current) {
      ringsRef.current.rotation.y = -t * 0.08;
      ringsRef.current.rotation.x = Math.sin(t * 0.15) * 0.05;
    }

    // Particle field rotation
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
    }
  });

  // Create particle field
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 3 + Math.random() * 2;

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  return (
    <group>
      {/* Main glass-like blob - purple cosmic */}
      <mesh ref={blobRef} castShadow>
        <icosahedronGeometry args={[1.6, 32]} />
        <MeshTransmissionMaterial
          color="#a855f7"
          transmission={0.95}
          roughness={0.05}
          thickness={0.8}
          ior={1.5}
          chromaticAberration={0.1}
          backside={true}
          transparent
        />
      </mesh>

      {/* Wireframe overlay for structure - cyan */}
      <lineSegments ref={wireframeRef} geometry={edgesGeometry}>
        <lineBasicMaterial color="#06b6d4" opacity={0.2} transparent />
      </lineSegments>

      {/* Inner core sphere - purple metallic */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#7c3aed"
          metalness={0.95}
          roughness={0.1}
          emissive="#a855f7"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Energy core glow - amber accent */}
      <mesh>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshBasicMaterial
          color="#f59e0b"
          opacity={0.2}
          transparent
        />
      </mesh>

      {/* Architectural rings - cosmic colors */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[2.2, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#a855f7"
            metalness={0.9}
            roughness={0.1}
            emissive="#a855f7"
            emissiveIntensity={0.4}
          />
        </mesh>

        <mesh rotation={[Math.PI / 1.7, Math.PI / 4, 0]}>
          <torusGeometry args={[2.5, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#06b6d4"
            metalness={0.85}
            roughness={0.15}
            emissive="#06b6d4"
            emissiveIntensity={0.3}
            opacity={0.8}
            transparent
          />
        </mesh>

        <mesh rotation={[Math.PI / 3, -Math.PI / 6, Math.PI / 5]}>
          <torusGeometry args={[2.8, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#f59e0b"
            metalness={0.8}
            roughness={0.2}
            emissive="#f59e0b"
            emissiveIntensity={0.25}
            opacity={0.6}
            transparent
          />
        </mesh>
      </group>

      {/* Particle field - cosmic purple */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#a855f7"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* Accent geometric shapes - alternating colors */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 3.2;
        const colors = ["#a855f7", "#06b6d4", "#f59e0b"];
        const emissiveColors = ["#7c3aed", "#0891b2", "#d97706"];
        const colorIndex = i % 3;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.3,
              Math.sin(angle) * radius,
            ]}
          >
            <octahedronGeometry args={[0.08, 0]} />
            <meshStandardMaterial
              color={colors[colorIndex]}
              metalness={0.9}
              roughness={0.1}
              emissive={emissiveColors[colorIndex]}
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}

      {/* Subtle orbital indicators - cosmic gradient */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.0, 3.02, 64]} />
        <meshBasicMaterial
          color="#a855f7"
          opacity={0.1}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.5, 3.52, 64]} />
        <meshBasicMaterial
          color="#06b6d4"
          opacity={0.06}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}