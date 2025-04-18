-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create tables
create table if not exists public.companies (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  industry text,
  vision text,
  values text[],
  culture text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.roles (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id) on delete cascade,
  title text not null,
  location text,
  department text,
  responsibilities text[],
  role_type text,
  jd_url text,
  status text default 'draft' check (status in ('draft', 'published', 'closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.personas (
  id uuid default uuid_generate_v4() primary key,
  role_id uuid references public.roles(id) on delete cascade,
  name text not null,
  tone text,
  conversation_mode text,
  avatar_url text,
  system_prompt text,
  question_sequence jsonb,
  scoring_prompt text,
  email_prompt text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.candidates (
  id uuid default uuid_generate_v4() primary key,
  role_id uuid references public.roles(id) on delete cascade,
  resume_url text,
  answers jsonb,
  summary_candidate text,
  summary_recruiter text,
  fit_score integer,
  status text default 'submitted' check (status in ('submitted', 'reviewing', 'interviewing', 'offered', 'hired', 'rejected')),
  applied_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.companies enable row level security;
alter table public.roles enable row level security;
alter table public.personas enable row level security;
alter table public.candidates enable row level security;

-- Create policies
create policy "Companies are viewable by everyone"
  on public.companies for select
  using (true);

create policy "Companies are editable by owners"
  on public.companies for all
  using (auth.uid() in (
    select id from auth.users where raw_user_meta_data->>'company_id' = id::text
  ));

create policy "Roles are viewable by everyone"
  on public.roles for select
  using (true);

create policy "Roles are editable by company owners"
  on public.roles for all
  using (company_id in (
    select id from public.companies where auth.uid() in (
      select id from auth.users where raw_user_meta_data->>'company_id' = id::text
    )
  ));

create policy "Personas are viewable by everyone"
  on public.personas for select
  using (true);

create policy "Personas are editable by company owners"
  on public.personas for all
  using (role_id in (
    select id from public.roles where company_id in (
      select id from public.companies where auth.uid() in (
        select id from auth.users where raw_user_meta_data->>'company_id' = id::text
      )
    )
  ));

create policy "Candidates are viewable by company owners"
  on public.candidates for select
  using (role_id in (
    select id from public.roles where company_id in (
      select id from public.companies where auth.uid() in (
        select id from auth.users where raw_user_meta_data->>'company_id' = id::text
      )
    )
  ));

create policy "Candidates can create their own applications"
  on public.candidates for insert
  with check (true);

-- Create storage buckets
insert into storage.buckets (id, name, public)
values ('jds', 'jds', true),
       ('resumes', 'resumes', true),
       ('avatars', 'avatars', true);

-- Set up storage policies
create policy "JDs are viewable by everyone"
  on storage.objects for select
  using (bucket_id = 'jds');

create policy "Resumes are viewable by company owners"
  on storage.objects for select
  using (bucket_id = 'resumes' and auth.uid() in (
    select id from auth.users where raw_user_meta_data->>'company_id' is not null
  ));

create policy "Avatars are viewable by everyone"
  on storage.objects for select
  using (bucket_id = 'avatars');

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table (for user profiles)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  company text,
  role text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create roles table
create table roles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  company text not null,
  location text not null,
  description text not null,
  requirements text[] not null,
  benefits text[] not null,
  salary_range text,
  employment_type text not null,
  experience_level text not null,
  persona_name text not null,
  persona_role text not null,
  persona_image text,
  persona_bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create applications table
create table applications (
  id uuid default uuid_generate_v4() primary key,
  role_id uuid references roles(id) on delete cascade not null,
  candidate_id uuid references profiles(id) on delete cascade not null,
  status text not null default 'pending',
  resume_url text,
  cover_letter text,
  answers jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(role_id, candidate_id)
);

-- Create conversations table
create table conversations (
  id uuid default uuid_generate_v4() primary key,
  application_id uuid references applications(id) on delete cascade not null,
  role_id uuid references roles(id) on delete cascade not null,
  candidate_id uuid references profiles(id) on delete cascade not null,
  messages jsonb[] default '[]'::jsonb[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create feedback table
create table feedback (
  id uuid default uuid_generate_v4() primary key,
  application_id uuid references applications(id) on delete cascade not null,
  reviewer_id uuid references profiles(id) on delete cascade not null,
  rating integer not null,
  comments text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table roles enable row level security;
alter table applications enable row level security;
alter table conversations enable row level security;
alter table feedback enable row level security;

-- Create policies for profiles
create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can update their own profile"
  on profiles for update using (auth.uid() = id);

-- Create policies for roles
create policy "Roles are viewable by everyone"
  on roles for select using (true);

create policy "Authenticated users can create roles"
  on roles for insert with check (auth.role() = 'authenticated');

create policy "Users can update their own roles"
  on roles for update using (auth.uid() in (
    select id from profiles where company = roles.company
  ));

-- Create policies for applications
create policy "Users can view their own applications"
  on applications for select using (auth.uid() = candidate_id);

create policy "Users can create applications"
  on applications for insert with check (auth.uid() = candidate_id);

create policy "Company members can view applications for their roles"
  on applications for select using (
    exists (
      select 1 from roles
      where roles.id = applications.role_id
      and roles.company in (
        select company from profiles where id = auth.uid()
      )
    )
  );

-- Create policies for conversations
create policy "Users can view their own conversations"
  on conversations for select using (auth.uid() = candidate_id);

create policy "Company members can view conversations for their roles"
  on conversations for select using (
    exists (
      select 1 from roles
      where roles.id = conversations.role_id
      and roles.company in (
        select company from profiles where id = auth.uid()
      )
    )
  );

-- Create policies for feedback
create policy "Users can view feedback on their applications"
  on feedback for select using (
    exists (
      select 1 from applications
      where applications.id = feedback.application_id
      and applications.candidate_id = auth.uid()
    )
  );

create policy "Company members can create feedback"
  on feedback for insert with check (
    exists (
      select 1 from applications
      join roles on roles.id = applications.role_id
      where applications.id = feedback.application_id
      and roles.company in (
        select company from profiles where id = auth.uid()
      )
    )
  );

-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for all tables
create trigger update_profiles_updated_at
  before update on profiles
  for each row
  execute function update_updated_at_column();

create trigger update_roles_updated_at
  before update on roles
  for each row
  execute function update_updated_at_column();

create trigger update_applications_updated_at
  before update on applications
  for each row
  execute function update_updated_at_column();

create trigger update_conversations_updated_at
  before update on conversations
  for each row
  execute function update_updated_at_column();

create trigger update_feedback_updated_at
  before update on feedback
  for each row
  execute function update_updated_at_column();

-- Insert test data for roles
INSERT INTO roles (
  title, company, location, description, requirements, benefits, 
  salary_range, employment_type, experience_level,
  persona_name, persona_role, persona_image, persona_bio
) VALUES 
(
  'Senior Frontend Developer',
  'TechCorp Inc.',
  'San Francisco, CA',
  'Join our team to build beautiful, responsive web applications using React and Next.js. Work with cutting-edge technologies and shape the future of our products.',
  ARRAY['5+ years of React experience', 'Strong TypeScript skills', 'Experience with Next.js', 'Understanding of modern CSS frameworks'],
  ARRAY['Competitive salary', 'Health insurance', '401(k) matching', 'Flexible work hours'],
  '$120,000 - $160,000',
  'Full-time',
  'Senior',
  'Alex Chen',
  'Lead Frontend Engineer',
  '/personas/alex-chen.jpg',
  'I''ve been leading frontend development at TechCorp for 3 years, focusing on creating exceptional user experiences and mentoring junior developers.'
),
(
  'Product Manager',
  'InnovateX',
  'New York, NY',
  'Lead product development and work closely with engineering teams to deliver exceptional user experiences. Drive product strategy and roadmap.',
  ARRAY['3+ years of product management experience', 'Strong analytical skills', 'Experience with agile methodologies', 'Excellent communication skills'],
  ARRAY['Competitive salary', 'Stock options', 'Health insurance', 'Professional development budget'],
  '$100,000 - $140,000',
  'Full-time',
  'Mid-level',
  'Sarah Johnson',
  'Director of Product',
  '/personas/sarah-johnson.jpg',
  'I''ve been in product management for 7 years, with a focus on SaaS products and user-centered design.'
),
(
  'Data Scientist',
  'DataFlow Analytics',
  'Remote',
  'Apply machine learning and statistical analysis to solve complex business problems. Work with large datasets and build predictive models.',
  ARRAY['PhD in Computer Science or related field', 'Experience with Python and ML libraries', 'Strong statistical background', 'Experience with big data tools'],
  ARRAY['Competitive salary', 'Remote work flexibility', 'Health insurance', 'Conference attendance budget'],
  '$130,000 - $170,000',
  'Full-time',
  'Senior',
  'Dr. Michael Rodriguez',
  'Head of Data Science',
  '/personas/michael-rodriguez.jpg',
  'I lead the data science team at DataFlow, focusing on developing innovative ML solutions for our clients.'
); 