import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Code, 
  Smartphone, 
  Database, 
  Cloud 
} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaTwitter, FaMediumM } from "react-icons/fa";

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-inter font-bold">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 mb-8 rounded-full"></div>
        </motion.div>
        
        <div className="flex items-center gap-12">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p 
              className="text-lg leading-relaxed mb-6"
              variants={itemVariants}
            >
              I'm a dedicated Web Developer with 3+ years of experience in building and optimizing web applications. 
              My passion lies in creating intuitive, efficient, and scalable solutions that solve real-world problems.
            </motion.p>
            <motion.p 
              className="text-lg leading-relaxed mb-6"
              variants={itemVariants}
            >
              With a strong foundation in both frontend and backend technologies, I bring a holistic approach to Web development. 
              I thrive in collaborative environments where I can contribute my technical expertise while continuously learning and growing.
            </motion.p>
            <motion.p 
              className="text-lg leading-relaxed mb-8"
              variants={itemVariants}
            >
              Outside of coding, I enjoy hiking, playing cricket, reading tech blogs, and contributing to open-source projects. 
              I'm always excited to take on new challenges and work with innovative teams.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
