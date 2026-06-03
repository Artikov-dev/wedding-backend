-- Migration: Add Hall Approval, Calendar, Owner Management, Images, Services, and Analytics Tables
-- Date: 2026-06-03
-- Description: Adds comprehensive new tables for extended backend features

-- ===============================================================
-- 1. HALL APPROVAL SYSTEM
-- ===============================================================

CREATE TABLE IF NOT EXISTS "HallApprovalRequest" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "hallId" UUID NOT NULL REFERENCES "HallProfile"(id) ON DELETE CASCADE,
  "ownerId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'REVISION_REQUESTED')),
  "adminComment" TEXT,
  "approvedBy" UUID REFERENCES "User"(id) ON DELETE SET NULL,
  "approvedAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hall_approval_hallId ON "HallApprovalRequest"("hallId");
CREATE INDEX IF NOT EXISTS idx_hall_approval_ownerId ON "HallApprovalRequest"("ownerId");
CREATE INDEX IF NOT EXISTS idx_hall_approval_status ON "HallApprovalRequest"(status);
CREATE INDEX IF NOT EXISTS idx_hall_approval_approvedBy ON "HallApprovalRequest"("approvedBy");

-- ===============================================================
-- 2. CALENDAR MANAGEMENT
-- ===============================================================

CREATE TABLE IF NOT EXISTS "HallCalendar" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "hallId" UUID NOT NULL REFERENCES "HallProfile"(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  "isAvailable" BOOLEAN NOT NULL DEFAULT TRUE,
  notes TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE("hallId", date)
);

CREATE INDEX IF NOT EXISTS idx_hall_calendar_hallId ON "HallCalendar"("hallId");
CREATE INDEX IF NOT EXISTS idx_hall_calendar_date ON "HallCalendar"(date);
CREATE INDEX IF NOT EXISTS idx_hall_calendar_available ON "HallCalendar"("isAvailable");

-- ===============================================================
-- 3. HALL OWNERS (for owner assignments)
-- ===============================================================

CREATE TABLE IF NOT EXISTS "HallOwner" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "hallId" UUID NOT NULL REFERENCES "HallProfile"(id) ON DELETE CASCADE,
  "ownerId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "assignedBy" UUID NOT NULL REFERENCES "User"(id) ON DELETE RESTRICT,
  "assignedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE("hallId", "ownerId")
);

CREATE INDEX IF NOT EXISTS idx_hall_owner_hallId ON "HallOwner"("hallId");
CREATE INDEX IF NOT EXISTS idx_hall_owner_ownerId ON "HallOwner"("ownerId");
CREATE INDEX IF NOT EXISTS idx_hall_owner_assignedBy ON "HallOwner"("assignedBy");

-- ===============================================================
-- 4. IMAGE MANAGEMENT
-- ===============================================================

CREATE TABLE IF NOT EXISTS "HallImage" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "hallId" UUID NOT NULL REFERENCES "HallProfile"(id) ON DELETE CASCADE,
  "imageUrl" TEXT NOT NULL,
  "publicId" TEXT,
  "displayOrder" INTEGER DEFAULT 0,
  "isMainImage" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hall_image_hallId ON "HallImage"("hallId");
CREATE INDEX IF NOT EXISTS idx_hall_image_isMain ON "HallImage"("isMainImage");

CREATE TABLE IF NOT EXISTS "ServiceImage" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "serviceProviderId" UUID NOT NULL REFERENCES "ServiceProvider"(id) ON DELETE CASCADE,
  "imageUrl" TEXT NOT NULL,
  "publicId" TEXT,
  "displayOrder" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_image_providerId ON "ServiceImage"("serviceProviderId");

CREATE TABLE IF NOT EXISTS "ProfileImage" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL UNIQUE REFERENCES "User"(id) ON DELETE CASCADE,
  "imageUrl" TEXT NOT NULL,
  "publicId" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profile_image_userId ON "ProfileImage"("userId");

-- ===============================================================
-- 5. SINGER MANAGEMENT
-- ===============================================================

CREATE TABLE IF NOT EXISTS "Singer" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  description TEXT,
  "imageUrl" TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  rating NUMERIC NOT NULL DEFAULT 0,
  "totalReviews" INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'UNAVAILABLE', 'INACTIVE')),
  "createdBy" UUID REFERENCES "User"(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_singer_status ON "Singer"(status);
CREATE INDEX IF NOT EXISTS idx_singer_rating ON "Singer"(rating DESC);
CREATE INDEX IF NOT EXISTS idx_singer_createdBy ON "Singer"("createdBy");

-- ===============================================================
-- 6. CAR MANAGEMENT
-- ===============================================================

CREATE TABLE IF NOT EXISTS "Car" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  model TEXT NOT NULL,
  "imageUrl" TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'UNAVAILABLE', 'INACTIVE')),
  "createdBy" UUID REFERENCES "User"(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_car_status ON "Car"(status);
CREATE INDEX IF NOT EXISTS idx_car_model ON "Car"(model);
CREATE INDEX IF NOT EXISTS idx_car_createdBy ON "Car"("createdBy");

-- ===============================================================
-- 7. MENU MANAGEMENT
-- ===============================================================

CREATE TABLE IF NOT EXISTS "Menu" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "hallId" UUID NOT NULL REFERENCES "HallProfile"(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  "vegetarianPrice" NUMERIC,
  "servingSize" INTEGER,
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_menu_hallId ON "Menu"("hallId");
CREATE INDEX IF NOT EXISTS idx_menu_status ON "Menu"(status);

CREATE TABLE IF NOT EXISTS "MenuItem" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "menuId" UUID NOT NULL REFERENCES "Menu"(id) ON DELETE CASCADE,
  "itemName" TEXT NOT NULL,
  description TEXT,
  category TEXT,
  "isVegetarian" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_menu_item_menuId ON "MenuItem"("menuId");
CREATE INDEX IF NOT EXISTS idx_menu_item_category ON "MenuItem"(category);

-- ===============================================================
-- 8. REGIONS AND DISTRICTS
-- ===============================================================

CREATE TABLE IF NOT EXISTS "Region" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  code TEXT UNIQUE,
  description TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_region_active ON "Region"("isActive");

CREATE TABLE IF NOT EXISTS "District" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT,
  "regionId" UUID NOT NULL REFERENCES "Region"(id) ON DELETE CASCADE,
  description TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE("regionId", name)
);

CREATE INDEX IF NOT EXISTS idx_district_regionId ON "District"("regionId");
CREATE INDEX IF NOT EXISTS idx_district_active ON "District"("isActive");
CREATE INDEX IF NOT EXISTS idx_district_name ON "District"(name);

-- ===============================================================
-- 9. ANALYTICS AND METRICS TABLES
-- ===============================================================

CREATE TABLE IF NOT EXISTS "DailyMetric" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  "totalUsers" INTEGER NOT NULL DEFAULT 0,
  "totalOwners" INTEGER NOT NULL DEFAULT 0,
  "totalHalls" INTEGER NOT NULL DEFAULT 0,
  "totalBookings" INTEGER NOT NULL DEFAULT 0,
  "totalRevenue" NUMERIC NOT NULL DEFAULT 0,
  "activeBookings" INTEGER NOT NULL DEFAULT 0,
  "newBookings" INTEGER NOT NULL DEFAULT 0,
  "completedBookings" INTEGER NOT NULL DEFAULT 0,
  "cancelledBookings" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_daily_metric_date ON "DailyMetric"(date DESC);

CREATE TABLE IF NOT EXISTS "OwnerAnalytic" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "ownerId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  month DATE NOT NULL,
  "totalBookings" INTEGER NOT NULL DEFAULT 0,
  "completedBookings" INTEGER NOT NULL DEFAULT 0,
  "totalRevenue" NUMERIC NOT NULL DEFAULT 0,
  "averageRating" NUMERIC DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE("ownerId", month)
);

CREATE INDEX IF NOT EXISTS idx_owner_analytic_ownerId ON "OwnerAnalytic"("ownerId");
CREATE INDEX IF NOT EXISTS idx_owner_analytic_month ON "OwnerAnalytic"(month DESC);

-- ===============================================================
-- 10. ADMIN ANALYTICS TABLE
-- ===============================================================

CREATE TABLE IF NOT EXISTS "AdminAnalytic" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month DATE NOT NULL UNIQUE,
  "totalUsers" INTEGER NOT NULL DEFAULT 0,
  "totalHalls" INTEGER NOT NULL DEFAULT 0,
  "totalBookings" INTEGER NOT NULL DEFAULT 0,
  "totalRevenue" NUMERIC NOT NULL DEFAULT 0,
  "activeBookings" INTEGER NOT NULL DEFAULT 0,
  "averageBookingValue" NUMERIC DEFAULT 0,
  "topRatedHall" UUID REFERENCES "HallProfile"(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_analytic_month ON "AdminAnalytic"(month DESC);

-- ===============================================================
-- 11. COMPOSITE INDEXES FOR PERFORMANCE
-- ===============================================================

CREATE INDEX IF NOT EXISTS idx_booking_status_date ON "Booking"(status, "eventDate");
CREATE INDEX IF NOT EXISTS idx_booking_userId_date ON "Booking"("userId", "eventDate" DESC);
CREATE INDEX IF NOT EXISTS idx_payment_userId_status ON "Payment"("userId", status);
CREATE INDEX IF NOT EXISTS idx_hall_profile_userId ON "HallProfile"("userId");
CREATE INDEX IF NOT EXISTS idx_review_hallId_rating ON "Review"("hallId", rating DESC);

-- ===============================================================
-- 12. CONSTRAINTS AND CHECKS
-- ===============================================================

ALTER TABLE "HallProfile" ADD CONSTRAINT check_capacity CHECK (capacity > 0);
ALTER TABLE "HallProfile" ADD CONSTRAINT check_price_positive CHECK ("pricePerPlate" >= 0);
ALTER TABLE "Menu" ADD CONSTRAINT check_menu_price CHECK (price >= 0);
ALTER TABLE "Singer" ADD CONSTRAINT check_singer_price CHECK (price >= 0);
ALTER TABLE "Car" ADD CONSTRAINT check_car_price CHECK (price >= 0);
ALTER TABLE "DailyMetric" ADD CONSTRAINT check_metrics_non_negative CHECK ("totalUsers" >= 0 AND "totalBookings" >= 0 AND "totalRevenue" >= 0);
