import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
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

  return (
    <div className="min-h-screen">
      <Header content={content} />
      <main>
        <HeroSection content={content} />
        <AboutSection content={content} />
        <SkillsSection content={content} />
        <ExperienceSection content={content} />
        <ProjectsSection content={content} />
        <ContactSection content={content} />
      </main>
      <Footer content={content} />
    </div>
  );
};

export default Home;
