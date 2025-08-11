import { useState, useCallback } from "react";
import { ResumeMatch } from "../types/ResumeMatch";

export const useResumeMatching = () => {
  const [matchedResumes, setMatchedResumes] = useState<ResumeMatch[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeResumes = useCallback(
    async (jobDescription: string, resumes: File[]) => {
      setIsAnalyzing(true);

      try {
        // Create FormData to send files and job description
        const formData = new FormData();

        formData.append("jd_id", jobDescription);

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

        // Assuming backend returns: { matches: ResumeMatch[] }
        setMatchedResumes(data.matches || []);
      } catch (error) {
        console.error("Error analyzing resumes:", error);
        // You can optionally set error state here or alert user
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
