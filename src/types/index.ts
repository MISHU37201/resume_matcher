export interface ResumeMatch {
  id: number;
  name: string;
  score: number;
  skills: string[];
  experience: string;
  title: string;
  highlights: string[];
}

export interface FilterOptions {
  minScore: number;
}
