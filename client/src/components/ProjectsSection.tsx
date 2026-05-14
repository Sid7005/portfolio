import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { projects as defaultProjects } from "@/lib/constants";
import { ProjectCategory } from "@/lib/types";

const categories: ProjectCategory[] = ["All", "Web App", "Mobile", "API", "UI/UX"];

type ProjectItem = {
  id: number; title: string; category: string; description: string;
  image: string; technologies: string[]; demoLink: string; demoLinkText: string;
};

const ProjectCard = ({ project, index }: { project: ProjectItem; index: number }) => (
  <motion.div layout
    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35, delay: index * 0.07 }}
    className="glass-card rounded-2xl overflow-hidden group flex flex-col">
    <div className="relative h-48 overflow-hidden bg-muted/50">
      <img src={project.image} alt={project.title}
        className={`w-full h-full ${project.title === "By Best" ? "object-contain p-4" : "object-cover"} group-hover:scale-105 transition-transform duration-500`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="text-xs font-mono text-white/80">View Project</span>
      </div>
      <span className="absolute top-3 left-3 badge-tech text-xs">{project.category}</span>
    </div>

    <div className="p-5 flex flex-col flex-grow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-foreground text-base">{project.title}</h3>
        <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
          className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/40 transition-all flex-shrink-0"
          aria-label={`Open ${project.title}`}>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow line-clamp-3">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.map((tech) => (
          <span key={tech} className="badge-tech text-xs">{tech}</span>
        ))}
      </div>
      <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-sm text-primary hover:text-secondary transition-colors font-medium group/link">
        {project.demoLinkText}
        <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
      </a>
    </div>
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

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 opacity-60"
        style={{ background: "linear-gradient(90deg, transparent, #22d3ee, #0ea5e9, transparent)" }} />

      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="font-mono text-sm text-primary mb-3">// what I've built</p>
          <h2 className="section-heading gradient-text inline-block">Projects</h2>
          <p className="section-subheading mt-4">A showcase of real-world work that demonstrates my technical range.</p>
        </motion.div>

        <motion.div className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setVisible(6); }}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat ? "text-white" : "text-muted-foreground hover:text-white glass border border-white/8"
              }`}>
              {activeCategory === cat && (
                <motion.span layoutId="project-filter" className="absolute inset-0 gradient-bg rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }} />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
          <AnimatePresence>
            {filtered.slice(0, visible).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visible < filtered.length && (
          <motion.div className="text-center mt-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <button onClick={() => setVisible((v) => v + 3)}
              className="px-8 py-3 rounded-full glass border border-white/10 text-sm font-medium text-muted-foreground hover:text-white hover:border-primary/30 transition-all">
              Load More Projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
