import { useState } from "react";
import { SectionBg } from "./SectionBg";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, ArrowUpRight, Github, Globe } from "lucide-react";
import { projects as defaultProjects } from "@/lib/constants";
import { ProjectCategory } from "@/lib/types";

const categories: ProjectCategory[] = ["All", "Web App", "Mobile", "API", "UI/UX"];

type ProjectItem = {
  id: number; title: string; category: string; description: string;
  image: string; technologies: string[]; demoLink: string; demoLinkText: string;
};

/* ── 3-D tilt card ──────────────────────────────────────────── */
const TiltCard = ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 28 });
  const glowX   = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY   = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <motion.div
      className={className}
      style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - r.left) / r.width - 0.5);
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

/* ── Spotlight hero card (first project) ───────────────────── */
const SpotlightCard = ({ project }: { project: ProjectItem }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.45 }}
    className="col-span-full"
  >
    <TiltCard
      className="glass-card rounded-3xl overflow-hidden group relative"
      style={{ perspective: 1000 }}
    >
      <div className="grid md:grid-cols-2 min-h-[340px]">
        {/* Image side */}
        <div className="relative overflow-hidden min-h-[220px] md:min-h-0">
          {/* Gradient overlays */}
          <div className="absolute inset-0 z-10"
            style={{ background: "linear-gradient(to right, transparent 60%, rgba(7,7,26,0.95) 100%)" }} />
          <div className="absolute inset-0 z-10"
            style={{ background: "linear-gradient(to top, rgba(7,7,26,0.7) 0%, transparent 50%)" }} />

          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
              project.title === "By Best" ? "object-contain p-6 bg-white" : "object-cover"
            }`}
          />

          {/* Featured badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", boxShadow: "0 4px 16px rgba(124,58,237,0.5)" }}>
            ★ Featured Project
          </div>

          {/* Category badge */}
          <span className="absolute top-4 right-4 z-20 badge-tech text-xs">{project.category}</span>

          {/* View live overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <motion.a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm"
              style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", boxShadow: "0 6px 28px rgba(124,58,237,0.6)" }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <Globe className="w-4 h-4" /> View Live
            </motion.a>
          </div>
        </div>

        {/* Content side */}
        <div className="p-8 md:p-10 flex flex-col justify-center relative z-20">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground font-space leading-tight">
              {project.title}
            </h3>
            <motion.a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ml-4 text-muted-foreground"
              style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)" }}
              whileHover={{ scale: 1.15, color: "#fff", borderColor: "rgba(124,58,237,0.6)", background: "rgba(124,58,237,0.2)" }}
              aria-label={`Open ${project.title}`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span key={tech} className="badge-tech text-xs">{tech}</span>
            ))}
          </div>

          <motion.a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold w-fit group/link"
            style={{ color: "#a78bfa" }}
            whileHover={{ x: 5 }}
          >
            {project.demoLinkText}
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </motion.a>
        </div>
      </div>
    </TiltCard>
  </motion.div>
);

/* ── Regular project card ───────────────────────────────────── */
const ProjectCard = ({ project, index }: { project: ProjectItem; index: number }) => (
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
          className={`w-full h-full transition-transform duration-700 group-hover:scale-108 ${
            project.title === "By Best" ? "object-contain p-4 bg-white" : "object-cover"
          }`}
        />

        <span className="absolute top-3 right-3 z-20 badge-tech text-xs">{project.category}</span>

        {/* Hover CTA */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center pb-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <motion.a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-semibold"
            style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", boxShadow: "0 4px 20px rgba(124,58,237,0.55)" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-3 h-3" /> View Live
          </motion.a>
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

        <motion.a
          href={project.demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold group/link"
          style={{ color: "#7c3aed" }}
          whileHover={{ x: 4 }}
        >
          {project.demoLinkText}
          <ExternalLink className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </motion.a>
      </div>
    </TiltCard>
  </motion.div>
);

type Props = { content?: any };

const ProjectsSection = ({ content }: Props) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [visible, setVisible] = useState(6);

  const rawProjects: ProjectItem[] = content?.projects ?? defaultProjects;
  const filtered = rawProjects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const gridProjects = filtered.slice(0, visible);

  return (
    <section
      id="projects"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #07071a 0%, #0b0620 50%, #07071a 100%)" }}
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
            Real-world work that demonstrates my full-stack range.
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
                color: activeCategory === cat ? "#fff" : "#64748b",
                background: activeCategory === cat ? undefined : "rgba(255,255,255,0.025)",
                border: activeCategory === cat ? undefined : "1px solid rgba(255,255,255,0.06)",
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
              <ProjectCard key={project.id} project={project} index={i} />
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
  );
};

export default ProjectsSection;
