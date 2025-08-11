import { useState, useCallback } from "react";
import { ResumeMatch } from "../types/ResumeMatch";

export const useResumeMatching = () => {
  const [matchedResumes, setMatchedResumes] = useState<ResumeMatch[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  /**
   * Analyze resumes for a given job description ID and optional uploaded resumes.
   *
   * @param jdId - The job description ID (string or number)
   * @param resumes - Array of resume files to upload, can be empty if using DB resumes
   */
  const analyzeResumes = useCallback(
    async (jdId: string | number, resumes: File[] = []) => {
      setIsAnalyzing(true);

      try {
        // Create FormData to send jd_id and resumes if any
        const formData = new FormData();

        formData.append("jd_id", String(jdId)); // always send as string

        // Append resume files only if provided
        resumes.forEach((file) => {
          formData.append("resumes", file, file.name);
        });

        // Send POST request to your Flask backend
        const response = await fetch("http://localhost:5000/match", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();

        // Assuming backend returns: { matched_candidates: ResumeMatch[] }
        setMatchedResumes(data.matched_candidates || []);
      } catch (error) {
        console.error("Error analyzing resumes:", error);
        // Optional: set error state or show notification
      } finally {
        setIsAnalyzing(false);
      }
    },
    []
  );

  return {
    matchedResumes,
    isAnalyzing,
    analyzeResumes,
  };
};
