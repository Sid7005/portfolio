import { motion } from "framer-motion";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { Download } from "lucide-react";
import profile from "../../assets/images/ImportedPhoto.760428188.70688.jpeg"
import resume from "../../assets/doc/Sid-Resume.pdf"

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
        {/* Right column: Profile image */}
        <motion.div
          className="md:w-7/12 md:pr-10 my-5 md:mt-0 flex justify-center"
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
                src={profile}
                alt="Siddharajsinh Chauhan"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Left column: Text content */}
        <motion.div
          className="md:w-5/12 md:pr-10 text-center md:text-left lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="mb-4 w-52 inline-block px-3 py-1 bg-primary/10 text-gray-600 rounded-full font-semibold text-sm sm:text-base"
            variants={itemVariants}
          >
            Web Developer 👨‍💻
          </motion.h2>
          <motion.h1
            className="text-2xl md:text-4xl lg:text-5xl font-inter font-bold mb-4"
            variants={itemVariants}
          >
            Hi, I'm Siddharajsinh Chauhan
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Experienced React.js & Next.js developer with 3+ years of experience building scalable,
            high-performance web interfaces and seamless user experiences.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            variants={itemVariants}
          >
            <button
              className="bg-primary hover:bg-secondary text-white py-3 px-6 rounded-md font-medium transition duration-300 shadow-lg hover:shadow-xl"
              onClick={() => scrollToSection("#contact")}
            >
              Get In Touch
            </button>
            <a
              href={resume}
              className="border-2 border-primary hover:bg-primary hover:text-white text-primary py-3 px-6 rounded-md font-medium transition duration-300 flex items-center justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-5 w-5" /> Download CV
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
