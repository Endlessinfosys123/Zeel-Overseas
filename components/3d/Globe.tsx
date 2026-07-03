"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";

// Target countries with coordinates
const destinations = [
  { name: "Canada", lat: 56.1304, lon: -106.3468, color: "#D4AF37" },
  { name: "Australia", lat: -25.2744, lon: 133.7751, color: "#2563EB" },
  { name: "UK", lat: 55.3781, lon: -3.4360, color: "#D4AF37" },
  { name: "USA", lat: 37.0902, lon: -95.7129, color: "#2563EB" },
  { name: "Germany", lat: 51.1657, lon: 10.4515, color: "#D4AF37" },
  { name: "New Zealand", lat: -40.9006, lon: 174.8860, color: "#2563EB" },
];

// Origin: Ahmedabad (Gujarat, India)
const AHMEDABAD = { lat: 23.0225, lon: 72.5714 };
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

// 3D Airplane Mesh Component
const AirplaneModel: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group scale={0.11}>
      {/* Fuselage */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 0.9, 8]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.95} />
      </mesh>
      {/* Main Wings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.4, 0.04, 0.26]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.95} />
      </mesh>
      {/* Tail Wings */}
      <mesh position={[0, -0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.55, 0.03, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.95} />
      </mesh>
      {/* Tail Fin */}
      <mesh position={[0, -0.35, 0.12]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.03, 0.16, 0.25]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.95} />
      </mesh>
    </group>
  );
};

interface TrailParticleProps {
  tOffset: number;
  curve: THREE.QuadraticBezierCurve3;
  color: string;
  progress: number;
}

// Trailing particle component to create a glowing jet stream behind the airplane
const TrailParticle: React.FC<TrailParticleProps> = ({ tOffset, curve, color, progress }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      // Calculate trailing point along the curve
      const t = Math.max(0, progress - tOffset);
      const pos = curve.getPointAt(t);
      ref.current.position.copy(pos);

      // Fade out trail based on distance from the plane
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      if (progress <= tOffset) {
        mat.opacity = 0;
      } else {
        mat.opacity = 0.65 * (1 - tOffset * 15);
      }
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.024 * (1 - tOffset * 15), 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0} toneMapped={false} />
    </mesh>
  );
};

interface FlightPathProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  isActive: boolean;
  progress: number;
}

// Renders the curved flight route + the flying 3D airplane + jet trails
const FlightPath: React.FC<FlightPathProps> = ({ start, end, color, isActive, progress }) => {
  const planeRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.Line>(null);

  // Generate Bezier curve
  const curve = useMemo(() => {
    const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    const midLength = midPoint.length();
    // Curvature height above the Earth surface
    midPoint.normalize().multiplyScalar(midLength + distance * 0.38);

    return new THREE.QuadraticBezierCurve3(start, midPoint, end);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(50), [curve]);

  // Create curve visual line
  const lineObj = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: isActive ? 0.6 : 0.12, // Dim inactive paths
    });
    return new THREE.Line(geom, mat);
  }, [points, color, isActive]);

  // Dynamically update line points for the active drawing path
  useFrame(() => {
    if (lineRef.current) {
      if (isActive) {
        const activePointsCount = Math.max(2, Math.floor(progress * points.length));
        const activePoints = points.slice(0, activePointsCount);
        lineRef.current.geometry.setFromPoints(activePoints);
      } else {
        // Reset full path for static lines
        lineRef.current.geometry.setFromPoints(points);
      }
    }

    if (isActive && planeRef.current) {
      const pos = curve.getPointAt(progress);
      planeRef.current.position.copy(pos);

      // Align airplane direction to curve tangent (forward vector)
      const tangent = curve.getTangentAt(progress).normalize();
      const up = pos.clone().normalize(); // Pointing straight up away from sphere center
      const matrix = new THREE.Matrix4();
      
      // Face the plane forward along the tangent path
      matrix.lookAt(pos, pos.clone().add(tangent), up);
      planeRef.current.quaternion.setFromRotationMatrix(matrix);
    }
  });

  return (
    <group>
      {/* Flight Arc Line */}
      <primitive ref={lineRef} object={lineObj} />

      {/* Traveling 3D Jet Airplane - Only rendered on active route */}
      {isActive && (
        <>
          <group ref={planeRef}>
            <AirplaneModel color={color} />
          </group>

          {/* Jet Exhaust Trail Particles */}
          <TrailParticle tOffset={0.015} curve={curve} color={color} progress={progress} />
          <TrailParticle tOffset={0.03} curve={curve} color={color} progress={progress} />
          <TrailParticle tOffset={0.045} curve={curve} color={color} progress={progress} />
        </>
      )}
    </group>
  );
};

interface GlobeProps {
  onActiveIndexChange: (idx: number) => void;
  onProgressChange: (p: number) => void;
}

export const Globe: React.FC<GlobeProps> = ({ onActiveIndexChange, onProgressChange }) => {
  const globeGroupRef = useRef<THREE.Group>(null);
  const ahmedabadPos = useMemo(() => latLonToVector3(AHMEDABAD.lat, AHMEDABAD.lon, GLOBE_RADIUS), []);

  const stateRef = useRef({
    activeIdx: 0,
    elapsedTime: 0,
    cycleDuration: 7.0, // seconds per country cycle
  });

  const [activeIdx, setActiveIdx] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  // Shortest angle Y-axis LERP to prevent globe from spinning backwards during wraps
  const shortAngleLerp = (current: number, target: number, step: number) => {
    const diff = ((target - current + Math.PI) % (Math.PI * 2)) - Math.PI;
    return current + (diff < -Math.PI ? diff + Math.PI * 2 : diff) * step;
  };

  // Calculate target rotation to face the midpoint of the active route
  const targetRotation = useMemo(() => {
    const dest = destinations[activeIdx];
    const midLat = (AHMEDABAD.lat + dest.lat) / 2;
    const midLon = (AHMEDABAD.lon + dest.lon) / 2;

    const yRot = -midLon * (Math.PI / 180);
    const xRot = midLat * (Math.PI / 180);

    return { x: xRot, y: yRot };
  }, [activeIdx]);

  useFrame((state, delta) => {
    // 1. Cycle active destinations
    stateRef.current.elapsedTime += delta;
    if (stateRef.current.elapsedTime >= stateRef.current.cycleDuration) {
      stateRef.current.elapsedTime = 0;
      stateRef.current.activeIdx = (stateRef.current.activeIdx + 1) % destinations.length;
      setActiveIdx(stateRef.current.activeIdx);
      onActiveIndexChange(stateRef.current.activeIdx);
    }

    const elapsed = stateRef.current.elapsedTime;
    
    // Timings:
    // 0.0s to 1.5s: Camera focus rotation (progress = 0)
    // 1.5s to 5.5s: Flight progress goes 0.0 -> 1.0 (4 seconds duration)
    // 5.5s to 7.0s: Plane arrived, stays at destination (progress = 1.0)
    let p = 0;
    if (elapsed > 1.5 && elapsed <= 5.5) {
      p = (elapsed - 1.5) / 4.0;
    } else if (elapsed > 5.5) {
      p = 1.0;
    }
    setProgress(p);
    onProgressChange(p);

    // 2. Smoothly rotate globe to center the active flight path
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        globeGroupRef.current.rotation.x,
        targetRotation.x,
        0.05
      );
      globeGroupRef.current.rotation.y = shortAngleLerp(
        globeGroupRef.current.rotation.y,
        targetRotation.y,
        0.05
      );
    }
  });

  // Calculate destination vectors
  const destinationVectors = useMemo(() => {
    return destinations.map((dest) => ({
      ...dest,
      vector: latLonToVector3(dest.lat, dest.lon, GLOBE_RADIUS),
    }));
  }, []);

  // Dynamically generate a high-detail cartographic world map texture
  const earthTexture = useMemo(() => {
    if (typeof window === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // 1. Fill ocean (light off-white background matching site theme)
    ctx.fillStyle = "#FAFAF8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw global grid lines (latitude & longitude) for cartographic map feel
    ctx.strokeStyle = "rgba(37, 99, 235, 0.08)";
    ctx.lineWidth = 1;
    
    // Latitudes
    for (let lat = -80; lat <= 80; lat += 15) {
      const y = ((90 - lat) / 180) * canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    // Longitudes
    for (let lon = -180; lon < 180; lon += 15) {
      const x = ((lon + 180) / 360) * canvas.width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // 3. Setup continent styles
    ctx.fillStyle = "#EAE8E2"; // Soft warm-grey landmasses
    ctx.strokeStyle = "#D4AF37"; // Passport Gold borders
    ctx.lineWidth = 1.5;

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

    // North America (High detail outline)
    drawContinent([
      [75, -165], [83, -120], [83, -80], [75, -60], [60, -50], [50, -45],
      [45, -60], [30, -80], [25, -75], [20, -75], [15, -83], [10, -83],
      [10, -90], [15, -95], [20, -105], [30, -115], [32, -113], [32, -120],
      [45, -125], [55, -130], [60, -145], [60, -165], [70, -168]
    ]);

    // Greenland
    drawContinent([
      [80, -60], [83, -40], [75, -20], [65, -30], [60, -45], [70, -60]
    ]);

    // South America (High detail outline)
    drawContinent([
      [12, -72], [10, -60], [5, -50], [-5, -35], [-8, -35], [-20, -40],
      [-40, -60], [-55, -68], [-55, -72], [-45, -75], [-40, -70], [-30, -73],
      [-20, -80], [-10, -80], [0, -80], [5, -78]
    ]);

    // Africa (High detail outline)
    drawContinent([
      [37, 12], [32, 32], [30, 34], [25, 34], [15, 40], [12, 43], [12, 50],
      [5, 45], [-15, 40], [-30, 30], [-34, 18], [-30, 15], [-15, 10], [5, 10],
      [5, -8], [15, -17], [30, -10], [35, -6], [35, 10]
    ]);

    // Europe & Asia / Eurasia (High detail outline)
    drawContinent([
      [70, -10], [72, 15], [72, 30], [68, 40], [70, 60], [75, 80], [78, 110],
      [75, 130], [77, 140], [70, 160], [70, 170], [60, 170], [50, 140], [40, 120],
      [30, 120], [20, 115], [15, 110], [10, 105], [15, 95], [20, 95], [20, 85],
      [22, 88], [25, 88], [25, 68], [20, 70], [10, 75], [13, 75], [12, 45],
      [25, 45], [30, 35], [35, 40], [30, 15], [45, 15], [50, -10]
    ]);

    // India Highlighted
    drawContinent([
      [25, 68], [25, 88], [22, 88], [20, 80], [10, 78],
      [8, 77], [13, 75], [20, 70]
    ]);

    // Australia (High detail outline)
    drawContinent([
      [-15, 113], [-11, 136], [-15, 143], [-20, 148], [-33, 151], [-38, 146],
      [-35, 115], [-20, 113]
    ]);

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Align a ring normal flat against the sphere's surface at Ahmedabad
  const ringQuaternion = useMemo(() => {
    const normal = ahmedabadPos.clone().normalize();
    const upVector = new THREE.Vector3(0, 0, 1);
    return new THREE.Quaternion().setFromUnitVectors(upVector, normal);
  }, [ahmedabadPos]);

  // Animated pulsing glow ring around Ahmedabad
  const AhmedabadPulse = () => {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
      if (ringRef.current) {
        const t = (clock.getElapsedTime() * 1.5) % 1.5;
        const scale = 1 + t * 1.6;
        ringRef.current.scale.set(scale, scale, scale);
        const mat = ringRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 1 - t / 1.5);
      }
    });

    return (
      <mesh ref={ringRef} position={ahmedabadPos} quaternion={ringQuaternion}>
        <ringGeometry args={[0.05, 0.12, 32]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
    );
  };

  return (
    <group ref={globeGroupRef}>
      {/* Outer ambient golden sparkles */}
      <Sparkles count={40} scale={6} size={0.8} speed={0.25} color="#D4AF37" opacity={0.4} />

      {/* 1. Atmospheric Glow Halo */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.08, 32, 32]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 2. Detailed 3D Cartographic Earth Globe Sphere */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        {earthTexture ? (
          <meshStandardMaterial
            map={earthTexture}
            roughness={0.7}
            metalness={0.15}
          />
        ) : (
          <meshStandardMaterial color="#FAFAF8" roughness={0.8} />
        )}
      </mesh>

      {/* 3. Subtle outer blueprint grid lines */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.015, 32, 32]} />
        <meshBasicMaterial
          color="#2563EB"
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* 4. Ahmedabad Base Pin (Globe Origin) */}
      <mesh position={ahmedabadPos}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshBasicMaterial color="#2563EB" />
      </mesh>

      {/* 5. Ahmedabad Pulse Rings */}
      <AhmedabadPulse />

      {/* 6. Destination Pins & Animated Curved Flight Paths */}
      {destinationVectors.map((dest, idx) => (
        <group key={idx}>
          {/* Target Country destination pin */}
          <mesh position={dest.vector}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color={dest.color} />
          </mesh>

          {/* Curved flight path with 3D Jet plane + exhaust particles */}
          <FlightPath 
            start={ahmedabadPos} 
            end={dest.vector} 
            color={dest.color} 
            isActive={idx === activeIdx}
            progress={progress}
          />
        </group>
      ))}
    </group>
  );
};

export default Globe;
