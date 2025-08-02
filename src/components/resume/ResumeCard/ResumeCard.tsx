import React from "react";
import { ResumeMatch } from "../../../types/ResumeMatch";
import { Star, Clock } from "../../ui/icons";
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
    if (score >= 90) return { color: "#10b981", backgroundColor: "#f0fdf4" };
    if (score >= 80) return { color: "#3b82f6", backgroundColor: "#eff6ff" };
    if (score >= 70) return { color: "#f59e0b", backgroundColor: "#fffbeb" };
    return { color: "#ef4444", backgroundColor: "#fef2f2" };
  };

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
                  ...getScoreColor(resume.score),
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
                <span>{resume.score}% Match</span>
              </div>
            </div>
            <p
              style={{
                color: "#4b5563",
                marginBottom: "12px",
                margin: "0 0 12px 0",
              }}
            >
              {resume.title}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Clock style={{ width: "16px", height: "16px" }} />
                <span>{resume.experience}</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              {resume.skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    padding: "4px 12px",
                    backgroundColor: "#dbeafe",
                    color: "#1e40af",
                    borderRadius: "9999px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
            <div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "4px",
                }}
              >
                Key Highlights:
              </p>
              <ul
                style={{
                  fontSize: "14px",
                  color: "#4b5563",
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                }}
              >
                {resume.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#3b82f6",
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
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
