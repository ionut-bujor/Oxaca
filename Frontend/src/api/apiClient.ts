
/**
 * Generic API Client.
 * Structured to be easily swapped with Fetch or Axios.
 */
class ApiClient {
  private baseUrl: string = '/api';

  /**
   * Standardized GET request.
   * Teammates can modify the 'fetch' block once the endpoint is ready.
   */
  async get<T>(path: string, options: { mockData?: T } = {}): Promise<T> {
    console.debug(`[API] Requesting: ${path}`);

    // Simulation of network latency
    await new Promise(resolve => setTimeout(resolve, 600));

    // INTEGRATION POINT:
    // const response = await fetch(`${this.baseUrl}${path}`);
    // if (!response.ok) throw new Error("Backend unavailable");
    // return response.json();

    if (options.mockData) return options.mockData;
    throw new Error(`Endpoint ${path} not implemented.`);
  }

  async post<T>(path: string, body: any): Promise<T> {
    console.debug(`[API] Posting to: ${path}`, body);
    throw new Error("POST methods not yet implemented by backend team.");
  }
}

export const apiClient = new ApiClient();
