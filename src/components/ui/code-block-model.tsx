"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export function GalaxyModel() {
  const sphereRef = useRef<THREE.Group>(null);
  const circuitLinesRef = useRef<THREE.Group>(null);
  const dataParticlesRef = useRef<THREE.Group>(null);
  const codeSymbolsRef = useRef<THREE.Group>(null);
  const hologramRef = useRef<THREE.Mesh>(null);

  // Code brackets and symbols for the sphere
  const codeBrackets = ["{", "}", "<", "/>", "[ ]", "( )", "=>", "{ }", "< />"];

  // Floating code snippets to replace particles
  const floatingCodeSnippets = [
    "</>", "js", "tsx", "main()", "const", "let", "=>", "async", "await",
    "return", "import", "export", "class", "void", "public", "static",
    "{}", "[]", "()", "if", "for", "while", "try", "catch", "function"
  ];

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

    // Main sphere rotation
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.2;
      sphereRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
    }

    // Circuit lines rotation
    if (circuitLinesRef.current) {
      circuitLinesRef.current.rotation.y = -t * 0.12;
    }

    // Data particles slow drift
    if (dataParticlesRef.current) {
      dataParticlesRef.current.rotation.y = t * 0.08;
      dataParticlesRef.current.rotation.x = t * 0.05;
    }

    // Code symbols rotation
    if (codeSymbolsRef.current) {
      codeSymbolsRef.current.rotation.y = t * 0.15;
    }

    // Hologram pulse
    if (hologramRef.current) {
      const pulse = 0.8 + Math.sin(t * 2) * 0.2;
      hologramRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      {/* Central holographic code sphere */}
      <group ref={sphereRef}>
        {/* Glass sphere with code aesthetic */}
        <mesh>
          <icosahedronGeometry args={[1.6, 32]} />
          <MeshTransmissionMaterial
            color="#06b6d4"
            transmission={0.85}
            roughness={0.3}
            thickness={0.5}
            ior={1.3}
            chromaticAberration={0.08}
            backside={true}
            transparent
          />
        </mesh>

        {/* Wireframe sphere overlay - cyan glow */}
        <lineSegments>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(1.6, 8)]} />
          <lineBasicMaterial color="#22d3ee" opacity={0.3} transparent />
        </lineSegments>

        {/* Inner glowing core sphere */}
        <mesh>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial
            color="#0891b2"
            metalness={0.5}
            roughness={0.4}
            emissive="#06b6d4"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Energy core glow - light blue accent */}
        <mesh>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshBasicMaterial
            color="#22d3ee"
            opacity={0.2}
            transparent
          />
        </mesh>

        {/* Code bracket symbols orbiting sphere */}
        <group ref={codeSymbolsRef}>
          {codeBrackets.map((bracket, i) => {
            const angle = (i / codeBrackets.length) * Math.PI * 2;
            const phi = Math.acos(2 * (i / codeBrackets.length) - 1);
            const radius = 1.4;
            return (
              <Text
                key={i}
                position={[
                  Math.cos(angle) * Math.sin(phi) * radius,
                  Math.cos(phi) * radius * 0.8,
                  Math.sin(angle) * Math.sin(phi) * radius,
                ]}
                fontSize={0.25}
                color="#06b6d4"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.015}
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

      {/* Floating code text (replaces particles) */}
      <group ref={dataParticlesRef}>
        {floatingCodeSnippets.map((code, i) => {
          const theta = (i / floatingCodeSnippets.length) * Math.PI * 2;
          const phi = Math.acos(2 * (i / floatingCodeSnippets.length) - 1);
          const radius = 3.5 + (i % 3) * 0.5;

          return (
            <Text
              key={i}
              position={[
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi),
              ]}
              fontSize={0.25}
              color="#06b6d4"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#0a0a0f"
            >
              {code}
            </Text>
          );
        })}
      </group>

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
    </group>
  );
}