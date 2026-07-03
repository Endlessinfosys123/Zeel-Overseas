"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
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

// Highly Realistic Commercial Passenger Jet 3D Model
const AirplaneModel: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group scale={0.24}> {/* Increased scale for clear visibility */}
      {/* Fuselage (Body) */}
      <mesh castShadow>
        <cylinderGeometry args={[0.07, 0.05, 1.0, 8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.8} />
      </mesh>
      
      {/* Nose cone (cockpit area) */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Swept Back Main Wings */}
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.5, 0.02, 0.15]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Underwing Jet Engines - Left & Right */}
      {/* Left Engine */}
      <mesh position={[-0.35, 0.12, -0.05]}>
        <cylinderGeometry args={[0.04, 0.04, 0.22, 6]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Right Engine */}
      <mesh position={[0.35, 0.12, -0.05]}>
        <cylinderGeometry args={[0.04, 0.04, 0.22, 6]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Tail horizontal stabilizers */}
      <mesh position={[0, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.55, 0.015, 0.1]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Tail Fin (Vertical Stabilizer) */}
      <mesh position={[0, -0.4, 0.1]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.15, 0.18, 0.018]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
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
        mat.opacity = 0.7 * (1 - tOffset * 12);
      }
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035 * (1 - tOffset * 12), 8, 8]} />
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
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate Bezier curve
  const curve = useMemo(() => {
    const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    const midLength = midPoint.length();
    // Curvature height above the Earth surface
    midPoint.normalize().multiplyScalar(midLength + distance * 0.38);

    return new THREE.QuadraticBezierCurve3(start, midPoint, end);
  }, [start, end]);

  // Create Tube Geometry along the Bezier curve
  const tubeGeometry = useMemo(() => {
    // Segmentation: 64 segments along path, radius: 0.014, radial segments: 6
    return new THREE.TubeGeometry(curve, 64, 0.014, 6, false);
  }, [curve]);

  // Create custom shader uniforms
  const uniforms = useMemo(() => {
    return {
      uProgress: { value: 0.0 },
      uIsActive: { value: 0.0 }
    };
  }, []);

  // Update uniforms and plane position
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = isActive ? progress : 1.0;
      materialRef.current.uniforms.uIsActive.value = isActive ? 1.0 : 0.0;
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
      {/* Flight Arc Tube Mesh with Neon Shader */}
      <mesh geometry={tubeGeometry}>
        <shaderMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          uniforms={uniforms}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uProgress;
            uniform float uIsActive;
            varying vec2 vUv;
            
            void main() {
              // Discard pixels beyond the airplane progress when active
              if (uIsActive > 0.5 && vUv.x > uProgress) {
                discard;
              }
              
              // Fade out route line slightly at the start
              float alpha = smoothstep(0.0, 0.15, vUv.x);
              
              // Cyan to Yellow gradient along the flight path
              vec3 startColor = vec3(0.0, 0.95, 1.0); // Cyan
              vec3 endColor = vec3(1.0, 0.85, 0.0);   // Yellow
              vec3 baseColor = mix(startColor, endColor, vUv.x);
              
              // If active, add an emissive neon glow that gets brighter near the plane tip
              float glow = 0.0;
              if (uIsActive > 0.5) {
                glow = pow(vUv.x / uProgress, 6.0) * 1.8;
              }
              
              vec3 glowColor = baseColor * (1.0 + glow);
              float finalAlpha = uIsActive > 0.5 ? (alpha * 0.9) : 0.22;
              
              gl_FragColor = vec4(glowColor, finalAlpha);
            }
          `}
        />
      </mesh>

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

interface CameraControllerProps {
  activeIdx: number;
  progress: number;
  elapsedTime: number;
}

// Controls camera position and zoom transitions dynamically for cinematic zoom sweeps
const CameraController: React.FC<CameraControllerProps> = ({ activeIdx, progress, elapsedTime }) => {
  const { camera } = useThree();
  const ahmedabadPos = useMemo(() => latLonToVector3(AHMEDABAD.lat, AHMEDABAD.lon, GLOBE_RADIUS), []);
  const currentLookAtRef = useRef(new THREE.Vector3(0, 0, 0));

  const destPos = useMemo(() => {
    const dest = destinations[activeIdx];
    return latLonToVector3(dest.lat, dest.lon, GLOBE_RADIUS);
  }, [activeIdx]);

  useFrame(() => {
    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const targetCamPos = new THREE.Vector3(0, 0, 5.8);

    if (elapsedTime <= 1.5) {
      // Phase 1: Wide view, globe rotates to face active route
      targetCamPos.set(0, 0, 5.8);
      targetLookAt.set(0, 0, 0);
    } else if (elapsedTime > 1.5 && elapsedTime <= 5.0) {
      // Phase 2: Zoom in and follow the airplane flying
      const currentRoutePos = new THREE.Vector3().lerpVectors(ahmedabadPos, destPos, progress);
      targetLookAt.copy(currentRoutePos);
      
      const cameraDir = currentRoutePos.clone().normalize();
      targetCamPos.copy(currentRoutePos).add(cameraDir.multiplyScalar(1.8)); // Close follow distance
    } else if (elapsedTime > 5.0 && elapsedTime <= 7.0) {
      // Phase 3: Lock on destination and zoom in close upon arrival
      targetLookAt.copy(destPos);
      const cameraDir = destPos.clone().normalize();
      targetCamPos.copy(destPos).add(cameraDir.multiplyScalar(1.4)); // Closer look on arrival
    } else {
      // Phase 4: Zoom back out wide to transition
      const t = (elapsedTime - 7.0) / 1.0;
      const currentRoutePos = new THREE.Vector3().lerpVectors(destPos, new THREE.Vector3(0, 0, 0), t);
      targetLookAt.copy(currentRoutePos);
      
      const startCam = destPos.clone().add(destPos.clone().normalize().multiplyScalar(1.4));
      const endCam = new THREE.Vector3(0, 0, 5.8);
      targetCamPos.lerpVectors(startCam, endCam, t);
    }

    // Smoothly LERP camera position
    camera.position.lerp(targetCamPos, 0.05);
    
    // Smoothly LERP camera lookAt target
    currentLookAtRef.current.lerp(targetLookAt, 0.05);
    camera.lookAt(currentLookAtRef.current);
  });

  return null;
};

interface GlobeProps {
  onActiveIndexChange: (idx: number) => void;
  onProgressChange: (p: number) => void;
  onShowCardChange: (show: boolean) => void;
}

export const Globe: React.FC<GlobeProps> = ({ 
  onActiveIndexChange, 
  onProgressChange,
  onShowCardChange 
}) => {
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
    cycleDuration: 8.0, // 8 seconds per cycle for a cinematic experience
    lastShowCard: false,
  });

  const [activeIdx, setActiveIdx] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [elapsedTime, setElapsedTime] = React.useState(0);

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
    setElapsedTime(elapsed);

    // Timings:
    // 0.0s to 1.5s: Camera focus rotation (progress = 0)
    // 1.5s to 5.0s: Flight progress goes 0.0 -> 1.0 (3.5 seconds duration)
    // 5.0s to 8.0s: Plane arrived, stays at destination (progress = 1.0)
    let p = 0;
    if (elapsed > 1.5 && elapsed <= 5.0) {
      p = (elapsed - 1.5) / 3.5;
    } else if (elapsed > 5.0) {
      p = 1.0;
    }
    setProgress(p);
    onProgressChange(p);

    // Check if card should be shown (fade in on arrival at 5.0s, fade out on zoom pull back at 7.0s)
    const shouldShowCard = elapsed >= 5.0 && elapsed < 7.0;
    if (shouldShowCard !== stateRef.current.lastShowCard) {
      stateRef.current.lastShowCard = shouldShowCard;
      onShowCardChange(shouldShowCard);
    }

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

  // Load high-quality realistic satellite Earth textures & translucent cloud textures
  const [earthTexture, bumpMap, nightTexture, specularMap, cloudsTexture] = useTexture([
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    "https://unpkg.com/three-globe/example/img/earth-topology.png",
    "https://unpkg.com/three-globe/example/img/earth-night.jpg",
    "https://unpkg.com/three-globe/example/img/earth-water.png",
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
        <ringGeometry args={[0.08, 0.18, 32]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
    );
  };

  // Atmosphere Shader definition (Spaceedu Fresnel atmosphere glow style)
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color("#00d2ff") } // Vibrant cyan-blue glow
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
          float intensity = pow(0.75 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
          gl_FragColor = vec4(color, 1.0) * intensity;
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false
    });
  }, []);

  // Custom photorealistic Day/Night Earth Shader with Specular Oceans and Bump Terrain
  const earthShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uDayMap: { value: earthTexture },
        uNightMap: { value: nightTexture },
        uBumpMap: { value: bumpMap },
        uSpecularMap: { value: specularMap },
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
        uniform sampler2D uSpecularMap;
        uniform vec3 uLightDirection;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
        void main() {
          vec4 dayColor = texture2D(uDayMap, vUv);
          vec4 nightColor = texture2D(uNightMap, vUv);
          vec4 bumpColor = texture2D(uBumpMap, vUv);
          vec4 specColor = texture2D(uSpecularMap, vUv);
          
          vec3 normal = normalize(vNormal);
          float bumpScale = 0.04;
          normal = normalize(normal + vec3(bumpColor.r * bumpScale));
          
          float dotNL = dot(normal, uLightDirection);
          float dayIntensity = smoothstep(-0.2, 0.2, dotNL);
          
          // Specular highlights only on water using satellite specular mask
          float specularMask = specColor.r;
          vec3 viewDir = normalize(vViewPosition);
          vec3 halfDir = normalize(uLightDirection + viewDir);
          float specAngle = max(dot(normal, halfDir), 0.0);
          float specular = pow(specAngle, 32.0) * specularMask * 0.65;
          
          // Render actual satellite color
          vec3 dayColorShaded = dayColor.rgb + vec3(specular);
          vec3 finalDay = dayColorShaded * max(dotNL, 0.0);
          vec3 finalNight = nightColor.rgb * (1.0 - dayIntensity) * 0.95;
          
          vec3 finalColor = mix(finalNight, finalDay + dayColor.rgb * 0.08, dayIntensity);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }, [earthTexture, nightTexture, bumpMap, specularMap]);

  return (
    <group>
      {/* Smoothly controls perspective zooming and panning sweeps */}
      <CameraController activeIdx={activeIdx} progress={progress} elapsedTime={elapsedTime} />

      <group ref={globeGroupRef}>
        {/* Outer ambient golden sparkles */}
        <Sparkles count={isMobile ? 15 : 40} scale={6} size={0.8} speed={0.25} color="#D4AF37" opacity={0.4} />

        {/* 1. Atmospheric Glow Halo (Spaceedu style vibrant Fresnel glow) */}
        <mesh material={atmosphereMaterial}>
          <sphereGeometry args={[GLOBE_RADIUS + 0.08, 64, 64]} />
        </mesh>

        {/* 2. Realistic 3D Satellite Earth Globe Sphere (Custom Day/Night + Specular + Bump Shader) */}
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
          <sphereGeometry args={[GLOBE_RADIUS + 0.025, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
          <meshStandardMaterial
            map={cloudsTexture}
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>

        {/* 4. Ahmedabad Base Pin (Globe Origin) */}
        <mesh position={ahmedabadPos}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshBasicMaterial color="#2563EB" />
        </mesh>

        {/* 5. Ahmedabad Pulse Rings */}
        <AhmedabadPulse />

        {/* 6. Destination Pins & Animated Curved Flight Paths */}
        {destinationVectors.map((dest, idx) => (
          <group key={idx}>
            {/* Target Country destination pin */}
            <mesh position={dest.vector}>
              <sphereGeometry args={[0.08, 12, 12]} />
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
    </group>
  );
};

export default Globe;
