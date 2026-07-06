"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";

// Custom detailed Passenger Airplane Model matching company colors
const AirplaneModel: React.FC = () => {
  return (
    <group scale={0.65}>
      {/* Fuselage - Main Body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.18, 0.14, 3.0, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.1} />
      </mesh>

      {/* Windshield / Cockpit */}
      <mesh position={[0, 0.11, 1.15]} rotation={[0.2, 0, 0]}>
        <sphereGeometry args={[0.16, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1E293B" roughness={0.05} metalness={0.9} />
      </mesh>

      {/* Nose cone */}
      <mesh position={[0, 0, 1.5]} scale={[1, 1, 1.4]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} />
      </mesh>

      {/* Left Main Wing */}
      <group position={[-0.85, -0.04, -0.1]} rotation={[0, -0.18, -0.05]}>
        <mesh castShadow>
          <boxGeometry args={[1.7, 0.025, 0.4]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} />
        </mesh>
        {/* Wing Tip Accent (Gold) */}
        <mesh position={[-0.85, 0.05, 0]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.04, 0.14, 0.25]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.15} metalness={0.7} />
        </mesh>
      </group>

      {/* Right Main Wing */}
      <group position={[0.85, -0.04, -0.1]} rotation={[0, 0.18, 0.05]}>
        <mesh castShadow>
          <boxGeometry args={[1.7, 0.025, 0.4]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} />
        </mesh>
        {/* Wing Tip Accent (Gold) */}
        <mesh position={[0.85, 0.05, 0]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.04, 0.14, 0.25]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.15} metalness={0.7} />
        </mesh>
      </group>

      {/* Left Engine */}
      <mesh position={[-0.45, -0.18, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.07, 0.5, 12]} />
        <meshStandardMaterial color="#2563EB" roughness={0.2} metalness={0.7} />
      </mesh>
      {/* Left Engine Exhaust Bell (Gold) */}
      <mesh position={[-0.45, -0.18, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.1, 12]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Left Engine Glow */}
      <mesh position={[-0.45, -0.18, -0.18]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.02, 0.08, 8]} />
        <meshStandardMaterial color="#FF8C00" emissive="#FF4500" emissiveIntensity={3} />
      </mesh>

      {/* Right Engine */}
      <mesh position={[0.45, -0.18, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.07, 0.5, 12]} />
        <meshStandardMaterial color="#2563EB" roughness={0.2} metalness={0.7} />
      </mesh>
      {/* Right Engine Exhaust Bell (Gold) */}
      <mesh position={[0.45, -0.18, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.1, 12]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Right Engine Glow */}
      <mesh position={[0.45, -0.18, -0.18]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.02, 0.08, 8]} />
        <meshStandardMaterial color="#FF8C00" emissive="#FF4500" emissiveIntensity={3} />
      </mesh>

      {/* Tail - Horizontal Stabilizers */}
      <mesh position={[0, 0.08, -1.2]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.02, 0.22]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} />
      </mesh>

      {/* Tail Fin - Vertical Stabilizer */}
      <group position={[0, 0.4, -1.25]} rotation={[0.28, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.025, 0.65, 0.32]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} />
        </mesh>
        {/* Tail Fin Accent (Blue and Gold Stripe) */}
        <mesh position={[0, 0.12, -0.04]} scale={[1.1, 0.55, 0.85]}>
          <boxGeometry args={[0.026, 0.35, 0.25]} />
          <meshStandardMaterial color="#2563EB" roughness={0.2} metalness={0.3} />
        </mesh>
        <mesh position={[0, -0.12, 0.04]} scale={[1.1, 0.35, 0.85]}>
          <boxGeometry args={[0.026, 0.35, 0.25]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.7} />
        </mesh>
      </group>
    </group>
  );
};

// 3D Clouds that will fly past the camera to create speed effect
const CloudCluster: React.FC<{ position: THREE.Vector3; scale?: number }> = ({ position, scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.4, 10, 10]} />
        <meshStandardMaterial color="#EFF6FF" transparent opacity={0.35} roughness={0.9} />
      </mesh>
      <mesh position={[0.8, 0.2, -0.3]}>
        <sphereGeometry args={[1.0, 8, 8]} />
        <meshStandardMaterial color="#EFF6FF" transparent opacity={0.35} roughness={0.9} />
      </mesh>
      <mesh position={[-0.8, 0.1, 0.2]}>
        <sphereGeometry args={[1.1, 8, 8]} />
        <meshStandardMaterial color="#EFF6FF" transparent opacity={0.35} roughness={0.9} />
      </mesh>
      <mesh position={[0.2, 0.6, 0.4]}>
        <sphereGeometry args={[0.9, 8, 8]} />
        <meshStandardMaterial color="#EFF6FF" transparent opacity={0.35} roughness={0.9} />
      </mesh>
    </group>
  );
};

// Runway with asphalt, yellow dashes, white side lines, and colored edge lights
const Runway: React.FC = () => {
  const dashedLines = useMemo(() => {
    const lines = [];
    for (let z = 35; z >= -65; z -= 5) {
      lines.push(z);
    }
    return lines;
  }, []);

  const edgeLights = useMemo(() => {
    const lights = [];
    // Start lights (Green)
    for (let z = 35; z >= 20; z -= 3) {
      lights.push({ x: -2.0, z, color: "#10B981", intensity: 1.8 });
      lights.push({ x: 2.0, z, color: "#10B981", intensity: 1.8 });
    }
    // Runway strip lights (White)
    for (let z = 16; z >= -45; z -= 5) {
      lights.push({ x: -2.0, z, color: "#E2E8F0", intensity: 1.2 });
      lights.push({ x: 2.0, z, color: "#E2E8F0", intensity: 1.2 });
    }
    // End lights (Red)
    for (let z = -50; z >= -65; z -= 3) {
      lights.push({ x: -2.0, z, color: "#EF4444", intensity: 1.8 });
      lights.push({ x: 2.0, z, color: "#EF4444", intensity: 1.8 });
    }
    return lights;
  }, []);

  return (
    <group>
      {/* Asphalt Strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -15]} receiveShadow>
        <planeGeometry args={[4.2, 110]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* Surrounding Field (Dark Slate) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -15]} receiveShadow>
        <planeGeometry args={[120, 160]} />
        <meshStandardMaterial color="#0A0F1D" roughness={0.95} />
      </mesh>

      {/* Center Dashed Lines (Yellow) */}
      {dashedLines.map((z, idx) => (
        <mesh key={`dash-${idx}`} position={[0, 0.005, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 2.0]} />
          <meshBasicMaterial color="#EAB308" />
        </mesh>
      ))}

      {/* Left White Edge Line */}
      <mesh position={[-1.95, 0.005, -15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.05, 110]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* Right White Edge Line */}
      <mesh position={[1.95, 0.005, -15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.05, 110]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* Runway Edge Lights */}
      {edgeLights.map((light, idx) => (
        <group key={`light-${idx}`} position={[light.x, 0.03, light.z]}>
          <mesh>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color={light.color} />
          </mesh>
          <pointLight color={light.color} intensity={light.intensity} distance={1.8} />
        </group>
      ))}
    </group>
  );
};

interface FlightControllerProps {
  onComplete: () => void;
  cloudPositions: THREE.Vector3[];
}

const FlightController: React.FC<FlightControllerProps> = ({ onComplete, cloudPositions }) => {
  const planeRef = useRef<THREE.Group>(null);
  const leftEngineSparkles = useRef<THREE.Group>(null);
  const rightEngineSparkles = useRef<THREE.Group>(null);
  const startTime = useRef<number | null>(null);
  const cloudsGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, camera }) => {
    if (startTime.current === null) {
      startTime.current = clock.getElapsedTime();
    }
    const elapsed = clock.getElapsedTime() - startTime.current;

    // Movement Calculations
    let px = 0;
    let py = 0.12;
    let pz = 30; // Start at runway beginning
    let rx = 0; // pitch
    const ry = Math.PI; // Face -Z
    let rz = 0; // roll

    // Phase 1: Runway Roll (0s to 2.2s)
    if (elapsed < 2.2) {
      const t = elapsed / 2.2;
      pz = 30 - t * t * 45; // Accelerate Z from 30 to -15
      py = 0.12;
      
      // Simulating runway engine vibration / rumble
      const jitter = Math.sin(elapsed * 75) * 0.003;
      px += jitter;
      py += Math.cos(elapsed * 65) * 0.002;
    }
    // Phase 2: Rotation & Climb (2.2s to 4.8s)
    else if (elapsed < 4.8) {
      const t = (elapsed - 2.2) / 2.6; // 0 to 1
      pz = -15 - t * 65; // Z from -15 to -80
      py = 0.12 + Math.sin(t * Math.PI / 2) * 11; // Climb to Y=11
      rx = -t * 0.25; // Pitch up (max rotation ~14 degrees)
      
      // Elegant roll effect (banking slightly right then leveling)
      rz = Math.sin(t * Math.PI) * 0.08;
    }
    // Phase 3: Soaring into Clouds (4.8s to 7.5s)
    else if (elapsed < 7.5) {
      const t = (elapsed - 4.8) / 2.7; // 0 to 1
      pz = -80 - t * 100; // Z from -80 to -180
      py = 11 + t * 18; // Climb to Y=29
      rx = -0.25 + t * 0.13; // Pitch levels off slightly
      
      // Opposite bank to straighten out
      rz = Math.sin(t * Math.PI) * -0.04;
    }
    // Phase 4: Cruising away (7.5s onwards)
    else {
      const t = (elapsed - 7.5);
      pz = -180 - t * 50; // Fly into deep distance
      py = 29 + t * 5;
      rx = -0.12;
    }

    // Apply translation & rotation to plane
    if (planeRef.current) {
      planeRef.current.position.set(px, py, pz);
      planeRef.current.rotation.set(rx, ry, rz);
    }

    // Camera Interpolation (Lerp) logic for cinematic follow
    const targetCamPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3(px, py + 0.35, pz - 1.8);

    if (elapsed < 2.2) {
      // Low follow shot from runway rear
      targetCamPos.set(0, 0.75, pz + 4.5);
    } else if (elapsed < 4.8) {
      // Camera ascends, trailing behind & looking slightly down/forward
      const t = (elapsed - 2.2) / 2.6;
      targetCamPos.set(
        Math.sin(t * Math.PI * 0.4) * 0.8, // subtle horizontal swing
        0.75 + t * 3.5,
        pz + 4.5 - t * 1.5
      );
    } else if (elapsed < 7.5) {
      // Slow camera tracking from wide angle as airplane merges with the sky
      const t = (elapsed - 4.8) / 2.7;
      targetCamPos.set(
        1.5 + t * 3.5,
        11 + t * 4,
        pz + 10 + t * 12
      );
    } else {
      // Static sunset watcher view
      targetCamPos.set(5, 15, -130);
    }

    camera.position.lerp(targetCamPos, 0.08);
    camera.lookAt(targetLookAt);

    // Animate cloud clusters moving backwards relative to plane to simulate speed
    if (cloudsGroupRef.current) {
      cloudsGroupRef.current.children.forEach((cloud) => {
        const speed = elapsed < 2.2 ? (elapsed * 12) : 28;
        cloud.position.z += speed * 0.016; // Simulate forward velocity

        // Recycle cloud to the front if it flies past camera
        if (cloud.position.z > camera.position.z + 5) {
          cloud.position.z = pz - 50 - Math.random() * 50;
          cloud.position.x = (Math.random() - 0.5) * 28;
          cloud.position.y = 4 + Math.random() * 16;
        }
      });
    }

    // Position sparkles at engines
    if (planeRef.current) {
      const leftEngine = new THREE.Vector3(-0.45, -0.18, -0.2);
      const rightEngine = new THREE.Vector3(0.45, -0.18, -0.2);
      
      leftEngine.applyMatrix4(planeRef.current.matrixWorld);
      rightEngine.applyMatrix4(planeRef.current.matrixWorld);

      if (leftEngineSparkles.current) {
        leftEngineSparkles.current.position.copy(leftEngine);
      }
      if (rightEngineSparkles.current) {
        rightEngineSparkles.current.position.copy(rightEngine);
      }
    }

    // Trigger Success text overlay at 4.2 seconds (fully airborne and soaring)
    if (elapsed > 4.2) {
      onComplete();
    }
  });

  return (
    <group>
      {/* 3D Airplane Mesh */}
      <group ref={planeRef}>
        <AirplaneModel />
      </group>

      {/* Glowing trail particles for left & right engines */}
      <group ref={leftEngineSparkles}>
        <Sparkles count={25} scale={[0.1, 0.1, 1.8]} size={1.8} color="#FFB84D" speed={2.5} noise={0.25} />
      </group>
      <group ref={rightEngineSparkles}>
        <Sparkles count={25} scale={[0.1, 0.1, 1.8]} size={1.8} color="#FFB84D" speed={2.5} noise={0.25} />
      </group>

      {/* Cloud Environment */}
      <group ref={cloudsGroupRef}>
        {cloudPositions.map((pos, idx) => (
          <CloudCluster key={`cloud-${idx}`} position={pos} scale={0.7 + Math.random() * 0.8} />
        ))}
      </group>
    </group>
  );
};

interface TakeoffSceneProps {
  onComplete: () => void;
}

export const TakeoffScene: React.FC<TakeoffSceneProps> = ({ onComplete }) => {
  // Generate random cloud positions once
  const cloudPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 15; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 32, // X
          3 + Math.random() * 15,      // Y
          -10 - Math.random() * 70     // Z
        )
      );
    }
    return positions;
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0F172A] via-[#1E1B4B] to-[#311042] relative rounded-3xl overflow-hidden shadow-inner">
      <Canvas
        camera={{ position: [0, 1.0, 36], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        shadows
      >
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 20, 10]} intensity={1.5} color="#FAF5E6" />
        <directionalLight position={[-5, 8, 5]} intensity={1.0} color="#3B82F6" />

        {/* Sunset Glow Light Source */}
        <directionalLight position={[0, 4, -80]} intensity={3.5} color="#FF8C00" />

        {/* Ambient environment stars */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />

        <Runway />

        <FlightController onComplete={onComplete} cloudPositions={cloudPositions} />
      </Canvas>
    </div>
  );
};

export default TakeoffScene;
