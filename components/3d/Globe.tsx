"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";

// Target visa country coordinates
const destinations = [
  { name: "Canada", lat: 56.1304, lon: -106.3468, color: "#D4AF37" },
  { name: "Australia", lat: -25.2744, lon: 133.7751, color: "#2563EB" },
  { name: "UK", lat: 55.3781, lon: -3.4360, color: "#D4AF37" },
  { name: "USA", lat: 37.0902, lon: -95.7129, color: "#2563EB" },
  { name: "Germany", lat: 51.1657, lon: 10.4515, color: "#D4AF37" },
  { name: "New Zealand", lat: -40.9006, lon: 174.8860, color: "#2563EB" },
];

// Origin coordinates: Ahmedabad, Gujarat, India
const AHMEDABAD = { lat: 23.0225, lon: 72.5714 };
const GLOBE_RADIUS = 2.5;

// Converts lat/lon coordinates into 3D Cartesian coordinates on a sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  return new THREE.Vector3(x, y, z);
}

interface FlightPathProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
}

// Custom component to render animated dashed line + traveling particle
const FlightPath: React.FC<FlightPathProps> = ({ start, end, color }) => {
  const pulseRef = useRef<THREE.Mesh>(null);

  // Generate Quadratic Bezier Curve elevated above the sphere surface
  const curve = useMemo(() => {
    const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    const midLength = midPoint.length();
    midPoint.normalize().multiplyScalar(midLength + distance * 0.35);

    return new THREE.QuadraticBezierCurve3(start, midPoint, end);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(50), [curve]);

  // Create THREE.Line to represent flight path
  const lineObj = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.35,
    });
    return new THREE.Line(geom, mat);
  }, [points, color]);

  useFrame(({ clock }) => {
    if (pulseRef.current) {
      // Animate traveling pulse particle from Ahmedabad to destination
      const t = (clock.getElapsedTime() * 0.35) % 1;
      const pos = curve.getPointAt(t);
      pulseRef.current.position.copy(pos);
    }
  });

  return (
    <group>
      {/* Flight Arc Line */}
      <primitive object={lineObj} />

      {/* Traveling Dot */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
};

export const Globe: React.FC = () => {
  const globeGroupRef = useRef<THREE.Group>(null);
  const ahmedabadPos = useMemo(() => latLonToVector3(AHMEDABAD.lat, AHMEDABAD.lon, GLOBE_RADIUS), []);

  // Slowly rotate the entire Earth globe scene
  useFrame(() => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += 0.0018;
    }
  });

  // Calculate coordinates for all flight destinations
  const destinationVectors = useMemo(() => {
    return destinations.map((dest) => ({
      ...dest,
      vector: latLonToVector3(dest.lat, dest.lon, GLOBE_RADIUS),
    }));
  }, []);

  // Dynamically generate a clean, premium procedural Earth texture on client-side
  const earthTexture = useMemo(() => {
    if (typeof window === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // 1. Fill ocean (light off-white background matching the site's layout)
    ctx.fillStyle = "#FAFAF8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Setup continent styling
    ctx.fillStyle = "#EAE9E4"; // Subtle premium grey landmass
    ctx.strokeStyle = "#D4AF37"; // Passport Gold continent outlines
    ctx.lineWidth = 1.0;

    const mapLon = (lon: number) => ((lon + 180) / 360) * canvas.width;
    const mapLat = (lat: number) => ((90 - lat) / 180) * canvas.height;

    const drawContinent = (points: [number, number][]) => {
      ctx.beginPath();
      points.forEach(([lat, lon], idx) => {
        const x = mapLon(lon);
        const y = mapLat(lat);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    // North America
    drawContinent([
      [75, -160], [80, -120], [75, -80], [70, -50], [50, -50],
      [25, -80], [15, -90], [10, -90], [20, -105], [30, -115],
      [55, -130], [60, -165]
    ]);

    // Greenland
    drawContinent([
      [80, -60], [82, -30], [70, -35], [60, -45], [70, -60]
    ]);

    // South America
    drawContinent([
      [10, -75], [5, -50], [-5, -35], [-20, -40], [-45, -60],
      [-55, -70], [-45, -75], [-20, -80], [0, -80]
    ]);

    // Africa
    drawContinent([
      [35, -10], [35, 15], [30, 32], [10, 40], [-15, 38],
      [-34, 20], [-30, 10], [-10, 10], [5, 10], [10, -15],
      [20, -18]
    ]);

    // Europe & Asia (Eurasia)
    drawContinent([
      [70, -10], [75, 20], [70, 60], [75, 80], [75, 120],
      [70, 160], [50, 160], [40, 140], [30, 120], [15, 110],
      [10, 105], [20, 75], [15, 73], [30, 35], [30, 15],
      [45, 15], [50, -10]
    ]);

    // India Highlighted
    drawContinent([
      [25, 68], [25, 88], [22, 88], [20, 80], [10, 78],
      [8, 77], [13, 75], [20, 70]
    ]);

    // Australia
    drawContinent([
      [-15, 115], [-12, 135], [-18, 145], [-35, 148], [-38, 140],
      [-35, 115]
    ]);

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Compute a quaternion that aligns a flat ring normal tangent to the sphere surface at Ahmedabad
  const ringQuaternion = useMemo(() => {
    const normal = ahmedabadPos.clone().normalize();
    const upVector = new THREE.Vector3(0, 0, 1);
    return new THREE.Quaternion().setFromUnitVectors(upVector, normal);
  }, [ahmedabadPos]);

  // Pulsing Ring Animation at Ahmedabad Airport origin
  const AhmedabadPulse = () => {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
      if (ringRef.current) {
        // Expand ring scale and fade out opacity recursively
        const t = (clock.getElapsedTime() * 1.6) % 1.5;
        const scale = 1 + t * 1.5;
        ringRef.current.scale.set(scale, scale, scale);
        const mat = ringRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 1 - t / 1.5);
      }
    });

    return (
      <mesh ref={ringRef} position={ahmedabadPos} quaternion={ringQuaternion}>
        <ringGeometry args={[0.06, 0.12, 32]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
    );
  };

  return (
    <group ref={globeGroupRef}>
      {/* Outer ambient sparkles */}
      <Sparkles count={45} scale={6} size={0.8} speed={0.3} color="#D4AF37" opacity={0.5} />

      {/* 1. Procedural 3D Earth Globe Sphere */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        {earthTexture ? (
          <meshStandardMaterial
            map={earthTexture}
            roughness={0.8}
            metalness={0.05}
          />
        ) : (
          <meshStandardMaterial color="#FAFAF8" roughness={0.9} />
        )}
      </mesh>

      {/* 2. Glow Grid Layer (Wireframe) */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.015, 32, 32]} />
        <meshBasicMaterial
          color="#2563EB"
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* 3. Ahmedabad Origin Pin */}
      <mesh position={ahmedabadPos}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#2563EB" />
      </mesh>

      {/* 4. Ahmedabad Pulsing Glow Ring */}
      <AhmedabadPulse />

      {/* 5. Destination Pins & Connecting flight Arcs */}
      {destinationVectors.map((dest, idx) => (
        <group key={idx}>
          {/* Target Country Destination Pin */}
          <mesh position={dest.vector}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color={dest.color} />
          </mesh>

          {/* Connect Ahmedabad to Target Country */}
          <FlightPath start={ahmedabadPos} end={dest.vector} color={dest.color} />
        </group>
      ))}
    </group>
  );
};

export default Globe;
