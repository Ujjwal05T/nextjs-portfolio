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
      {/* Main glass-like blob */}
      <mesh ref={blobRef} castShadow>
        <icosahedronGeometry args={[1.6, 32]} />
        <MeshTransmissionMaterial
          color="#06b6d4"
          transmission={0.95}
          roughness={0.05}
          thickness={0.8}
          ior={1.5}
          chromaticAberration={0.06}
          backside={true}
          transparent
        />
      </mesh>

      {/* Wireframe overlay for structure */}
      <lineSegments ref={wireframeRef} geometry={edgesGeometry}>
        <lineBasicMaterial color="#22d3ee" opacity={0.15} transparent />
      </lineSegments>

      {/* Inner core sphere - metallic */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#0e7490"
          metalness={0.95}
          roughness={0.1}
          emissive="#155e75"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Energy core glow */}
      <mesh>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshBasicMaterial
          color="#22d3ee"
          opacity={0.15}
          transparent
        />
      </mesh>

      {/* Architectural rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[2.2, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#06b6d4"
            metalness={0.9}
            roughness={0.1}
            emissive="#0891b2"
            emissiveIntensity={0.3}
          />
        </mesh>

        <mesh rotation={[Math.PI / 1.7, Math.PI / 4, 0]}>
          <torusGeometry args={[2.5, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#22d3ee"
            metalness={0.85}
            roughness={0.15}
            emissive="#06b6d4"
            emissiveIntensity={0.2}
            opacity={0.8}
            transparent
          />
        </mesh>

        <mesh rotation={[Math.PI / 3, -Math.PI / 6, Math.PI / 5]}>
          <torusGeometry args={[2.8, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#67e8f9"
            metalness={0.8}
            roughness={0.2}
            emissive="#22d3ee"
            emissiveIntensity={0.15}
            opacity={0.6}
            transparent
          />
        </mesh>
      </group>

      {/* Particle field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#22d3ee"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Accent geometric shapes */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 3.2;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.3,
              Math.sin(angle) * radius,
            ]}
          >
            <octahedronGeometry args={[0.06, 0]} />
            <meshStandardMaterial
              color="#06b6d4"
              metalness={0.9}
              roughness={0.1}
              emissive="#0e7490"
              emissiveIntensity={0.4}
            />
          </mesh>
        );
      })}

      {/* Subtle orbital indicators */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.0, 3.02, 64]} />
        <meshBasicMaterial
          color="#06b6d4"
          opacity={0.08}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.5, 3.52, 64]} />
        <meshBasicMaterial
          color="#22d3ee"
          opacity={0.05}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}