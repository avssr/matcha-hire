'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion } from 'framer-motion'
import { Building2, Users, MapPin, Globe, ArrowRight, Edit2 } from 'lucide-react'

interface Company {
  id: string
  name: string
  description: string
  industry: string
  size: string
  location: string
  website: string
  logo_url: string | null
  values: string[]
  benefits: string[]
}

export default function CompanyPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No user found')

        const { data: profile } = await supabase
          .from('profiles')
          .select('company')
          .eq('id', user.id)
          .single()

        if (!profile?.company) {
          router.push('/company/setup')
          return
        }

        const { data: companyData } = await supabase
          .from('companies')
          .select('*')
          .eq('name', profile.company)
          .single()

        if (!companyData) throw new Error('Company not found')
        setCompany(companyData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-matchaVibrant-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!company) return null

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {company.logo_url ? (
                  <img
                    src={company.logo_url}
                    alt={company.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                  <p className="text-gray-600">{company.industry}</p>
                </div>
              </div>
              <button
                onClick={() => router.push('/company/setup')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-matchaVibrant-500"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Company Info */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">About Us</h2>
                <p className="text-gray-600">{company.description}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Company Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">{company.size} employees</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">{company.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-3" />
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-matchaVibrant-600 hover:text-matchaVibrant-700"
                    >
                      {company.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Values & Benefits */}
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Our Values</h2>
                  <div className="flex flex-wrap gap-2">
                    {company.values.map((value, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-matchaVibrant-100 text-matchaVibrant-700"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Employee Benefits</h2>
                  <div className="flex flex-wrap gap-2">
                    {company.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-matchaVibrant-100 text-matchaVibrant-700"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Ready to list your first role?</h2>
                <p className="mt-1 text-gray-600">Create a job listing and start finding the perfect candidates.</p>
              </div>
              <button
                onClick={() => router.push('/company/roles/new')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-matchaVibrant-600 hover:bg-matchaVibrant-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-matchaVibrant-500"
              >
                Create New Role
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 