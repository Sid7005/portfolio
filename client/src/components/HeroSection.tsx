import { motion } from "framer-motion";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { Download, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import heroPhoto from "../../assets/images/ImportedPhoto.760428188.70688.jpeg";
import resume from "../../assets/doc/Sid-Resume.pdf";

const DEFAULT_ROLES = [
  "React & Next.js Expert",
  "Full-Stack Web Developer",
  "Node.js Engineer",
  "TypeScript Enthusiast",
];

const DEFAULT_STATS = [
  { value: "4+", label: "Years Exp" },
  { value: "10+", label: "Projects" },
  { value: "2", label: "Companies" },
];

const TECH_BADGES = [
  { label: "TypeScript", top: "8%", right: "-6%", delay: 0 },
  { label: "React.js", top: "38%", right: "-10%", delay: 0.5 },
  { label: "Next.js", bottom: "28%", right: "-8%", delay: 1 },
  { label: "Node.js", bottom: "10%", left: "-4%", delay: 0.8 },
];

type Props = { content?: any };

const HeroSection = ({ content }: Props) => {
  const scrollToSection = useScrollToSection();
  const hero = content?.hero;

  const name = hero?.shortName ?? "Siddharajsinh";
  const bio = hero?.bio ?? "4+ years crafting scalable, high-performance web applications with React, TypeScript, and Node.js. I turn complex problems into clean, elegant solutions.";
  const roles: string[] = hero?.roles ?? DEFAULT_ROLES;
  const stats: { value: string; label: string }[] = hero?.stats ?? DEFAULT_STATS;
  const linkedinUrl = hero?.linkedinUrl ?? "https://www.linkedin.com/in/siddharajsinh-chauhan-410741199";
  const githubUrl = hero?.githubUrl ?? "https://github.com/";
  const email = hero?.email ?? "siddharajkc294000@gmail.com";
  const heroImage = hero?.heroImage || heroPhoto;

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = roles[roleIndex] ?? "";
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 58);
      } else {
        timeout = setTimeout(() => setTyping(false), 2400);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex, roles]);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
  };
  const item = {
    hidden: { y: 28, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center py-24 overflow-hidden grid-bg">
      {/* Background ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-right — cyan orb */}
        <motion.div
          className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Bottom-left — violet orb */}
        <motion.div
          className="absolute -bottom-60 -left-20 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%)" }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Center accent */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Diagonal grid accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.025]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(139,92,246,1) 0px, rgba(139,92,246,1) 1px, transparent 1px, transparent 44px)" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">

          {/* LEFT — Text content */}
          <motion.div
            className="lg:w-[55%] text-center lg:text-left"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Status pill */}
            <motion.div variants={item} className="inline-flex items-center gap-2 font-mono text-sm mb-6 px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(34,211,238,0.07)",
                border: "1px solid rgba(34,211,238,0.2)",
                color: "#67e8f9",
              }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {hero?.greeting ?? "Available for opportunities"}
            </motion.div>

            <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem] font-black mb-4 leading-[1.1] tracking-tight font-space">
              Hi, I'm{" "}
              <span className="gradient-text">{name}</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={item} className="text-xl sm:text-2xl mb-6 h-9 font-mono flex items-center gap-0 justify-center lg:justify-start">
              <span style={{ color: "#a78bfa", fontWeight: 600 }}>{displayed}</span>
              <span className="w-0.5 h-6 ml-0.5 rounded-full animate-pulse" style={{ background: "#a78bfa", display: "inline-block" }} />
            </motion.div>

            <motion.p variants={item} className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              {bio}
            </motion.p>

            {/* Tech stack mini pills */}
            <motion.div variants={item} className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              {["React.js", "Next.js", "TypeScript", "Node.js", "PostgreSQL"].map((tech) => (
                <span key={tech} className="text-xs font-mono px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(139,92,246,0.22)",
                    color: "#c4b5fd",
                  }}>
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <button
                onClick={() => scrollToSection("#projects")}
                className="flex items-center gap-2 px-7 py-3 rounded-full gradient-bg text-white font-bold text-sm transition-all duration-300 hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
                style={{ boxShadow: "0 4px 24px rgba(99,102,241,0.35)" }}
              >
                View My Work <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Download className="w-4 h-4" /> Download CV
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={item} className="flex gap-3 justify-center lg:justify-start mb-10">
              {[
                { href: linkedinUrl, icon: Linkedin, label: "LinkedIn" },
                { href: githubUrl, icon: Github, label: "GitHub" },
                { href: `mailto:${email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer" aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.5)"; (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.15)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.2)"; (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.08)"; }}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="flex gap-8 justify-center lg:justify-start pt-8"
              style={{ borderTop: "1px solid rgba(139,92,246,0.12)" }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-black gradient-text font-space">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 font-mono">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Photo with decorations */}
          <motion.div
            className="lg:w-[45%] flex justify-center items-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative flex items-center justify-center" style={{ isolation: "isolate" }}>

              {/* Background glow blob */}
              <div className="absolute rounded-full pointer-events-none"
                style={{
                  width: "130%", height: "130%",
                  top: "-15%", left: "-15%",
                  background: "radial-gradient(ellipse, rgba(139,92,246,0.22) 0%, rgba(34,211,238,0.12) 45%, transparent 70%)",
                }} />

              {/* Orbital ring 1 — violet */}
              <div className="absolute rounded-full pointer-events-none"
                style={{
                  width: "118%", height: "118%",
                  top: "-9%", left: "-9%",
                  border: "1px solid rgba(139,92,246,0.2)",
                  animation: "spin-slow 18s linear infinite",
                }} />
              {/* Orbital ring 2 — cyan */}
              <div className="absolute rounded-full pointer-events-none"
                style={{
                  width: "140%", height: "140%",
                  top: "-20%", left: "-20%",
                  border: "1px dashed rgba(34,211,238,0.1)",
                  animation: "spin-slow 30s linear infinite reverse",
                }} />

              {/* Photo — circular gradient border frame */}
              <div className="relative z-10"
                style={{
                  background: "linear-gradient(135deg, rgba(34,211,238,0.75), rgba(139,92,246,0.75))",
                  padding: "3px",
                  borderRadius: "50%",
                  boxShadow: "0 0 70px rgba(139,92,246,0.35), 0 0 35px rgba(34,211,238,0.18)",
                }}>
                <div style={{ borderRadius: "50%", overflow: "hidden" }}>
                  <img
                    src={heroImage}
                    alt="Siddharajsinh Chauhan"
                    className="block select-none"
                    style={{
                      width: "clamp(220px, 26vw, 340px)",
                      height: "clamp(220px, 26vw, 340px)",
                      objectFit: "cover",
                      objectPosition: "top center",
                      display: "block",
                    }}
                  />
                </div>
              </div>

              {/* Floating tech badges */}
              {TECH_BADGES.map(({ label, delay, ...pos }) => (
                <motion.span
                  key={label}
                  className="absolute z-20 text-xs font-mono font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    ...pos,
                    background: "rgba(10,15,35,0.88)",
                    border: "1px solid rgba(139,92,246,0.45)",
                    backdropFilter: "blur(12px)",
                    color: "#c4b5fd",
                    boxShadow: "0 0 14px rgba(139,92,246,0.2)",
                  }}
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 2.8 + delay * 0.4, repeat: Infinity, ease: "easeInOut", delay }}
                >
                  {label}
                </motion.span>
              ))}

              {/* Open to work badge */}
              <motion.div
                className="absolute bottom-4 -right-6 z-20 flex items-center gap-2 px-3.5 py-2 rounded-2xl"
                style={{
                  background: "rgba(10,15,35,0.92)",
                  border: "1px solid rgba(34,211,238,0.35)",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 0 20px rgba(34,211,238,0.15)",
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="gradient-text text-sm font-semibold font-space">Open to Work</span>
              </motion.div>

              {/* React atom badge */}
              <motion.div
                className="absolute top-4 -left-5 w-10 h-10 rounded-full z-20 flex items-center justify-center text-base"
                style={{
                  background: "rgba(34,211,238,0.1)",
                  border: "1px solid rgba(34,211,238,0.45)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 0 18px rgba(34,211,238,0.35)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                ⚛
              </motion.div>

              {/* Terminal code snippet */}
              <motion.div
                className="absolute -bottom-4 -left-8 z-20 hidden xl:block"
                style={{
                  background: "rgba(10,15,35,0.94)",
                  border: "1px solid rgba(99,102,241,0.22)",
                  borderRadius: "12px",
                  padding: "12px 14px",
                  backdropFilter: "blur(16px)",
                  minWidth: "170px",
                  boxShadow: "0 8px 32px rgba(99,102,241,0.15)",
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="flex gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400/60" />
                </div>
                <div className="font-mono text-[10px] space-y-0.5 leading-relaxed">
                  <div className="text-muted-foreground/50">const dev = {"{"}</div>
                  <div className="pl-3"><span className="text-violet-400">stack</span>: <span className="text-cyan-300">"full-stack"</span>,</div>
                  <div className="pl-3"><span className="text-violet-400">passion</span>: <span className="text-emerald-400">true</span></div>
                  <div className="text-muted-foreground/50">{"}"}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ opacity: [0.4, 1, 0.4], y: [0, 5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid rgba(139,92,246,0.4)" }}>
          <div className="w-1 h-2 rounded-full" style={{ background: "#a78bfa" }} />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
