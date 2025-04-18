import React from 'react'
import { MessageCircle, MapPin, Briefcase, GraduationCap, IndianRupee, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Database } from '@/types/database'

type Role = Database['public']['Tables']['roles']['Row'] & {
  companies?: {
    name: string
    logo_url: string | null
  } | null
}

interface RoleCardProps {
  role: Role
  onChatClick: (roleId: string) => void
  onClick?: () => void
}

export default function RoleCard({ role, onChatClick, onClick }: RoleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-matchaVibrant-50 flex items-center justify-center">
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
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-matchaVibrant-600 transition-colors">
                {role.title}
              </h3>
              <p className="text-sm text-gray-500">{role.companies?.name}</p>
            </div>
          </div>
          <button
            onClick={() => onChatClick(role.id)}
            className="p-2 text-gray-400 hover:text-matchaVibrant-600 rounded-full transition-colors"
            aria-label="Chat about this role"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-3 mb-4">
          {role.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1 text-gray-400" />
              {role.location}
            </div>
          )}
          {role.employment_type && (
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase className="w-4 h-4 mr-1 text-gray-400" />
              {role.employment_type}
            </div>
          )}
          {role.experience_level && (
            <div className="flex items-center text-sm text-gray-600">
              <GraduationCap className="w-4 h-4 mr-1 text-gray-400" />
              {role.experience_level}
            </div>
          )}
          {role.salary_range && (
            <div className="flex items-center text-sm text-gray-600">
              <IndianRupee className="w-4 h-4 mr-1 text-gray-400" />
              {role.salary_range}
            </div>
          )}
        </div>

        {/* Description */}
        {role.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {role.description}
          </p>
        )}

        {/* Requirements Preview */}
        {role.requirements && role.requirements.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {role.requirements.slice(0, 3).map((req, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full"
                  title={req}
                >
                  {req.length > 30 ? req.substring(0, 27) + '...' : req}
                </span>
              ))}
              {role.requirements.length > 3 && (
                <span
                  className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full"
                  title={role.requirements.slice(3).join('\n')}
                >
                  +{role.requirements.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            onClick={onClick}
            className="flex items-center text-sm text-matchaVibrant-600 group-hover:text-matchaVibrant-700 transition-colors"
          >
            <span>View Details</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onChatClick(role.id)}
            className="text-sm px-4 py-2 bg-matchaVibrant-600 text-white rounded-lg hover:bg-matchaVibrant-700 transition-colors"
          >
            Chat with AI
          </button>
        </div>
      </div>
    </motion.div>
  )
} 