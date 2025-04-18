import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Role {
  id: string
  title: string
  department: string
  location: string
  company: {
    name: string
    logo_url: string | null
  }
}

export default async function RolesPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: roles, error } = await supabase
    .from('roles')
    .select(`
      id,
      title,
      department,
      location,
      company:companies (
        name,
        logo_url
      )
    `)
    .eq('status', 'open')
    .returns<Role[]>()

  if (error) {
    console.error('Error fetching roles:', error)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-red-500">Error loading roles. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Open Roles
        </h1>
        <p className="text-xl text-gray-600">
          Find your next opportunity at innovative companies
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roles?.map((role) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              {role.company.logo_url ? (
                <img
                  src={role.company.logo_url}
                  alt={role.company.name}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg font-medium">
                    {role.company.name[0]}
                  </span>
                </div>
              )}
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">{role.title}</h3>
                <p className="text-sm text-gray-500">{role.company.name}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {role.department}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {role.location}
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={`/roles/${role.id}`}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-matchaVibrant-600 hover:bg-matchaVibrant-700"
              >
                View Role
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 