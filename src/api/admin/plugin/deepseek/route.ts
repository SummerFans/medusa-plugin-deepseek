import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { DEEPSEEK_MODULE } from "../../../../modules/deepseek";
import DeepSeekModuleService from "../../../../modules/deepseek/service";

export async function GET(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
  const query = req.query;

  const deepseekService: DeepSeekModuleService =
    req.scope.resolve(DEEPSEEK_MODULE);

  if (query.type == "balance") {
    const balance = await deepseekService.balance();
    return res.json({
      balance,
    });
  }

  // const list = await deepseekService.listAndCountDeepSeekRequests()
  res.json(req.query);
}

export async function POST(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
  const deepseekService: DeepSeekModuleService =
    req.scope.resolve(DEEPSEEK_MODULE);

    const userId = req.auth_context.actor_id;


  const data = await deepseekService.chat([
    {
      role: "user",
      content: "Hello",
    },
  ]);

  res.json(data);
}
