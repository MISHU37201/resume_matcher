import React from "react";
import { ResumeMatch } from "../../../types/ResumeMatch";
import { ResumeCard } from "../ResumeCard/ResumeCard";

interface ResumeListProps {
  resumes: ResumeMatch[];
  selectedResumes: Set<number>;
  onToggleSelection: (id: number) => void;
}

export const ResumeList: React.FC<ResumeListProps> = ({
  resumes,
  selectedResumes,
  onToggleSelection,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          isSelected={selectedResumes.has(resume.id)}
          onToggleSelection={() => onToggleSelection(resume.id)}
        />
      ))}
    </div>
  );
};
