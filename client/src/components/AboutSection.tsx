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
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* Left: Bio content */}
          <motion.div 
            className="md:w-7/12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p 
              className="text-lg leading-relaxed mb-6"
              variants={itemVariants}
            >
              I'm a dedicated Software Engineer with 5+ years of experience in building and optimizing web applications. 
              My passion lies in creating intuitive, efficient, and scalable solutions that solve real-world problems.
            </motion.p>
            <motion.p 
              className="text-lg leading-relaxed mb-6"
              variants={itemVariants}
            >
              With a strong foundation in both frontend and backend technologies, I bring a holistic approach to software development. 
              I thrive in collaborative environments where I can contribute my technical expertise while continuously learning and growing.
            </motion.p>
            <motion.p 
              className="text-lg leading-relaxed mb-8"
              variants={itemVariants}
            >
              Outside of coding, I enjoy hiking, reading tech blogs, and contributing to open-source projects. 
              I'm always excited to take on new challenges and work with innovative teams.
            </motion.p>
            
            {/* Personal info */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <Mail className="text-primary w-6 h-6" />
                <span className="ml-3">manish.bhanushali@example.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-primary w-6 h-6" />
                <span className="ml-3">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="text-primary w-6 h-6" />
                <span className="ml-3">San Francisco, CA</span>
              </div>
              <div className="flex items-center">
                <Calendar className="text-primary w-6 h-6" />
                <span className="ml-3">Available for new opportunities</span>
              </div>
            </motion.div>
            
            {/* Social links */}
            <motion.div 
              className="flex gap-4"
              variants={itemVariants}
            >
              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition duration-300"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition duration-300"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://medium.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition duration-300"
                aria-label="Medium"
              >
                <FaMediumM />
              </a>
            </motion.div>
          </motion.div>
          
          {/* Right: Key points and interests */}
          <motion.div 
            className="md:w-5/12 bg-gray-50 p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-inter font-semibold mb-6">What I do</h3>
            
            {/* List of services/capabilities */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Full Stack Development</h4>
                  <p className="text-gray-600">Building end-to-end web applications with React, Node.js, and modern frameworks</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Responsive Web Design</h4>
                  <p className="text-gray-600">Creating beautiful, responsive interfaces that work on any device</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Database Architecture</h4>
                  <p className="text-gray-600">Designing efficient database solutions with SQL and NoSQL technologies</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Cloud className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Cloud Infrastructure</h4>
                  <p className="text-gray-600">Deploying and managing applications on AWS, Azure, and other cloud platforms</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
