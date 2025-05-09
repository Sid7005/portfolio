import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Frame } from "lucide-react";
import { projects } from "@/lib/constants";
import { Project, ProjectCategory } from "@/lib/types";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col"
    >
      {/* Project Image */}
      <div className="h-56 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className={`w-full h-full ${project.title === 'By Best' ? 'object-contain' : 'object-cover'} hover:scale-105 transition duration-500`}
        />
      </div>
      
      {/* Project Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-inter font-semibold">{project.title}</h3>
          <span className="bg-blue-100 text-primary text-xs px-2 py-1 rounded">{project.category}</span>
        </div>
        <p className="text-gray-600 mb-4 flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-end">
          <a 
            href={project.demoLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:text-secondary font-medium transition flex items-center"
          >
            <ExternalLink className="mr-2 h-4 w-4" /> {project.demoLinkText}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [visibleProjects, setVisibleProjects] = useState(6);

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  const handleShowMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, projects.length));
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-inter font-bold">Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 mb-8 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A showcase of my recent work and personal projects that demonstrate my technical skills.
          </p>
        </motion.div>
        
        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.slice(0, visibleProjects).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* See more button */}
        {visibleProjects < filteredProjects.length && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button 
              className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-md font-medium transition duration-300"
              onClick={handleShowMore}
            >
              View More Projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
