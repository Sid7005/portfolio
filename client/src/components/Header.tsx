import { useState, useEffect } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import resume from "../../assets/doc/Sid-Resume.pdf";
import sidAvatarFallback from "../../assets/images/sid-avatar.png";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

type Props = { content?: any };

const Header = ({ content }: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isMobile = useMobile();
  const scrollToSection = useScrollToSection();

  const heroImage = content?.hero?.logoImage || sidAvatarFallback;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-sky-500/10 shadow-xl shadow-black/30" : "bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
          onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
        >
          {/* Avatar in a glowing hex-circle frame */}
          <div className="relative w-9 h-9 flex-shrink-0">
            {/* Glow ring */}
            <div
              className="absolute -inset-0.5 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", padding: "1.5px" }}
            >
              <div className="w-full h-full rounded-full" style={{ background: "#060d1b" }} />
            </div>
            {/* Avatar image — screen blend removes black bg */}
            <div className="absolute inset-0 rounded-full overflow-hidden" style={{ background: "#000" }}>
              <img
                src={heroImage}
                alt="SID"
                className="w-full h-full object-contain scale-125 group-hover:scale-[1.35] transition-transform duration-300"
                style={{ mixBlendMode: "screen" }}
              />
            </div>
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-black text-base font-mono gradient-text tracking-wide">SID.</span>
            <span className="text-[9px] text-muted-foreground/60 font-mono tracking-widest uppercase">Full-Stack Dev</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive ? "text-white" : "text-muted-foreground hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))", border: "1px solid rgba(139,92,246,0.35)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Resume Button */}
        <a
          href={resume}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full gradient-bg text-white text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-cyan-500/30"
        >
          Resume
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white/80 hover:text-white transition p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden glass border-t border-sky-500/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-2.5 px-4 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition"
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 py-2.5 px-4 rounded-full gradient-bg text-white text-center font-semibold text-sm"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
