"use client";
  
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Trail, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

export function GalaxyModel() {
  const mainSphereRef = useRef<THREE.Group>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const orbitRefs = useRef<THREE.Mesh[]>([]);

  // Create orbiting elements data with blue color palette
  const orbits = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      radius: 1.8 + i * 0.4,
      speed: 0.15 - i * 0.02,
      size: 0.12 + Math.random() * 0.1,
      // Blue color palette
      color: new THREE.Color().setHSL(0.55 + i * 0.05, 0.8, 0.5 + i * 0.1),
      yOffset: (Math.random() - 0.5) * 1.8
    }));
  }, []);

  // Animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Rotate main sphere
    if (mainSphereRef.current) {
      mainSphereRef.current.rotation.y = t * 0.1;
      mainSphereRef.current.rotation.z = t * 0.05;
    }
    
    // Pulse inner sphere
    if (innerSphereRef.current) {
      innerSphereRef.current.scale.setScalar(0.8 + Math.sin(t * 2) * 0.05);
    }
    
    // Animate orbiting elements
    orbitRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const orbit = orbits[i];
        const angle = t * orbit.speed;
        mesh.position.x = Math.sin(angle) * orbit.radius;
        mesh.position.z = Math.cos(angle) * orbit.radius;
        mesh.position.y = orbit.yOffset + Math.sin(angle * 3) * 0.3;
        mesh.rotation.x = t * 0.5;
        mesh.rotation.z = t * 0.3;
      }
    });
  });

  return (
    <group>
      {/* Main sphere with distortion effect */}
      <group ref={mainSphereRef}>
        <Sphere args={[1.1, 64, 64]}>
          <MeshDistortMaterial
            color="#0066cc"
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
          />
        </Sphere>
        
        {/* Inner energy sphere */}
        <Sphere ref={innerSphereRef} args={[0.85, 32, 32]}>
          <MeshWobbleMaterial 
            color="#4d94ff" 
            factor={0.2} 
            speed={2} 
            emissive="#0033cc"
            emissiveIntensity={0.5}
            roughness={0.3}
          />
        </Sphere>

        {/* Core glow */}
        <Sphere args={[0.6, 32, 32]}>
          <meshBasicMaterial color="#99ccff" opacity={0.15} transparent />
        </Sphere>
      </group>

      {/* Decorative rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.03, 16, 100]} />
        <meshStandardMaterial 
          color="#66a3ff" 
          emissive="#3385ff" 
          emissiveIntensity={0.4}
          opacity={0.4} 
          transparent 
        />
      </mesh>
      
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <torusGeometry args={[2.6, 0.04, 16, 100]} />
        <meshStandardMaterial 
          color="#80b3ff" 
          emissive="#80b3ff" 
          emissiveIntensity={0.3}
          opacity={0.3} 
          transparent 
        />
      </mesh>

      {/* Third ring with different angle */}
      <mesh rotation={[Math.PI / 1.5, Math.PI / 6, Math.PI / 3]}>
        <torusGeometry args={[3.2, 0.02, 16, 90]} />
        <meshStandardMaterial 
          color="#cce0ff" 
          emissive="#cce0ff" 
          emissiveIntensity={0.2}
          opacity={0.2} 
          transparent 
        />
      </mesh>

      {/* Orbital tracks (subtle blue circles) */}
      {orbits.map((orbit, i) => (
        <mesh key={`track-${i}`} rotation={[Math.PI/2 + Math.random() * 0.2, 0, Math.random() * 0.2]}>
          <ringGeometry args={[orbit.radius - 0.05, orbit.radius, 64]} />
          <meshBasicMaterial color={new THREE.Color().setHSL(0.6, 0.8, 0.5)} opacity={0.03} transparent side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Orbiting elements with trails */}
      {orbits.map((orbit, i) => (
        <Trail
          key={i}
          width={0.3}
          length={8}
          color={orbit.color}
          attenuation={(t) => t * t}
        >
          <mesh 
            ref={el => {
              if (el) orbitRefs.current[i] = el;
            }}
          >
            {i % 2 === 0 ? (
              <octahedronGeometry args={[orbit.size, 0]} />
            ) : (
              <dodecahedronGeometry args={[orbit.size, 0]} />
            )}
            <meshStandardMaterial 
              color={orbit.color} 
              emissive={orbit.color}
              emissiveIntensity={0.6}
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
        </Trail>
      ))}

      {/* Energy particles */}
      {Array.from({ length: 30 }).map((_, i) => {
        const angleOffset = Math.random() * Math.PI * 2;
        const radius = 3.5 + Math.random() * 2;
        const yPos = (Math.random() - 0.5) * 4;
        const size = 0.02 + Math.random() * 0.04;
        
        return (
          <Float 
            key={i} 
            speed={1 + Math.random() * 0.5} 
            rotationIntensity={0.5} 
            floatIntensity={0.3}
          >
            <mesh
              position={[
                Math.sin(angleOffset) * radius,
                yPos,
                Math.cos(angleOffset) * radius
              ]}
            >
              <sphereGeometry args={[size, 16, 16]} />
              <meshBasicMaterial 
                color={new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.8, 0.7)} 
                opacity={0.8} 
                transparent 
              />
            </mesh>
          </Float>
        );
      })}

      {/* Light beams radiating from center */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const height = 0.05 + Math.random() * 0.05;
        
        return (
          <mesh
            key={`beam-${i}`}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, angle]}
          >
            <cylinderGeometry args={[0.02, 0.05, 4, 8, 1, true]} />
            <meshBasicMaterial 
              color="#80b3ff"
              opacity={0.15}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}

      {/* Distant nebula particles */}
      <group rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}>
        {Array.from({ length: 200 }).map((_, i) => {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const radius = 5 + Math.random() * 3;
          
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.sin(phi) * Math.sin(theta);
          const z = radius * Math.cos(phi);
          
          return (
            <mesh key={`nebula-${i}`} position={[x, y, z]}>
              <sphereGeometry args={[0.01 + Math.random() * 0.01, 8, 8]} />
              <meshBasicMaterial 
                color={new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.8, 0.7)} 
                opacity={0.3 * Math.random()} 
                transparent 
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}