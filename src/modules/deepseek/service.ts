import { MedusaService } from "@medusajs/framework/utils";
import { Logger } from "@medusajs/framework/types";
import { DeepSeekBalance, DeepSeekModuleOptions } from "./types";
import Client from "./utils/client";

class A extends MedusaService({}) {
  protected get(a:string) {}
}

class DeepSeekModuleService extends A {
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

  async chat() {
    this._logger.debug('')
  }

  async balance(): Promise<DeepSeekBalance> {


    return {
      "is_available": true,
      "balance_infos": [
        {
          "currency": "CNY",
          "total_balance": "110.00",
          "granted_balance": "10.00",
          "topped_up_balance": "100.00"
        }
      ]
    }
  }

}

export default DeepSeekModuleService;
