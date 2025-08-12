import { ResumeMatch } from "../types/ResumeMatch";

export class ResumeMatcherAPI {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:5000") {
    this.baseUrl = baseUrl;
  }

  // Updated method to match your backend that expects jd_id
  async matchResumesByJdId(
    jdId: string | number,
    resumes: File[] = []
  ): Promise<ResumeMatch[]> {
    const formData = new FormData();
    formData.append("jd_id", String(jdId));

    // Append resume files only if provided
    resumes.forEach((file) => {
      formData.append("resumes", file, file.name);
    });

    const response = await fetch(`${this.baseUrl}/match`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log("Raw API response:", data);

    // Handle different possible response structures from your backend
    if (data.matched_candidates) {
      console.log(
        "Found matched_candidates, count:",
        data.matched_candidates.length
      );
      return data.matched_candidates;
    } else if (data.candidates) {
      console.log("Found candidates, count:", data.candidates.length);
      return data.candidates;
    } else if (data.matches) {
      console.log("Found matches, count:", data.matches.length);
      return data.matches;
    } else if (Array.isArray(data)) {
      console.log("Data is array, count:", data.length);
      return data;
    } else {
      console.warn("Unexpected response structure:", data);
      return [];
    }
  }

  // Keep the original method if you still need it for a different flow
  async analyzeResumes(
    jobDescription: string,
    resumes: File[]
  ): Promise<ResumeMatch[]> {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);

    resumes.forEach((resume, index) => {
      formData.append(`resume_${index}`, resume);
    });

    const response = await fetch(`${this.baseUrl}/match`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Handle response structure
    if (data.matched_candidates) {
      return data.matched_candidates;
    } else if (data.candidates) {
      return data.candidates;
    } else if (data.matches) {
      return data.matches;
    } else if (Array.isArray(data)) {
      return data;
    } else {
      return [];
    }
  }

  async getResumeDetails(resumeId: number): Promise<ResumeMatch> {
    const response = await fetch(`${this.baseUrl}/resumes/${resumeId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async downloadResume(resumeId: number): Promise<Blob> {
    const response = await fetch(
      `${this.baseUrl}/resumes/${resumeId}/download`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.blob();
  }

  async downloadSelectedResumes(resumeIds: number[]): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/resumes/download-selected`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resumeIds }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.blob();
  }
}
