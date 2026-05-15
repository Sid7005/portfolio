import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data: content } = useQuery({
    queryKey: ["/api/content"],
    staleTime: 30_000,
  });

  useEffect(() => {
    document.title = (content as any)?.site?.pageTitle ?? "Siddharajsinh Chauhan - Web Developer";
  }, [content]);

  const sections = (content as any)?.sections ?? {};
  const show = (key: string) => sections[key] !== false;

  return (
    <div className="min-h-screen">
<Header content={content} />
      <main>
        {show("hero") && <HeroSection content={content} />}
        {show("about") && <AboutSection content={content} />}
        {show("skills") && <SkillsSection content={content} />}
        {show("experience") && <ExperienceSection content={content} />}
        {show("projects") && <ProjectsSection content={content} />}
        {show("testimonials") && <TestimonialsSection content={content} />}
        {show("contact") && <ContactSection content={content} />}
      </main>
      <Footer content={content} />
    </div>
  );
};

export default Home;
