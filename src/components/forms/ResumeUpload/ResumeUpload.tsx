import React, { useCallback } from "react";
import { Upload, FileText } from "../../ui/icons";

interface ResumeUploadProps {
  uploadedFiles: File[];
  onFileUpload: (files: File[]) => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({
  uploadedFiles,
  onFileUpload,
}) => {
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      onFileUpload(files);
    },
    [onFileUpload]
  );

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
            background: "linear-gradient(135deg, #10b981, #14b8a6)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Upload style={{ width: "24px", height: "24px", color: "white" }} />
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
            Upload Resumes
          </h3>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Select multiple PDF files
          </p>
        </div>
      </div>
      <div
        style={{
          border: "2px dashed #d1d5db",
          borderRadius: "12px",
          padding: "32px",
          textAlign: "center",
          transition: "border-color 0.3s ease",
          cursor: "pointer",
        }}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="resume-upload"
        />
        <label
          htmlFor="resume-upload"
          style={{ cursor: "pointer", display: "block" }}
        >
          <Upload
            style={{
              width: "48px",
              height: "48px",
              color: "#9ca3af",
              margin: "0 auto 16px",
            }}
          />
          <p
            style={{
              color: "#4b5563",
              marginBottom: "8px",
              margin: "0 0 8px 0",
            }}
          >
            Click to upload resumes
          </p>
          <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0 }}>
            PDF, DOC, DOCX up to 10MB each
          </p>
        </label>
      </div>
      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: "16px" }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "8px",
            }}
          >
            {uploadedFiles.length} files selected
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {uploadedFiles.slice(0, 3).map((file, index) => (
              <div
                key={index}
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FileText style={{ width: "16px", height: "16px" }} />
                {file.name}
              </div>
            ))}
            {uploadedFiles.length > 3 && (
              <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0 }}>
                +{uploadedFiles.length - 3} more files
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
