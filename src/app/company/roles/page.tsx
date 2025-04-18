'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion } from 'framer-motion'
import { Briefcase, Plus, Search, Filter, ArrowRight } from 'lucide-react'

interface Role {
  id: string
  title: string
  department: string
  location: string
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export default function RolesPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchRoles = async () => {
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

        const { data: rolesData } = await supabase
          .from('roles')
          .select('*')
          .eq('company_id', profile.company)
          .order('created_at', { ascending: false })

        if (!rolesData) throw new Error('No roles found')
        setRoles(rolesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchRoles()
  }, [router, supabase])

  const filteredRoles = roles.filter(role =>
    role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Roles</h1>
            <p className="mt-1 text-gray-600">Manage and create job listings for your company.</p>
          </div>
          <button
            onClick={() => router.push('/company/roles/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-matchaVibrant-600 hover:bg-matchaVibrant-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-matchaVibrant-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Role
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 max-w-md">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-matchaVibrant-500 focus:border-matchaVibrant-500 sm:text-sm"
                  placeholder="Search roles..."
                />
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-matchaVibrant-500"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Roles List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredRoles.map((role) => (
              <li key={role.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Briefcase className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <h2 className="text-lg font-medium text-gray-900">{role.title}</h2>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span>{role.department}</span>
                          <span className="mx-2">•</span>
                          <span>{role.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          role.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {role.status}
                      </span>
                      <button
                        onClick={() => router.push(`/company/roles/${role.id}`)}
                        className="inline-flex items-center text-sm font-medium text-matchaVibrant-600 hover:text-matchaVibrant-700"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Last updated {new Date(role.updated_at).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
} 