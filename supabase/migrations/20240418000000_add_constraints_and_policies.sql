-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

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

-- Add foreign key constraints
ALTER TABLE roles
  ADD CONSTRAINT fk_roles_company
  FOREIGN KEY (company_id)
  REFERENCES companies(id)
  ON DELETE CASCADE;

ALTER TABLE personas
  ADD CONSTRAINT fk_personas_role
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE CASCADE;

ALTER TABLE candidates
  ADD CONSTRAINT fk_candidates_role
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE CASCADE; 