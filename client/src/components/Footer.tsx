import { Link } from "wouter";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { Download } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaMediumM } from "react-icons/fa";
import resume from "../../assets/doc/Sid-Resume.pdf"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const Footer = () => {
  const scrollToSection = useScrollToSection();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <a 
              href="#home" 
              className="text-2xl font-inter font-bold"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
            >
              SC<span className="text-primary">.</span>
            </a>
            <p className="mt-2 text-gray-400">Web Developer</p>
          </div>
          
          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6 md:mb-0">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          
          {/*  Download CV button */}
          <div>
            <a 
              href={resume} 
              className="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-md transition duration-300 flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-4 w-4" /> Download CV
            </a>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Siddharajsinh Chauhan. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <a 
              href="https://linkedin.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a 
              href="https://github.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a 
              href="https://instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://medium.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition"
              aria-label="Medium"
            >
              <FaMediumM />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
