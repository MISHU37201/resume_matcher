import React, { useCallback, useState } from "react";
import { Upload, FileText } from "../../ui/icons";

interface ResumeUploadProps {
  uploadedFiles: File[];
  onFileUpload: (files: File[]) => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({
  uploadedFiles,
  onFileUpload,
}) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      if (!files.length) return;

      setUploading(true);
      try {
        for (const file of files) {
          const formData = new FormData();
          formData.append("resume", file);

          const res = await fetch("http://localhost:5000/upload-resume", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          if (!res.ok) {
            console.error(`Error uploading ${file.name}:`, data.error);
            alert(`❌ Failed to upload ${file.name}: ${data.error}`);
          } else {
            console.log(`✅ Uploaded ${file.name}`, data);
          }
        }

        // Update UI with newly uploaded files
        onFileUpload([...uploadedFiles, ...files]);
      } catch (err) {
        console.error("Upload error:", err);
        alert("An error occurred while uploading resumes.");
      } finally {
        setUploading(false);
      }
    },
    [uploadedFiles, onFileUpload]
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

      {/* Upload Box */}
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
            {uploading ? "Uploading..." : "Click to upload resumes"}
          </p>
          <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0 }}>
            PDF, DOC, DOCX up to 10MB each
          </p>
        </label>
      </div>

      {/* File List */}
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
            {uploadedFiles.length} files uploaded
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
