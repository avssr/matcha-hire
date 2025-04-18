-- First get the company ID
WITH company_id AS (
  SELECT id FROM companies WHERE name = 'SmartJoules'
)
-- Insert roles for SmartJoules
INSERT INTO roles (
  title,
  company_id,
  description,
  responsibilities,
  requirements,
  location,
  employment_type,
  experience_level,
  salary_range
) 
SELECT 
  title,
  (SELECT id FROM company_id),
  description,
  responsibilities,
  requirements,
  location,
  employment_type,
  experience_level,
  salary_range
FROM (VALUES 
  (
    'Associate Engineer – Execution (BMS Team)',
    'As an Associate Engineer in SmartJoules'' BMS Execution team, you''ll support field instrumentation, control documentation, and commissioning at high-impact energy efficiency projects. You''ll work on-site under the guidance of project and control managers to bring complex automation systems online and ensure reliable operation.',
    ARRAY[
      'Assist in installing BMS control panels, sensors, and field wiring',
      'Perform IO testing and device mapping in BMS environments',
      'Collaborate with design engineers to validate logical flow and documentation',
      'Conduct field diagnosis with multimeters and communication testers',
      'Update and maintain snag lists during commissioning',
      'Document site layouts, daily reports, and asset tagging',
      'Coordinate with site engineers and third-party vendors',
      'Escalate execution issues for resolution in alignment with SOPs'
    ],
    ARRAY[
      'Hands-on',
      'Process-oriented',
      'Collaborative',
      'Fast learner',
      'Accountable'
    ],
    'Bangalore',
    'Full-time',
    'Entry-level',
    '6-10 LPA'
  ),
  (
    'Business Development Representative – BMS',
    'This role is part of our Energy Efficiency BD vertical, focused on SmartJoules'' in-house BMS automation system. You''ll lead client outreach, technical discovery, and tailor solution pitches based on building size, usage, and system readiness. Your work will directly impact adoption of India''s most reliable, indigenous BMS stack.',
    ARRAY[
      'Identify and qualify building owners/operators as BMS prospects',
      'Drive conversations around energy savings and automation potential',
      'Lead tailored product walkthroughs, highlight ROI for clients',
      'Collaborate with technical teams to scope fit and feasibility',
      'Manage proposals, pricing approvals, and client onboarding',
      'Own CRM updates and post-demo feedback loops'
    ],
    ARRAY[
      'Customer-obsessed',
      'Energetic',
      'Technically fluent',
      'Persuasive',
      'Goal-driven'
    ],
    'Bangalore',
    'Full-time',
    'Mid-level',
    '8-15 LPA'
  ),
  (
    'Director – Operations',
    'The Director of Operations is a leadership role responsible for overseeing national project execution for SmartJoules'' HVAC and automation vertical. You''ll drive operational excellence across planning, resourcing, vendor management, and client satisfaction. This role is key to ensuring every site delivery reflects the reliability, consistency, and innovation we stand for.',
    ARRAY[
      'Lead end-to-end execution across multi-site HVAC automation projects',
      'Develop SOPs for every execution layer — design, installation, commissioning',
      'Direct regional project managers and third-party vendors',
      'Collaborate with tech/product teams to close on-ground execution gaps',
      'Drive performance dashboards, audits, and delivery scorecards',
      'Manage execution budgets and delivery costs',
      'Lead cross-functional escalation reviews with CXOs',
      'Drive alignment between BD, product, and execution teams'
    ],
    ARRAY[
      'Strategic',
      'Resilient',
      'Execution obsessed',
      'People-first',
      'Clear communicator'
    ],
    'Bangalore',
    'Full-time',
    'Senior',
    '40-60 LPA'
  ),
  (
    'Financial Controller',
    'As SmartJoules'' Financial Controller, you''ll lead our financial engine — spanning FP&A, compliance, audit, accounting, and investor reporting. You''ll implement systems to scale our finance function while ensuring transparency and trust across internal and external stakeholders.',
    ARRAY[
      'Oversee end-to-end accounting, treasury, and audit operations',
      'Manage budgets, forecasts, and capital allocation plans',
      'Ensure regulatory and tax compliance across jurisdictions',
      'Work with founders and investors on reporting, audit-readiness',
      'Own monthly and quarterly business performance reviews',
      'Lead team of finance associates and external consultants',
      'Drive the finance tech stack (Zoho, Razorpay, Excel automations)'
    ],
    ARRAY[
      'Analytical',
      'Transparent',
      'Detail-obsessed',
      'Mature',
      'Process-builder'
    ],
    'Bangalore',
    'Full-time',
    'Senior',
    '30-45 LPA'
  )
) AS role_data(
  title,
  description,
  responsibilities,
  requirements,
  location,
  employment_type,
  experience_level,
  salary_range
); 