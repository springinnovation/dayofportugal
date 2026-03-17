CREATE TABLE IF NOT EXISTS scholarship_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Personal Information
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  home_address TEXT NOT NULL,
  campus_address TEXT,
  phone_home VARCHAR(50),
  phone_cell VARCHAR(50),
  email VARCHAR(255) NOT NULL,
  us_citizen BOOLEAN NOT NULL DEFAULT true,
  parent_org_membership VARCHAR(255),
  portuguese_ancestry TEXT NOT NULL,
  -- Educational Background (stored as JSON array)
  education JSONB NOT NULL DEFAULT '[]',
  current_gpa VARCHAR(10) NOT NULL,
  anticipated_graduation VARCHAR(20),
  -- Extra-curricular Activities (stored as JSON array)
  activities JSONB NOT NULL DEFAULT '[]',
  -- Awards and Recognition (stored as JSON array)
  awards JSONB NOT NULL DEFAULT '[]',
  -- Essay
  essay TEXT NOT NULL,
  -- Certification
  certified BOOLEAN NOT NULL DEFAULT false,
  -- Admin notes
  admin_notes TEXT,
  -- Application status
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
