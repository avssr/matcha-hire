'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Building2, Upload, FileText, CheckCircle2 } from 'lucide-react'

interface CompanyData {
  name: string
  description: string
  industry: string
  size: string
  location: string
  website: string
  logo: File | null
  values: string[]
  benefits: string[]
  rules: string[]
}

export default function CompanySetup() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    description: '',
    industry: '',
    size: '',
    location: '',
    website: '',
    logo: null,
    values: [],
    benefits: [],
    rules: []
  })

  const steps = [
    {
      id: 1,
      title: 'Company Profile',
      icon: Building2,
      fields: [
        { name: 'name', label: 'Company Name', type: 'text' },
        { name: 'description', label: 'Company Description', type: 'textarea' },
        { name: 'industry', label: 'Industry', type: 'text' },
        { name: 'size', label: 'Company Size', type: 'select', options: ['1-10', '11-50', '51-200', '201-500', '500+'] },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'website', label: 'Website', type: 'url' }
      ]
    },
    {
      id: 2,
      title: 'Company Branding',
      icon: Upload,
      fields: [
        { name: 'logo', label: 'Company Logo', type: 'file' },
        { name: 'values', label: 'Core Values', type: 'tags' },
        { name: 'benefits', label: 'Employee Benefits', type: 'tags' }
      ]
    },
    {
      id: 3,
      title: 'Company Rules',
      icon: FileText,
      fields: [
        { name: 'rules', label: 'Company Rules & Policies', type: 'textarea' }
      ]
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // TODO: Save company data to database
      router.push('/hr')
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
                    value={companyData[field.name as keyof CompanyData] as string}
                    onChange={(e) => setCompanyData({ ...companyData, [field.name]: e.target.value })}
                  />
                ) : field.type === 'file' ? (
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md bg-white font-medium text-matchaVibrant-600 hover:text-matchaVibrant-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            onChange={(e) => setCompanyData({ ...companyData, [field.name]: e.target.files?.[0] || null })}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ) : field.type === 'tags' ? (
                  <div className="flex flex-wrap gap-2">
                    {(companyData[field.name as keyof CompanyData] as string[]).map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-matchaVibrant-100 text-matchaVibrant-700"
                      >
                        {tag}
                        <button
                          type="button"
                          className="ml-1 text-matchaVibrant-600 hover:text-matchaVibrant-800"
                          onClick={() => {
                            const newTags = [...(companyData[field.name as keyof CompanyData] as string[])]
                            newTags.splice(index, 1)
                            setCompanyData({ ...companyData, [field.name]: newTags })
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      className="flex-1 min-w-[200px] rounded-lg border-gray-300 shadow-sm focus:border-matchaVibrant-500 focus:ring-matchaVibrant-500"
                      placeholder="Add a tag..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          const value = e.currentTarget.value.trim()
                          if (value) {
                            setCompanyData({
                              ...companyData,
                              [field.name]: [...(companyData[field.name as keyof CompanyData] as string[]), value]
                            })
                            e.currentTarget.value = ''
                          }
                        }
                      }}
                    />
                  </div>
                ) : (
                  <input
                    type={field.type}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-matchaVibrant-500 focus:ring-matchaVibrant-500"
                    value={companyData[field.name as keyof CompanyData] as string}
                    onChange={(e) => setCompanyData({ ...companyData, [field.name]: e.target.value })}
                  />
                )}
              </div>
            ))}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
              <button
                type="submit"
                className="ml-auto px-4 py-2 text-sm font-medium text-white bg-matchaVibrant-600 rounded-lg hover:bg-matchaVibrant-700"
              >
                {currentStep === steps.length ? 'Complete Setup' : 'Next'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
} 