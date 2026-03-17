CREATE TABLE IF NOT EXISTS volunteers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name     VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  phone         VARCHAR(50),
  area_of_interest VARCHAR(255),
  message       TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
