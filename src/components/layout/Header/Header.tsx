import React from "react";
import { Zap, Users } from "../../ui/icons";

interface HeaderProps {
  candidateCount: number;
}

export const Header: React.FC<HeaderProps> = ({ candidateCount }) => {
  return (
    <header
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #2563eb, #4f46e5)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap style={{ width: "24px", height: "24px", color: "white" }} />
          </div>
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: 0,
              }}
            >
              ResumeMatcher Pro
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
              AI-Powered Resume Screening
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#4b5563",
          }}
        >
          <Users style={{ width: "16px", height: "16px" }} />
          <span>{candidateCount} Candidates</span>
        </div>
      </div>
    </header>
  );
};
