import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { additionalSkills as defaultAdditionalSkills } from "@/lib/constants";

const DEFAULT_CATEGORIES = [
  { id: "frontend", label: "Frontend", skills: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Redux", "Tailwind CSS", "Bootstrap", "Framer Motion"] },
  { id: "backend", label: "Backend", skills: ["ASP.NET Core", "ASP.NET MVC", "Node.js", "Express.js", "Python (FastAPI)", "REST APIs", "Entity Framework", "C#"] },
  { id: "database", label: "Database", skills: ["PostgreSQL", "MSSQL", "MongoDB", "Redis", "Drizzle ORM", "SQL Server"] },
  { id: "devops", label: "DevOps & Tools", skills: ["Git & GitHub", "Docker", "AWS", "CI/CD", "Linux", "Vite", "Webpack", "Jest", "Mocha"] },
];

const DEFAULT_PROFICIENCY = [
  { name: "React.js / Next.js", level: 90 },
  { name: "TypeScript / JavaScript", level: 92 },
  { name: "ASP.NET Core", level: 85 },
  { name: "Node.js / Express", level: 82 },
  { name: "Git & DevOps", level: 88 },
];

type Props = { content?: any };

const SkillsSection = ({ content }: Props) => {
  const [activeTab, setActiveTab] = useState("frontend");
  const skills = content?.skills;

  const categories = skills
    ? [
        { id: "frontend", label: "Frontend", skills: skills.frontend ?? [] },
        { id: "backend", label: "Backend", skills: skills.backend ?? [] },
        { id: "database", label: "Database", skills: skills.database ?? [] },
        { id: "devops", label: "DevOps & Tools", skills: skills.devops ?? [] },
      ]
    : DEFAULT_CATEGORIES;

  const proficiencyItems: { name: string; level: number }[] = skills?.proficiency ?? DEFAULT_PROFICIENCY;
  const additionalSkills: string[] = skills?.additional ?? defaultAdditionalSkills;
  const activeSkills = categories.find((c) => c.id === activeTab)?.skills ?? [];

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 opacity-60"
        style={{ background: "linear-gradient(90deg, transparent, #22d3ee, #0ea5e9, transparent)" }} />

      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="font-mono text-sm text-primary mb-3">// what I work with</p>
          <h2 className="section-heading gradient-text inline-block">Skills & Technologies</h2>
          <p className="section-subheading mt-4">Tools and technologies I've used to build real-world products.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left — tabs + badge grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat.id} onClick={() => setActiveTab(cat.id)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === cat.id ? "text-white" : "text-muted-foreground hover:text-white glass border border-white/8"
                  }`}>
                  {activeTab === cat.id && (
                    <motion.span layoutId="skill-tab" className="absolute inset-0 gradient-bg rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }} />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeTab} className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                {activeSkills.map((skill: string, i: number) => (
                  <motion.span key={skill} className="badge-tech cursor-default"
                    initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}>
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8">
              <p className="text-xs text-muted-foreground mb-3 font-mono">// other tools & frameworks</p>
              <div className="flex flex-wrap gap-2">
                {additionalSkills.map((skill, i) => (
                  <motion.span key={skill} className="badge-tech badge-cyan cursor-default"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — proficiency bars */}
          <div className="lg:col-span-2 space-y-5">
            <p className="text-sm font-semibold text-foreground mb-2">Top Proficiencies</p>
            {proficiencyItems.map(({ name, level }, i) => (
              <motion.div key={name}
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-foreground font-medium">{name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{level}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                  <motion.div className="h-full rounded-full gradient-bg"
                    initial={{ width: 0 }} whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 + 0.3, ease: "easeOut" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
