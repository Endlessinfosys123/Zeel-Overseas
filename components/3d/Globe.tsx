"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";

// Target country lat/lon coordinates
const destinations = [
  { name: "Canada", lat: 56.1304, lon: -106.3468, color: "#D4AF37" },
  { name: "Australia", lat: -25.2744, lon: 133.7751, color: "#2563EB" },
  { name: "UK", lat: 55.3781, lon: -3.4360, color: "#D4AF37" },
  { name: "USA", lat: 37.0902, lon: -95.7129, color: "#2563EB" },
  { name: "Germany", lat: 51.1657, lon: 10.4515, color: "#D4AF37" },
  { name: "New Zealand", lat: -40.9006, lon: 174.8860, color: "#2563EB" },
];

const INDIA = { lat: 20.5937, lon: 78.9629 };
const GLOBE_RADIUS = 2.5;

// Helper to convert lat/lon to Cartesian coordinates
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  return new THREE.Vector3(x, y, z);
}

// Custom component to render animated traveling pulse along a curve
const FlightPath: React.FC<{ start: THREE.Vector3; end: THREE.Vector3; color: string }> = ({
  start,
  end,
  color,
}) => {
  const pulseRef = useRef<THREE.Mesh>(null);

  // Generate Bezier curve
  const curve = useMemo(() => {
    // Calculate control point high above the midpoint
    const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    // Extrude control point outwards
    const midLength = midPoint.length();
    midPoint.normalize().multiplyScalar(midLength + distance * 0.4);

    return new THREE.QuadraticBezierCurve3(start, midPoint, end);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(50), [curve]);
  const lineObj = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: color,
      opacity: 0.3,
      transparent: true,
    });
    return new THREE.Line(geom, mat);
  }, [points, color]);

  useFrame(({ clock }) => {
    if (!pulseRef.current) return;
    // Animate traveler position
    const t = (clock.getElapsedTime() * 0.4) % 1;
    const pos = curve.getPointAt(t);
    pulseRef.current.position.copy(pos);
  });

  return (
    <group>
      {/* Flight Arc Line */}
      <primitive object={lineObj} />

      {/* Traveling Pulse Particle */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
};

export const Globe: React.FC = () => {
  const globeGroupRef = useRef<THREE.Group>(null);

  // Slowly rotate the globe
  useFrame(() => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += 0.0015;
    }
  });

  // Calculate India's Vector
  const indiaPos = useMemo(() => latLonToVector3(INDIA.lat, INDIA.lon, GLOBE_RADIUS), []);

  // Calculate Destination Vectors
  const destinationVectors = useMemo(() => {
    return destinations.map((dest) => ({
      ...dest,
      vector: latLonToVector3(dest.lat, dest.lon, GLOBE_RADIUS),
    }));
  }, []);

  // Generate dotted grid vertices mathematically for a high-performance dotted sphere
  const dottedGeometry = useMemo(() => {
    const vertices: number[] = [];
    const dotsCount = 4500;
    for (let i = 0; i < dotsCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = GLOBE_RADIUS;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      vertices.push(x, y, z);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geom;
  }, []);

  return (
    <group ref={globeGroupRef}>
      {/* Outer ambient sparkles */}
      <Sparkles count={50} scale={6} size={1} speed={0.4} color="#D4AF37" opacity={0.6} />

      {/* 1. Dotted Globe Mesh */}
      <points geometry={dottedGeometry}>
        <pointsMaterial
          color="#3B82F6"
          size={0.025}
          sizeAttenuation={true}
          transparent
          opacity={0.4}
        />
      </points>

      {/* 2. Inner Grid Sphere (Subtle wireframe for high-tech premium aesthetic) */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS - 0.02, 32, 32]} />
        <meshBasicMaterial
          color="#2563EB"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>

      {/* 3. Base Silhouette Sphere (Hides back-facing flight arcs slightly for visual clarity) */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS - 0.05, 32, 32]} />
        <meshBasicMaterial color="#FAFAF8" transparent opacity={0.8} />
      </mesh>

      {/* 4. Origin PIN (India) */}
      <mesh position={indiaPos}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#2563EB" />
      </mesh>

      {/* 5. Destination Pins & Connecting Arcs */}
      {destinationVectors.map((dest, idx) => (
        <group key={idx}>
          {/* Destination Pin */}
          <mesh position={dest.vector}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color={dest.color} />
          </mesh>

          {/* Connect India to Destination */}
          <FlightPath start={indiaPos} end={dest.vector} color={dest.color} />
        </group>
      ))}
    </group>
  );
};

export default Globe;
