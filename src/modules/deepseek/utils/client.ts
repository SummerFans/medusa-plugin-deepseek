import { DeepSeekChatData, DeepSeekBalance } from '../types';

class Client {
  private baseUrl: string;
  private apiKey: string;

  constructor(apiKey: string, baseUrl: string = 'https://api.deepseek.com') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async chat(data: DeepSeekChatData, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}/chat/completions`;

    // Set default headers
    options.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      ...options.headers
    };

    options.method = 'POST'
    options.body = JSON.stringify(data);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Request failed: ${error.message}`);
      throw error;
    }
  }

  async balance(): Promise<DeepSeekBalance> {
    const url = `${this.baseUrl}/user/balance`;

    // Set default headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    try {
      const response = await fetch(url, {
        headers,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Request failed: ${error.message}`);
      throw error;
    }
  }
}

export default Client