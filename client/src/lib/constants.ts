import { Project } from "./types";

export const frontendSkills = [
  { name: "React.js", percentage: 90 },
  { name: "JavaScript/ES6+", percentage: 95 },
  { name: "HTML5/CSS3", percentage: 90 },
  { name: "Redux", percentage: 85 },
  { name: "Responsive Design", percentage: 90 },
];

export const backendSkills = [
  { name: "Node.js", percentage: 88 },
  { name: "Express.js", percentage: 85 },
  { name: "REST API Design", percentage: 90 },
  { name: "MongoDB", percentage: 80 },
  { name: "PostgreSQL", percentage: 75 },
];

export const devopsSkills = [
  { name: "Git/GitHub", percentage: 92 },
  { name: "Docker", percentage: 78 },
  { name: "AWS", percentage: 75 },
  { name: "CI/CD", percentage: 80 },
  { name: "Testing (Jest, Mocha)", percentage: 85 },
];

export const additionalSkills = [
  "TypeScript",
  "GraphQL",
  "NextJS",
  "Tailwind CSS",
  "Firebase",
  "Material UI",
  "Agile/Scrum",
  "Webpack",
  "Figma",
  "Python",
];

export const experience = [
  {
    position: "Senior Software Engineer",
    company: "TechNova Solutions",
    period: "2020 - Present",
    description: [
      "Led the development of a React-based dashboard that improved client reporting efficiency by 40%",
      "Architected and implemented RESTful APIs using Node.js and Express",
      "Mentored junior developers and conducted code reviews to maintain high-quality standards",
      "Implemented CI/CD pipelines that reduced deployment time by 60%"
    ],
    skills: ["React", "Node.js", "AWS", "MongoDB"]
  },
  {
    position: "Software Developer",
    company: "DataViz Inc.",
    period: "2018 - 2020",
    description: [
      "Developed and maintained multiple web applications using JavaScript and React",
      "Collaborated with UI/UX designers to implement responsive and intuitive user interfaces",
      "Optimized application performance, resulting in 30% faster load times",
      "Participated in Agile development cycles and sprint planning"
    ],
    skills: ["JavaScript", "React", "Redux", "CSS3"]
  },
  {
    position: "Junior Web Developer",
    company: "WebCraft Studios",
    period: "2016 - 2018",
    description: [
      "Built responsive websites for diverse clients using HTML, CSS, and JavaScript",
      "Implemented frontend features using jQuery and vanilla JavaScript",
      "Created and maintained WordPress-based solutions",
      "Assisted senior developers in larger projects and learned best practices"
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "WordPress"]
  }
];

export const education = [
  {
    degree: "Master of Computer Science",
    institution: "Stanford University",
    period: "2014 - 2016",
    gpa: "3.8/4.0"
  },
  {
    degree: "Bachelor of Engineering",
    institution: "University of California, Berkeley",
    period: "2010 - 2014",
    gpa: "3.7/4.0"
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    category: "Web App",
    description: "A comprehensive dashboard for e-commerce businesses with real-time analytics, inventory management, and order processing capabilities.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
    demoLink: "https://example.com/demo",
    demoLinkText: "Live Demo",
    codeLink: "https://github.com",
    codeLinkText: "Code",
    codeIcon: "github"
  },
  {
    id: 2,
    title: "Travel Companion App",
    category: "Mobile",
    description: "A mobile application that helps travelers plan itineraries, discover local attractions, and share experiences with friends.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    technologies: ["React Native", "Firebase", "Google Maps API"],
    demoLink: "https://example.com/app-store",
    demoLinkText: "App Store",
    codeLink: "https://github.com",
    codeLinkText: "Code",
    codeIcon: "github"
  },
  {
    id: 3,
    title: "Weather API Service",
    category: "API",
    description: "A RESTful API service that provides accurate weather forecasts and historical weather data for locations worldwide.",
    image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    technologies: ["Node.js", "Express", "MongoDB", "Docker"],
    demoLink: "https://example.com/docs",
    demoLinkText: "Documentation",
    codeLink: "https://github.com",
    codeLinkText: "Code",
    codeIcon: "github"
  },
  {
    id: 4,
    title: "Task Management System",
    category: "Web App",
    description: "A collaborative task management application that helps teams organize projects, assign tasks, and track progress.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    technologies: ["React", "Redux", "Node.js", "PostgreSQL"],
    demoLink: "https://example.com/demo",
    demoLinkText: "Live Demo",
    codeLink: "https://github.com",
    codeLinkText: "Code",
    codeIcon: "github"
  },
  {
    id: 5,
    title: "Fitness Tracking App UI",
    category: "UI/UX",
    description: "A modern and intuitive user interface design for a fitness tracking application focused on user engagement and accessibility.",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    technologies: ["Figma", "Adobe XD", "Prototyping"],
    demoLink: "https://example.com/case-study",
    demoLinkText: "Case Study",
    codeLink: "https://behance.net",
    codeLinkText: "Behance",
    codeIcon: "behance"
  },
  {
    id: 6,
    title: "AI Chatbot",
    category: "Web App",
    description: "An intelligent chatbot that leverages natural language processing to provide customer support and answer user queries.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    technologies: ["Python", "TensorFlow", "React", "Flask"],
    demoLink: "https://example.com/demo",
    demoLinkText: "Live Demo",
    codeLink: "https://github.com",
    codeLinkText: "Code",
    codeIcon: "github"
  }
];
