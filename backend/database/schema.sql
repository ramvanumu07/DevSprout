-- DevSprout Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- USERS TABLE (with manual access control)
-- =====================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id VARCHAR(100) UNIQUE NOT NULL,  -- Custom ID like "student001"
  password VARCHAR(255) NOT NULL,            -- Simple password (hashed)
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),                         -- Optional email
  has_access BOOLEAN DEFAULT FALSE,          -- Manual payment verification
  access_expires_at TIMESTAMP WITH TIME ZONE, -- Optional expiry date
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================
-- PROGRESS TABLE
-- =====================
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  topic_id VARCHAR(100) NOT NULL,
  subtopic_id VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
  phase VARCHAR(50) NOT NULL DEFAULT 'learning', -- 'learning', 'assignment'
  assignments_completed INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, topic_id, subtopic_id)
);

-- =====================
-- CHAT HISTORY TABLE
-- =====================
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  topic_id VARCHAR(100) NOT NULL,
  subtopic_id VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL, -- 'user', 'assistant', 'system'
  content TEXT NOT NULL,
  phase VARCHAR(50), -- 'learning', 'assignment'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================
-- AI USAGE TRACKING (for rate limiting)
-- =====================
CREATE TABLE ai_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tokens_used INTEGER DEFAULT 0,
  requests_count INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- =====================
-- ADMINS TABLE
-- =====================
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  role VARCHAR(50) DEFAULT 'admin', -- 'admin', 'super_admin'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================
-- INDEXES FOR PERFORMANCE
-- =====================
CREATE INDEX idx_users_student_id ON users(student_id);
CREATE INDEX idx_users_has_access ON users(has_access);
CREATE INDEX idx_progress_user_id ON progress(user_id);
CREATE INDEX idx_progress_status ON progress(status);
CREATE INDEX idx_chat_history_user_subtopic ON chat_history(user_id, topic_id, subtopic_id);
CREATE INDEX idx_chat_history_created ON chat_history(created_at);
CREATE INDEX idx_ai_usage_user_date ON ai_usage(user_id, date);

-- =====================
-- ROW LEVEL SECURITY (RLS)
-- =====================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS, so backend can access everything
-- These policies are for direct Supabase client access if needed

-- =====================
-- FUNCTIONS
-- =====================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_progress_updated_at
  BEFORE UPDATE ON progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to check if user has access
CREATE OR REPLACE FUNCTION check_user_access(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_record RECORD;
BEGIN
  SELECT has_access, access_expires_at INTO user_record
  FROM users WHERE id = p_user_id;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Check if has_access is true
  IF NOT user_record.has_access THEN
    RETURN FALSE;
  END IF;
  
  -- Check if not expired (if expiry is set)
  IF user_record.access_expires_at IS NOT NULL AND user_record.access_expires_at < NOW() THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to get platform stats (for admin dashboard)
CREATE OR REPLACE FUNCTION get_platform_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_users', (SELECT COUNT(*) FROM users),
    'active_users', (SELECT COUNT(*) FROM users WHERE has_access = TRUE),
    'pending_users', (SELECT COUNT(*) FROM users WHERE has_access = FALSE),
    'lessons_completed', (SELECT COUNT(*) FROM progress WHERE status = 'completed'),
    'messages_today', (SELECT COUNT(*) FROM chat_history WHERE created_at > CURRENT_DATE)
  ) INTO result;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- =====================
-- SAMPLE DATA (Optional - for testing)
-- =====================
-- Uncomment to create a test admin account
-- INSERT INTO users (student_id, password, name, has_access) 
-- VALUES ('admin', 'admin123', 'Admin User', TRUE);
-- 
-- INSERT INTO admins (user_id) 
-- SELECT id FROM users WHERE student_id = 'admin';
