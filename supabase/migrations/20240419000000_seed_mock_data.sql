-- Insert company data
WITH inserted_company AS (
  INSERT INTO companies (
    name,
    description,
    vision,
    values,
    culture_notes,
    policies,
    locations,
    size,
    founded_year,
    website,
    logo_url
  ) VALUES (
    'SmartJoules',
    'SmartJoules is a fast-growing energy intelligence startup that helps buildings optimize their energy consumption through AI-powered automation and analytics.',
    'Making buildings energy intelligent.',
    ARRAY['Sustainability', 'Speed', 'Clarity'],
    'Fast-moving, autonomous pods, async communication.',
    '{"remote": true, "leave_policy": "Unlimited PTO"}',
    ARRAY['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'],
    '51-200',
    2015,
    'https://smartjoules.com',
    'https://smartjoules.com/logo.png'
  ) RETURNING id
),
-- Insert roles
inserted_roles AS (
  INSERT INTO roles (
    title,
    company_id,
    description,
    requirements,
    responsibilities,
    salary_range,
    location,
    employment_type,
    experience_level
  ) 
  SELECT 
    title,
    (SELECT id FROM inserted_company),
    description,
    requirements,
    responsibilities,
    salary_range,
    location,
    employment_type,
    experience_level
  FROM (VALUES 
    (
      'Automation Engineer',
      'Join our team to build and scale our energy automation platform that controls and optimizes building systems.',
      ARRAY[
        '3+ years of experience in building automation systems',
        'Strong programming skills in Python and JavaScript',
        'Experience with IoT protocols and platforms',
        'Knowledge of HVAC and building management systems'
      ],
      ARRAY[
        'Develop and maintain automation scripts for building systems',
        'Integrate with various IoT devices and protocols',
        'Implement energy optimization algorithms',
        'Monitor and troubleshoot automation systems'
      ],
      '15-25 LPA',
      'Remote',
      'Full-time',
      'Mid-level'
    ),
    (
      'COO',
      'Lead our operations and drive growth across our expanding network of buildings and cities.',
      ARRAY[
        '10+ years of leadership experience in operations',
        'Strong background in energy or facilities management',
        'Proven track record of scaling operations',
        'Excellent communication and team management skills'
      ],
      ARRAY[
        'Oversee daily operations and strategic initiatives',
        'Manage regional teams and ensure service quality',
        'Drive operational efficiency and cost optimization',
        'Lead expansion into new markets'
      ],
      '40-60 LPA',
      'Bangalore',
      'Full-time',
      'Senior'
    ),
    (
      'Energy Analyst',
      'Analyze building energy data to identify optimization opportunities and drive energy savings.',
      ARRAY[
        '2+ years of experience in energy analysis',
        'Strong analytical and data visualization skills',
        'Knowledge of energy systems and building physics',
        'Experience with data analysis tools (Python, SQL)'
      ],
      ARRAY[
        'Analyze building energy consumption patterns',
        'Generate optimization recommendations',
        'Create energy performance reports',
        'Support automation team with data insights'
      ],
      '12-18 LPA',
      'Remote',
      'Full-time',
      'Entry-level'
    )
  ) AS roles_data(
    title, description, requirements, responsibilities, 
    salary_range, location, employment_type, experience_level
  )
  RETURNING id, title
)
-- Insert personas
INSERT INTO personas (
  name,
  role_id,
  personality,
  tone,
  background,
  expertise,
  communication_style
) 
SELECT 
  persona_data.name,
  ir.id,
  persona_data.personality,
  persona_data.tone,
  persona_data.background,
  persona_data.expertise,
  persona_data.communication_style
FROM inserted_roles ir
JOIN (VALUES 
  ('Automation Engineer', 'Maya', 'Warm and collaborative', 'Friendly and encouraging', 'Former building automation specialist with 5 years of experience', 'Building automation, IoT integration, energy optimization', 'Clear and supportive, focuses on practical solutions'),
  ('COO', 'Karthik', 'Direct and results-oriented', 'Professional and decisive', 'Seasoned operations leader with 12 years of experience', 'Operations management, team leadership, strategic planning', 'Concise and action-oriented, emphasizes accountability'),
  ('Energy Analyst', 'Priya', 'Analytical and detail-oriented', 'Precise and data-driven', 'Energy analyst with 3 years of experience in commercial buildings', 'Energy analysis, data visualization, building physics', 'Thorough and methodical, backed by data and examples')
) AS persona_data(role_title, name, personality, tone, background, expertise, communication_style)
ON ir.title = persona_data.role_title;

-- Insert candidates
WITH inserted_roles AS (
  SELECT id, title FROM roles
)
INSERT INTO candidates (
  name,
  email,
  role_id,
  fit_score,
  resume_url,
  answers,
  status,
  current_company,
  experience_years,
  notice_period
)
SELECT 
  candidate_data.name,
  candidate_data.email,
  ir.id,
  candidate_data.fit_score,
  candidate_data.resume_url,
  candidate_data.answers::jsonb,
  candidate_data.status,
  candidate_data.current_company,
  candidate_data.experience_years,
  candidate_data.notice_period
FROM inserted_roles ir
JOIN (VALUES 
  -- Automation Engineer candidates
  ('Automation Engineer', 'Rahul Sharma', 'rahul.sharma@example.com', 85, 'https://storage.googleapis.com/matchahire-resumes/rahul-sharma.pdf', '{"Why are you interested in this role?": "I am passionate about building automation and energy efficiency. SmartJoules mission aligns perfectly with my career goals.", "What is your experience with building automation?": "I have worked on multiple building automation projects, implementing IoT solutions for HVAC and lighting systems.", "How do you handle system failures?": "I follow a systematic approach: identify the root cause, implement a quick fix if needed, and then work on a permanent solution."}', 'Applied', 'BuildingTech Solutions', 4, 30),
  ('Automation Engineer', 'Ananya Patel', 'ananya.patel@example.com', 78, 'https://storage.googleapis.com/matchahire-resumes/ananya-patel.pdf', '{"Why are you interested in this role?": "I want to work on cutting-edge energy optimization solutions and contribute to sustainability.", "What is your experience with building automation?": "I have developed automation scripts for commercial buildings and integrated various IoT devices.", "How do you handle system failures?": "I prioritize quick response and clear communication with stakeholders while working on solutions."}', 'Applied', 'EnergyTech Systems', 3, 60),
  ('Automation Engineer', 'Vikram Singh', 'vikram.singh@example.com', 92, 'https://storage.googleapis.com/matchahire-resumes/vikram-singh.pdf', '{"Why are you interested in this role?": "I am excited about SmartJoules innovative approach to building automation and want to be part of the team.", "What is your experience with building automation?": "I have led multiple building automation projects and developed custom solutions for energy optimization.", "How do you handle system failures?": "I maintain detailed documentation and follow established protocols to ensure quick resolution."}', 'Applied', 'SmartBuild Systems', 5, 45),
  -- COO candidates
  ('COO', 'Arjun Mehta', 'arjun.mehta@example.com', 88, 'https://storage.googleapis.com/matchahire-resumes/arjun-mehta.pdf', '{"Why are you interested in this role?": "I want to lead operations at a fast-growing energy tech company and drive sustainable growth.", "What is your leadership style?": "I believe in empowering teams while maintaining clear accountability and goals.", "How do you handle operational challenges?": "I focus on data-driven decision making and continuous improvement."}', 'Applied', 'Energy Solutions Inc', 12, 90),
  ('COO', 'Neha Kapoor', 'neha.kapoor@example.com', 85, 'https://storage.googleapis.com/matchahire-resumes/neha-kapoor.pdf', '{"Why are you interested in this role?": "I am excited about SmartJoules mission and want to contribute to scaling operations.", "What is your leadership style?": "I lead by example and focus on building high-performing teams.", "How do you handle operational challenges?": "I prioritize clear communication and quick decision-making."}', 'Applied', 'GreenTech Operations', 10, 60),
  ('COO', 'Rohan Desai', 'rohan.desai@example.com', 90, 'https://storage.googleapis.com/matchahire-resumes/rohan-desai.pdf', '{"Why are you interested in this role?": "I want to drive operational excellence in the energy sector and make a real impact.", "What is your leadership style?": "I focus on strategic thinking and execution excellence.", "How do you handle operational challenges?": "I believe in proactive problem-solving and continuous optimization."}', 'Applied', 'EcoEnergy Systems', 11, 30),
  -- Energy Analyst candidates
  ('Energy Analyst', 'Aditi Rao', 'aditi.rao@example.com', 82, 'https://storage.googleapis.com/matchahire-resumes/aditi-rao.pdf', '{"Why are you interested in this role?": "I want to apply my analytical skills to drive energy efficiency in buildings.", "What is your experience with energy analysis?": "I have analyzed energy consumption patterns for commercial buildings and identified optimization opportunities.", "How do you present your findings?": "I create clear, data-driven reports with actionable recommendations."}', 'Applied', 'Energy Analytics Corp', 2, 30),
  ('Energy Analyst', 'Siddharth Iyer', 'siddharth.iyer@example.com', 85, 'https://storage.googleapis.com/matchahire-resumes/siddharth-iyer.pdf', '{"Why are you interested in this role?": "I am passionate about using data to drive energy efficiency and sustainability.", "What is your experience with energy analysis?": "I have worked on multiple energy audit projects and developed optimization models.", "How do you present your findings?": "I focus on clear visualization and practical recommendations."}', 'Applied', 'Green Analytics', 3, 45),
  ('Energy Analyst', 'Meera Krishnan', 'meera.krishnan@example.com', 88, 'https://storage.googleapis.com/matchahire-resumes/meera-krishnan.pdf', '{"Why are you interested in this role?": "I want to contribute to SmartJoules mission of making buildings energy intelligent.", "What is your experience with energy analysis?": "I have extensive experience in analyzing building energy data and identifying savings opportunities.", "How do you present your findings?": "I create comprehensive reports with clear insights and implementation plans."}', 'Applied', 'Energy Insights', 2, 30)
) AS candidate_data(role_title, name, email, fit_score, resume_url, answers, status, current_company, experience_years, notice_period)
ON ir.title = candidate_data.role_title; 