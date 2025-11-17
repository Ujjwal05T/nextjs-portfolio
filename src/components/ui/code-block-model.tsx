"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export function GalaxyModel() {
  const cubeRef = useRef<THREE.Group>(null);
  const circuitLinesRef = useRef<THREE.Group>(null);
  const dataParticlesRef = useRef<THREE.Points>(null);
  const codeSymbolsRef = useRef<THREE.Group>(null);
  const hologramRef = useRef<THREE.Mesh>(null);

  // Code brackets for the cube faces
  const codeBrackets = ["{", "}", "<", "/>", "[ ]", "( )"];

  // Create circuit lines
  const circuitLineObjects = useMemo(() => {
    const lines = [];
    const colors = ["#a855f7", "#06b6d4", "#f59e0b"];

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.5;
      const points = [];

      // Create spiral circuit trace
      for (let j = 0; j < 50; j++) {
        const t = j / 50;
        const x = Math.cos(angle + t * Math.PI * 2) * (radius + Math.sin(t * Math.PI * 4) * 0.2);
        const y = (t - 0.5) * 3;
        const z = Math.sin(angle + t * Math.PI * 2) * (radius + Math.sin(t * Math.PI * 4) * 0.2);
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
      const material = new THREE.LineBasicMaterial({
        color: colors[i % 3],
        opacity: 0.6,
        transparent: true
      });

      lines.push(new THREE.Line(geometry, material));
    }
    return lines;
  }, []);

  // Create data particles (binary/hex aesthetic)
  const particleCount = 300;
  const dataPositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3.5 + Math.random() * 1.5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  // Create data stream lines
  const dataStreamLines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const startRadius = 4;
      const endRadius = 1.5;

      const points = [];
      for (let j = 0; j <= 20; j++) {
        const t = j / 20;
        const r = startRadius - (startRadius - endRadius) * t;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * r,
            Math.sin(t * Math.PI * 2) * 0.3,
            Math.sin(angle) * r
          )
        );
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(30));
      const material = new THREE.LineBasicMaterial({
        color: "#f59e0b",
        opacity: 0.4,
        transparent: true
      });

      lines.push(new THREE.Line(geometry, material));
    }
    return lines;
  }, []);

  // Animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Main cube rotation
    if (cubeRef.current) {
      cubeRef.current.rotation.y = t * 0.3;
      cubeRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }

    // Circuit lines rotation
    if (circuitLinesRef.current) {
      circuitLinesRef.current.rotation.y = -t * 0.15;
    }

    // Data particles slow drift
    if (dataParticlesRef.current) {
      dataParticlesRef.current.rotation.y = t * 0.08;
      dataParticlesRef.current.rotation.x = t * 0.05;
    }

    // Code symbols rotation
    if (codeSymbolsRef.current) {
      codeSymbolsRef.current.rotation.y = t * 0.2;
    }

    // Hologram pulse
    if (hologramRef.current) {
      const pulse = 0.8 + Math.sin(t * 2) * 0.2;
      hologramRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      {/* Central holographic code cube */}
      <group ref={cubeRef}>
        {/* Glass cube with code aesthetic */}
        <mesh>
          <boxGeometry args={[1.8, 1.8, 1.8]} />
          <MeshTransmissionMaterial
            color="#a855f7"
            transmission={0.9}
            roughness={0.1}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.15}
            backside={true}
            transparent
          />
        </mesh>

        {/* Wireframe cube edges - cyan glow */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.8, 1.8, 1.8)]} />
          <lineBasicMaterial color="#06b6d4" linewidth={2} />
        </lineSegments>

        {/* Inner glowing core */}
        <mesh>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial
            color="#7c3aed"
            metalness={0.9}
            roughness={0.2}
            emissive="#a855f7"
            emissiveIntensity={1.0}
          />
        </mesh>

        {/* Code bracket symbols on cube corners */}
        <group ref={codeSymbolsRef}>
          {codeBrackets.map((bracket, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 1.3;
            return (
              <Text
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle * 0.5) * radius,
                  Math.sin(angle) * radius,
                ]}
                fontSize={0.3}
                color="#06b6d4"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#a855f7"
              >
                {bracket}
              </Text>
            );
          })}
        </group>
      </group>

      {/* Circuit board traces spiraling around */}
      <group ref={circuitLinesRef}>
        {circuitLineObjects.map((lineObject, i) => (
          <primitive key={i} object={lineObject} />
        ))}

        {/* Circuit nodes (connection points) */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 2.5;
          const height = (i % 3 - 1) * 1.2;

          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                height,
                Math.sin(angle) * radius,
              ]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color="#06b6d4"
                emissive="#06b6d4"
                emissiveIntensity={1.5}
              />
            </mesh>
          );
        })}
      </group>

      {/* Hologram scanlines effect */}
      <mesh ref={hologramRef}>
        <torusGeometry args={[2.0, 0.005, 16, 100]} />
        <meshBasicMaterial
          color="#a855f7"
          opacity={0.4}
          transparent
        />
      </mesh>

      {/* Data particle field (binary aesthetic) */}
      <points ref={dataParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dataPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#06b6d4"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Floating terminal windows */}
      {[...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const radius = 3.0;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.5,
              Math.sin(angle) * radius,
            ]}
            rotation={[0, -angle, 0]}
          >
            <planeGeometry args={[0.6, 0.4]} />
            <meshStandardMaterial
              color="#0a0a0f"
              emissive={i % 2 === 0 ? "#a855f7" : "#06b6d4"}
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}

      {/* Data stream lines connecting to cube */}
      {dataStreamLines.map((lineObject, i) => (
        <primitive key={`stream-${i}`} object={lineObject} />
      ))}

      {/* Outer orbital rings - tech aesthetic */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.22, 64]} />
        <meshBasicMaterial
          color="#a855f7"
          opacity={0.2}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
        <ringGeometry args={[3.6, 3.62, 64]} />
        <meshBasicMaterial
          color="#06b6d4"
          opacity={0.15}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}