import React from "react";
import { ResumeMatch } from "../../../types/ResumeMatch";
import { Star } from "../../ui/icons";
import { Button } from "../../ui/Button/Button";

interface ResumeCardProps {
  resume: ResumeMatch;
  isSelected: boolean;
  onToggleSelection: () => void;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({
  resume,
  isSelected,
  onToggleSelection,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 0.9) return { color: "#10b981", backgroundColor: "#f0fdf4" };
    if (score >= 0.8) return { color: "#3b82f6", backgroundColor: "#eff6ff" };
    if (score >= 0.7) return { color: "#f59e0b", backgroundColor: "#fffbeb" };
    return { color: "#ef4444", backgroundColor: "#fef2f2" };
  };

  // Convert match_score to percentage (0.98 -> 98%)
  const scorePercentage = Math.round(resume.match_score * 100);

  return (
    <div
      style={{
        backgroundColor: isSelected ? "#eff6ff" : "white",
        borderRadius: "16px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        padding: "24px",
        border: isSelected ? "2px solid #3b82f6" : "2px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "start",
            gap: "16px",
            flex: 1,
            minWidth: "300px",
          }}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelection}
            style={{
              marginTop: "4px",
              width: "20px",
              height: "20px",
              accentColor: "#3b82f6",
              cursor: "pointer",
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
                flexWrap: "wrap",
              }}
            >
              <h4
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#111827",
                  margin: 0,
                }}
              >
                {resume.name}
              </h4>
              <div
                style={{
                  ...getScoreColor(resume.match_score),
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Star style={{ width: "16px", height: "16px" }} />
                <span>{scorePercentage}% Match</span>
              </div>
            </div>

            <p
              style={{
                color: "#4b5563",
                marginBottom: "12px",
                margin: "0 0 12px 0",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {resume.jd_title}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                <span style={{ fontWeight: "500", color: "#374151" }}>✉️</span>
                <span>{resume.email}</span>
              </div>

              {resume.phone && resume.phone !== "Not Found" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    color: "#6b7280",
                  }}
                >
                  <span style={{ fontWeight: "500", color: "#374151" }}>
                    📞
                  </span>
                  <span>{resume.phone}</span>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                <span style={{ fontWeight: "500", color: "#374151" }}>🆔</span>
                <span>ID: {resume.id}</span>
              </div>
            </div>

            {/* Placeholder for skills - you can add this data later */}
            <div
              style={{
                padding: "12px",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  margin: "0 0 8px 0",
                }}
              >
                Position: {resume.jd_title}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                Match Score: {scorePercentage}% compatibility with job
                requirements
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: "8px",
            minWidth: "120px",
          }}
        >
          <Button variant="outline" size="sm">
            View Resume
          </Button>
          <Button variant="primary" size="sm">
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};
