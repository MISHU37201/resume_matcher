export const ACCEPTED_FILE_TYPES = ".pdf,.doc,.docx";
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 80,
  FAIR: 70,
  POOR: 0,
} as const;

export const FILTER_OPTIONS = [
  { value: 0, label: "All" },
  { value: 70, label: "70+" },
  { value: 80, label: "80+" },
  { value: 90, label: "90+" },
];
