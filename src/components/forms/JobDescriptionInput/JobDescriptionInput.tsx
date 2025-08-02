import React from "react";
import { FileText } from "../../ui/icons";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        padding: "32px",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            background: "linear-gradient(135deg, #a855f7, #ec4899)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FileText style={{ width: "24px", height: "24px", color: "white" }} />
        </div>
        <div>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#111827",
              margin: 0,
            }}
          >
            Job Description
          </h3>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Paste your job requirements
          </p>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your job description here... Include required skills, experience level, and key responsibilities."
        style={{
          width: "100%",
          height: "160px",
          padding: "16px",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          resize: "none",
          color: "#374151",
          fontSize: "14px",
          outline: "none",
          transition: "all 0.2s ease",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};
