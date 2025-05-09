import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { experience, education } from "@/lib/constants";

const ExperienceTimelineItem = ({
  position,
  company,
  period,
  description,
  skills,
  isEven
}: {
  position: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  isEven: boolean;
}) => {
  return (
    <div className={`relative md:flex md:justify-between md:mb-0 py-8 ${isEven ? 'right-timeline' : 'left-timeline'}`}>
      {/* Left Content (even) or empty space (odd) */}
      {isEven ? (
        <motion.div
          className="md:w-5/12 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 md:mr-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-3 py-1 bg-blue-100 text-primary rounded-full text-sm font-medium mb-4">{period}</div>
          <h3 className="text-xl font-inter font-semibold mb-2">{position}</h3>
          <h4 className="text-lg text-gray-600 mb-4">{company}</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="hidden md:block md:w-5/12"></div>
      )}

      {/* Timeline dot */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-8 h-8 rounded-full bg-primary text-white items-center justify-center">
        <Briefcase className="w-4 h-4" />
      </div>

      {/* Right Content (odd) or empty space (even) */}
      {!isEven ? (
        <motion.div
          className="md:w-5/12 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ml-0"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-3 py-1 bg-blue-100 text-primary rounded-full text-sm font-medium mb-4">{period}</div>
          <h3 className="text-xl font-inter font-semibold mb-2">{position}</h3>
          <h4 className="text-lg text-gray-600 mb-4">{company}</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="hidden md:block md:w-5/12"></div>
      )}
    </div>
  );
};

const EducationCard = ({
  degree,
  institution,
  period,
  gpa
}: {
  degree: string;
  institution: string;
  period: string;
  gpa: string
}) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-inter font-semibold">{degree}</h3>
          <p className="text-gray-600">{institution}</p>
          <span className="text-gray-500">{period}</span>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-inter font-bold">Work Experience</h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 mb-8 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            My professional journey in the software development industry.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

          {/* Experience Items */}
          {experience.map((exp, index) => (
            <ExperienceTimelineItem
              key={index}
              position={exp.position}
              company={exp.company}
              period={exp.period}
              description={exp.description}
              skills={exp.skills}
              isEven={index % 2 !== 0}
            />
          ))}
        </div>

        {/* Education */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-inter font-bold text-center mb-10">Education</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <EducationCard
                key={index}
                degree={edu.degree}
                institution={edu.institution}
                period={edu.period}
                gpa={edu.cgpa}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
