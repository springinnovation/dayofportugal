CREATE TABLE IF NOT EXISTS alert_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT alert_subscribers_has_contact CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'alert_subscribers_email_unique') THEN
    ALTER TABLE alert_subscribers ADD CONSTRAINT alert_subscribers_email_unique UNIQUE (email);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'alert_subscribers_phone_unique') THEN
    ALTER TABLE alert_subscribers ADD CONSTRAINT alert_subscribers_phone_unique UNIQUE (phone);
  END IF;
END $$;
