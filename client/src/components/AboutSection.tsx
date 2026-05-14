import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Code2, Layers, Cloud, Cpu } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const DEFAULT_PARAGRAPHS = [
  "I'm a dedicated Full-Stack Web Developer with 3+ years of experience building and scaling web applications. My passion lies in crafting intuitive, efficient, and beautiful solutions that solve real-world problems.",
  "With a strong foundation spanning React, TypeScript, ASP.NET Core, and Node.js, I bring a holistic approach to development — from designing pixel-perfect UIs to architecting robust backend services.",
  "Outside of coding, I enjoy hiking, playing cricket, reading tech blogs, and contributing to open-source. I thrive in collaborative environments and I'm always excited to take on new challenges.",
];

const whatIDo = [
  { icon: Code2, title: "Frontend Dev", desc: "React, Next.js, TypeScript — pixel-perfect, accessible UIs" },
  { icon: Layers, title: "Backend Dev", desc: "ASP.NET Core, Node.js, REST APIs that scale" },
  { icon: Cloud, title: "Cloud & DevOps", desc: "AWS, Docker, CI/CD pipelines, deployment automation" },
  { icon: Cpu, title: "Performance", desc: "Bundle optimization, lazy loading, 30% faster load times" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

type Props = { content?: any };

const AboutSection = ({ content }: Props) => {
  const about = content?.about;
  const contactData = content?.contact;

  const paragraphs: string[] = about?.paragraphs ?? DEFAULT_PARAGRAPHS;
  const location = contactData?.location ?? "Ahmedabad, India";
  const email = contactData?.email ?? "siddharajkc294000@gmail.com";
  const phone = contactData?.phone ?? "+91 8320032657";
  const linkedinUrl = contactData?.linkedinUrl ?? "https://www.linkedin.com/in/siddharajsinh-chauhan-410741199";
  const githubUrl = contactData?.githubUrl ?? "https://github.com/";

  const infoItems = [
    { icon: MapPin, label: "Location", value: location },
    { icon: Mail, label: "Email", value: email },
    { icon: Phone, label: "Phone", value: phone },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 opacity-60"
        style={{ background: "linear-gradient(90deg, transparent, #0ea5e9, #22d3ee, transparent)" }} />

      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="font-mono text-sm text-primary mb-3">// who I am</p>
          <h2 className="section-heading gradient-text inline-block">About Me</h2>
          <p className="section-subheading mt-4">A passionate developer who loves building things that live on the internet.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Story */}
          <div className="space-y-6">
            {paragraphs.map((text, i) => (
              <motion.p key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} className="text-muted-foreground text-base leading-relaxed">
                {text}
              </motion.p>
            ))}

            <motion.div className="space-y-3 pt-4"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
              {infoItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg glass border border-white/8 flex items-center justify-center text-primary flex-shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-muted-foreground">{label}:</span>
                  <span className="text-foreground">{value}</span>
                </div>
              ))}
            </motion.div>

            <motion.div className="flex gap-3 pt-2" initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm text-muted-foreground hover:text-white hover:border-primary/30 transition-all">
                <FaLinkedinIn className="w-3.5 h-3.5" /> LinkedIn
              </a>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm text-muted-foreground hover:text-white hover:border-primary/30 transition-all">
                <FaGithub className="w-3.5 h-3.5" /> GitHub
              </a>
            </motion.div>
          </div>

          {/* Right — What I Do Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whatIDo.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true }}
                className="glass-card rounded-2xl p-5 group cursor-default">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-foreground mb-1.5">{title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
