import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, QuadraticBezierLine, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Globe, Zap, Code, MapPin } from "lucide-react";

// ─── UTILS ─────────────────────────────────────────────────────────────────────
const GLOBE_RADIUS = 2;

// Convert Lat/Lng to 3D Cartesian coordinates
const getCoordinates = (lat, lng) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return [
    -(GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta)),
    GLOBE_RADIUS * Math.cos(phi),
    GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta),
  ];
};

// ─── DATA ──────────────────────────────────────────────────────────────────────
const INDORE = { lat: 22.7196, lng: 75.8577 };

const DESTINATIONS = [
  { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { name: "New York", lat: 40.7128, lng: -74.0060 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Berlin", lat: 52.5200, lng: 13.4050 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093 }
];

const FLOATING_CARDS = [
  { icon: <Globe size={14} strokeWidth={2.5} color="var(--accent, #a78bfa)" />, text: "Available Worldwide", lat: 45, lng: -40 },
  { icon: <Zap size={14} strokeWidth={2.5} color="var(--accent, #facc15)" />, text: "Remote Collaboration", lat: -20, lng: 20 },
  { icon: <Code size={14} strokeWidth={2.5} color="var(--accent, #60a5fa)" />, text: "Full-Stack", lat: -15, lng: -100 },
];

// ─── GLOBE SCENE ─────────────────────────────────────────────────────────────
const GlobeScene = () => {
  const groupRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotation (pauses on hover)
  useFrame(() => {
    if (groupRef.current && !isHovered) {
      groupRef.current.rotation.y += 0.001;
    }
    if (groupRef.current && isHovered) {
      groupRef.current.rotation.y += 0.002; // Very subtle speed up
    }
  });

  const indoreCoords = getCoordinates(INDORE.lat, INDORE.lng);

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* Base Globe Solid */}
      <Sphere args={[GLOBE_RADIUS * 0.99, 64, 64]}>
        <meshPhysicalMaterial
          color="#0F172A" // Dark Navy
          roughness={0.4}
          metalness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1}
          transparent
          opacity={0.95}
        />
      </Sphere>

      {/* Wireframe for Lat/Long Lines */}
      <Sphere args={[GLOBE_RADIUS, 32, 32]}>
        <meshBasicMaterial
          color="rgba(124, 58, 237, 0.2)" // Soft Purple
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Atmosphere Glow */}
      <Sphere args={[GLOBE_RADIUS * 1.1, 32, 32]}>
        <meshBasicMaterial
          color="rgba(124, 58, 237, 0.1)"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Indore Marker */}
      <mesh position={indoreCoords}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#EC4899" />
        <Html center>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(16px) saturate(200%)",
            WebkitBackdropFilter: "blur(16px) saturate(200%)",
            padding: "0.4rem 1rem 0.4rem 0.4rem",
            borderRadius: "50px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            transform: "translate(15px, -15px)",
            pointerEvents: "none"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              background: "rgba(236, 72, 153, 0.15)",
              borderRadius: "50%",
              boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 2px 5px rgba(0,0,0,0.2)",
              color: "#EC4899"
            }}>
              <MapPin size={16} strokeWidth={2.5} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", paddingRight: "0.2rem" }}>
              <span style={{
                color: "rgba(255, 255, 255, 0.95)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                whiteSpace: "nowrap",
                lineHeight: "1.2"
              }}>
                Indore, India
              </span>
              <span style={{ color: "#EC4899", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                UTC +5:30
              </span>
            </div>
          </div>
          <div className="pulse-ring" style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30px", height: "30px",
            background: "rgba(236, 72, 153, 0.4)",
            borderRadius: "50%",
            animation: "pulse-marker 2s infinite"
          }} />
        </Html>
      </mesh>

      {/* Connection Arcs to global hubs */}
      {DESTINATIONS.map((dest) => {
        const destCoords = getCoordinates(dest.lat, dest.lng);
        // Calculate mid-point for Bezier curve, elevated to make an arc
        const midPoint = [
          (indoreCoords[0] + destCoords[0]) / 2,
          (indoreCoords[1] + destCoords[1]) / 2,
          (indoreCoords[2] + destCoords[2]) / 2,
        ];
        // Push the midPoint further out from the center to create the arc height
        const distance = Math.sqrt(midPoint[0] ** 2 + midPoint[1] ** 2 + midPoint[2] ** 2);
        const arcHeight = 1.3; // multiplier
        const controlPoint = [
          (midPoint[0] / distance) * (GLOBE_RADIUS * arcHeight),
          (midPoint[1] / distance) * (GLOBE_RADIUS * arcHeight),
          (midPoint[2] / distance) * (GLOBE_RADIUS * arcHeight),
        ];

        return (
          <group key={dest.name}>
            {/* Destination Marker */}
            <mesh position={destCoords}>
              <sphereGeometry args={[0.02, 16, 16]} />
              <meshBasicMaterial color="#7C3AED" opacity={0.8} transparent />
            </mesh>

            {/* Arc Line */}
            <QuadraticBezierLine
              start={indoreCoords}
              end={destCoords}
              mid={controlPoint}
              color={isHovered ? "#EC4899" : "#7C3AED"}
              lineWidth={1.5}
              transparent
              opacity={isHovered ? 0.8 : 0.3}
              dashed={false}
            />
          </group>
        );
      })}

      {/* Floating Info Cards */}
      {FLOATING_CARDS.map((card, i) => {
        const coords = getCoordinates(card.lat, card.lng);
        // Push out slightly above the surface
        const offsetCoords = coords.map(c => c * 1.15);

        return (
          <group position={offsetCoords} key={i}>
            <Html center>
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(16px) saturate(200%)",
                  WebkitBackdropFilter: "blur(16px) saturate(200%)",
                  padding: "0.3rem 1rem 0.3rem 0.3rem",
                  borderRadius: "50px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
                  pointerEvents: "none"
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "26px",
                  height: "26px",
                  background: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "50%",
                  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 2px 5px rgba(0,0,0,0.2)",
                  color: "var(--accent)"
                }}>
                  {card.icon}
                </div>
                <span style={{
                  color: "rgba(255, 255, 255, 0.95)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  whiteSpace: "nowrap",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                }}>
                  {card.text}
                </span>
              </motion.div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};


// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function GlobeSection() {
  return (
    <section style={{
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      background: "transparent",
      display: "flex",
      alignItems: "center",
      padding: "6rem 2rem",
      overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,0.05)"
    }}>
      {/* Background Gradient */}
      <div style={{
        position: "absolute",
        top: "20%", left: "50%",
        width: "60vw", height: "60vw",
        background: "radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 60%)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none"
      }} />

      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "4rem",
        position: "relative",
        zIndex: 10
      }}>

        {/* LEFT TEXT CONTAINER */}
        <div style={{ flex: "1 1 450px", maxWidth: "600px" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "0.4rem 1rem",
              borderRadius: "50px",
              marginBottom: "1.5rem"
            }}>
              <span style={{ fontSize: "1rem" }}>📍</span>
              <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Location
              </span>
            </div>

            <h2 style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "1.5rem"
            }}>
              Building from Indore.<br />
              <span style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent-light))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>Collaborating Worldwide.</span>
            </h2>

            <p style={{
              color: "var(--text-secondary)",
              fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
              lineHeight: 1.7,
              marginBottom: "2rem",
              maxWidth: "500px"
            }}>
              Based in Indore, India, I'm a Full-Stack Passionate Developer creating scalable software, intuitive user experiences, and AI-powered applications while collaborating with Innovative teams and individuals worldwide.
            </p>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "rgba(16, 185, 129, 0.05)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              padding: "0.8rem 1.5rem",
              borderRadius: "12px",
              marginBottom: "3rem"
            }}>
              <div style={{
                width: "10px", height: "10px",
                background: "#10B981", borderRadius: "50%",
                boxShadow: "0 0 10px #10B981",
                animation: "pulse-marker 2s infinite"
              }} />
              <span style={{ color: "#10B981", fontSize: "0.9rem", fontWeight: 600 }}>
                Available for Freelance & Remote Opportunities
              </span>
            </div>

            <form action="https://formspree.io/f/xzdlgypz" method="POST" style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "1.2rem", 
              width: "100%", 
              maxWidth: "450px",
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(20px) saturate(150%)",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.05), inset 0 2px 5px rgba(255, 255, 255, 1)",
              padding: "2rem",
              borderRadius: "24px",
              position: "relative"
            }}>
              <div style={{ marginBottom: "0.5rem" }}>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "0.2rem" }}>Direct Message</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>I'll get back to you as soon as possible.</p>
              </div>

              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                required
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
                  padding: "1rem 1.25rem",
                  borderRadius: "14px",
                  color: "var(--text-primary)",
                  fontFamily: "inherit",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                onFocus={e => {
                  e.target.style.borderColor = "var(--accent)";
                  e.target.style.boxShadow = "0 0 0 4px var(--accent-glow)";
                }}
                onBlur={e => {
                  e.target.style.borderColor = "rgba(0,0,0,0.08)";
                  e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.02)";
                }}
              />
              <textarea
                name="message"
                placeholder="How can I help you?"
                required
                rows="4"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
                  padding: "1rem 1.25rem",
                  borderRadius: "14px",
                  color: "var(--text-primary)",
                  fontFamily: "inherit",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  resize: "none",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                onFocus={e => {
                  e.target.style.borderColor = "var(--accent)";
                  e.target.style.boxShadow = "0 0 0 4px var(--accent-glow)";
                }}
                onBlur={e => {
                  e.target.style.borderColor = "rgba(0,0,0,0.08)";
                  e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.02)";
                }}
              />
              <button type="submit" style={{
                display: "inline-block",
                background: "var(--text-primary)",
                color: "var(--bg-primary)",
                padding: "1rem 2.5rem",
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "none",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "all 0.3s ease",
                alignSelf: "flex-end",
                marginTop: "0.5rem",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 15px 25px rgba(0,0,0,0.2)";
                  e.currentTarget.style.background = "var(--accent)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
                  e.currentTarget.style.background = "var(--text-primary)";
                }}
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>

        {/* RIGHT GLOBE CONTAINER */}
        <div style={{
          flex: "1 1 500px",
          height: typeof window !== 'undefined' && window.innerWidth < 768 ? "400px" : "700px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {/* Subtle glow behind the canvas */}
          <div style={{
            position: "absolute",
            width: "70%", height: "70%",
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
            pointerEvents: "none"
          }} />

          <Canvas
            camera={{ position: [0, 0, typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 7.5], fov: 45 }}
            style={{ width: "100%", height: "100%", cursor: "grab" }}
            dpr={1} // Cap at 1 for mobile stability
            gl={{ antialias: false, powerPreference: "default" }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#7C3AED" />

            <Environment preset="city" />
            <GlobeScene />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={false} // Handled custom in useFrame for pausing on hover
              rotateSpeed={0.5}
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
