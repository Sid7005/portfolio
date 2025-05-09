import { Project } from "./types";
import FITImage from '../../assets/images/fit.jpg'

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
  "ReactJS",
  "NextJS",
  "JavaScript",
  "TypeScript",
  "ASP.NET Web Forms",
  "ASP.NET Core",
  "ASP.NET MVC",
  "Python - FastAPI",
  "NodeJS",
  "MSSQL",
  "PostgreSQL",
  "Bootstrap CSS",
  "HTML",
  "CSS",
];

export const experience = [
  {
    position: "Web Developer",
    company: "ZealousWeb Technologies PVT LTD.",
    period: "Apr 2022 - Present",
    description: [
      "Developed and maintained full-stack web applications using React, TypeScript, and ASP.NET Core",
      "Led the integration of third-party services including Stripe, Authorize.net, and ID.me for secure payments and user verification",
      "Built dynamic address forms using Google Maps Places Autocomplete and optimized autofill logic for better UX and accuracy",
      "Improved frontend architecture by modularizing form components and leveraging Redux for predictable state management",
      "Enhanced performance by optimizing bundle size and implementing lazy loading, resulting in 30% faster load times",
      "Collaborated closely with designers and backend teams in Agile sprints to deliver responsive, accessible, and scalable applications",
    ],
    skills: [
      "ASP.NET Core",
      "JavaScript",
      "ReactJS",
      "Redux",
      "TypeScript",
      "Next.js",
      "Python - FastAPI",
      "NodeJS",
    ],
  },
  {
    position: "Trainee",
    company: "Aark Inosoft",
    period: "Nov 2021 - Mar 2022",
    description: [
      "Developed responsive websites for various clients using HTML5, CSS3, and JavaScript",
      "Implemented interactive features with JavaScript and jQuery to enhance user engagement",
      "Supported senior developers with backend tasks in ASP.NET Web Forms and MVC, gaining hands-on experience with C# and SQL Server",
      "Participated in QA testing and bug fixing to ensure cross-browser compatibility and mobile responsiveness",
    ],
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "jQuery",
      "ASP.NET Web Forms",
      "ASP.NET MVC",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Engineering in Computer Engineering",
    institution: "D.A. Degree Engineering & Technology",
    period: "2020 - 2023",
    cgpa: "8.3/10.0",
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "D.A. Diploma Engineering & Technology",
    period: "2016 - 2019",
    cgpa: "7.3/10.0",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "MightyMeals",
    category: "Web App",
    description: "MightyMeals is a meal delivery platform offering fresh, chef-prepared meals with a seamless user experience. I worked on the React.js frontend, implementing a responsive and intuitive UI. My contributions included integrating secure payment gateways, optimizing the checkout flow, and developing the order creation functionality.",
    image: "https://eatmightymeals.com/wp-content/uploads/2019/08/DSC6681.jpg",
    technologies: ["ReactJS", "WordPress", "Python - FastAPI"],
    demoLink: "https://mightymeals.com/",
    demoLinkText: "Live Demo",
  },
  {
    id: 2,
    title: "By Best",
    category: "Web App",
    description: "By Best is an eCommerce platform for fashion and accessories, offering clothing for men, women, and kids, along with jewelry, sunglasses, and more. I worked on the React.js frontend, building responsive product pages, optimizing filtering and search functionality, and integrating dynamic cart and checkout experiences.",
    image: "https://bybest.shop/assets/img/bybest-logo.png",
    technologies: ["ReactJS", "Laravel"],
    demoLink: "https://bybest.shop/",
    demoLinkText: "Live Demo",
  },
  {
    id: 3,
    title: "Fields In Trust",
    category: "Web App",
    description: "Fields In Trust is a UK-based charity dedicated to protecting parks, playgrounds, and green spaces for future generations. I contributed to the development of their ASP.NET MVC website, focusing on implementing dynamic content management, building secure and maintainable web forms, and integrating location-based features to help users find protected fields and sites across the UK.",
    image: FITImage,
    technologies: ["ASP.NET MVC", "C#", "Razor Pages", "Entity Framework"],
    demoLink: "https://fieldsintrust.org/",
    demoLinkText: "Live Demo",
  },
];
