import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Briefcase, GraduationCap, IndianRupee, MessageCircle } from 'lucide-react'
import type { Database } from '@/types/database'

type Role = Database['public']['Tables']['roles']['Row'] & {
  companies?: {
    name: string
    logo_url: string | null
  } | null
}

interface RoleModalProps {
  role: Role | null
  onClose: () => void
  onChatClick: (roleId: string) => void
}

export default function RoleModal({ role, onClose, onChatClick }: RoleModalProps) {
  if (!role) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 transition-opacity bg-gray-900/50"
            onClick={onClose}
            aria-hidden="true"
          />

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white px-6 py-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-matchaVibrant-50 flex items-center justify-center">
                    {role.companies?.logo_url ? (
                      <img
                        src={role.companies.logo_url}
                        alt={`${role.companies.name} logo`}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <span className="text-matchaVibrant-600 font-semibold">
                        {role.companies?.name?.[0] || 'S'}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{role.title}</h2>
                    <p className="text-gray-600">{role.companies?.name}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Role</h3>
                    <p className="text-gray-600">{role.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h3>
                    <ul className="space-y-2">
                      {role.responsibilities?.map((resp, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 mr-2 bg-matchaVibrant-500 rounded-full" />
                          <span className="text-gray-600">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                    <div className="flex flex-wrap gap-2">
                      {role.requirements?.map((req, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-matchaVibrant-50 text-matchaVibrant-700 rounded-full text-sm"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">{role.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">{role.employment_type}</span>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">{role.experience_level}</span>
                      </div>
                      <div className="flex items-center">
                        <IndianRupee className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">{role.salary_range}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => onChatClick(role.id)}
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-xl text-base font-medium text-white bg-matchaVibrant-600 hover:bg-matchaVibrant-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-matchaVibrant-500"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Chat with AI about this role
                    </button>
                    <button
                      className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-xl text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-matchaVibrant-500"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 