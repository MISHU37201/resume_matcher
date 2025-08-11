import React, { useState, useCallback } from "react";
import { Header } from "./components/layout/Header/Header";
import { HeroSection } from "./components/sections/HeroSection/HeroSection";
import { JobDescriptionInput } from "./components/forms/JobDescriptionInput/JobDescriptionInput";
import { ResumeUpload } from "./components/forms/ResumeUpload/ResumeUpload";
import { FilterControls } from "./components/controls/FilterControls/FilterControls";
import { ResumeList } from "./components/resume/ResumeList/ResumeList";
import { Button } from "./components/ui/Button/Button";
import { Search, ChevronRight } from "./components/ui/icons";
import { useResumeMatching } from "./hooks/useResumeMatching";
import { ResumeMatcherAPI } from "./services/api";
import { validateFile, downloadFile } from "./utils/helpers";

const ResumeMatcherApp: React.FC = () => {
  // State management
  const [jobDescription, setJobDescription] = useState("");
  const [uploadedJdId, setUploadedJdId] = useState<string | null>(null); // <-- JD ID after upload
  const [uploadedResumes, setUploadedResumes] = useState<File[]>([]);
  const [selectedResumes, setSelectedResumes] = useState(new Set<number>());
  const [filterScore, setFilterScore] = useState(0);

  // Custom hooks
  const { matchedResumes, isAnalyzing, analyzeResumes } = useResumeMatching();

  // API service
  const api = new ResumeMatcherAPI();

  // Handlers
  const handleFileUpload = useCallback((files: File[]) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach((file) => {
      const validation = validateFile(file);
      if (validation.isValid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });

    if (errors.length > 0) {
      alert(`Some files were rejected:\n${errors.join("\n")}`);
    }

    setUploadedResumes(validFiles);
  }, []);

  // Handle Job Description text change
  const handleJobDescriptionChange = useCallback((text: string) => {
    setJobDescription(text);
  }, []);

  // Handle JD upload success to get jd_id from backend
  const handleJDUploaded = useCallback((jdId: string) => {
    setUploadedJdId(jdId);
  }, []);

  const handleAnalyzeResumes = useCallback(() => {
    if (!uploadedJdId) {
      alert("Please upload a job description first!");
      return;
    }
    analyzeResumes(uploadedJdId, uploadedResumes);
  }, [uploadedJdId, uploadedResumes, analyzeResumes]);

  const toggleResumeSelection = useCallback(
    (id: number) => {
      const newSelected = new Set(selectedResumes);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      setSelectedResumes(newSelected);
    },
    [selectedResumes]
  );

  const handleDownloadSelected = useCallback(async () => {
    try {
      const selectedIds = Array.from(selectedResumes);
      const blob = await api.downloadSelectedResumes(selectedIds);
      downloadFile(
        blob,
        `selected_resumes_${new Date().toISOString().split("T")[0]}.zip`
      );
    } catch (error) {
      console.error("Error downloading resumes:", error);
      alert("Error downloading selected resumes. Please try again.");
    }
  }, [selectedResumes, api]);

  // Filter matched resumes by score threshold
  const filteredMatches = matchedResumes.filter(
    (resume) => resume.score >= filterScore
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #e0e7ff 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <Header candidateCount={matchedResumes.length} />

      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}
      >
        <HeroSection />

        {/* Input Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "32px",
            marginBottom: "48px",
          }}
        >
          <JobDescriptionInput
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            onJDUploaded={handleJDUploaded}
          />
          <ResumeUpload
            uploadedFiles={uploadedResumes}
            onFileUpload={handleFileUpload}
          />
        </div>

        {/* Analyze Button */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Button
            variant="primary"
            size="lg"
            disabled={!uploadedJdId || isAnalyzing}
            onClick={handleAnalyzeResumes}
          >
            {isAnalyzing ? (
              <>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    border: "2px solid white",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                <span>Analyzing Resumes...</span>
              </>
            ) : (
              <>
                <Search style={{ width: "24px", height: "24px" }} />
                <span>Analyze & Match</span>
                <ChevronRight style={{ width: "20px", height: "20px" }} />
              </>
            )}
          </Button>
        </div>

        {/* Results Section */}
        {matchedResumes.length > 0 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            <FilterControls
              filteredCount={filteredMatches.length}
              selectedCount={selectedResumes.size}
              filterScore={filterScore}
              onFilterChange={setFilterScore}
              onDownloadSelected={handleDownloadSelected}
            />
            <ResumeList
              resumes={filteredMatches}
              selectedResumes={selectedResumes}
              onToggleSelection={toggleResumeSelection}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeMatcherApp;
