-- Insert mock company (SmartJoules)
INSERT INTO companies (id, name, description, vision, values, culture_notes, locations, size, founded_year, website)
VALUES (
  'f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0',
  'SmartJoules',
  'A leading energy efficiency company that helps businesses reduce their energy consumption and carbon footprint through innovative IoT and AI solutions',
  'To make energy efficiency accessible and affordable for businesses worldwide',
  ARRAY['Innovation', 'Sustainability', 'Customer Success', 'Data-Driven', 'Collaboration'],
  'We foster a culture of continuous learning, innovation, and environmental responsibility. Our team is passionate about making a real impact in the fight against climate change.',
  ARRAY['Gurgaon, India', 'Singapore'],
  '50-100',
  2015,
  'https://www.smartjoules.com'
);

-- Insert mock profile (after user is created via auth)
INSERT INTO profiles (id, email, full_name, company, role)
VALUES (
  '00000000-0000-0000-0000-000000000000', -- This will be replaced with actual auth user ID
  'hr@smartjoules.com',
  'Priya Sharma',
  'SmartJoules',
  'admin'
);

-- Insert mock roles
INSERT INTO roles (id, title, company_id, description, requirements, responsibilities, salary_range, location, employment_type, experience_level)
VALUES 
(
  'r0r0r0r0-r0r0-r0r0-r0r0-r0r0r0r0r0r0',
  'Senior IoT Engineer',
  'f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0',
  'Looking for an experienced IoT engineer to lead our hardware and firmware development for energy monitoring devices',
  ARRAY['5+ years of experience with IoT hardware development', 'Strong knowledge of embedded systems and wireless protocols', 'Experience with energy monitoring systems', 'Proficiency in C/C++ and Python'],
  ARRAY['Design and develop IoT hardware for energy monitoring', 'Lead firmware development for our devices', 'Collaborate with data science team on sensor integration', 'Mentor junior engineers'],
  '₹20,00,000 - ₹30,00,000',
  'Gurgaon, India',
  'Full-time',
  'Senior'
),
(
  'r1r1r1r1-r1r1-r1r1-r1r1-r1r1r1r1r1r1',
  'Energy Efficiency Consultant',
  'f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0',
  'Seeking an experienced consultant to help businesses optimize their energy consumption and implement our solutions',
  ARRAY['3+ years in energy consulting or related field', 'Strong analytical skills', 'Experience with energy audits', 'Excellent communication skills'],
  ARRAY['Conduct energy audits for clients', 'Develop energy efficiency recommendations', 'Implement SmartJoules solutions', 'Train clients on system usage'],
  '₹15,00,000 - ₹25,00,000',
  'Gurgaon, India',
  'Full-time',
  'Mid-level'
);

-- Insert mock personas
INSERT INTO personas (id, name, role_id, personality, tone, background, expertise, communication_style)
VALUES 
(
  'p0p0p0p0-p0p0-p0p0-p0p0-p0p0p0p0p0p0',
  'Tech Lead Raj',
  'r0r0r0r0-r0r0-r0r0-r0r0-r0r0r0r0r0r0',
  'Technical and passionate about sustainability',
  'Professional yet approachable',
  '10+ years in IoT development, with a focus on energy monitoring systems',
  'IoT hardware, embedded systems, energy monitoring, team leadership',
  'Clear, technical, and encouraging'
),
(
  'p1p1p1p1-p1p1-p1p1-p1p1-p1p1p1p1p1p1',
  'Energy Consultant Meera',
  'r1r1r1r1-r1r1-r1r1-r1r1-r1r1r1r1r1r1',
  'Knowledgeable and customer-focused',
  'Friendly and professional',
  '8 years in energy consulting, helping businesses reduce their carbon footprint',
  'Energy efficiency, sustainability, client management, data analysis',
  'Clear, engaging, and solution-oriented'
); 