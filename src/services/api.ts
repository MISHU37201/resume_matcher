export interface ResumeMatch {
  // Define the properties of ResumeMatch according to your application's needs
  id: number;
  name: string;
  score: number;
  // Add other relevant fields here
}

export class ResumeMatcherAPI {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async analyzeResumes(jobDescription: string, resumes: File[]): Promise<ResumeMatch[]> {
    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    
    resumes.forEach((resume, index) => {
      formData.append(`resume_${index}`, resume);
    });

    const response = await fetch(`${this.baseUrl}/analyze-resumes`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getResumeDetails(resumeId: number): Promise<ResumeMatch> {
    const response = await fetch(`${this.baseUrl}/resumes/${resumeId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async downloadResume(resumeId: number): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/resumes/${resumeId}/download`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.blob();
  }

  async downloadSelectedResumes(resumeIds: number[]): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/resumes/download-selected`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeIds })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.blob();
  }
}
