import DeepSeekModuleService from '../service';
import { DeepSeekChatData, DeepSeekBalance, DeepSeekChatCompletion } from '../types';

class Client {
  private baseUrl: string = 'https://api.deepseek.com';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(data: DeepSeekChatData, options: RequestInit = {}, deepSeekModule:DeepSeekModuleService): Promise<DeepSeekChatCompletion> {
    const url = `${this.baseUrl}/chat/completions`;

    // Set default headers
    options.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      ...options.headers
    };

    options.method = 'POST'
    options.body = JSON.stringify(data);

    const startDate = new Date()

    const c = await deepSeekModule.createDeepSeekRequests({
      api_name: data.model,
      endpoint: "/chat/completions",
      method: "POST",
      request_headers: JSON.stringify({ "Content-Type": "application/json" }),
      request_body: JSON.stringify(data.messages),
      request_timestamp: startDate,
    });

    try {
      let response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json() as DeepSeekChatCompletion;

      const endDate = new Date();
      if(data.error){

        await deepSeekModule.updateDeepSeekRequests({
          request_id:c.request_id,
          response_headers:JSON.stringify(response.headers),
          response_timestamp: endDate,
          status_code:response.status,
          error_message: data.error.message
        });
        throw Error(data.error.message);
      }

      await deepSeekModule.updateDeepSeekRequests({
        request_id:c.request_id,
        status_code: 200,
        response_headers:JSON.stringify(response.headers),
        response_body: JSON.stringify(data),
        response_timestamp: endDate,
        duration_ms:(endDate.getTime() - startDate.getTime()) * 1000,
      });
      return data;
    } catch (error) {
      const endDate = new Date();

      const u = await deepSeekModule.updateDeepSeekRequests({
        request_id:c.request_id,
        status_code: 500,
        response_timestamp: endDate,
        error_message:error.message,
      });

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