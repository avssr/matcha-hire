'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Briefcase, User, FileText, CheckCircle2, MessageSquare } from 'lucide-react'

interface IdealCandidate {
  skills: string[]
  traits: string[]
  experience: string
}

interface Persona {
  name: string
  tone: string
  conversation_mode: string
  avatar_url: string
  system_prompt: string
  question_sequence: string[]
}

interface JobData {
  title: string
  department: string
  location: string
  employmentType: string
  experienceLevel: string
  salaryRange: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  idealCandidate: IdealCandidate
  persona: Persona
}

export default function NewJobListing() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [currentStep, setCurrentStep] = useState(1)
  const [jobData, setJobData] = useState<JobData>({
    title: '',
    department: '',
    location: '',
    employmentType: '',
    experienceLevel: '',
    salaryRange: '',
    description: '',
    responsibilities: [],
    requirements: [],
    benefits: [],
    idealCandidate: {
      skills: [],
      traits: [],
      experience: ''
    },
    persona: {
      name: '',
      tone: '',
      conversation_mode: '',
      avatar_url: '',
      system_prompt: '',
      question_sequence: []
    }
  })

  const steps = [
    {
      id: 1,
      title: 'Role Info',
      icon: Briefcase,
      fields: [
        { name: 'title', label: 'Job Title', type: 'text' },
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'employmentType', label: 'Employment Type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
        { name: 'experienceLevel', label: 'Experience Level', type: 'select', options: ['Entry', 'Mid', 'Senior', 'Lead'] },
        { name: 'salaryRange', label: 'Salary Range', type: 'text' },
        { name: 'description', label: 'Job Description', type: 'textarea' },
        { name: 'responsibilities', label: 'Key Responsibilities', type: 'tags' },
        { name: 'requirements', label: 'Requirements', type: 'tags' },
        { name: 'benefits', label: 'Job-Specific Benefits', type: 'tags' }
      ]
    },
    {
      id: 2,
      title: 'Persona Setup',
      icon: MessageSquare,
      fields: [
        { name: 'persona.name', label: 'Persona Name', type: 'text' },
        { name: 'persona.tone', label: 'Conversation Tone', type: 'select', options: ['Professional', 'Friendly', 'Technical', 'Casual'] },
        { name: 'persona.conversation_mode', label: 'Conversation Mode', type: 'select', options: ['Interview', 'Q&A', 'Discussion'] },
        { name: 'persona.avatar_url', label: 'Avatar URL', type: 'text' },
        { name: 'persona.system_prompt', label: 'System Prompt', type: 'textarea' },
        { name: 'persona.question_sequence', label: 'Question Sequence', type: 'tags' }
      ]
    },
    {
      id: 3,
      title: 'Ideal Candidate',
      icon: User,
      fields: [
        { name: 'idealCandidate.skills', label: 'Required Skills', type: 'tags' },
        { name: 'idealCandidate.traits', label: 'Personality Traits', type: 'tags' },
        { name: 'idealCandidate.experience', label: 'Experience Requirements', type: 'textarea' }
      ]
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No user found')

        const { data: profile } = await supabase
          .from('profiles')
          .select('company')
          .eq('id', user.id)
          .single()

        if (!profile?.company) throw new Error('No company found')

        // Create role
        const { data: role, error: roleError } = await supabase
          .from('roles')
          .insert({
            title: jobData.title,
            department: jobData.department,
            location: jobData.location,
            employment_type: jobData.employmentType,
            experience_level: jobData.experienceLevel,
            salary_range: jobData.salaryRange,
            description: jobData.description,
            responsibilities: jobData.responsibilities,
            requirements: jobData.requirements,
            benefits: jobData.benefits,
            company_id: profile.company,
            status: 'draft'
          })
          .select()
          .single()

        if (roleError) throw roleError

        // Create persona
        const { error: personaError } = await supabase
          .from('personas')
          .insert({
            role_id: role.id,
            name: jobData.persona.name,
            tone: jobData.persona.tone,
            conversation_mode: jobData.persona.conversation_mode,
            avatar_url: jobData.persona.avatar_url,
            system_prompt: jobData.persona.system_prompt,
            question_sequence: jobData.persona.question_sequence
          })

        if (personaError) throw personaError

        router.push(`/company/roles/${role.id}`)
      } catch (err) {
        console.error('Error creating role:', err)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.id
                      ? 'bg-matchaVibrant-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-20 ${
                      currentStep > step.id ? 'bg-matchaVibrant-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {steps[currentStep - 1].title}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {steps[currentStep - 1].fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-matchaVibrant-500 focus:ring-matchaVibrant-500"
                    rows={4}
                    value={field.name.includes('.') 
                      ? field.name.startsWith('persona.')
                        ? jobData.persona[field.name.split('.')[1] as keyof Persona] as string
                        : jobData.idealCandidate[field.name.split('.')[1] as keyof IdealCandidate] as string
                      : jobData[field.name as keyof JobData] as string}
                    onChange={(e) => {
                      if (field.name.includes('.')) {
                        if (field.name.startsWith('persona.')) {
                          const [, child] = field.name.split('.')
                          setJobData({
                            ...jobData,
                            persona: {
                              ...jobData.persona,
                              [child]: e.target.value
                            }
                          })
                        } else {
                          const [, child] = field.name.split('.')
                          setJobData({
                            ...jobData,
                            idealCandidate: {
                              ...jobData.idealCandidate,
                              [child]: e.target.value
                            }
                          })
                        }
                      } else {
                        setJobData({ ...jobData, [field.name]: e.target.value })
                      }
                    }}
                  />
                ) : field.type === 'select' ? (
                  <select
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-matchaVibrant-500 focus:ring-matchaVibrant-500"
                    value={field.name.includes('.') 
                      ? field.name.startsWith('persona.')
                        ? jobData.persona[field.name.split('.')[1] as keyof Persona] as string
                        : jobData.idealCandidate[field.name.split('.')[1] as keyof IdealCandidate] as string
                      : jobData[field.name as keyof JobData] as string}
                    onChange={(e) => {
                      if (field.name.includes('.')) {
                        if (field.name.startsWith('persona.')) {
                          const [, child] = field.name.split('.')
                          setJobData({
                            ...jobData,
                            persona: {
                              ...jobData.persona,
                              [child]: e.target.value
                            }
                          })
                        } else {
                          const [, child] = field.name.split('.')
                          setJobData({
                            ...jobData,
                            idealCandidate: {
                              ...jobData.idealCandidate,
                              [child]: e.target.value
                            }
                          })
                        }
                      } else {
                        setJobData({ ...jobData, [field.name]: e.target.value })
                      }
                    }}
                  >
                    <option value="">Select {field.label.toLowerCase()}</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'tags' ? (
                  <div className="flex flex-wrap gap-2">
                    {(field.name.includes('.')
                      ? field.name.startsWith('persona.')
                        ? jobData.persona[field.name.split('.')[1] as keyof Persona] as string[]
                        : jobData.idealCandidate[field.name.split('.')[1] as keyof IdealCandidate] as string[]
                      : jobData[field.name as keyof JobData] as string[]).map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-matchaVibrant-100 text-matchaVibrant-700"
                      >
                        {tag}
                        <button
                          type="button"
                          className="ml-1 text-matchaVibrant-600 hover:text-matchaVibrant-800"
                          onClick={() => {
                            if (field.name.includes('.')) {
                              if (field.name.startsWith('persona.')) {
                                const [, child] = field.name.split('.')
                                const newTags = [...jobData.persona[child as keyof Persona] as string[]]
                                newTags.splice(index, 1)
                                setJobData({
                                  ...jobData,
                                  persona: {
                                    ...jobData.persona,
                                    [child]: newTags
                                  }
                                })
                              } else {
                                const [, child] = field.name.split('.')
                                const newTags = [...jobData.idealCandidate[child as keyof IdealCandidate] as string[]]
                                newTags.splice(index, 1)
                                setJobData({
                                  ...jobData,
                                  idealCandidate: {
                                    ...jobData.idealCandidate,
                                    [child]: newTags
                                  }
                                })
                              }
                            } else {
                              const newTags = [...jobData[field.name as keyof JobData] as string[]]
                              newTags.splice(index, 1)
                              setJobData({ ...jobData, [field.name]: newTags })
                            }
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      className="flex-1 min-w-[200px] rounded-md border-gray-300 shadow-sm focus:border-matchaVibrant-500 focus:ring-matchaVibrant-500 sm:text-sm"
                      placeholder="Add new..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          const input = e.target as HTMLInputElement
                          const value = input.value.trim()
                          if (value) {
                            if (field.name.includes('.')) {
                              if (field.name.startsWith('persona.')) {
                                const [, child] = field.name.split('.')
                                setJobData({
                                  ...jobData,
                                  persona: {
                                    ...jobData.persona,
                                    [child]: [...jobData.persona[child as keyof Persona] as string[], value]
                                  }
                                })
                              } else {
                                const [, child] = field.name.split('.')
                                setJobData({
                                  ...jobData,
                                  idealCandidate: {
                                    ...jobData.idealCandidate,
                                    [child]: [...jobData.idealCandidate[child as keyof IdealCandidate] as string[], value]
                                  }
                                })
                              }
                            } else {
                              setJobData({
                                ...jobData,
                                [field.name]: [...jobData[field.name as keyof JobData] as string[], value]
                              })
                            }
                            input.value = ''
                          }
                        }
                      }}
                    />
                  </div>
                ) : (
                  <input
                    type={field.type}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-matchaVibrant-500 focus:ring-matchaVibrant-500"
                    value={field.name.includes('.') 
                      ? field.name.startsWith('persona.')
                        ? jobData.persona[field.name.split('.')[1] as keyof Persona] as string
                        : jobData.idealCandidate[field.name.split('.')[1] as keyof IdealCandidate] as string
                      : jobData[field.name as keyof JobData] as string}
                    onChange={(e) => {
                      if (field.name.includes('.')) {
                        if (field.name.startsWith('persona.')) {
                          const [, child] = field.name.split('.')
                          setJobData({
                            ...jobData,
                            persona: {
                              ...jobData.persona,
                              [child]: e.target.value
                            }
                          })
                        } else {
                          const [, child] = field.name.split('.')
                          setJobData({
                            ...jobData,
                            idealCandidate: {
                              ...jobData.idealCandidate,
                              [child]: e.target.value
                            }
                          })
                        }
                      } else {
                        setJobData({ ...jobData, [field.name]: e.target.value })
                      }
                    }}
                  />
                )}
              </div>
            ))}

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-matchaVibrant-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-matchaVibrant-600 hover:bg-matchaVibrant-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-matchaVibrant-500"
              >
                {currentStep === steps.length ? 'Create Role' : 'Next'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
} 