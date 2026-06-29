import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Printer,
  Share2,
  MapPin,
  Briefcase,
  ExternalLink,
  Search,
  Award
} from "lucide-react";
import {
  EXPERIENCE,
  EDUCATION,
  ACHIEVEMENTS,
  SKILL_GROUPS,
  PROJECTS,
  TECH_ICONS,
  CERTIFICATIONS
} from "../data";
import resumePdf from "../assets/resume.pdf";
import avatarImage from "../assets/avatar.png";

// ─── TOOLBAR BUTTON ─────────────────────────────────────────────
const ToolbarButton = ({ icon: Icon, label, onClick, href, className = "" }) => {
  const content = (
    <>
      <Icon size={18} strokeWidth={2} />
      <span className="toolbar-tooltip">{label}</span>
    </>
  );

  const style = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "var(--text-primary)",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" download={label === "Download PDF" ? "Sourabh_Meena_Resume.pdf" : undefined} style={style} className={`toolbar-btn ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} style={style} className={`toolbar-btn ${className}`}>
      {content}
    </button>
  );
};

// ─── NAV ITEM ───────────────────────────────────────────────────
const NavItem = ({ id, label, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    style={{
      display: "flex",
      alignItems: "center",
      width: "100%",
      padding: "0.75rem 1rem",
      background: active ? "var(--bg-surface)" : "transparent",
      border: "1px solid",
      borderColor: active ? "var(--border-strong)" : "transparent",
      borderRadius: "12px",
      color: active ? "var(--accent)" : "var(--text-secondary)",
      fontWeight: active ? 600 : 500,
      textAlign: "left",
      transition: "all 0.2s ease",
      boxShadow: active ? "0 4px 12px rgba(0,0,0,0.03)" : "none",
    }}
  >
    {label}
  </button>
);

// ─── TECH ICON MINI ──────────────────────────────────────────────
const TechIconMini = ({ label }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      background: "var(--bg-secondary)",
      padding: "0.3rem 0.8rem",
      borderRadius: "50px",
      border: "1px solid var(--border)",
      fontSize: "0.75rem",
      fontWeight: 600,
      color: "var(--text-primary)"
    }}>
      {TECH_ICONS[label] ? React.cloneElement(TECH_ICONS[label], { size: 14 }) : null}
      {label}
    </div>
  );
};

// ─── SECTIONS ────────────────────────────────────────────────────
const SectionHeader = ({ title }) => (
  <h2 style={{
    fontSize: "2rem",
    fontWeight: 800,
    color: "var(--text-primary)",
    letterSpacing: "-0.03em",
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem"
  }}>
    {title}
    <div style={{ flex: 1, height: "1px", background: "var(--border-strong)", opacity: 0.5 }} />
  </h2>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────
export default function InteractiveResume({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState("summary");
  const [searchQuery, setSearchQuery] = useState("");

  const containerRef = useRef(null);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const scrollToSection = (id) => {
    const el = document.getElementById(`resume-${id}`);
    if (el && containerRef.current) {
      containerRef.current.scrollTo({
        top: el.offsetTop - 100,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Sourabh Meena - Interactive Resume",
        url: window.location.href
      });
    } catch (e) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const highlightText = (text) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ?
        <span key={i} style={{ background: "var(--warning-bg)", color: "var(--warning)" }}>{part}</span> :
        part
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          background: "rgba(17, 17, 24, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(1rem, 2vw, 2rem)",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: "1400px",
            height: "100%",
            maxHeight: "95vh",
            background: "var(--bg-primary)",
            borderRadius: "24px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative"
          }}
        >
          {/* TOOLBAR */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.5rem",
            background: "var(--bg-surface)",
            borderBottom: "1px solid var(--border)",
            zIndex: 10
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "var(--gradient-accent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 700, fontSize: "0.9rem"
              }}>
                SM
              </div>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem" }}>Interactive Resume</h3>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="toolbar-actions">
              <div style={{
                display: "flex", alignItems: "center", background: "var(--bg-secondary)",
                borderRadius: "50px", padding: "0.4rem 1rem", border: "1px solid var(--border)",
                marginRight: "1rem"
              }} className="hide-on-mobile">
                <Search size={16} style={{ color: "var(--text-muted)", marginRight: "0.5rem" }} />
                <input
                  type="text"
                  placeholder="Search resume..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: "transparent", border: "none", outline: "none",
                    fontSize: "0.85rem", width: "150px"
                  }}
                />
              </div>

              <ToolbarButton icon={Download} label="Download PDF" href={resumePdf} />
              <ToolbarButton icon={Printer} label="Print" onClick={handlePrint} className="hide-on-mobile" />
              <ToolbarButton icon={Share2} label="Share" onClick={handleShare} className="hide-on-mobile" />
              <div style={{ width: "1px", height: "24px", background: "var(--border)", margin: "0 0.5rem" }} className="hide-on-mobile" />
              <ToolbarButton icon={X} label="Close (Esc)" onClick={onClose} />
            </div>
          </div>

          {/* MAIN CONTENT SPLIT */}
          <div style={{ display: "flex", flex: 1, overflow: "hidden", flexDirection: "row" }} className="resume-split">

            {/* SIDEBAR (30%) */}
            <div style={{
              width: "300px",
              background: "var(--bg-secondary)",
              borderRight: "1px solid var(--border)",
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              overflowY: "auto"
            }} className="resume-sidebar">

              {/* Hero Card */}
              <div style={{
                background: "var(--bg-surface)",
                padding: "1.5rem",
                borderRadius: "16px",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
                textAlign: "center"
              }}>
                <img
                  src={avatarImage}
                  alt="Sourabh Meena"
                  style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--gradient-accent)", padding: "2px", margin: "0 auto 1rem" }}
                />
                <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.25rem" }}>Sourabh Meena</h2>
                <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem", color: "var(--text-secondary)", fontSize: "0.8rem", marginBottom: "1rem" }}>
                  <MapPin size={14} /> Indore, India
                </p>
                <div style={{
                  background: "var(--success-bg)", color: "var(--success)",
                  fontSize: "0.7rem", fontWeight: 700, padding: "0.3rem 0.8rem",
                  borderRadius: "50px", display: "inline-block", textTransform: "uppercase"
                }}>
                  Available for Hire
                </div>
              </div>

              {/* Navigation */}
              <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <NavItem id="summary" label="Professional Summary" active={activeSection === "summary"} onClick={scrollToSection} />
                <NavItem id="skills" label="Technical Skills" active={activeSection === "skills"} onClick={scrollToSection} />
                <NavItem id="experience" label="Experience" active={activeSection === "experience"} onClick={scrollToSection} />
                <NavItem id="projects" label="Featured Projects" active={activeSection === "projects"} onClick={scrollToSection} />
                <NavItem id="education" label="Education" active={activeSection === "education"} onClick={scrollToSection} />
                <NavItem id="achievements" label="Achievements" active={activeSection === "achievements"} onClick={scrollToSection} />
                <NavItem id="certifications" label="Certifications" active={activeSection === "certifications"} onClick={scrollToSection} />
              </nav>

            </div>

            {/* CONTENT AREA (70%) */}
            <div ref={containerRef} style={{
              flex: 1,
              overflowY: "auto",
              padding: "clamp(2rem, 5vw, 4rem)",
              scrollBehavior: "smooth",
              position: "relative"
            }}>
              <div style={{ maxWidth: "800px", margin: "0 auto" }}>

                {/* SUMMARY */}
                <motion.section id="resume-summary" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "5rem" }}>
                  <SectionHeader title="Professional Summary" />
                  <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--text-secondary)", fontWeight: 400 }}>
                    {highlightText("Full-Stack Developer and Freelancer passionate about building scalable web applications, AI-powered products, and intuitive user experiences. I enjoy transforming ambitious ideas into production-ready software while collaborating with clients and teams worldwide.")}
                  </p>
                </motion.section>

                {/* SKILLS */}
                <motion.section id="resume-skills" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "5rem" }}>
                  <SectionHeader title="Technical Skills" />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
                    {SKILL_GROUPS.map((group, idx) => (
                      <div key={idx} style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "16px",
                        padding: "1.5rem",
                        boxShadow: "var(--shadow-sm)"
                      }}>
                        <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--accent)" }}>{group.title}</h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                          {group.skills.map(skill => (
                            <TechIconMini key={skill} label={skill} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* EXPERIENCE */}
                <motion.section id="resume-experience" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "5rem" }}>
                  <SectionHeader title="Experience" />
                  <div style={{ display: "flex", flexDirection: "column", gap: "2rem", position: "relative" }}>
                    <div style={{ position: "absolute", left: "11px", top: 0, bottom: 0, width: "2px", background: "var(--border)" }} />
                    {EXPERIENCE.map((exp, idx) => (
                      <div key={idx} style={{ position: "relative", paddingLeft: "3rem" }}>
                        <div style={{
                          position: "absolute", left: 0, top: "6px", width: "24px", height: "24px",
                          background: "var(--bg-surface)", border: "4px solid var(--accent)",
                          borderRadius: "50%", zIndex: 2
                        }} />
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{highlightText(exp.duration)}</span>
                        <h3 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "0.25rem 0", color: "var(--text-primary)" }}>{highlightText(exp.role)}</h3>
                        <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--accent)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Briefcase size={16} /> {highlightText(exp.org)}
                        </h4>
                        <p style={{ color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>{highlightText(exp.summary)}</p>
                        <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} style={{ marginBottom: "0.5rem" }}>{highlightText(resp)}</li>
                          ))}
                        </ul>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                          {exp.tech.map(t => <TechIconMini key={t} label={t} />)}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* PROJECTS */}
                <motion.section id="resume-projects" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "5rem" }}>
                  <SectionHeader title="Featured Projects" />
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {PROJECTS.map((proj, idx) => (
                      <a key={idx} href={proj.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        <div style={{
                          display: "flex",
                          flexDirection: "column",
                          background: "var(--bg-surface)",
                          border: "1px solid var(--border)",
                          borderRadius: "16px",
                          padding: "1.5rem",
                          transition: "all 0.2s ease",
                          cursor: "pointer",
                          boxShadow: "var(--shadow-sm)"
                        }} className="resume-project-card">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>{highlightText(proj.name)}</h3>
                            <ExternalLink size={18} style={{ color: "var(--text-muted)" }} />
                          </div>
                          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)", marginBottom: "1rem" }}>{highlightText(proj.category)}</span>
                          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", lineHeight: 1.6 }}>{highlightText(proj.desc)}</p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                            {proj.tech.map(t => <TechIconMini key={t} label={t} />)}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.section>

                {/* EDUCATION */}
                <motion.section id="resume-education" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "5rem" }}>
                  <SectionHeader title="Education" />
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "16px",
                      padding: "1.5rem",
                      boxShadow: "var(--shadow-sm)"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "0.5rem" }}>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>{highlightText(edu.degree)}</h3>
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em" }}>{highlightText(edu.duration)}</span>
                      </div>
                      <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--accent)", marginBottom: "1rem" }}>{highlightText(edu.institution)}</h4>
                      <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{highlightText(edu.details)}</p>
                    </div>
                  ))}
                </motion.section>

                {/* ACHIEVEMENTS */}
                <motion.section id="resume-achievements" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "5rem" }}>
                  <SectionHeader title="Achievements" />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
                    {ACHIEVEMENTS.map((ach, idx) => (
                      <motion.div key={idx} whileHover={{ y: -5 }} style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "16px",
                        padding: "2rem 1.5rem",
                        textAlign: "center",
                        boxShadow: "var(--shadow-sm)",
                        position: "relative",
                        overflow: "hidden"
                      }}>
                        <div style={{
                          position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
                          background: "radial-gradient(circle at top right, var(--accent) 0%, transparent 60%)",
                          opacity: 0.05, pointerEvents: "none"
                        }} />
                        <div style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "0.5rem", background: "linear-gradient(135deg, var(--text-primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                          {ach.value}
                        </div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {highlightText(ach.label)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* CERTIFICATIONS */}
                <motion.section id="resume-certifications" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "5rem" }}>
                  <SectionHeader title="Certifications" />
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {CERTIFICATIONS.map((cert, idx) => (
                      <div key={idx} style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "16px",
                        padding: "1.5rem",
                        boxShadow: "var(--shadow-sm)",
                        display: "flex",
                        gap: "1rem"
                      }}>
                        <div style={{
                          width: "48px", height: "48px", borderRadius: "12px",
                          background: "var(--gradient-accent)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "white", flexShrink: 0
                        }}>
                          <Award size={24} />
                        </div>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "0.25rem" }}>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>{highlightText(cert.name)}</h3>
                            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em" }}>{highlightText(cert.date)}</span>
                          </div>
                          <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--accent)", marginBottom: "1rem" }}>{highlightText(cert.issuer)}</h4>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                            {cert.skills.map(skill => (
                              <div key={skill} style={{
                                background: "var(--bg-secondary)",
                                padding: "0.2rem 0.6rem",
                                borderRadius: "50px",
                                border: "1px solid var(--border)",
                                fontSize: "0.7rem",
                                fontWeight: 600,
                                color: "var(--text-secondary)"
                              }}>
                                {highlightText(skill)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <style>{`
        .toolbar-btn:hover { background: rgba(255, 255, 255, 0.1) !important; transform: translateY(-2px); }
        .toolbar-tooltip { position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%) scale(0.9); opacity: 0; background: var(--text-primary); color: var(--bg-primary); padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; white-space: nowrap; transition: all 0.2s ease; pointer-events: none; }
        .toolbar-btn:hover .toolbar-tooltip { transform: translateX(-50%) scale(1); opacity: 1; }
        .resume-project-card:hover { border-color: var(--accent) !important; transform: translateY(-3px); }
        
        @media (max-width: 900px) {
          .resume-split { flex-direction: column !important; }
          .resume-sidebar { width: 100% !important; border-right: none !important; border-bottom: 1px solid var(--border); max-height: 35vh; }
          .hide-on-mobile { display: none !important; }
        }
        @media print {
          .resume-sidebar { display: none !important; }
          .hide-on-mobile { display: none !important; }
          #resume-summary, #resume-skills, #resume-experience, #resume-projects, #resume-education, #resume-achievements { page-break-inside: avoid; margin-bottom: 2rem !important; }
        }
      `}</style>
    </AnimatePresence>
  );
}
