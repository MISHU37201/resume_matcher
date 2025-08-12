import { useState, useCallback } from "react";
import { ResumeMatch } from "../types/ResumeMatch";
import { ResumeMatcherAPI } from "../services/api";

export const useResumeMatching = () => {
  const [matchedResumes, setMatchedResumes] = useState<ResumeMatch[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Create API instance
  const api = new ResumeMatcherAPI(); // Uses default http://localhost:5000

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
        console.log(
          "Analyzing resumes with JD ID:",
          jdId,
          "Files count:",
          resumes.length
        );

        // Use the API class method
        const candidates = await api.matchResumesByJdId(jdId, resumes);

        console.log("API returned candidates:", candidates);
        console.log("Candidates count:", candidates.length);

        setMatchedResumes(candidates);
      } catch (error) {
        console.error("Error analyzing resumes:", error);
        setMatchedResumes([]); // Clear on error
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        alert(`Error analyzing resumes: ${errorMessage}`);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [api]
  );

  return {
    matchedResumes,
    isAnalyzing,
    analyzeResumes,
  };
};
