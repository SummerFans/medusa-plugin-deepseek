import { MedusaService } from "@medusajs/framework/utils";
import { Logger } from "@medusajs/framework/types";
import {
  DeepSeekBalance,
  DeepSeekChatCompletion,
  DeepSeekChatData,
  DeepSeekDataMessage,
  DeepSeekModuleOptions,
} from "./types";
import { DeepSeekRequest } from "./models/request";
import { DeepSeekUsageMetrics } from "./models/usage_metrics";
import Client from "./utils/client";

class DeepSeekModuleService extends MedusaService({
  DeepSeekRequest,
  DeepSeekUsageMetrics,
}) {
  private _client: Client;
  private _logger: Logger;

  constructor(
    { logger }: { logger: Logger },
    { api_key }: DeepSeekModuleOptions
  ) {
    super(...arguments);

    this._logger = logger;

    this._client = new Client(api_key);
  }

  async chat(messages: DeepSeekDataMessage[]): Promise<DeepSeekChatCompletion> {
    this._logger.debug("[DeepSeekModuleService]: Call Chat");

    const chatData: DeepSeekChatData = {
      model: "deepseek-chat",
      messages: messages,
    };

    const rc = await this._client.chat(chatData, {}, this);

    return rc;
  }

  async balance(): Promise<DeepSeekBalance> {
    try {
      const balance = await this._client.balance();
      return balance;
    } catch (e) {
      this._logger.error("[DeepSeekModule] balance error:" + e.message);
      return {
        error:e.message,
        is_available: false,
        balance_infos: [
          {
            currency: "USD",
            total_balance: "0.00",
            granted_balance: "0.00",
            topped_up_balance: "0.00",
          },
        ],
      };
    }
  }
}

export default DeepSeekModuleService;
