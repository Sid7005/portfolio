import { useScrollToSection } from "@/hooks/useScrollToSection";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import resume from "../../assets/doc/Sid-Resume.pdf";
import sidAvatar from "../../assets/images/sid-avatar.png";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/siddharajsinh-chauhan-410741199", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/", label: "GitHub" },
  { icon: Mail, href: "mailto:siddharajkc294000@gmail.com", label: "Email" },
];

const Footer = () => {
  const scrollToSection = useScrollToSection();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5">
      {/* Top gradient divider */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.4), rgba(139,92,246,0.5), transparent)" }}
      />

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start mb-10">
          {/* Logo + tagline */}
          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-2.5 group"
              onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
            >
              {/* Avatar circle — matches Header logo */}
              <div className="relative w-9 h-9 flex-shrink-0">
                <div
                  className="absolute -inset-0.5 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", padding: "1.5px" }}
                >
                  <div className="w-full h-full rounded-full" style={{ background: "#08101f" }} />
                </div>
                <div className="absolute inset-0 rounded-full overflow-hidden" style={{ background: "#000" }}>
                  <img
                    src={sidAvatar}
                    alt="SID"
                    className="w-full h-full object-contain scale-125 group-hover:scale-[1.35] transition-transform duration-300"
                    style={{ mixBlendMode: "screen" }}
                  />
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-base font-mono gradient-text tracking-wide">SID.</span>
                <span className="text-[9px] text-muted-foreground/60 font-mono tracking-widest uppercase">Full-Stack Dev</span>
              </div>
            </a>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-xs">
              Crafting scalable, beautiful web experiences with modern technologies.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full glass border border-white/8 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:text-center">
            <p className="text-xs font-mono text-muted-foreground mb-4">Quick Links</p>
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
            <p className="text-xs font-mono text-muted-foreground mb-4">Hire Me</p>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Open to full-time roles and freelance projects.
            </p>
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-bg text-white text-sm font-medium hover:opacity-90 transition-all"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs text-muted-foreground">
            &copy; {year} Siddharajsinh Chauhan. All rights reserved.
          </p>
          <button
            onClick={() => scrollToSection("#home")}
            className="w-9 h-9 rounded-full glass border border-white/8 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/30 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
