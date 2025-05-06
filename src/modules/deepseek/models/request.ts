import { model } from "@medusajs/framework/utils";

export const DeepSeekRequest = model.define("plugin-deepseek-request", {
  request_id: model.id({prefix:'ds'}).primaryKey(),
  api_name: model.text().index(),
  endpoint: model.text(),
  method: model.text(),
  request_headers: model.json().nullable(),
  request_body: model.json(),
  request_timestamp: model.dateTime().index(),
  status_code: model.number().nullable(),
  response_headers: model.json().nullable(),
  response_body: model.json().nullable(),
  response_timestamp: model.dateTime().nullable(),
  duration_ms: model.bigNumber().nullable(),
  error_message: model.text().nullable(),
  user_id: model.text().index().nullable(),
  client_ip: model.text().nullable(),
  additional_metadata: model.json().nullable(),
});
