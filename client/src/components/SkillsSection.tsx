import { motion } from "framer-motion";
import { Laptop, Server, Drill } from "lucide-react";
import { frontendSkills, backendSkills, devopsSkills, additionalSkills } from "@/lib/constants";

interface SkillBarProps {
  name: string;
  percentage: number;
  delay?: number;
}

const SkillBar = ({ name, percentage, delay = 0 }: SkillBarProps) => {
  return (
    <motion.div 
      className="skill-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div 
          className="bg-primary h-2 rounded-full" 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ 
  title, 
  icon, 
  skills 
}: { 
  title: string; 
  icon: React.ReactNode; 
  skills: { name: string; percentage: number }[] 
}) => {
  return (
    <motion.div 
      className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
          {icon}
        </div>
        <h3 className="ml-4 text-xl font-inter font-semibold">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <SkillBar 
            key={skill.name} 
            name={skill.name} 
            percentage={skill.percentage} 
            delay={index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-inter font-bold">Skills</h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 mb-8 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A comprehensive set of technical skills I've developed throughout my career as a web developer.
          </p>
        </motion.div>
        
        {/* Additional Skills Tags */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, index) => (
              <motion.span 
                key={skill}
                className="bg-white text-dark px-4 py-2 rounded-full border border-gray-200 hover:bg-primary hover:text-white transition duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
