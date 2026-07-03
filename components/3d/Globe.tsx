"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sparkles, useTexture } from "@react-three/drei";

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
      opacity: isActive ? 0.75 : 0.18, // Dim inactive paths
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
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ahmedabadPos = useMemo(() => latLonToVector3(AHMEDABAD.lat, AHMEDABAD.lon, GLOBE_RADIUS), []);

  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Monitor resize for mobile optimization
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stateRef = useRef({
    activeIdx: 0,
    elapsedTime: 0,
    cycleDuration: 6.0, // 6 seconds per country loop cycle
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
    // 1.5s to 5.0s: Flight progress goes 0.0 -> 1.0 (3.5 seconds duration)
    // 5.0s to 6.0s: Plane arrived, stays at destination (progress = 1.0)
    let p = 0;
    if (elapsed > 1.5 && elapsed <= 5.0) {
      p = (elapsed - 1.5) / 3.5;
    } else if (elapsed > 5.0) {
      p = 1.0;
    }
    setProgress(p);
    onProgressChange(p);

    // 2. Smoothly rotate globe to center the active flight path (pause on hover unless mobile)
    if (globeGroupRef.current && (!isHovered || isMobile)) {
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

    // 3. Rotate clouds slightly faster than the Earth for realism
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0016;
    }
  });

  // Calculate destination vectors
  const destinationVectors = useMemo(() => {
    return destinations.map((dest) => ({
      ...dest,
      vector: latLonToVector3(dest.lat, dest.lon, GLOBE_RADIUS),
    }));
  }, []);

  // Load high-quality realistic satellite Earth textures, bump height maps, and night lights
  const [earthTexture, bumpMap, nightTexture, cloudsTexture] = useTexture([
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    "https://unpkg.com/three-globe/example/img/earth-topology.png",
    "https://unpkg.com/three-globe/example/img/earth-night.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png"
  ]);

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

  // Atmosphere Shader definition (Spaceedu Fresnel atmosphere glow style)
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color("#4facfe") } // Vibrant cyan-blue glow
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 color;
        void main() {
          // Fresnel calculation
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
          gl_FragColor = vec4(color, 1.0) * intensity;
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false
    });
  }, []);

  // Custom high-contrast Day/Night Earth Shader with Specular Oceans and Bump Relief
  const earthShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uDayMap: { value: earthTexture },
        uNightMap: { value: nightTexture },
        uBumpMap: { value: bumpMap },
        uLightDirection: { value: new THREE.Vector3(5, 3, 5).normalize() }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uDayMap;
        uniform sampler2D uNightMap;
        uniform sampler2D uBumpMap;
        uniform vec3 uLightDirection;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
        void main() {
          vec4 dayColor = texture2D(uDayMap, vUv);
          vec4 nightColor = texture2D(uNightMap, vUv);
          vec4 bumpColor = texture2D(uBumpMap, vUv);
          
          vec3 normal = normalize(vNormal);
          float bumpScale = 0.04;
          normal = normalize(normal + vec3(bumpColor.r * bumpScale));
          
          float dotNL = dot(normal, uLightDirection);
          float dayIntensity = smoothstep(-0.15, 0.15, dotNL);
          
          // Specular highlights only on water (Red channel is low in blue marble)
          float isOcean = step(dayColor.r, 0.15);
          vec3 viewDir = normalize(vViewPosition);
          vec3 halfDir = normalize(uLightDirection + viewDir);
          float specAngle = max(dot(normal, halfDir), 0.0);
          float specular = pow(specAngle, 16.0) * isOcean * 0.45;
          
          vec3 dayColorShaded = dayColor.rgb + vec3(specular);
          vec3 finalDay = dayColorShaded * max(dotNL, 0.0);
          vec3 finalNight = nightColor.rgb * (1.0 - dayIntensity) * 0.85;
          
          vec3 finalColor = mix(finalNight, finalDay + dayColorShaded * 0.08, dayIntensity);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }, [earthTexture, nightTexture, bumpMap]);

  return (
    <group ref={globeGroupRef}>
      {/* Outer ambient golden sparkles */}
      <Sparkles count={isMobile ? 15 : 40} scale={6} size={0.8} speed={0.25} color="#D4AF37" opacity={0.4} />

      {/* 1. Atmospheric Glow Halo (Spaceedu style vibrant Fresnel glow) */}
      <mesh material={atmosphereMaterial}>
        <sphereGeometry args={[GLOBE_RADIUS + 0.08, 64, 64]} />
      </mesh>

      {/* 2. Realistic 3D Satellite Earth Globe Sphere (Custom Day/Night + Bump Shader) */}
      <mesh 
        castShadow 
        receiveShadow 
        material={earthShaderMaterial}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setIsHovered(false);
        }}
      >
        <sphereGeometry args={[GLOBE_RADIUS, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
      </mesh>

      {/* 3. Dynamic Rotating Clouds Layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[GLOBE_RADIUS + 0.02, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
        <meshStandardMaterial
          map={cloudsTexture}
          transparent
          opacity={0.35}
          depthWrite={false}
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
