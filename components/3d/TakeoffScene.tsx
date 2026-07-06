"use client";

import React, { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, useGLTF } from "@react-three/drei";
import * as THREE from "three";


// Flashing Beacon and Strobe Lights helper component
const AircraftLights: React.FC = () => {
  const beaconMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const strobeMatRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Red beacon flashing (1Hz pulse)
    if (beaconMatRef.current) {
      const beaconOn = Math.sin(time * 7) > 0.2;
      beaconMatRef.current.color.set(beaconOn ? "#EF4444" : "#2E0808");
    }

    // White wingtip strobe flashing (double flash every 1.2s)
    if (strobeMatRef.current) {
      const cycle = time % 1.2;
      const strobeOn = (cycle > 0.0 && cycle < 0.08) || (cycle > 0.2 && cycle < 0.28);
      strobeMatRef.current.color.set(strobeOn ? "#FFFFFF" : "#000000");
    }
  });

  return (
    <group>
      {/* Top Fuselage Red Beacon */}
      <mesh position={[0, 0.24, -0.1]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial ref={beaconMatRef} color="#EF4444" />
      </mesh>
      {/* Bottom Fuselage Red Beacon */}
      <mesh position={[0, -0.24, -0.1]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial ref={beaconMatRef} color="#EF4444" />
      </mesh>

      {/* Left Wingtip Lights (Solid Red + Strobe) */}
      <group position={[-1.72, 0.02, -0.2]}>
        {/* Solid Navigation Red */}
        <mesh position={[0, 0, 0.05]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color="#EF4444" />
        </mesh>
        {/* White Strobe */}
        <mesh position={[0, 0, -0.05]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial ref={strobeMatRef} color="#FFFFFF" />
        </mesh>
      </group>

      {/* Right Wingtip Lights (Solid Green + Strobe) */}
      <group position={[1.72, 0.02, -0.2]}>
        {/* Solid Navigation Green */}
        <mesh position={[0, 0, 0.05]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>
        {/* White Strobe */}
        <mesh position={[0, 0, -0.05]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial ref={strobeMatRef} color="#FFFFFF" />
        </mesh>
      </group>

      {/* Tail Fin White Navigation Light */}
      <mesh position={[0, 0.72, -1.4]}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
};

// 3D Cloud Cluster (Semi-transparent puffy volumetric shapes)
const CloudCluster: React.FC<{ position: THREE.Vector3; scale?: number }> = ({ position, scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.75} roughness={0.95} />
      </mesh>
      <mesh position={[0.9, 0.3, -0.4]}>
        <sphereGeometry args={[1.1, 12, 12]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.75} roughness={0.95} />
      </mesh>
      <mesh position={[-0.9, 0.1, 0.3]}>
        <sphereGeometry args={[1.2, 12, 12]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.75} roughness={0.95} />
      </mesh>
      <mesh position={[0.3, 0.7, 0.5]}>
        <sphereGeometry args={[1.0, 10, 10]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.75} roughness={0.95} />
      </mesh>
    </group>
  );
};

// 3D Tree for surrounding field depth
const LandscapeTree: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.8, 8]} />
        <meshStandardMaterial color="#78350F" roughness={0.9} />
      </mesh>
      {/* Leaves */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <sphereGeometry args={[0.45, 10, 10]} />
        <meshStandardMaterial color="#166534" roughness={0.95} />
      </mesh>
      <mesh position={[0.2, 1.3, -0.1]} castShadow>
        <sphereGeometry args={[0.35, 8, 8]} />
        <meshStandardMaterial color="#15803D" roughness={0.95} />
      </mesh>
    </group>
  );
};

// 3D Runway Light Tower for taxi depth
const LightTower: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.03, 2.0, 6]} />
        <meshStandardMaterial color="#64748B" metalness={0.7} />
      </mesh>
      {/* Lamp Head */}
      <mesh position={[0, 2.0, 0.05]}>
        <boxGeometry args={[0.15, 0.08, 0.2]} />
        <meshStandardMaterial color="#334155" metalness={0.5} />
      </mesh>
      {/* Emissive Lamp light */}
      <mesh position={[0, 1.95, 0.05]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#FEF08A" />
      </mesh>
      <pointLight position={[0, 1.8, 0.1]} intensity={0.5} distance={5} color="#FEF08A" />
    </group>
  );
};

// Daytime Runway with concrete-grey paint, yellow dashes, touchdown zones, and surrounding green grass
const Runway: React.FC = () => {
  const dashedLines = useMemo(() => {
    const lines = [];
    for (let z = 35; z >= -65; z -= 5) {
      lines.push(z);
    }
    return lines;
  }, []);

  const touchdownZoneLines = useMemo(() => {
    const stripes = [];
    for (let x = -1.2; x <= 1.2; x += 0.4) {
      if (Math.abs(x) > 0.1) {
        stripes.push(x);
      }
    }
    return stripes;
  }, []);

  const edgeLights = useMemo(() => {
    const lights = [];
    for (let z = 35; z >= 20; z -= 3.5) {
      lights.push({ x: -2.0, z, color: "#34D399", intensity: 1.5 });
      lights.push({ x: 2.0, z, color: "#34D399", intensity: 1.5 });
    }
    for (let z = 16; z >= -45; z -= 5) {
      lights.push({ x: -2.0, z, color: "#F8FAFC", intensity: 1.0 });
      lights.push({ x: 2.0, z, color: "#F8FAFC", intensity: 1.0 });
    }
    for (let z = -50; z >= -65; z -= 3.5) {
      lights.push({ x: -2.0, z, color: "#F87171", intensity: 1.5 });
      lights.push({ x: 2.0, z, color: "#F87171", intensity: 1.5 });
    }
    return lights;
  }, []);

  return (
    <group>
      {/* Concrete-Grey Runway Strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -15]} receiveShadow>
        <planeGeometry args={[4.2, 110]} />
        <meshStandardMaterial color="#475569" roughness={0.7} />
      </mesh>

      {/* Surrounding Field (Natural Green Grass) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, -15]} receiveShadow>
        <planeGeometry args={[120, 160]} />
        <meshStandardMaterial color="#4D7C0F" roughness={0.9} />
      </mesh>

      {/* Center Dashed Lines (Yellow) */}
      {dashedLines.map((z, idx) => (
        <mesh key={`dash-${idx}`} position={[0, 0.005, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 2.0]} />
          <meshBasicMaterial color="#F59E0B" />
        </mesh>
      ))}

      {/* Touchdown Zone Markings (White stripes) at runway beginning */}
      {touchdownZoneLines.map((x, idx) => (
        <mesh key={`td-${idx}`} position={[x, 0.005, 25]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.1, 4.0]} />
          <meshBasicMaterial color="#F8FAFC" />
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
            <sphereGeometry args={[0.032, 6, 6]} />
            <meshBasicMaterial color={light.color} />
          </mesh>
          <pointLight color={light.color} intensity={light.intensity} distance={1.5} />
        </group>
      ))}
    </group>
  );
};

// Realistic Airplane Loader using public GLB model
const RealisticAirplane: React.FC = () => {
  const { scene } = useGLTF("/models/airplane.glb");

  // Clone the scene to ensure isolated modifications
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Normalize, scale, and center the airplane to fit 3.2 units perfectly
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    box.getSize(size);
    
    // Target length is 3.2 units along Z (which matches our camera coordinates)
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = 3.2 / maxDim;
    
    clonedScene.scale.setScalar(scaleFactor);

    // Center the pivot point of the airplane
    const center = new THREE.Vector3();
    box.getCenter(center);
    clonedScene.position.sub(center.multiplyScalar(scaleFactor));

    // Make all materials shiny & responsive to lighting
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.12;
          mat.metalness = 0.25;
        }
      }
    });
  }, [clonedScene]);

  return (
    <group>
      <primitive object={clonedScene} />
      {/* Overlay strobe/beacon lights aligned with the normalized airplane coordinates */}
      <AircraftLights />
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

  // Animate values over frame
  useFrame(({ clock, camera }) => {
    if (startTime.current === null) {
      startTime.current = clock.getElapsedTime();
    }
    const elapsed = clock.getElapsedTime() - startTime.current;

    // 1. Position & rotation calculations
    let px = 0;
    let py = 0.12;
    let pz = 30; // Start Z
    let rx = 0; // pitch
    const ry = Math.PI; // Face -Z
    let rz = 0; // roll

    // Phase 1: Runway Roll (0s to 2.2s)
    if (elapsed < 2.2) {
      const t = elapsed / 2.2;
      pz = 30 - t * t * 45; // Z from 30 to -15
      py = 0.12;
      
      // Runway rumble jitter
      const jitter = Math.sin(elapsed * 75) * 0.003;
      px += jitter;
      py += Math.cos(elapsed * 65) * 0.002;
    }
    // Phase 2: Rotation & Climb (2.2s to 4.8s)
    else if (elapsed < 4.8) {
      const t = (elapsed - 2.2) / 2.6; // 0 to 1
      pz = -15 - t * 65; // Z from -15 to -80
      py = 0.12 + Math.sin(t * Math.PI / 2) * 11; // Climb to Y=11
      rx = -t * 0.25; // Pitch up
      rz = Math.sin(t * Math.PI) * 0.07; // bank roll
    }
    // Phase 3: Ascent & Banking (4.8s to 7.5s)
    else if (elapsed < 7.5) {
      const t = (elapsed - 4.8) / 2.7; // 0 to 1
      pz = -80 - t * 100; // Z from -80 to -180
      py = 11 + t * 18; // Climb to Y=29
      rx = -0.25 + t * 0.13; // pitch levels off
      rz = Math.sin(t * Math.PI) * -0.04;
    }
    // Phase 4: Cruising away (7.5s onwards)
    else {
      const t = (elapsed - 7.5);
      pz = -180 - t * 50; // Fly into distance
      py = 29 + t * 5;
      rx = -0.12;
    }

    // Apply translations to local state
    if (planeRef.current) {
      planeRef.current.position.set(px, py, pz);
      planeRef.current.rotation.set(rx, ry, rz);
    }

    // 2. Camera Interpolation (Lerp) logic for cinematic follow
    const targetCamPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3(px, py + 0.35, pz - 1.8);

    if (elapsed < 2.2) {
      // Low follow shot from runway rear
      targetCamPos.set(0, 0.75, pz + 4.5);
    } else if (elapsed < 4.8) {
      // Camera ascends, trailing behind & looking down/forward
      const t = (elapsed - 2.2) / 2.6;
      targetCamPos.set(
        Math.sin(t * Math.PI * 0.4) * 0.8,
        0.75 + t * 3.5,
        pz + 4.5 - t * 1.5
      );
    } else if (elapsed < 7.5) {
      // Wide angle track as plane merges with the sky
      const t = (elapsed - 4.8) / 2.7;
      targetCamPos.set(
        1.5 + t * 3.5,
        11 + t * 4,
        pz + 10 + t * 12
      );
    } else {
      // Static daytime camera
      targetCamPos.set(5, 15, -130);
    }

    camera.position.lerp(targetCamPos, 0.08);
    camera.lookAt(targetLookAt);

    // 3. Animate clouds moving backwards relative to plane
    if (cloudsGroupRef.current) {
      cloudsGroupRef.current.children.forEach((cloud) => {
        const speed = elapsed < 2.2 ? (elapsed * 12) : 28;
        cloud.position.z += speed * 0.016;

        if (cloud.position.z > camera.position.z + 5) {
          cloud.position.z = pz - 50 - Math.random() * 50;
          cloud.position.x = (Math.random() - 0.5) * 28;
          cloud.position.y = 4 + Math.random() * 16;
        }
      });
    }

    // Position sparkles at engines
    if (planeRef.current) {
      const leftEngine = new THREE.Vector3(-0.45, -0.16, -0.2);
      const rightEngine = new THREE.Vector3(0.45, -0.16, -0.2);
      
      leftEngine.applyMatrix4(planeRef.current.matrixWorld);
      rightEngine.applyMatrix4(planeRef.current.matrixWorld);

      if (leftEngineSparkles.current) {
        leftEngineSparkles.current.position.copy(leftEngine);
      }
      if (rightEngineSparkles.current) {
        rightEngineSparkles.current.position.copy(rightEngine);
      }
    }

    // Trigger Success text overlay at 4.2 seconds (fully airborne)
    if (elapsed > 4.2) {
      onComplete();
    }
  });

  // Calculate gear progress inside render loop to feed into the Landing Gear animation
  useFrame((state) => {
    if (!planeRef.current) return;
    const elapsed = state.clock.getElapsedTime() - (startTime.current ?? 0);
    let gp = 0;
    if (elapsed > 3.1) {
      gp = Math.min(1.0, (elapsed - 3.1) / 1.2);
    }

    planeRef.current.traverse((child) => {
      const name = child.name.toLowerCase();
      // Retract any landing gears, tires, struts, or wheels found in the imported GLB
      if (name.includes("gear") || name.includes("wheel") || name.includes("strut") || name.includes("tire")) {
        child.position.y = -gp * 0.35;
        child.scale.setScalar(1 - gp);
      }
    });
  });

  return (
    <group>
      {/* 3D Airplane Mesh */}
      <group ref={planeRef}>
        <RealisticAirplane />
      </group>

      {/* Glowing trail particles for engines */}
      <group ref={leftEngineSparkles}>
        <Sparkles count={15} scale={[0.1, 0.1, 1.2]} size={1.2} color="#FFD580" speed={2.0} noise={0.2} />
      </group>
      <group ref={rightEngineSparkles}>
        <Sparkles count={15} scale={[0.1, 0.1, 1.2]} size={1.2} color="#FFD580" speed={2.0} noise={0.2} />
      </group>

      {/* Cloud Environment */}
      <group ref={cloudsGroupRef}>
        {cloudPositions.map((pos, idx) => (
          <CloudCluster key={`cloud-${idx}`} position={pos} scale={0.75 + Math.random() * 0.9} />
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
    for (let i = 0; i < 12; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 36, // X
          3 + Math.random() * 16,      // Y
          -10 - Math.random() * 70     // Z
        )
      );
    }
    return positions;
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#BAE6FD] via-[#E0F2FE] to-[#FFFBEB] relative rounded-3xl overflow-hidden shadow-inner">
      <Canvas
        camera={{ position: [0, 1.0, 36], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        shadows
      >
        {/* Lights (Bright Daylight Setup) */}
        <ambientLight intensity={0.9} color="#EFF6FF" />
        
        {/* Warm daylight sun casting crisp shadows */}
        <directionalLight 
          position={[-15, 20, 15]} 
          intensity={1.8} 
          color="#FFFBEB" 
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Ambient Ground Bounce Light (Green bounce from field grass) */}
        <directionalLight position={[0, -5, 0]} intensity={0.65} color="#DCFCE7" />

        <Runway />

        {/* Add Light Towers and Trees along the runway to add realistic depth during roll */}
        <LightTower position={[-2.4, 0, 20]} />
        <LightTower position={[2.4, 0, 0]} />
        <LightTower position={[-2.4, 0, -20]} />
        <LightTower position={[2.4, 0, -40]} />

        <LandscapeTree position={[-6, 0, 28]} />
        <LandscapeTree position={[7, 0, 25]} />
        <LandscapeTree position={[-8, 0, 10]} />
        <LandscapeTree position={[8, 0, -5]} />
        <LandscapeTree position={[-7, 0, -18]} />
        <LandscapeTree position={[9, 0, -32]} />
        <LandscapeTree position={[-9, 0, -45]} />

        <Suspense fallback={null}>
          <FlightController onComplete={onComplete} cloudPositions={cloudPositions} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the GLB airplane model to make transitions instant
useGLTF.preload("/models/airplane.glb");

export default TakeoffScene;
