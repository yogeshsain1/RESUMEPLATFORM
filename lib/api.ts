const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

class ApiClient {
  private getAuthHeaders() {
    const token = localStorage.getItem("auth_token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  async downloadResumePDF(resumeId: string): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/resume/${resumeId}/download`, {
      method: "GET",
      headers: {
        ...this.getAuthHeaders(),
        "Content-Type": "application/pdf",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to download resume PDF")
    }

    return response.blob()
  }

  async getResumes() {
    const response = await fetch(`${API_BASE_URL}/resume`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch resumes")
    }

    return response.json()
  }

  async createResume(resumeData: any) {
    const response = await fetch(`${API_BASE_URL}/resume`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(resumeData),
    })

    if (!response.ok) {
      throw new Error("Failed to create resume")
    }

    return response.json()
  }

  async updateResume(resumeId: string, updateData: any) {
    const response = await fetch(`${API_BASE_URL}/resume/${resumeId}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updateData),
    })

    if (!response.ok) {
      throw new Error("Failed to update resume")
    }

    return response.json()
  }

  async deleteResume(resumeId: string) {
    const response = await fetch(`${API_BASE_URL}/resume/${resumeId}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to delete resume")
    }

    return response.json()
  }
}

export const apiClient = new ApiClient()
