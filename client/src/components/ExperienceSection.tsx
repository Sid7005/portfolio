import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { experience as defaultExperience, education as defaultEducation } from "@/lib/constants";

type Props = { content?: any };

const ExperienceCard = ({ position, company, period, description, skills, index }: {
  position: string; company: string; period: string;
  description: string[]; skills: string[]; index: number;
}) => (
  <motion.div className="relative pl-8 pb-12 last:pb-0"
    initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }}>
    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
    <div className="absolute left-0 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full gradient-bg border-2 border-background flex items-center justify-center">
      <div className="w-1.5 h-1.5 rounded-full bg-white" />
    </div>
    <div className="glass-card rounded-2xl p-6 ml-4 group">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">{position}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            <span className="font-medium text-primary">{company}</span>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono glass border border-white/8 px-3 py-1.5 rounded-full">
          <Calendar className="w-3 h-3" /> {period}
        </span>
      </div>
      <ul className="space-y-2 mb-4">
        {description.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
            <span className="text-primary mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span key={skill} className="badge-tech text-xs">{skill}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

const EducationCard = ({ degree, institution, period, cgpa, index }: {
  degree: string; institution: string; period: string; cgpa: string; index: number;
}) => (
  <motion.div className="glass-card rounded-2xl p-6"
    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
        <GraduationCap className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground text-sm leading-snug mb-1">{degree}</h4>
        <p className="text-primary text-sm font-medium">{institution}</p>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
            <Calendar className="w-3 h-3" /> {period}
          </span>
          {cgpa && <span className="badge-tech text-xs">CGPA: {cgpa}</span>}
        </div>
      </div>
    </div>
  </motion.div>
);

const ExperienceSection = ({ content }: Props) => {
  const experienceData = content?.experience ?? defaultExperience;
  const educationData = content?.education ?? defaultEducation;

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 opacity-60"
        style={{ background: "linear-gradient(90deg, transparent, #0ea5e9, #22d3ee, transparent)" }} />

      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="font-mono text-sm text-primary mb-3">// my journey</p>
          <h2 className="section-heading gradient-text inline-block">Experience & Education</h2>
          <p className="section-subheading mt-4">My professional journey and academic background.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <h3 className="text-sm font-mono text-muted-foreground mb-8 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" /> Work Experience
            </h3>
            {experienceData.map((exp: any, i: number) => (
              <ExperienceCard key={exp.id ?? i} {...exp} index={i} />
            ))}
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-mono text-muted-foreground mb-8 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-secondary" /> Education
            </h3>
            <div className="space-y-4">
              {educationData.map((edu: any, i: number) => (
                <EducationCard key={edu.id ?? i} {...edu} index={i} />
              ))}
            </div>

            <motion.div className="mt-6 glass-card rounded-2xl p-5 border-l-2 border-primary"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <p className="text-xs font-mono text-primary mb-1">// fact</p>
              <p className="text-sm text-muted-foreground">
                Led Stripe & Authorize.net payment integrations and Google Maps autocomplete features at ZealousWeb, improving checkout UX for thousands of users.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
