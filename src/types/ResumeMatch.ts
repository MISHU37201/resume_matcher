export interface ResumeMatch {
  id: number;
  name: string;
  email: string;
  phone: string;
  jd_title: string;
  match_score: number; // This comes as 0.98, 0.97, etc.
}

export interface FilterOptions {
  minScore: number;
}
