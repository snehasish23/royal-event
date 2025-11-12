-- Royal STAR Event Management - Database Schema
-- Execute this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    event_date DATE,
    category VARCHAR(50) NOT NULL CHECK (category IN ('wedding', 'corporate', 'cultural', 'birthday', 'other')),
    tags TEXT[] DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_by UUID REFERENCES admins(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    body TEXT NOT NULL,
    image TEXT,
    slug VARCHAR(250) UNIQUE NOT NULL,
    meta_title VARCHAR(70),
    meta_description VARCHAR(160),
    meta_keywords TEXT[] DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_by UUID REFERENCES admins(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_date DATE,
    guest_count INTEGER,
    budget VARCHAR(50),
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'in_progress', 'converted', 'closed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Success Stories Table
CREATE TABLE IF NOT EXISTS success_stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_name VARCHAR(200) NOT NULL,
    client_name VARCHAR(100) NOT NULL,
    client_quote TEXT NOT NULL,
    outcome TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    event_date DATE,
    category VARCHAR(50) CHECK (category IN ('wedding', 'corporate', 'cultural', 'birthday', 'other')),
    created_by UUID REFERENCES admins(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_success_stories_category ON success_stories(category);

-- Enable Row Level Security (RLS)
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Events (Public read, Admin write)
CREATE POLICY "Public can view published events"
ON events FOR SELECT
USING (status = 'published');

CREATE POLICY "Admins can do everything with events"
ON events FOR ALL
USING (auth.uid() IN (SELECT id FROM admins));

-- RLS Policies for Blogs (Public read published, Admin write)
CREATE POLICY "Public can view published blogs"
ON blogs FOR SELECT
USING (status = 'published');

CREATE POLICY "Admins can do everything with blogs"
ON blogs FOR ALL
USING (auth.uid() IN (SELECT id FROM admins));

-- RLS Policies for Enquiries (Anyone can create, Admin can read/update)
CREATE POLICY "Anyone can create enquiries"
ON enquiries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can do everything with enquiries"
ON enquiries FOR ALL
USING (auth.uid() IN (SELECT id FROM admins));

-- RLS Policies for Success Stories (Public read, Admin write)
CREATE POLICY "Public can view success stories"
ON success_stories FOR SELECT
USING (true);

CREATE POLICY "Admins can do everything with success stories"
ON success_stories FOR ALL
USING (auth.uid() IN (SELECT id FROM admins));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update updated_at
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON enquiries
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_success_stories_updated_at BEFORE UPDATE ON success_stories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data (optional)
-- Note: You'll need to hash the password using bcrypt before inserting
-- For testing, you can use the register endpoint to create an admin account
