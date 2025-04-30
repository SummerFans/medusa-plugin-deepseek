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
WHERE request_timestamp >= DATE_TRUNC('hour', NOW() - INTERVAL '1 hour')
  AND request_timestamp < DATE_TRUNC('hour', NOW())
GROUP BY api_name, user_id, DATE(request_timestamp), EXTRACT(HOUR FROM request_timestamp)
ON CONFLICT (api_name, user_id, date, hour) 
DO UPDATE SET
    request_count = api_usage_metrics.request_count + EXCLUDED.request_count,
    avg_duration_ms = (api_usage_metrics.avg_duration_ms * api_usage_metrics.request_count + EXCLUDED.avg_duration_ms * EXCLUDED.request_count) / (api_usage_metrics.request_count + EXCLUDED.request_count),
    error_count = api_usage_metrics.error_count + EXCLUDED.error_count;
 */

export default async function myCustomJob() {
  console.log("I'll be executed three times only.");
}

export const config = {
  name: "hello-world",
  schedule: "0 0 * * *",
};
