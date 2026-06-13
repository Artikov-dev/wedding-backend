-- Migration: Add SystemSettings Table
-- Date: 2026-06-13
-- Description: Adds SystemSettings table for global configurations

CREATE TABLE IF NOT EXISTS "SystemSettings" (
  "key" TEXT PRIMARY KEY,
  "value" JSONB NOT NULL,
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default settings
INSERT INTO "SystemSettings" ("key", "value") VALUES
('platformFeePercent', '5'::jsonb),
('supportEmail', '"support@wedding-platform.uz"'::jsonb),
('supportPhone', '"+998901234567"'::jsonb),
('contactAddress', '"Toshkent shahar, Yunusobod tumani"'::jsonb),
('socialInstagram', '"https://instagram.com/"'::jsonb),
('socialTelegram', '"https://t.me/"'::jsonb)
ON CONFLICT ("key") DO NOTHING;
