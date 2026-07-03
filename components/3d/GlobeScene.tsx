"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Globe from "./Globe";

export const GlobeScene: React.FC = () => {
  const [, setActiveIdx] = useState(0);
  const [, setProgress] = useState(0);

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* 3D R3F Canvas */}
      <div className="w-full h-full absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-5, 5, 5]} intensity={0.9} />
          
          <Suspense fallback={null}>
            <Globe 
              onActiveIndexChange={setActiveIdx} 
              onProgressChange={setProgress} 
            />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default GlobeScene;
