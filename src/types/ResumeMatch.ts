export interface ResumeMatch {
  id: number;
  name: string;
  email: string;
  phone: string;
  jd_title: string;
  match_score: number;
  filename: string; //used for resume view endpoint
}

export interface FilterOptions {
  minScore: number;
}
