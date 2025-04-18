'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { 
  Building2, 
  Upload, 
  Users, 
  Briefcase, 
  MapPin, 
  Globe, 
  ArrowRight,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react'

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
}

export default function CompanySetup() {
  const router = useRouter()
  const supabase = createClientComponentClient()
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
    benefits: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCompanyData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCompanyData(prev => ({ ...prev, logo: e.target.files![0] }))
    }
  }

  const handleTagChange = (name: 'values' | 'benefits', value: string) => {
    setCompanyData(prev => ({
      ...prev,
      [name]: [...prev[name], value]
    }))
  }

  const handleTagRemove = (name: 'values' | 'benefits', index: number) => {
    setCompanyData(prev => ({
      ...prev,
      [name]: prev[name].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Upload logo if exists
      let logoUrl = null
      if (companyData.logo) {
        const { data: logoData, error: uploadError } = await supabase.storage
          .from('company-logos')
          .upload(`${companyData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`, companyData.logo)
        
        if (uploadError) throw uploadError
        logoUrl = logoData.path
      }

      // Create company
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .insert({
          name: companyData.name,
          description: companyData.description,
          industry: companyData.industry,
          size: companyData.size,
          location: companyData.location,
          website: companyData.website,
          logo_url: logoUrl,
          values: companyData.values,
          benefits: companyData.benefits
        })
        .select()
        .single()

      if (companyError) throw companyError

      // Update user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          company: companyData.name,
          role: 'admin'
        })
        .eq('id', (await supabase.auth.getUser()).data.user?.id)

      if (profileError) throw profileError

      router.push('/company')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    {
      title: 'Company Profile',
      fields: [
        { name: 'name', label: 'Company Name', icon: Building2 },
        { name: 'description', label: 'Company Description', icon: Briefcase },
        { name: 'industry', label: 'Industry', icon: Briefcase },
        { name: 'size', label: 'Company Size', icon: Users },
        { name: 'location', label: 'Location', icon: MapPin },
        { name: 'website', label: 'Website', icon: Globe }
      ]
    },
    {
      title: 'Company Branding',
      fields: [
        { name: 'logo', label: 'Company Logo', icon: Upload }
      ]
    },
    {
      title: 'Company Culture',
      fields: [
        { name: 'values', label: 'Company Values', icon: CheckCircle2 },
        { name: 'benefits', label: 'Employee Benefits', icon: CheckCircle2 }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Set Up Your Company</h1>
            <p className="mt-2 text-gray-600">Complete your company profile to start listing jobs and finding talent.</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep > index
                        ? 'bg-matchaVibrant-600 text-white'
                        : currentStep === index + 1
                        ? 'bg-matchaVibrant-100 text-matchaVibrant-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {currentStep > index ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-16 ${
                        currentStep > index + 1
                          ? 'bg-matchaVibrant-600'
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}

            {steps[currentStep - 1].fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                {field.name === 'logo' ? (
                  <div className="mt-1 flex items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-matchaVibrant-50 file:text-matchaVibrant-700
                        hover:file:bg-matchaVibrant-100"
                    />
                  </div>
                ) : field.name === 'values' || field.name === 'benefits' ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          const input = e.target as HTMLInputElement
                          if (input.value.trim()) {
                            handleTagChange(field.name as 'values' | 'benefits', input.value.trim())
                            input.value = ''
                          }
                        }
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-matchaVibrant-500 focus:ring-matchaVibrant-500 sm:text-sm"
                      placeholder={`Add ${field.label.toLowerCase()}`}
                    />
                    <div className="flex flex-wrap gap-2">
                      {companyData[field.name].map((tag, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-matchaVibrant-100 text-matchaVibrant-700"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleTagRemove(field.name as 'values' | 'benefits', index)}
                            className="ml-2 text-matchaVibrant-600 hover:text-matchaVibrant-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <input
                    type={field.name === 'website' ? 'url' : 'text'}
                    name={field.name}
                    value={companyData[field.name as keyof CompanyData] as string}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-matchaVibrant-500 focus:ring-matchaVibrant-500 sm:text-sm"
                    required
                  />
                )}
              </div>
            ))}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-matchaVibrant-500"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-matchaVibrant-600 hover:bg-matchaVibrant-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-matchaVibrant-500"
              >
                {currentStep === steps.length ? (
                  loading ? 'Saving...' : 'Complete Setup'
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 