import { motion } from "framer-motion";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { Download } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = useScrollToSection();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="home" className="pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Left column: Text content */}
        <motion.div 
          className="md:w-7/12 md:pr-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p 
            className="font-semibold text-primary mb-2"
            variants={itemVariants}
          >
            Hello, I'm
          </motion.p>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-inter font-bold mb-4"
            variants={itemVariants}
          >
            Manish Bhanushali
          </motion.h1>
          <motion.h2 
            className="text-2xl md:text-3xl font-inter text-gray-600 mb-6"
            variants={itemVariants}
          >
            Software Engineer
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Passionate about creating robust and scalable applications. 
            Specializing in full-stack development with expertise in React, Node.js, and cloud technologies.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            variants={itemVariants}
          >
            <button 
              className="bg-primary hover:bg-secondary text-white py-3 px-6 rounded-md font-medium transition duration-300 shadow-lg hover:shadow-xl"
              onClick={() => scrollToSection("#contact")}
            >
              Get In Touch
            </button>
            <a 
              href="/resume.pdf" 
              className="border-2 border-primary hover:bg-primary hover:text-white text-primary py-3 px-6 rounded-md font-medium transition duration-300 flex items-center justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-5 w-5" /> Download CV
            </a>
          </motion.div>
        </motion.div>
        
        {/* Right column: Profile image */}
        <motion.div 
          className="md:w-5/12 mt-12 md:mt-0 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative">
            {/* Background shape */}
            <div className="absolute -z-10 w-[90%] h-[90%] rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 top-[5%] left-[5%]"></div>
            
            {/* Profile image */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Manish Bhanushali" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
