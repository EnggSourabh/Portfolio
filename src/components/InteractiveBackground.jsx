import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Global mouse tracker to bypass pointer-events: none on the canvas wrapper
const mouse = { x: 0, y: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

function ParticleCloud({ count = 5000 }) {
  const ref = useRef();
  const groupRef = useRef();

  // Generate random positions in a sphere
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 14; // Spread between 3 and 17
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta); // x
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
      positions[i * 3 + 2] = radius * Math.cos(phi); // z
    }
    return positions;
  }, [count]);

  // Handle subtle automatic rotation, live breathing, and global mouse interaction
  useFrame((state, delta) => {
    if (!ref.current || !groupRef.current) return;

    // Slow continuous rotation of the inner particle cloud
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
    
    // Smoothly interpolate rotation of the outer group based on GLOBAL mouse position
    // This creates a highly responsive parallax effect
    const targetX = (mouse.y * Math.PI) / 4; 
    const targetY = (mouse.x * Math.PI) / 4;
    
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;

    // Add a live breathing/pulsing effect based on elapsed time
    const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
    groupRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color="#A78BFA" // Plasma Violet accent-light
            size={0.06}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.NormalBlending}
            opacity={0.8}
          />
        </Points>
      </group>
    </group>
  );
}

export default function InteractiveBackground() {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1, 
        background: 'var(--bg-primary, #F8F8F6)', // Chalk background
        pointerEvents: 'none' // Allow clicks to pass through to the foreground
      }}
    >
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ParticleCloud />
      </Canvas>
    </div>
  );
}
