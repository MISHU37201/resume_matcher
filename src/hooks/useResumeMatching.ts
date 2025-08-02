import { useState, useCallback } from "react";
import { ResumeMatch } from "../types/ResumeMatch";

// This will be replaced with actual API calls to your Flask backend
export const useResumeMatching = () => {
  const [matchedResumes, setMatchedResumes] = useState<ResumeMatch[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock data - replace with actual API call
  const mockMatches: ResumeMatch[] = [
    {
      id: 1,
      name: "Sarah Chen",
      score: 95,
      skills: ["React", "Node.js", "Python", "AWS"],
      experience: "5 years",
      title: "Senior Full Stack Developer",
      highlights: [
        "Led 3 major projects",
        "AWS certified",
        "Agile methodology expert",
      ],
    },
    {
      id: 2,
      name: "Marcus Johnson",
      score: 88,
      skills: ["JavaScript", "React", "MongoDB", "Docker"],
      experience: "3 years",
      title: "Frontend Developer",
      highlights: [
        "UI/UX expertise",
        "Performance optimization",
        "Team leadership",
      ],
    },
    {
      id: 3,
      name: "Priya Patel",
      score: 82,
      skills: ["Python", "Django", "PostgreSQL", "Redis"],
      experience: "4 years",
      title: "Backend Developer",
      highlights: ["API design", "Database optimization", "Microservices"],
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      score: 76,
      skills: ["Vue.js", "Node.js", "GraphQL", "TypeScript"],
      experience: "2 years",
      title: "Junior Full Stack Developer",
      highlights: ["Quick learner", "Modern frameworks", "Clean code advocate"],
    },
  ];

  const analyzeResumes = useCallback(
    async (jobDescription: string, resumes: File[]) => {
      setIsAnalyzing(true);

      try {
        // TODO: Replace with actual API call to Flask backend
        // const response = await fetch('/api/analyze-resumes', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     jobDescription,
        //     resumes: resumes.map(file => ({
        //       name: file.name,
        //       content: await file.text() // or use FormData for file upload
        //     }))
        //   })
        // });
        // const data = await response.json();

        // Mock API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setMatchedResumes(mockMatches);
      } catch (error) {
        console.error("Error analyzing resumes:", error);
        // Handle error appropriately
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
