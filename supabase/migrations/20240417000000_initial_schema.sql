-- Drop existing tables if they exist
DROP TABLE IF EXISTS feedback CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;
DROP TABLE IF EXISTS personas CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  vision TEXT,
  values TEXT[],
  culture_notes TEXT,
  policies JSONB,
  locations TEXT[],
  size TEXT,
  founded_year INTEGER,
  website TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create roles table
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  description TEXT,
  requirements TEXT[],
  responsibilities TEXT[],
  salary_range TEXT,
  location TEXT,
  employment_type TEXT,
  experience_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create personas table
CREATE TABLE personas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  personality TEXT,
  tone TEXT,
  background TEXT,
  expertise TEXT,
  communication_style TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create candidates table
CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  fit_score INTEGER,
  resume_url TEXT,
  answers JSONB,
  status TEXT,
  current_company TEXT,
  experience_years INTEGER,
  notice_period INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table for authentication
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  company TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  messages JSONB[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  evaluator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  score INTEGER,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for companies table
CREATE POLICY "Companies are viewable by everyone"
  ON companies FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create companies"
  ON companies FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own company"
  ON companies FOR UPDATE
  USING (auth.uid() IN (
    SELECT id FROM profiles WHERE company = companies.name
  ));

-- Create policies for roles table
CREATE POLICY "Roles are viewable by everyone"
  ON roles FOR SELECT
  USING (true);

CREATE POLICY "Company members can create roles"
  ON roles FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM profiles 
      WHERE company = (SELECT name FROM companies WHERE id = company_id)
    )
  );

CREATE POLICY "Company members can update their roles"
  ON roles FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM profiles 
      WHERE company = (SELECT name FROM companies WHERE id = company_id)
    )
  );

-- Create policies for personas table
CREATE POLICY "Personas are viewable by everyone"
  ON personas FOR SELECT
  USING (true);

CREATE POLICY "Company members can create personas"
  ON personas FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM profiles 
      WHERE company = (
        SELECT c.name 
        FROM companies c 
        JOIN roles r ON r.company_id = c.id 
        WHERE r.id = role_id
      )
    )
  );

CREATE POLICY "Company members can update their personas"
  ON personas FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM profiles 
      WHERE company = (
        SELECT c.name 
        FROM companies c 
        JOIN roles r ON r.company_id = c.id 
        WHERE r.id = role_id
      )
    )
  );

-- Create policies for candidates table
CREATE POLICY "Candidates are viewable by company members"
  ON candidates FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM profiles 
      WHERE company = (
        SELECT c.name 
        FROM companies c 
        JOIN roles r ON r.company_id = c.id 
        WHERE r.id = role_id
      )
    )
  );

CREATE POLICY "Candidates can create their own applications"
  ON candidates FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Company members can update candidates"
  ON candidates FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM profiles 
      WHERE company = (
        SELECT c.name 
        FROM companies c 
        JOIN roles r ON r.company_id = c.id 
        WHERE r.id = role_id
      )
    )
  );

-- Create policies for profiles table
CREATE POLICY "Profiles are viewable by their owners"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for applications table
CREATE POLICY "Applications are viewable by candidates and company members"
  ON applications FOR SELECT
  USING (
    auth.uid() IN (
      SELECT c.id FROM candidates c WHERE c.id = candidate_id
    ) OR
    auth.uid() IN (
      SELECT p.id FROM profiles p 
      WHERE p.company = (
        SELECT c.name 
        FROM companies c 
        JOIN roles r ON r.company_id = c.id 
        WHERE r.id = role_id
      )
    )
  );

-- Create policies for conversations table
CREATE POLICY "Conversations are viewable by candidates and company members"
  ON conversations FOR SELECT
  USING (
    auth.uid() IN (
      SELECT c.id FROM candidates c 
      JOIN applications a ON a.candidate_id = c.id 
      WHERE a.id = application_id
    ) OR
    auth.uid() IN (
      SELECT p.id FROM profiles p 
      WHERE p.company = (
        SELECT c.name 
        FROM companies c 
        JOIN roles r ON r.company_id = c.id 
        JOIN applications a ON a.role_id = r.id 
        WHERE a.id = application_id
      )
    )
  );

-- Create policies for feedback table
CREATE POLICY "Feedback is viewable by candidates and company members"
  ON feedback FOR SELECT
  USING (
    auth.uid() IN (
      SELECT c.id FROM candidates c 
      JOIN applications a ON a.candidate_id = c.id 
      WHERE a.id = application_id
    ) OR
    auth.uid() IN (
      SELECT p.id FROM profiles p 
      WHERE p.company = (
        SELECT c.name 
        FROM companies c 
        JOIN roles r ON r.company_id = c.id 
        JOIN applications a ON a.role_id = r.id 
        WHERE a.id = application_id
      )
    )
  );

-- Set up storage policies
CREATE POLICY "Resumes are private"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

CREATE POLICY "Anyone can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roles_updated_at
  BEFORE UPDATE ON roles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_personas_updated_at
  BEFORE UPDATE ON personas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_candidates_updated_at
  BEFORE UPDATE ON candidates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 