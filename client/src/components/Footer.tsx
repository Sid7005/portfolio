import { motion } from "framer-motion";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const navLinks = [
  { href: "#home",       label: "Home"       },
  { href: "#about",      label: "About"      },
  { href: "#skills",     label: "Skills"     },
  { href: "#experience", label: "Experience" },
  { href: "#projects",   label: "Projects"   },
  { href: "#contact",    label: "Contact"    },
];

type Props = { content?: any };

const Footer = ({ content }: Props) => {
  const scrollToSection = useScrollToSection();
  const year = new Date().getFullYear();

  const site        = content?.site;
  const contactData = content?.contact;
  const hero        = content?.hero;

  const logoText    = site?.logoText    ?? "SID.";
  const logoSubtext = site?.logoSubtext ?? "Full-Stack Dev";
  const fullName    = site?.fullName    ?? "Siddharajsinh Chauhan";
  const tagline     = site?.tagline     ?? "Crafting scalable, beautiful web experiences with modern technologies.";
  const hireMeText  = site?.hireMeText  ?? "Open to full-time roles and freelance projects.";

  const logoImage   = hero?.logoImage   ?? "";
  const linkedinUrl = contactData?.linkedinUrl ?? "#";
  const githubUrl   = contactData?.githubUrl   ?? "#";
  const email       = contactData?.email       ?? "";

  const socialLinks = [
    { icon: Linkedin, href: linkedinUrl,        label: "LinkedIn" },
    { icon: Github,   href: githubUrl,           label: "GitHub"   },
    { icon: Mail,     href: `mailto:${email}`,   label: "Email"    },
  ];

  return (
    <footer
      className="relative border-t border-white/5"
      style={{ background: "linear-gradient(180deg, #07071a 0%, #060515 100%)" }}
    >
      {/* Top gradient divider */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.6), rgba(37,99,235,0.6), transparent)" }}
      />

      {/* Aurora accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container mx-auto px-6 py-12 relative">
        <div className="grid md:grid-cols-3 gap-8 items-start mb-10">

          {/* Logo + tagline */}
          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-2.5 group"
              onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
            >
              <div className="relative w-9 h-9 flex-shrink-0">
                <div
                  className="absolute -inset-0.5 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", padding: "1.5px" }}
                >
                  <div className="w-full h-full rounded-full" style={{ background: "#07071a" }} />
                </div>
                <div className="absolute inset-0 rounded-full overflow-hidden" style={{ background: "#000" }}>
                  {logoImage ? (
                    <img
                      src={logoImage}
                      alt={logoText}
                      className="w-full h-full object-contain scale-125 group-hover:scale-[1.35] transition-transform duration-300"
                      style={{ mixBlendMode: "screen" }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-black text-white font-mono">
                      {logoText.replace(".", "")}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-base font-mono gradient-text-animated tracking-wide">{logoText}</span>
                <span className="text-[9px] text-muted-foreground/60 font-mono tracking-widest uppercase">{logoSubtext}</span>
              </div>
            </a>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-xs">
              {tagline}
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground"
                  style={{
                    background: "rgba(124,58,237,0.07)",
                    border: "1px solid rgba(124,58,237,0.18)",
                  }}
                  whileHover={{
                    color: "#fff",
                    background: "rgba(124,58,237,0.18)",
                    borderColor: "rgba(167,139,250,0.45)",
                    scale: 1.1,
                    y: -2,
                  }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:text-center">
            <p className="text-xs font-mono mb-4" style={{ color: "#a78bfa" }}>Quick Links</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="md:text-right">
            <p className="text-xs font-mono mb-4" style={{ color: "#a78bfa" }}>Hire Me</p>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {hireMeText}
            </p>
            <motion.a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
                boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 6px 24px rgba(124,58,237,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              Download CV
            </motion.a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(124,58,237,0.12)" }}
        >
          <p className="text-xs text-muted-foreground">
            &copy; {year} {fullName}. All rights reserved.
          </p>
          <motion.button
            onClick={() => scrollToSection("#home")}
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground"
            style={{
              background: "rgba(124,58,237,0.07)",
              border: "1px solid rgba(124,58,237,0.18)",
            }}
            whileHover={{
              color: "#fff",
              background: "rgba(124,58,237,0.2)",
              borderColor: "rgba(167,139,250,0.45)",
              y: -2,
            }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
