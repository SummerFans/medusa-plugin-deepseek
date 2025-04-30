import { model } from "@medusajs/framework/utils";

// Aggregate indicator update (scheduled task)
export const DeepSeekRequest = model
  .define("plugin-deepseek-usage-metrics", {
    metric_id: model.id().primaryKey(),
    api_name: model.text().index(),
    user_id: model.text().nullable(),
    date: model.dateTime(),
    hour: model.number(),
    request_count: model.number().default(0),
    avg_duration_ms: model.float().nullable(),
    error_count: model.number().nullable(),
  })
  .indexes([
    {
      on: ["api_name", "user_id", "date", "hour"],
      unique: true,
    },
  ]);