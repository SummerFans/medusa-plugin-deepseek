import { Migration } from '@mikro-orm/migrations';

export class Migration20250430180343 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "plugin-deepseek-usage-metrics" drop constraint if exists "plugin-deepseek-usage-metrics_api_name_user_id_date_hour_unique";`);
    this.addSql(`create table if not exists "plugin-deepseek-request" ("request_id" text not null, "api_name" text not null, "endpoint" text not null, "method" text not null, "request_headers" jsonb null, "request_body" jsonb not null, "request_timestamp" timestamptz not null, "status_code" integer null, "response_headers" jsonb null, "response_body" jsonb null, "response_timestamp" timestamptz null, "duration_ms" numeric null, "error_message" text null, "user_id" text null, "client_ip" text null, "additional_metadata" jsonb null, "raw_duration_ms" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "plugin-deepseek-request_pkey" primary key ("request_id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_plugin-deepseek-request_api_name" ON "plugin-deepseek-request" (api_name) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_plugin-deepseek-request_request_timestamp" ON "plugin-deepseek-request" (request_timestamp) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_plugin-deepseek-request_user_id" ON "plugin-deepseek-request" (user_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_plugin-deepseek-request_deleted_at" ON "plugin-deepseek-request" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "plugin-deepseek-usage-metrics" ("metric_id" text not null, "api_name" text not null, "user_id" text null, "date" timestamptz not null, "hour" integer not null, "request_count" integer not null default 0, "avg_duration_ms" real null, "error_count" integer null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "plugin-deepseek-usage-metrics_pkey" primary key ("metric_id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_plugin-deepseek-usage-metrics_api_name" ON "plugin-deepseek-usage-metrics" (api_name) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_plugin-deepseek-usage-metrics_deleted_at" ON "plugin-deepseek-usage-metrics" (deleted_at) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_plugin-deepseek-usage-metrics_api_name_user_id_date_hour_unique" ON "plugin-deepseek-usage-metrics" (api_name, user_id, date, hour) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "plugin-deepseek-request" cascade;`);

    this.addSql(`drop table if exists "plugin-deepseek-usage-metrics" cascade;`);
  }

}
