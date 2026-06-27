import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';

function Shape({ type = 'icosahedron', position, ...props }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2.5}>
      <mesh ref={meshRef} position={position} {...props}>
        {type === 'icosahedron' ? (
          <icosahedronGeometry args={[1.5, 0]} />
        ) : (
          <torusKnotGeometry args={[1.2, 0.35, 64, 12]} />
        )}
        <MeshTransmissionMaterial 
          backside 
          samples={3} 
          thickness={4} 
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={2}
          chromaticAberration={0.8} 
          anisotropy={0.3} 
          distortion={0.8} 
          distortionScale={0.8} 
          temporalDistortion={0.2} 
          color="#e0e7ff" 
          transmission={1}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingShapesBackground() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {mounted && (
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 45 }} 
          gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }} 
          dpr={1}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 10]} intensity={2} color="#FFFFFF" />
          <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#A78BFA" />
          <Environment preset="city" />
          {/* Only rendering one 3D element to eliminate lag completely */}
          <Shape type="icosahedron" position={[-3, 0, 0]} />
        </Canvas>
      )}
    </div>
  );
}
