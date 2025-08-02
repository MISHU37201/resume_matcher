import React from "react";

export const HeroSection: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginBottom: "48px" }}>
      <h2
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          color: "#111827",
          marginBottom: "16px",
        }}
      >
        Find Your Perfect Candidates
      </h2>
      <p
        style={{
          fontSize: "20px",
          color: "#4b5563",
          maxWidth: "672px",
          margin: "0 auto",
        }}
      >
        Upload your job description and resumes, then let our AI find the best
        matches with precision scoring.
      </p>
    </div>
  );

