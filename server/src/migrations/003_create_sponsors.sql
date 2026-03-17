CREATE TABLE IF NOT EXISTS sponsors (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(255) NOT NULL,
  description   TEXT,
  logo_url      VARCHAR(500),
  website_url   VARCHAR(500),
  tier          VARCHAR(50) DEFAULT 'supporter',
  is_published  BOOLEAN DEFAULT true,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
