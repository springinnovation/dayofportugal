CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         VARCHAR(255) NOT NULL,
  description   TEXT NOT NULL,
  date_start    DATE,
  date_end      DATE,
  date_display  VARCHAR(100) NOT NULL,
  time_start    TIME,
  time_end      TIME,
  location      VARCHAR(255) NOT NULL,
  category      VARCHAR(100),
  image_url     VARCHAR(500),
  is_featured   BOOLEAN DEFAULT false,
  is_annual     BOOLEAN DEFAULT true,
  is_published  BOOLEAN DEFAULT true,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username      VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
