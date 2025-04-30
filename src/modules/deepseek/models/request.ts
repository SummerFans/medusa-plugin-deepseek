import { model } from "@medusajs/framework/utils";

export const DeepSeekRequest = model.define("plugin-deepseek-request", {
  request_id: model.id().primaryKey(),
  api_name: model.text().index(),
  endpoint: model.text(),
  method: model.text(),
  request_headers: model.json().nullable(),
  request_body: model.json(),
  request_timestamp: model.dateTime().index(),
  status_code: model.number().nullable(),
  response_headers: model.json().nullable(),
  response_body: model.json(),
  response_timestamp: model.dateTime(),
  duration_ms: model.number().nullable(),
  error_message: model.text().nullable(),
  user_id: model.text().index().nullable(),
  client_ip: model.text().nullable(),
  additional_metadata: model.json().nullable(),
});


// CREATE TABLE api_requests (
//   request_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   api_name VARCHAR(100) NOT NULL,  -- 例如 'deepseek_chat'
//   endpoint VARCHAR(255) NOT NULL,  -- API端点路径
//   method VARCHAR(10) NOT NULL,     -- GET/POST/PUT/DELETE等
//   request_headers JSONB,           -- 请求头
//   request_body JSONB,              -- 请求体
//   request_timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
//   status_code INT,                 -- HTTP状态码
//   response_headers JSONB,          -- 响应头
//   response_body JSONB,              -- 响应体
//   response_timestamp TIMESTAMPTZ,   -- 响应时间
//   duration_ms INT,                 -- 请求耗时(毫秒)
//   error_message TEXT,              -- 错误信息(如果有)
//   user_id VARCHAR(100),            -- 可选的用户标识
//   client_ip INET,                  -- 客户端IP
//   additional_metadata JSONB         -- 其他元数据
// );