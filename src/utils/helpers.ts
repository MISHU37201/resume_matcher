import { MAX_FILE_SIZE } from "./constants";

export const getScoreColor = (score: number) => {
  if (score >= 90) return { color: "#10b981", backgroundColor: "#f0fdf4" };
  if (score >= 80) return { color: "#3b82f6", backgroundColor: "#eff6ff" };
  if (score >= 70) return { color: "#f59e0b", backgroundColor: "#fffbeb" };
  return { color: "#ef4444", backgroundColor: "#fef2f2" };
};

export const validateFile = (
  file: File
): { isValid: boolean; error?: string } => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Only PDF, DOC, and DOCX files are allowed",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: "File size must be less than 10MB" };
  }

  return { isValid: true };
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
