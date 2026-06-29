import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const mouse = { x: 0, y: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });
}

function ParticleCloud({ count = typeof window !== 'undefined' && window.innerWidth < 768 ? 600 : 2000 }) { // Reduced for mobile to prevent OOM
  const ref = useRef();
  const groupRef = useRef();

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 14; 
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current || !groupRef.current) return;
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
    
    const targetX = (mouse.y * Math.PI) / 4; 
    const targetY = (mouse.x * Math.PI) / 4;
    
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;

    const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
    groupRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color="#A78BFA"
            size={0.12} // Increased size so they survive the blur filter
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.NormalBlending}
            opacity={1} // Full opacity for maximum visibility
          />
        </Points>
      </group>
    </group>
  );
}

export default function InteractiveBackground() {
  // Delay WebGL initialization by 100ms to allow the DOM and CSS to render first,
  // preventing the "first scroll stutter" caused by synchronous shader compilation.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1, 
        background: 'var(--bg-primary, #F8F8F6)',
        pointerEvents: 'none'
      }}
    >
      {mounted && (
        <Canvas 
          camera={{ position: [0, 0, 15] }}
          dpr={1} 
          gl={{ antialias: false, powerPreference: "default", alpha: true }}
        >
          <ParticleCloud />
        </Canvas>
      )}
    </div>
  );
}
