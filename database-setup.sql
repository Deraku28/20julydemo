-- TASK 2: Database Schema & Supabase Setup
-- Run these commands in your Supabase SQL Editor

-- 1. Create Database Table
CREATE TABLE interest_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribe_newsletter BOOLEAN DEFAULT false,
  subscribe_updates BOOLEAN DEFAULT false,
  subscribe_releases BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Database Indexes
-- Index for faster email lookups
CREATE INDEX idx_interest_submissions_email ON interest_submissions(email);

-- Index for analytics queries
CREATE INDEX idx_interest_submissions_created_at ON interest_submissions(created_at);

-- 3. Configure Row Level Security (RLS)
-- Enable RLS
ALTER TABLE interest_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for form submission)
CREATE POLICY "Allow anonymous insert" ON interest_submissions
FOR INSERT TO anon WITH CHECK (true);

-- Allow reading count only (for displaying submission count)
CREATE POLICY "Allow count read" ON interest_submissions
FOR SELECT TO anon USING (true);

-- 4. Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_interest_submissions_updated_at 
    BEFORE UPDATE ON interest_submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Test the setup with a sample insert (optional)
-- INSERT INTO interest_submissions (name, email, subscribe_newsletter, subscribe_updates, subscribe_releases)
-- VALUES ('Test User', 'test@example.com', true, false, true); 