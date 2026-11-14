export type ProjectStatus = 'conceptual';

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  status: ProjectStatus;
}
