import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import avatarImage from "./assets/avatar.png";
import bgImage from "./assets/1.png";
import InteractiveBackground from "./components/InteractiveBackground";

// ─── FONT LOADER ─────────────────────────────────────────────────────────────
function useFontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
}

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
const globalStyles = `
  :root {
    --bg-primary: #F8F8F6;
    --bg-secondary: #F1F0EE;
    --bg-surface: #FFFFFF;
    
    --text-primary: #111118;
    --text-secondary: #64646C;
    --text-muted: #9A9AA4;
    --text-inverse: #F8F8F6;
    
    --accent: #7C3AED;
    --accent-hover: #6D28D9;
    --accent-dark: #5B21B6;
    --accent-light: #A78BFA;
    --accent-glow: rgba(124, 58, 237, 0.10);
    --accent-glow-strong: rgba(124, 58, 237, 0.20);
    
    --border: #E4E4E0;
    --border-strong: #CCCCC8;
    --border-accent: rgba(124, 58, 237, 0.30);
    
    --shadow-sm: 0 1px 3px rgba(17,17,24,0.06), 0 1px 2px rgba(17,17,24,0.04);
    --shadow-md: 0 4px 16px rgba(17,17,24,0.08), 0 2px 6px rgba(17,17,24,0.04);
    --shadow-card-hover: 0 8px 32px rgba(17,17,24,0.10), 0 0 0 1px rgba(124,58,237,0.12);
    --shadow-violet: 0 0 0 1px rgba(124,58,237,0.25), 0 4px 20px rgba(124,58,237,0.15);
    
    --gradient-hero: radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.07) 0%, transparent 65%);
    --gradient-accent: linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%);
    --gradient-dark: linear-gradient(135deg, #111118 0%, #1E1E28 100%);
    --nav-bg: rgba(255, 255, 255, 0.05);
    --nav-border: rgba(255, 255, 255, 0.3);
    --nav-backdrop: blur(40px) saturate(200%);
    
    --footer-bg: #111118;
    --footer-surface: #1A1A24;
    --footer-border: #2A2A38;
    --footer-text: #9A9AA4;
    --footer-accent: #A78BFA;

    --success-bg: #D1FAE5;
    --success: #059669;
    --warning-bg: #FEF3C7;
    --warning: #D97706;
    --error-bg: #FEE2E2;
    --error: #DC2626;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  html, body, #root { background: transparent; font-family: 'Kanit', sans-serif; color: var(--text-primary); }
  
  *:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .hero-heading {
    background: var(--gradient-dark);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .accent-gradient {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg-primary); }
  ::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 3px; }

  .project-card {
    transition: border-color 0.2s ease, box-shadow 0.25s ease, background 0.2s ease;
  }
  .project-card:hover {
    border-color: var(--border-accent) !important;
    box-shadow: var(--shadow-card-hover) !important;
    background: var(--bg-surface) linear-gradient(0deg, rgba(124,58,237,0.02), rgba(124,58,237,0.02)) !important;
  }

  .contact-btn {
    background: var(--accent);
    color: #FFFFFF;
    border-radius: 8px;
    border: none;
    transition: background 0.2s ease, box-shadow 0.2s ease;
  }
  .contact-btn:hover {
    background: var(--accent-hover);
    box-shadow: var(--shadow-violet);
  }
  
  .nav-link {
    color: var(--text-secondary);
    transition: color 0.2s ease;
  }
  .nav-link:hover, .nav-link:active {
    color: var(--accent);
  }

  /* ─── APPLE DOCK HOVER ANIMATION ─── */
  .skill-pill {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-origin: center;
    position: relative;
    z-index: 1;
    will-change: transform, margin;
  }
  .skill-pill:hover {
    transform: scale(1.4);
    margin: 0 0.8rem;
    z-index: 10;
  }
  .skill-pill:has(+ .skill-pill:hover) {
    transform: scale(0.85);
    opacity: 0.7;
  }
  .skill-pill:hover + .skill-pill {
    transform: scale(0.85);
    opacity: 0.7;
  }

  /* ─── VERTICAL TEXT ROLL ANIMATION ─── */
  .nav-roll-link {
    position: relative;
    display: inline-flex;
    overflow: hidden;
    height: 1.1em;
    text-decoration: none;
    align-items: center;
  }

  .nav-roll-placeholder {
    opacity: 0;
    pointer-events: none;
    white-space: nowrap;
    line-height: 1;
  }

  .nav-roll-text,
  .nav-roll-duplicate {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    line-height: 1;
    transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .nav-roll-text {
    transform: translateY(0%);
  }

  .nav-roll-duplicate {
    transform: translateY(100%);
  }

  .nav-roll-link:hover .nav-roll-text {
    transform: translateY(-100%);
  }

  .nav-roll-link:hover .nav-roll-duplicate {
    transform: translateY(0%);
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-roll-text,
    .nav-roll-duplicate {
      transition: none !important;
    }
    .nav-roll-link:hover .nav-roll-text {
      transform: translateY(0%);
    }
    .nav-roll-link:hover .nav-roll-duplicate {
      transform: translateY(100%);
    }
  }

  /* ─── HERO CHARACTER HOVER EFFECT (APPLE MAC-OS DOCK) ─── */
  .hero-char {
    display: inline-block;
    transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1);
    transform-origin: bottom center;
    position: relative;
    z-index: 1;
    will-change: transform, text-shadow;
    
    /* Inherit the gradient clip correctly */
    background: var(--gradient-dark);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .hero-heading:hover .hero-char {
    opacity: 0.4;
  }

  .hero-heading .hero-char:hover {
    opacity: 1;
    text-shadow: 0 10px 30px rgba(124, 58, 237, 0.3), 0 0 15px rgba(167, 139, 250, 0.4);
    transform: scale(1.08) translateY(-4%);
    -webkit-text-fill-color: var(--accent);
    z-index: 10;
    cursor: default;
  }

  /* MacOS Dock style sibling magnification (1 letter away) */
  .hero-heading .hero-char:has(+ .hero-char:hover),
  .hero-heading .hero-char:hover + .hero-char {
    opacity: 0.8;
    transform: scale(1.03) translateY(-2%);
    -webkit-text-fill-color: var(--text-primary);
    z-index: 5;
  }
  
  /* MacOS Dock style sibling magnification (2 letters away) */
  .hero-heading .hero-char:has(+ .hero-char + .hero-char:hover),
  .hero-heading .hero-char:hover + .hero-char + .hero-char {
    opacity: 0.6;
    transform: scale(1.01) translateY(-0.5%);
    -webkit-text-fill-color: var(--text-primary);
    z-index: 2;
  }
`;

// ─── FADEIN COMPONENT (NOW JUMP IN) ──────────────────────────────────────────
function FadeIn({ children, delay = 0, x = 0, y = 30, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, scale: 0.95, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── PARALLAX BACKGROUND ───────────────────────────────────────────────────
function ParallaxBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Create highly noticeable parallax mapping scrollYProgress (0 to 1) to massive translations
  const yFastUp = useTransform(scrollYProgress, [0, 1], [600, -600]);
  const ySlowUp = useTransform(scrollYProgress, [0, 1], [300, -300]);
  const ySlowDown = useTransform(scrollYProgress, [0, 1], [-400, 400]);
  const rotateClockwise = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const rotateCounter = useTransform(scrollYProgress, [0, 1], [0, -360]);

  return (
    <div ref={ref} style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {/* Large faint wireframe circle NOW WITH AVATAR IMAGE */}
      <motion.div
        style={{
          position: "absolute",
          top: "5%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          maxWidth: 600,
          maxHeight: 600,
          borderRadius: "50%",
          border: "4px solid rgba(124, 58, 237, 0.4)", // Much thicker and brighter
          boxShadow: "0 0 50px rgba(124, 58, 237, 0.15)",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.8, // Slightly transparent so it blends with the background
          y: yFastUp,
        }}
      />

      {/* Rotating dashed square */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "5%",
          width: 250,
          height: 250,
          border: "6px dashed rgba(167, 139, 250, 0.5)", // Much thicker and brighter
          borderRadius: "10%",
          rotate: rotateClockwise,
          y: ySlowDown,
        }}
      />

      {/* Small floating cross/plus */}
      <motion.div
        style={{
          position: "absolute",
          top: "20%",
          right: "20%",
          color: "rgba(124, 58, 237, 0.6)",
          fontSize: "8rem", // Much larger
          fontWeight: 300,
          lineHeight: 1,
          rotate: rotateCounter,
          y: ySlowUp,
        }}
      >
        +
      </motion.div>

      {/* Solid accent dot */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "25%",
          width: 40, // Larger
          height: 40,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(167, 139, 250, 0.8), rgba(124, 58, 237, 0.8))",
          boxShadow: "0 0 40px rgba(124, 58, 237, 0.6)",
          y: yFastUp,
        }}
      />
    </div>
  );
}

// ─── SKILL PILL COMPONENT ────────────────────────────────────────────────────────
function Magnet({ children, padding = 100, strength = 3 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const inRange = Math.abs(dx) < rect.width / 2 + padding && Math.abs(dy) < rect.height / 2 + padding;
      if (inRange) {
        setActive(true);
        setPos({ x: dx / strength, y: dy / strength });
      } else {
        setActive(false);
        setPos({ x: 0, y: 0 });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: active ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out",
        willChange: "transform",
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
}

// ─── CONTACT BUTTON ──────────────────────────────────────────────────────────
function ContactButton() {
  return (
    <button
      className="contact-btn"
      style={{
        cursor: "pointer",
        fontFamily: "inherit",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        padding: "0.75rem 2.5rem",
        fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
      }}
    >
      Contact Me
    </button>
  );
}

// ─── ANIMATED CHAR TEXT ──────────────────────────────────────────────────────
function AnimatedText({ text, style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });

  return (
    <p ref={ref} style={{ position: "relative", ...style }}>
      {text.split("").map((char, i) => {
        const start = i / text.length;
        const end = (i + 1) / text.length;
        return (
          <motion.span
            key={i}
            style={{
              opacity: useTransform(scrollYProgress, [start, end], [0.15, 1]),
              display: "inline-block",
              whiteSpace: char === " " ? "pre" : "normal",
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </p>
  );
}

// ─── SKILLS MARQUEE ──────────────────────────────────────────────────────────
const SKILLS_ROW1 = ["React.js", "Node.js", "TypeScript", "MongoDB", "Java", "DSA", "REST APIs", "Tailwind CSS", "Express.js", "Figma", "WebRTC"];
const SKILLS_ROW2 = ["Socket.io", "MySQL", "Python", "FastAPI", "C++", "Git & GitHub", "Gemini API", "Postman", "Vercel", "UI/UX Design"];

const CORE_TECH = ["React.js", "Node.js", "TypeScript", "GSAP", "Tailwind CSS", "MongoDB", "Express.js", "FastAPI", "Java"];

function SkillPill({ label }) {
  const isCore = CORE_TECH.includes(label);

  return (
    <div
      className="skill-pill"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        background: isCore ? "#F3F0FF" : "#F4F4F2",
        border: isCore ? "0.5px solid #DDD6FE" : "0.5px solid #E4E4E0",
        borderRadius: "9999px",
        padding: "0.5rem 1.4rem",
        color: isCore ? "#5B21B6" : "#44444A",
        fontWeight: 400,
        fontSize: "clamp(0.75rem, 1.3vw, 1rem)",
        whiteSpace: "nowrap",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        boxShadow: isCore ? "0 0 20px rgba(124, 58, 237, 0.4), inset 0 0 10px rgba(124, 58, 237, 0.1)" : "0 0 15px rgba(255, 255, 255, 0.5)",
        cursor: "pointer",
      }}
    >
      {/* Decorative dot */}
      <span style={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: isCore ? "var(--accent)" : "var(--text-muted)",
        flexShrink: 0,
        boxShadow: isCore ? "0 0 10px var(--accent), 0 0 5px var(--accent-light)" : "none"
      }} />
      {label}
    </div>
  );
}

function SkillsMarquee() {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    let currentOffset = 0;
    let targetOffset = 0;
    let animationFrameId;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const onScroll = () => {
      // Using window.scrollY avoids forced layout thrashing caused by getBoundingClientRect
      targetOffset = window.scrollY * 0.4;
    };

    const update = () => {
      currentOffset = lerp(currentOffset, targetOffset, 0.08);

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translate3d(${currentOffset - 200}px, 0, 0)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translate3d(${-(currentOffset - 200)}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Initialize immediately to prevent jump on first scroll
    onScroll();
    currentOffset = targetOffset;
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const row1 = [...SKILLS_ROW1, ...SKILLS_ROW1, ...SKILLS_ROW1];
  const row2 = [...SKILLS_ROW2, ...SKILLS_ROW2, ...SKILLS_ROW2];

  return (
    <section
      ref={sectionRef}
      style={{
        background: "rgba(241, 240, 238, 0.4)",
        backdropFilter: "blur(4px) saturate(120%)",
        WebkitBackdropFilter: "blur(4px) saturate(120%)",
        padding: "6rem 0 2.5rem",
        overflow: "hidden"
      }}
    >
      <div ref={row1Ref} style={{ display: "flex", gap: "0.75rem", willChange: "transform", marginBottom: "0.75rem" }}>
        {row1.map((s, i) => <SkillPill key={i} label={s} />)}
      </div>
      <div ref={row2Ref} style={{ display: "flex", gap: "0.75rem", willChange: "transform" }}>
        {row2.map((s, i) => <SkillPill key={i} label={s} />)}
      </div>
    </section>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function NavBar() {
  return (
    <nav
      className="flex justify-center sm:justify-between flex-wrap gap-4 pt-6 px-4 sm:px-10"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(255, 255, 255, 0.45)", // Liquid milky glass
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.9)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
        borderRight: "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: "0 10px 40px rgba(124, 58, 237, 0.1), inset 0 2px 5px rgba(255, 255, 255, 1)",
        borderBottomLeftRadius: "30px",
        borderBottomRightRadius: "30px",
        margin: "0 1.5rem",
        paddingBottom: "1.5rem"
      }}
    >
      {["About", "Skills", "Projects", "Contact"].map((link) => (
        <a
          key={link}
          href={`#${link.toLowerCase()}`}
          className="nav-roll-link"
          style={{
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            fontSize: "clamp(0.75rem, 1.4vw, 1.4rem)",
            color: "var(--text-primary)",
            textShadow: "0 2px 10px rgba(255,255,255,0.8)"
          }}
        >
          {/* Invisible placeholder to define container width */}
          <span className="nav-roll-placeholder">{link}</span>

          {/* Default state text */}
          <span className="nav-roll-text">{link}</span>

          {/* Hover state duplicate text */}
          <span className="nav-roll-duplicate" style={{ color: "var(--accent)" }}>{link}</span>
        </a>
      ))}
    </nav>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="h-screen flex flex-col relative overflow-x-clip"
      style={{ background: "transparent", paddingTop: "5rem" }}
    >
      {/* Background glow behind avatar */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'var(--gradient-hero)', pointerEvents: 'none', zIndex: 0 }}></div>

      {/* Hero Heading */}
      <FadeIn delay={0.15} y={40} className="w-full flex-none text-center px-4 sm:px-0 mt-8 sm:mt-0 relative z-20">
        <h1
          className="hero-heading"
          style={{
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            fontSize: "clamp(4rem, 16vw, 300px)",
            marginTop: "clamp(-0.5rem, -1vw, -2rem)",
            textAlign: "center"
          }}
        >
          {"I'M SOURABH".split("").map((char, index) => (
            char === " "
              ? " "
              : <span key={index} className="hero-char">{char}</span>
          ))}
        </h1>
      </FadeIn>

      {/* Center avatar */}
      <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
        <FadeIn delay={0.6} y={30}>
          <div className="pointer-events-auto">
            <Magnet padding={150} strength={3}>
              <img
                src={avatarImage}
                alt="Sourabh Meena 3D Avatar"
                className="w-[200px] sm:w-[clamp(250px,32vw,480px)] h-auto object-contain drop-shadow-[0_20px_30px_rgba(17,17,24,0.1)]"
              />
            </Magnet>
          </div>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-end px-4 sm:px-10 pb-8 sm:pb-10 mt-auto relative z-20 gap-6 sm:gap-0">
        <div className="flex flex-col sm:items-start items-center gap-3">
          {["FULL-STACK DEV", "UI/UX DESIGNER", "DSA MENTOR"].map((role, i) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.5 + (i * 0.2)
              }}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0px 0px 0px rgba(124, 58, 237, 0)",
                    "0px 0px 20px rgba(124, 58, 237, 0.6)",
                    "0px 0px 0px rgba(124, 58, 237, 0)"
                  ],
                  borderColor: [
                    "var(--border)",
                    "var(--accent)",
                    "var(--border)"
                  ],
                  color: [
                    "var(--text-secondary)",
                    "var(--text-primary)",
                    "var(--text-secondary)"
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2 + (i * 0.3) // Cascade the glow effect after landing
                }}
                style={{
                  padding: "0.4rem 1.25rem",
                  borderRadius: "50px",
                  border: "1px solid var(--border)",
                  background: "var(--bg-surface)",
                  fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {role}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────
function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const tlX = useTransform(scrollYProgress, [0, 1], [-100, 200]);
  const tlY = useTransform(scrollYProgress, [0, 1], [-100, 200]);

  const trX = useTransform(scrollYProgress, [0, 1], [100, -200]);
  const trY = useTransform(scrollYProgress, [0, 1], [-100, 200]);

  const blX = useTransform(scrollYProgress, [0, 1], [-100, 200]);
  const blY = useTransform(scrollYProgress, [0, 1], [100, -200]);

  const brX = useTransform(scrollYProgress, [0, 1], [100, -200]);
  const brY = useTransform(scrollYProgress, [0, 1], [100, -200]);

  return (
    <section
      ref={ref}
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 2rem",
        position: "relative",
        overflow: "hidden",
        background: "rgba(241, 240, 238, 0.4)",
        backdropFilter: "blur(4px) saturate(120%)",
        WebkitBackdropFilter: "blur(4px) saturate(120%)",
      }}
    >
      <ParallaxBackground />

      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          style={{
            fontWeight: 900,
            color: "var(--text-primary)",
            textTransform: "uppercase",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            textAlign: "center",
            fontSize: "clamp(3rem, 12vw, 140px)",
            marginBottom: "2.5rem",
          }}
        >
          About me
        </h2>
      </FadeIn>

      {/* Animated paragraph */}
      <AnimatedText
        text="Third-year B.Tech IT student building production-grade full-stack applications with React, Node.js, and AI integration. I mentor 100+ students in DSA, lead developer communities, and ship real products that solve real problems. Let's build something powerful together!"
        style={{
          color: "var(--text-secondary)",
          fontWeight: 500,
          textAlign: "center",
          lineHeight: 1.7,
          maxWidth: "580px",
          fontSize: "clamp(1rem, 2vw, 1.3rem)",
          marginBottom: "4rem",
        }}
      />

      <FadeIn delay={0.4} y={20}>
        <ContactButton />
      </FadeIn>
    </section>
  );
}

// ─── SERVICES / SKILLS SECTION ───────────────────────────────────────────────
const SERVICES = [
  {
    num: "01",
    name: "Full-Stack Development",
    desc: "End-to-end web apps using React.js, Node.js, Express, and MongoDB — from REST APIs to real-time features with WebRTC and Socket.io.",
  },
  {
    num: "02",
    name: "UI/UX Design",
    desc: "Clean, conversion-focused interfaces in Figma — user flows, component systems, and pixel-perfect handoffs for seamless dev collaboration.",
  },
  {
    num: "03",
    name: "AI Integration",
    desc: "Embedding Gemini API, AI matching logic, and intelligent pipelines into web products for smart, context-aware user experiences.",
  },
  {
    num: "04",
    name: "DSA Mentorship",
    desc: "Structured coaching in Data Structures & Algorithms using Java — doubt sessions, competitive problem breakdowns, and placement prep.",
  },
  {
    num: "05",
    name: "Hackathon Strategy",
    desc: "Team formation, ideation, and rapid prototyping for hackathon environments — from concept to live demo under tight deadlines.",
  },
];

function ServiceItem({ s, i }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "center center"]
  });

  // Calculate interpolation between transparent gray and accent
  const numColor = useTransform(scrollYProgress, [0, 1], ["rgba(17,17,24, 0.05)", "var(--accent)"]);
  const numOpacity = useTransform(scrollYProgress, [0, 1], [0.05, 1]);

  return (
    <FadeIn delay={i * 0.1} y={30}>
      <div
        ref={ref}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "2rem",
          padding: "2.5rem 0",
          borderTop: i === 0 ? "1px solid var(--border)" : "none",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <motion.span
          style={{
            fontWeight: 900,
            color: numColor,
            fontSize: "clamp(2.5rem, 8vw, 110px)",
            lineHeight: 1,
            flexShrink: 0,
            opacity: numOpacity,
            width: "clamp(3rem, 9vw, 120px)",
          }}
        >
          {s.num}
        </motion.span>
        <div>
          <p
            style={{
              fontWeight: 500,
              textTransform: "uppercase",
              color: "var(--text-primary)",
              fontSize: "clamp(1rem, 2.2vw, 1.9rem)",
              marginBottom: "0.5rem",
            }}
          >
            {s.name}
          </p>
          <p
            style={{
              fontWeight: 300,
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
              maxWidth: "600px",
            }}
          >
            {s.desc}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

function ServicesSection() {
  return (
    <section
      id="skills"
      style={{
        background: "transparent",
        borderRadius: "50px 50px 0 0",
        padding: "5rem 2rem 6rem",
      }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          style={{
            fontWeight: 900,
            textTransform: "uppercase",
            color: "var(--text-primary)",
            textAlign: "center",
            fontSize: "clamp(3rem, 12vw, 140px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "4rem",
          }}
        >
          What I Do
        </h2>
      </FadeIn>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {SERVICES.map((s, i) => (
          <ServiceItem key={s.num} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}

// ─── PROJECTS SECTION ────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: "01",
    name: "InterviewAI",
    category: "AI / Full-Stack",
    desc: "Real-time mock interview platform with WebRTC video, Gemini AI expression analysis, and performance analytics dashboards.",
    tech: ["React.js", "Node.js", "MongoDB", "Gemini API", "WebRTC", "Socket.io"],
    link: "#",
  },
  {
    num: "02",
    name: "CivicConnect",
    category: "PWA / AI",
    desc: "Progressive Web App for civic issue reporting via photo/voice input with GPS tagging and real-time tracking dashboards.",
    tech: ["React.js", "Node.js", "MongoDB", "GPS API", "PWA"],
    link: "#",
  },
  {
    num: "03",
    name: "Hackathon Matcher",
    category: "AI / Platform",
    desc: "AI-powered teammate recommender using role-based matching and profile similarity scoring. Built smart team composition engine with FastAPI.",
    tech: ["React.js", "FastAPI", "MongoDB", "Python", "AI"],
    link: "#",
  },
];

function ProjectCard({ project, index, total, progress }) {
  const targetScale = 1 - (total - 1 - index) * 0.04; // Slightly less scale down
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <motion.div
      className="project-card"
      style={{
        scale,
        rotate: index % 2 === 0 ? -1.5 : 1.5,
        x: index % 2 === 0 ? -10 : 10,
        position: "sticky",
        top: `calc(10vh + ${index * 35}px)`,
        width: "100%",
        maxWidth: "1100px",
        height: "80vh",
        marginBottom: index === total - 1 ? "0" : "60vh", // Adds scroll space before the next card comes up
        marginInline: "auto", // Center horizontally
        borderRadius: "24px",
        border: "1px solid var(--border)",
        boxShadow: "0 -10px 30px rgba(0,0,0,0.05)",
        background: "var(--bg-surface)",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        willChange: "transform",
      }}
    >
      <div style={{ maxWidth: "800px", width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span style={{
          fontWeight: 900,
          fontSize: "12px",
          color: "var(--accent)",
          letterSpacing: "0.2em",
          marginBottom: "1.5rem",
          display: "block"
        }}>PROJECT {project.num} • {project.category}</span>

        <h3 style={{
          color: "var(--text-primary)",
          fontWeight: 700,
          textTransform: "uppercase",
          fontSize: "clamp(2rem, 6vw, 4rem)",
          letterSpacing: "-0.02em",
          marginBottom: "2rem",
          lineHeight: 1.1
        }}>{project.name}</h3>

        <p style={{
          color: "var(--text-secondary)",
          fontWeight: 300,
          lineHeight: 1.7,
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          maxWidth: "650px",
          marginBottom: "3rem",
        }}>
          {project.desc}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem", marginBottom: "3rem" }}>
          {project.tech.map((t) => (
            <span key={t} style={{
              background: "var(--accent-glow)",
              border: "1px solid var(--accent-light)",
              color: "var(--accent-dark)",
              borderRadius: "9999px",
              padding: "0.5rem 1.2rem",
              fontSize: "0.85rem",
              fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>

        <a
          href={project.link}
          style={{
            display: "inline-block",
            borderRadius: "50px",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            padding: "1rem 2.5rem",
            fontSize: "0.85rem",
            textDecoration: "none",
            background: "transparent",
            transition: "background 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "var(--bg-secondary)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          View Project
        </a>
      </div>
    </motion.div>
  );
}

function ProjectsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <section
      id="projects"
      ref={containerRef}
      style={{
        background: "rgba(241, 240, 238, 0.4)",
        backdropFilter: "blur(4px) saturate(120%)",
        WebkitBackdropFilter: "blur(4px) saturate(120%)",
        borderRadius: "50px 50px 0 0",
        marginTop: "-3rem",
        position: "relative",
        zIndex: 10,
        padding: "5rem 2rem 2rem",
      }}
    >
      <FadeIn delay={0} y={40} className="mb-16">
        <h2
          style={{
            fontWeight: 900,
            textTransform: "uppercase",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            textAlign: "center",
            fontSize: "clamp(3rem, 12vw, 140px)",
            marginBottom: "4rem"
          }}
        >
          Projects
        </h2>
      </FadeIn>

      {PROJECTS.map((p, i) => (
        <ProjectCard key={p.num} project={p} index={i} total={PROJECTS.length} progress={scrollYProgress} />
      ))}
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: "var(--footer-bg)",
        padding: "5rem 2.5rem 3rem",
        borderTop: "1px solid var(--footer-border)",
        textAlign: "center",
      }}
    >
      <FadeIn delay={0} y={30}>
        <h2
          className="hero-heading"
          style={{
            fontWeight: 900,
            textTransform: "uppercase",
            fontSize: "clamp(2.5rem, 10vw, 110px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
            background: "var(--text-inverse)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Let&apos;s Build
        </h2>
      </FadeIn>

      <FadeIn delay={0.2} y={20}>
        <p style={{
          color: "var(--footer-text)",
          fontWeight: 300,
          fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)",
          marginBottom: "2.5rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}>
          Open to internships, collaborations & hackathons
        </p>
      </FadeIn>

      <FadeIn delay={0.35} y={20}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {[
            { label: "Email", href: "mailto:workforsourabhme@gmail.com" },
            { label: "LinkedIn", href: "https://linkedin.com/in/enggsourabhmeena2027" },
            { label: "GitHub", href: "https://github.com/EnggSourabh" },
            { label: "LeetCode", href: "https://leetcode.com/Sourabhme" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                color: "var(--footer-accent)",
                textDecoration: "none",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: "0.85rem",
                opacity: 0.8,
                transition: "opacity 200ms, background 200ms",
                padding: "0.5rem 1.25rem",
                border: "1px solid var(--footer-border)",
                background: "var(--footer-surface)",
                borderRadius: "9999px",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = 1;
                e.currentTarget.style.background = "var(--border-accent)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = 0.8;
                e.currentTarget.style.background = "var(--footer-surface)";
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </FadeIn>

      <p style={{ color: "var(--footer-text)", opacity: 0.5, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
        © 2026 Sourabh Meena · IIST Indore
      </p>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  useFontLoader();

  return (
    <>
      <style>{globalStyles}</style>
      <InteractiveBackground />
      <NavBar />
      <div style={{ overflowX: "clip", background: "transparent" }}>
        <HeroSection />
        <SkillsMarquee />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <Footer />
      </div>
    </>
  );
}
