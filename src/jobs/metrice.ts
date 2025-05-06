/**
 * 
 * INSERT INTO api_usage_metrics (
    api_name,
    user_id,
    date,
    hour,
    request_count,
    avg_duration_ms,
    error_count
)
SELECT 
    api_name,
    user_id,
    DATE(request_timestamp),
    EXTRACT(HOUR FROM request_timestamp),
    COUNT(*),
    AVG(duration_ms),
    SUM(CASE WHEN status_code >= 400 OR error_message IS NOT NULL THEN 1 ELSE 0 END)
FROM api_requests
WHERE 
request_timestamp >= DATE_TRUNC('hour', NOW() - INTERVAL '1 hour')   AND 
request_timestamp < DATE_TRUNC('hour', NOW())
GROUP BY api_name, user_id, DATE(request_timestamp),
EXTRACT(HOUR FROM request_timestamp)
ON CONFLICT (api_name, user_id, date, hour) 
DO UPDATE SET
    request_count = api_usage_metrics.request_count + EXCLUDED.request_count,
    avg_duration_ms = (api_usage_metrics.avg_duration_ms * api_usage_metrics.request_count + EXCLUDED.avg_duration_ms * EXCLUDED.request_count) / (api_usage_metrics.request_count + EXCLUDED.request_count),
    error_count = api_usage_metrics.error_count + EXCLUDED.error_count;
 */
import { MedusaContainer } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/utils";
import { DEEPSEEK_MODULE } from "../modules/deepseek";
import DeepSeekModuleService from "../modules/deepseek/service";

export default async function myCustomJob(container: MedusaContainer) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const deepseekService: DeepSeekModuleService =  container.resolve(DEEPSEEK_MODULE);

  logger.debug("hello");
}

export const config = {
  name: "hello-world",
  schedule: "* * * * *",
};
