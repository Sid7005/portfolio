export type ProjectCategory = "All" | "Web App" | "Mobile" | "API" | "UI/UX";

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory | string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  demoLinkText: string;
  codeLink: string;
  codeLinkText: string;
  codeIcon: "github" | "behance";
}
