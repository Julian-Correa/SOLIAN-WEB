export interface CaseStudyModule {
  title: string;
  description: string;
}

export interface CaseStudyStep {
  title: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  sector: string;
  type: string;
  status: string;
  stack: string[];
  challenge: {
    heading: string;
    body: string;
    painPoints: string[];
  };
  solution: {
    heading: string;
    body: string;
  };
  modules: CaseStudyModule[];
  approach: CaseStudyStep[];
  outcomes: string[];
}
