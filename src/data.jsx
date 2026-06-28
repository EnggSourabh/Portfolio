import { Atom, Server, Database, Sparkles, Video, Zap, MapPin, Smartphone, Rocket, FileCode2, Brain, Coffee, Layout, Paintbrush, Mail, Code } from "lucide-react";
import { motion } from "framer-motion";

export const SERVICES = [
  {
    num: "01",
    name: "Full-Stack Development",
    desc: "Designing and developing scalable web applications using React, Next.js, Node.js, Express, MongoDB, and modern engineering practices.",
  },
  {
    num: "02",
    name: "UI/UX Design",
    desc: "Crafting intuitive user experiences with clean interfaces, thoughtful interactions, responsive layouts, and product-first design principles.",
  },
  {
    num: "03",
    name: "AI Integration",
    desc: "Embedding Gemini API, AI matching logic, and intelligent pipelines into web products for smart, context-aware user experiences.",
  },
  {
    num: "04",
    name: "Software Engineering",
    desc: "Strong understanding of algorithms, databases, object-oriented programming, system architecture, and scalable backend development.",
  },
  {
    num: "05",
    name: "Product Development",
    desc: "Transforming ideas into production-ready products through planning, rapid prototyping, iterative development, deployment, and continuous improvement.",
  },
];

export const InterviewAIGraphic = () => (
  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "350px", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div style={{ position: "absolute", top: "10%", left: "5%", right: "5%", bottom: "10%", background: "var(--bg-secondary)", borderRadius: "24px", border: "1px solid var(--border-strong)", opacity: 0.3 }} />
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", top: "15%", left: "10%", width: "120px", height: "80px", background: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "0 10px 20px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}
    >
      👤
    </motion.div>
    <motion.div
      animate={{ y: [5, -5, 5] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      style={{ position: "absolute", bottom: "20%", right: "10%", padding: "0.75rem 1.25rem", background: "#F3F0FF", color: "#5B21B6", borderRadius: "50px", fontWeight: 600, fontSize: "0.75rem", boxShadow: "0 5px 15px rgba(124,58,237,0.15)", border: "1px solid #DDD6FE" }}
    >
      ✨ Expresson: Confident
    </motion.div>
    <div style={{ position: "relative", width: "140px", height: "140px", zIndex: 10 }}>
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", inset: "-20px", borderRadius: "50%", border: "2px solid #A78BFA" }}
      />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #4C1D95)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", boxShadow: "0 0 40px rgba(124, 58, 237, 0.4)" }}>
        🎙️
      </div>
    </div>
  </div>
);

export const SpotfixGraphic = () => (
  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "350px", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div style={{ position: "absolute", inset: "10%", backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "30px 30px", opacity: 0.3, borderRadius: "20px" }} />
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", top: "20%", right: "15%", padding: "0.6rem 1rem", background: "#ECFDF5", color: "#065F46", borderRadius: "8px", fontWeight: 600, fontSize: "0.75rem", boxShadow: "0 5px 15px rgba(5,150,105,0.1)", border: "1px solid #A7F3D0" }}
    >
      GPS: 22.7°N, 75.8°E
    </motion.div>
    <motion.div
      animate={{ y: [5, -5, 5] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      style={{ position: "absolute", bottom: "15%", left: "15%", width: "100px", height: "70px", background: "var(--bg-surface)", borderRadius: "12px", border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}
    >
      📸
    </motion.div>
    <div style={{ position: "relative", width: "130px", height: "130px", zIndex: 10 }}>
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", inset: "-10px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)" }}
      />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(135deg, #059669, #064E3B)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", boxShadow: "0 0 40px rgba(5, 150, 105, 0.4)" }}>
        📍
      </div>
    </div>
  </div>
);

export const FindMateGraphic = () => (
  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "350px", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.2 }} viewBox="0 0 100 100" preserveAspectRatio="none">
      <line x1="20" y1="20" x2="50" y2="50" stroke="var(--text-primary)" strokeWidth="0.5" strokeDasharray="2,2" />
      <line x1="80" y1="30" x2="50" y2="50" stroke="var(--text-primary)" strokeWidth="0.5" strokeDasharray="2,2" />
      <line x1="30" y1="80" x2="50" y2="50" stroke="var(--text-primary)" strokeWidth="0.5" strokeDasharray="2,2" />
    </svg>
    <motion.div animate={{ scale: [0.9, 1.1, 0.9] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: "15%", left: "15%", width: "50px", height: "50px", borderRadius: "50%", background: "var(--bg-secondary)", border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🧑‍💻</motion.div>
    <motion.div animate={{ scale: [0.9, 1.1, 0.9] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} style={{ position: "absolute", top: "20%", right: "15%", width: "45px", height: "45px", borderRadius: "50%", background: "var(--bg-secondary)", border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>👩‍🎨</motion.div>
    <motion.div animate={{ scale: [0.9, 1.1, 0.9] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} style={{ position: "absolute", bottom: "15%", left: "25%", width: "40px", height: "40px", borderRadius: "50%", background: "var(--bg-secondary)", border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>👨‍💼</motion.div>
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", bottom: "25%", right: "15%", padding: "0.5rem 1rem", background: "#FDF2F8", color: "#BE185D", borderRadius: "50px", fontWeight: 700, fontSize: "0.85rem", boxShadow: "0 5px 15px rgba(236,72,153,0.15)", border: "1px solid #FBCFE8", zIndex: 20 }}
    >
      🔥 98% Match
    </motion.div>
    <div style={{ position: "relative", width: "130px", height: "130px", zIndex: 10 }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        style={{ position: "absolute", inset: "-15px", borderRadius: "30%", border: "1px solid rgba(236, 72, 153, 0.4)" }}
      />
      <div style={{ position: "absolute", inset: 0, borderRadius: "24px", background: "linear-gradient(135deg, #EC4899, #831843)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", transform: "rotate(45deg)", boxShadow: "0 0 40px rgba(236, 72, 153, 0.4)" }}>
        <div style={{ transform: "rotate(-45deg)" }}>🤝</div>
      </div>
    </div>
  </div>
);

export const BloodBankGraphic = () => (
  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "350px", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.2 }} viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M 0 50 Q 25 20, 50 50 T 100 50" fill="none" stroke="var(--text-primary)" strokeWidth="0.5" strokeDasharray="2,2" />
    </svg>
    <motion.div animate={{ scale: [0.9, 1.1, 0.9] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: "20%", left: "20%", width: "50px", height: "50px", borderRadius: "50%", background: "var(--bg-secondary)", border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>🩸</motion.div>
    <motion.div animate={{ scale: [0.9, 1.1, 0.9] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} style={{ position: "absolute", bottom: "20%", right: "20%", width: "45px", height: "45px", borderRadius: "50%", background: "var(--bg-secondary)", border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🏥</motion.div>
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", top: "15%", right: "15%", padding: "0.5rem 1rem", background: "#FEF2F2", color: "#B91C1C", borderRadius: "50px", fontWeight: 700, fontSize: "0.85rem", boxShadow: "0 5px 15px rgba(220,38,38,0.15)", border: "1px solid #FECACA", zIndex: 20 }}
    >
      ❤️ Urgent Need
    </motion.div>
    <div style={{ position: "relative", width: "130px", height: "130px", zIndex: 10 }}>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        style={{ position: "absolute", inset: "-15px", borderRadius: "50%", border: "2px solid rgba(220, 38, 38, 0.4)" }}
      />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(135deg, #EF4444, #7F1D1D)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", boxShadow: "0 0 40px rgba(220, 38, 38, 0.4)" }}>
        <div>❤️</div>
      </div>
    </div>
  </div>
);

export const PROJECTS = [
  {
    num: "01",
    name: "InterviewAI",
    category: "AI / Full-Stack",
    desc: "An AI-powered mock interview platform that simulates technical interviews using live video, real-time communication, and intelligent performance analysis to help candidates prepare more effectively.",
    tech: ["React.js", "Node.js", "MongoDB", "Gemini API", "WebRTC", "Socket.io"],
    link: "#",
    graphic: <InterviewAIGraphic />,
    accent: "rgba(124, 58, 237, 0.15)"
  },
  {
    num: "02",
    name: "Spotfix",
    category: "PWA / AI",
    desc: "A civic issue reporting platform that enables citizens to report problems using AI-assisted image and voice analysis, GPS location, and real-time complaint tracking.",
    tech: ["React.js", "Node.js", "MongoDB", "GPS API", "PWA"],
    link: "#",
    graphic: <SpotfixGraphic />,
    accent: "rgba(16, 185, 129, 0.12)"
  },
  {
    num: "03",
    name: "FindMate",
    category: "AI / Platform",
    desc: "An AI-powered hackathon teammate recommendation platform that forms balanced teams through intelligent skill analysis, role matching, and compatibility scoring.",
    tech: ["React.js", "FastAPI", "MongoDB", "Python", "AI"],
    link: "#",
    graphic: <FindMateGraphic />,
    accent: "rgba(236, 72, 153, 0.12)"
  },
  {
    num: "04",
    name: "RAKT SETU",
    category: "Java Web App",
    desc: "A web-based Blood Bank Management System developed to simplify blood donor registration, blood search, and donor management, featuring a modern glassmorphism UI.",
    tech: ["Java", "JSP", "MySQL", "HTML/CSS", "Tomcat"],
    link: "#",
    graphic: <BloodBankGraphic />,
    accent: "rgba(220, 38, 38, 0.12)"
  }
];

const Linkedin = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Github = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export const SOCIAL_LINKS = [
  { label: "Email", icon: <Mail size={22} strokeWidth={1.5} />, href: "https://mail.google.com/mail/?view=cm&fs=1&to=workforsourabhme@gmail.com" },
  { label: "LinkedIn", icon: <Linkedin size={22} />, href: "https://linkedin.com/in/enggsourabhmeena2027" },
  { label: "GitHub", icon: <Github size={22} />, href: "https://github.com/EnggSourabh" },
  { label: "LeetCode", icon: <Code size={22} strokeWidth={1.5} />, href: "https://leetcode.com/Sourabhme" },
];

export const TECH_ICONS = {
  "React.js": <Atom size={20} strokeWidth={1.5} />,
  "Node.js": <Server size={20} strokeWidth={1.5} />,
  "MongoDB": <Database size={20} strokeWidth={1.5} />,
  "Gemini API": <Sparkles size={20} strokeWidth={1.5} />,
  "WebRTC": <Video size={20} strokeWidth={1.5} />,
  "Socket.io": <Zap size={20} strokeWidth={1.5} />,
  "GPS API": <MapPin size={20} strokeWidth={1.5} />,
  "PWA": <Smartphone size={20} strokeWidth={1.5} />,
  "FastAPI": <Rocket size={20} strokeWidth={1.5} />,
  "Python": <FileCode2 size={20} strokeWidth={1.5} />,
  "AI": <Brain size={20} strokeWidth={1.5} />,
  "Java": <Coffee size={20} strokeWidth={1.5} />,
  "JSP": <Layout size={20} strokeWidth={1.5} />,
  "MySQL": <Database size={20} strokeWidth={1.5} />,
  "HTML/CSS": <Paintbrush size={20} strokeWidth={1.5} />,
  "Tomcat": <Server size={20} strokeWidth={1.5} />
};
