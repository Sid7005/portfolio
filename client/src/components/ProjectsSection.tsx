import { useState } from "react";
import { SectionBg } from "./SectionBg";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, ArrowUpRight, Github, Globe, X, Target, Lightbulb, TrendingUp, Layers } from "lucide-react";
import { projects as defaultProjects } from "@/lib/constants";
import { ProjectCategory } from "@/lib/types";

const categories: ProjectCategory[] = ["All", "Web App", "Mobile", "API", "UI/UX"];

type CaseStudy = {
  challenge: string;
  approach:  string;
  outcome:   string;
  metrics?:  string[];
};

type ProjectItem = {
  id:           number;
  title:        string;
  category:     string;
  description:  string;
  image:        string;
  technologies: string[];
  demoLink:     string;
  demoLinkText: string;
  githubLink?:  string;
  caseStudy?:   CaseStudy;
};

/* ── Default case studies keyed by project title ─────────────── */
const DEFAULT_CASE_STUDIES: Record<string, CaseStudy> = {
  "By Best": {
    challenge: "Build a multi-vendor e-commerce platform that supports complex product variants, real-time inventory, and two payment gateways across both web and mobile clients.",
    approach:  "Designed a React + TypeScript frontend with a normalised Redux store for cart/auth state. Integrated Stripe and Authorize.net behind a single abstraction layer so either can be swapped without UI changes. Used lazy-loaded route splits to keep the main bundle under 120 kB.",
    outcome:   "Launched to 1,000+ daily active users with zero post-launch P1 incidents. Checkout conversion improved 18% vs the legacy system.",
    metrics:   ["18% higher checkout conversion", "120 kB initial bundle", "Zero P1 bugs post-launch"],
  },
  "FIT": {
    challenge: "Create a fitness-tracking PWA with offline-first data sync, complex form validation across multi-step workouts, and real-time progress charts.",
    approach:  "Built with Next.js + React Query for server-state caching, Zod schemas for end-to-end type-safe validation, and Recharts for animated progress dashboards. Service Worker handles offline queue with background sync.",
    outcome:   "4.8-star user rating, 40% week-1 retention, and full offline functionality — users can log workouts with no signal.",
    metrics:   ["4.8 ★ user rating", "40% week-1 retention", "100% offline capable"],
  },
};

/* ── 3-D tilt card ──────────────────────────────────────────── */
const TiltCard = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]),  { stiffness: 300, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]),  { stiffness: 300, damping: 28 });
  const glowX   = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY   = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <motion.div
      className={className}
      style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - r.left) / r.width  - 0.5);
        mouseY.set((e.clientY - r.top)  / r.height - 0.5);
      }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(124,58,237,0.1) 0%, transparent 55%)` }}
      />
      {children}
    </motion.div>
  );
};

/* ── Case Study Modal ────────────────────────────────────────── */
const CaseStudyModal = ({
  project,
  onClose,
}: {
  project: ProjectItem;
  onClose: () => void;
}) => {
  const cs = project.caseStudy ??
    DEFAULT_CASE_STUDIES[project.title] ?? {
      challenge: `The goal was to build ${project.title} — a ${project.category.toLowerCase()} delivering real, measurable value to end users.`,
      approach:  `Used ${project.technologies.slice(0, 4).join(", ")} as the core stack, with a focus on clean architecture, performance, and maintainability.`,
      outcome:   project.description,
    };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[9900] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ background: "rgba(7,7,26,0.85)", backdropFilter: "blur(12px)" }}
      >
        {/* Panel */}
        <motion.div
          className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl"
          style={{
            background:    "linear-gradient(145deg, rgba(15,12,38,0.98), rgba(7,7,26,0.99))",
            border:        "1px solid rgba(124,58,237,0.25)",
            boxShadow:     "0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.08)",
          }}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: 30, scale: 0.97  }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero image */}
          <div className="relative h-48 overflow-hidden rounded-t-3xl">
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(7,7,26,0.98) 100%)", zIndex: 2 }} />
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-full ${project.title === "By Best" ? "object-contain p-6 bg-white" : "object-cover"}`}
            />
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white transition"
              style={{ background: "rgba(7,7,26,0.8)", border: "1px solid rgba(255,255,255,0.1)", zIndex: 10 }}
            >
              <X className="w-4 h-4" />
            </button>
            {/* Badge */}
            <span
              className="absolute top-4 left-4 z-10 text-xs font-bold px-3 py-1.5 rounded-full text-white"
              style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", zIndex: 10 }}
            >
              Case Study
            </span>
          </div>

          {/* Content */}
          <div className="px-7 pb-8 pt-4 space-y-6">

            {/* Title + link */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-foreground font-space">{project.title}</h3>
                <span className="text-xs text-muted-foreground font-mono">{project.category}</span>
              </div>
              <motion.a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-semibold flex-shrink-0 mt-1"
                style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", boxShadow: "0 4px 16px rgba(124,58,237,0.4)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Globe className="w-3 h-3" /> View Live
              </motion.a>
            </div>

            {/* 3 pillars */}
            {[
              { icon: Target,     color: "#ec4899", label: "The Challenge", text: cs.challenge },
              { icon: Lightbulb,  color: "#7c3aed", label: "The Approach",  text: cs.approach  },
              { icon: TrendingUp, color: "#06b6d4", label: "The Outcome",   text: cs.outcome   },
            ].map(({ icon: Icon, color, label, text }) => (
              <div key={label} className="rounded-2xl p-5" style={{ background: `${color}0a`, border: `1px solid ${color}22` }}>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}20`, border: `1px solid ${color}35` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                  </div>
                  <span className="text-sm font-bold text-foreground">{label}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}

            {/* Metrics pills */}
            {cs.metrics && cs.metrics.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-3.5 h-3.5" style={{ color: "#a78bfa" }} />
                  <span className="text-xs font-bold text-foreground uppercase tracking-wide">Key Metrics</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cs.metrics.map((m) => (
                    <span
                      key={m}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", color: "#c4b5fd" }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tech stack */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-foreground uppercase tracking-wide">Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="badge-tech text-xs">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ── Regular project card ───────────────────────────────────── */
const ProjectCard = ({
  project,
  index,
  onCaseStudy,
}: {
  project:     ProjectItem;
  index:       number;
  onCaseStudy: (p: ProjectItem) => void;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.93 }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
  >
    <TiltCard
      className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full relative"
      style={{ perspective: 900 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 flex-shrink-0">
        <div
          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-350"
          style={{ background: "linear-gradient(to top, rgba(7,7,26,0.92) 0%, rgba(7,7,26,0.4) 55%, transparent 100%)" }}
        />
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
            project.title === "By Best" ? "object-contain p-4 bg-white" : "object-cover"
          }`}
        />
        <span className="absolute top-3 right-3 z-20 badge-tech text-xs">{project.category}</span>

        {/* Hover overlay — two buttons */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-2 pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <motion.a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-semibold"
            style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", boxShadow: "0 4px 20px rgba(124,58,237,0.55)" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3 h-3" /> Live
          </motion.a>
          <motion.button
            onClick={(e) => { e.stopPropagation(); onCaseStudy(project); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-semibold"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}
            whileHover={{ scale: 1.06, background: "rgba(255,255,255,0.16)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Lightbulb className="w-3 h-3" /> Case Study
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-foreground text-base font-space leading-snug">{project.title}</h3>
          <motion.a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            whileHover={{ scale: 1.2, color: "#fff", borderColor: "rgba(124,58,237,0.5)", background: "rgba(124,58,237,0.15)" }}
            aria-label={`Open ${project.title}`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.a>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-grow line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="badge-tech text-[11px]">{tech}</span>
          ))}
        </div>

        <button
          onClick={() => onCaseStudy(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold group/link w-fit"
          style={{ color: "#7c3aed" }}
        >
          <Lightbulb className="w-3 h-3" />
          View Case Study
          <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </button>
      </div>
    </TiltCard>
  </motion.div>
);

type Props = { content?: any };

const ProjectsSection = ({ content }: Props) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [visible,       setVisible]         = useState(6);
  const [caseStudyProject, setCaseStudyProject] = useState<ProjectItem | null>(null);

  const rawProjects: ProjectItem[] = content?.projects ?? defaultProjects;
  const filtered = rawProjects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );
  const gridProjects = filtered.slice(0, visible);

  return (
    <>
      <section
        id="projects"
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: "var(--section-bg)" }}
      >
        <SectionBg variant="projects" />
        <div className="absolute top-0 left-0 w-full h-px section-accent-line" />

        {/* Aurora accents */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(219,39,119,0.14) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-0 left-20 w-[400px] h-[400px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.14) 0%, transparent 70%)", filter: "blur(80px)" }}
        />

        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-mono text-sm mb-3" style={{ color: "#a78bfa" }}>// what I&apos;ve built</p>
            <h2 className="section-heading gradient-text-animated inline-block">Projects</h2>
            <p className="section-subheading mt-4">
              Real-world work that demonstrates my full-stack range. Click any card for the full case study.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-10"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisible(6); }}
                className="relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  color:      activeCategory === cat ? "#fff" : "#64748b",
                  background: activeCategory === cat ? undefined : "rgba(255,255,255,0.025)",
                  border:     activeCategory === cat ? undefined : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" layout>
            <AnimatePresence mode="popLayout">
              {gridProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onCaseStudy={setCaseStudyProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              className="mt-6 rounded-2xl p-10 flex flex-col items-center gap-4 border border-dashed"
              style={{ borderColor: "rgba(124,58,237,0.2)", background: "rgba(124,58,237,0.03)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)" }}
              >
                🚀
              </div>
              <p className="text-sm text-muted-foreground text-center">
                More projects coming &mdash;{" "}
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  GitHub
                </a>{" "}
                has the latest.
              </p>
            </motion.div>
          )}

          {/* Load more */}
          {visible < filtered.length && (
            <motion.div className="text-center mt-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <motion.button
                onClick={() => setVisible((v) => v + 3)}
                className="px-8 py-3 rounded-full text-sm font-medium text-muted-foreground"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                whileHover={{ color: "#fff", borderColor: "rgba(124,58,237,0.4)", background: "rgba(124,58,237,0.07)" }}
                whileTap={{ scale: 0.97 }}
              >
                Load More Projects
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Case study modal — rendered outside section so it can overlay everything */}
      {caseStudyProject && (
        <CaseStudyModal
          project={caseStudyProject}
          onClose={() => setCaseStudyProject(null)}
        />
      )}
    </>
  );
};

export default ProjectsSection;
