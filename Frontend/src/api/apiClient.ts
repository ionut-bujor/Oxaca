
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
      const response = await fetch(`${this.baseUrl}${path}`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error("Backend unavailable");
      return response.json();
    } catch (error) {
      console.error(`[API] Error fetching ${path}:`, error);
      // Fallback to mock data if available
      if (options.mockData) return options.mockData;
      throw error;
    }
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    console.debug(`[API] POST ${path}`, body);
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const msg = await response.text().catch(() => 'Request failed');
      throw new Error(msg);
    }
    return response.json();
  }

  async put<T>(path: string, body: unknown): Promise<T> {
    console.debug(`[API] PUT ${path}`, body);
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const msg = await response.text().catch(() => 'Request failed');
      throw new Error(msg);
    }
    return response.json();
  }

  async delete<T>(path: string): Promise<T> {
    console.debug(`[API] DELETE ${path}`);
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) {
      const msg = await response.text().catch(() => 'Request failed');
      throw new Error(msg);
    }
    return response.json();
  }
}

export const apiClient = new ApiClient();
