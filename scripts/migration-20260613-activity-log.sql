-- Migration: Add ActivityLog Table
-- Date: 2026-06-13
-- Description: Adds ActivityLog table for audit trailing

CREATE TABLE IF NOT EXISTS "ActivityLog" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  "targetId" UUID,
  "oldValue" JSONB,
  "newValue" JSONB,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activitylog_userId ON "ActivityLog"("userId");
CREATE INDEX IF NOT EXISTS idx_activitylog_action ON "ActivityLog"(action);
CREATE INDEX IF NOT EXISTS idx_activitylog_targetId ON "ActivityLog"("targetId");
CREATE INDEX IF NOT EXISTS idx_activitylog_createdAt ON "ActivityLog"("createdAt");
