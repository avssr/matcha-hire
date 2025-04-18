'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  FileText, 
  Users, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react'

interface JobData {
  title: string
  department: string
  location: string
  type: string
  salary: {
    min: string
    max: string
    currency: string
  }
  description: string
  requirements: string[]
  responsibilities: string[]
  skills: string[]
  benefits: string[]
}

export default function NewJobListing() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [jobData, setJobData] = useState<JobData>({
    title: '',
    department: '',
    location: '',
    type: '',
    salary: {
      min: '',
      max: '',
      currency: 'USD'
    },
    description: '',
    requirements: [],
    responsibilities: [],
    skills: [],
    benefits: []
  })

  const [newRequirement, setNewRequirement] = useState('')
  const [newResponsibility, setNewResponsibility] = useState('')
  const [newSkill, setNewSkill] = useState('')
  const [newBenefit, setNewBenefit] = useState('')

  const handleInputChange = (field: keyof JobData, value: string) => {
    setJobData(prev => ({ ...prev, [field]: value }))
  }

  const handleSalaryChange = (field: keyof JobData['salary'], value: string) => {
    setJobData(prev => ({
      ...prev,
      salary: { ...prev.salary, [field]: value }
    }))
  }

  const addItem = (field: 'requirements' | 'responsibilities' | 'skills' | 'benefits', value: string, setValue: (v: string) => void) => {
    if (value.trim()) {
      setJobData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }))
      setValue('')
    }
  }

  const removeItem = (field: 'requirements' | 'responsibilities' | 'skills' | 'benefits', index: number) => {
    setJobData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
    // TODO: Implement API call to save job
    console.log('Submitting job:', jobData)
    router.push('/hr/dashboard')
  }

  const steps = [
    {
      title: 'Job Overview',
      fields: [
        { name: 'title', label: 'Job Title', icon: Briefcase },
        { name: 'department', label: 'Department', icon: Users },
        { name: 'location', label: 'Location', icon: MapPin },
        { name: 'type', label: 'Job Type', icon: Clock }
      ]
    },
    {
      title: 'Compensation',
      fields: [
        { name: 'salary.min', label: 'Minimum Salary', icon: DollarSign },
        { name: 'salary.max', label: 'Maximum Salary', icon: DollarSign }
      ]
    },
    {
      title: 'Job Details',
      fields: [
        { name: 'description', label: 'Job Description', icon: FileText, type: 'textarea' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Create New Job Listing</h2>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.title} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        currentStep > index
                          ? 'bg-matchaVibrant-600 text-white'
                          : currentStep === index
                          ? 'bg-matchaVibrant-100 text-matchaVibrant-600'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {currentStep > index ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className="ml-2 text-sm font-medium text-gray-900">{step.title}</div>
                    {index < steps.length - 1 && (
                      <div className="mx-4 h-0.5 w-8 bg-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="space-y-6">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {steps[0].fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <field.icon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="focus:ring-matchaVibrant-500 focus:border-matchaVibrant-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          value={jobData[field.name as keyof JobData] as string}
                          onChange={(e) => handleInputChange(field.name as keyof JobData, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {steps[1].fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <field.icon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="focus:ring-matchaVibrant-500 focus:border-matchaVibrant-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          value={jobData.salary[field.name.split('.')[1] as keyof JobData['salary']]}
                          onChange={(e) => handleSalaryChange(field.name.split('.')[1] as keyof JobData['salary'], e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Job Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={4}
                        className="shadow-sm focus:ring-matchaVibrant-500 focus:border-matchaVibrant-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={jobData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Requirements
                    </label>
                    <div className="mt-1 flex">
                      <input
                        type="text"
                        className="focus:ring-matchaVibrant-500 focus:border-matchaVibrant-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem('requirements', newRequirement, setNewRequirement)}
                      />
                      <button
                        type="button"
                        className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-matchaVibrant-600 hover:bg-matchaVibrant-700"
                        onClick={() => addItem('requirements', newRequirement, setNewRequirement)}
                      >
                        Add
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {jobData.requirements.map((req, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-matchaVibrant-100 text-matchaVibrant-800"
                        >
                          {req}
                          <button
                            type="button"
                            className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-matchaVibrant-400 hover:bg-matchaVibrant-200 hover:text-matchaVibrant-500"
                            onClick={() => removeItem('requirements', index)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Responsibilities
                    </label>
                    <div className="mt-1 flex">
                      <input
                        type="text"
                        className="focus:ring-matchaVibrant-500 focus:border-matchaVibrant-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={newResponsibility}
                        onChange={(e) => setNewResponsibility(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem('responsibilities', newResponsibility, setNewResponsibility)}
                      />
                      <button
                        type="button"
                        className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-matchaVibrant-600 hover:bg-matchaVibrant-700"
                        onClick={() => addItem('responsibilities', newResponsibility, setNewResponsibility)}
                      >
                        Add
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {jobData.responsibilities.map((resp, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-matchaVibrant-100 text-matchaVibrant-800"
                        >
                          {resp}
                          <button
                            type="button"
                            className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-matchaVibrant-400 hover:bg-matchaVibrant-200 hover:text-matchaVibrant-500"
                            onClick={() => removeItem('responsibilities', index)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                  currentStep === 1
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-matchaVibrant-600 hover:bg-matchaVibrant-700'
                }`}
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1}
              >
                Previous
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-matchaVibrant-600 hover:bg-matchaVibrant-700"
                onClick={() => {
                  if (currentStep < steps.length) {
                    setCurrentStep(prev => prev + 1)
                  } else {
                    handleSubmit()
                  }
                }}
              >
                {currentStep === steps.length ? 'Create Job' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 