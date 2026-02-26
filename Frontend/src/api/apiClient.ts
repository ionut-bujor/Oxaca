
/**
 * Generic API Client.
 * Structured to be easily swapped with Fetch or Axios.
 */
class ApiClient {
  private baseUrl: string = '';

  /**
   * Standardized GET request.
   * Teammates can modify the 'fetch' block once the endpoint is ready.
   */
  
  async get<T>(path: string, options: { mockData?: T } = {}): Promise<T> {
    console.debug(`[API] Requesting: ${path}`);

    try {
      const response = await fetch(`${this.baseUrl}${path}`);
      if (!response.ok) throw new Error("Backend unavailable");
      return response.json();
    } catch (error) {
      console.error(`[API] Error fetching ${path}:`, error);
      // Fallback to mock data if available
      if (options.mockData) return options.mockData;
      throw error;
    }
  }

  async post<T>(path: string, body: any): Promise<T> {
    console.debug(`[API] Posting to: ${path}`, body);
    throw new Error("POST methods not yet implemented by backend team.");
  }
}

export const apiClient = new ApiClient();
