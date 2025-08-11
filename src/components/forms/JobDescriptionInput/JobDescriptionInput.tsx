import React, { useState } from "react";
import { FileText } from "../../ui/icons";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  onJDUploaded: (jdId: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  value,
  onChange,
  onJDUploaded,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!value.trim()) {
      alert("Please enter a job description before uploading.");
      return;
    }

    setLoading(true);
    try {
      // Create a fake file from the textarea text
      const textFile = new Blob([value], { type: "text/plain" });
      const formData = new FormData();
      formData.append("jd", textFile, "job_description.txt");

      const res = await fetch("http://localhost:5000/upload-jd", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.jd_id) {
        onJDUploaded(data.jd_id);
      }

      alert(data.message || "Uploaded successfully!");
    } catch (err) {
      console.error("Error uploading JD:", err);
      alert("Failed to upload JD. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      {/* Header */}
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

      {/* Dashed box with textarea */}
      <div
        style={{
          border: "2px dashed #d1d5db",
          borderRadius: "12px",
          padding: "24px",
          transition: "border-color 0.3s ease",
        }}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your job description here..."
          style={{
            width: "100%",
            height: "120px",
            padding: "16px",
            border: "none",
            outline: "none",
            resize: "none",
            color: "#374151",
            fontSize: "14px",
            background: "transparent",
          }}
        />
      </div>

      {/* Upload button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: "16px",
          padding: "10px 20px",
          backgroundColor: loading ? "#d1d5db" : "#a855f7",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background-color 0.2s ease",
        }}
      >
        {loading ? "Uploading..." : "Upload Job Description"}
      </button>
    </div>
  );
};
