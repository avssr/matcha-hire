'use client'

import { Building2, MapPin, Clock, IndianRupee, GraduationCap, ChevronRight, MessageSquare } from 'lucide-react'
import type { Database } from '@/types/database'

type Role = Database['public']['Tables']['roles']['Row'] & {
  companies?: {
    name: string
    logo_url: string | null
  } | null
}

interface RoleCardProps {
  role: Role
  onClick?: () => void
  onChatClick?: (roleId: string) => void
}

export default function RoleCard({ role, onClick, onChatClick }: RoleCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClick?.()
  }

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Chat button clicked for role:', role.id)
    onChatClick?.(role.id)
  }

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white transition-all hover:shadow-lg">
      <div 
        className="flex cursor-pointer flex-col gap-4 p-6"
        onClick={handleCardClick}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
              {role.companies?.logo_url ? (
                <img
                  src={role.companies.logo_url}
                  alt={role.companies.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Building2 className="h-6 w-6 m-3 text-gray-400" />
              )}
            </div>
            <div>
              <h3 className="font-clash text-lg font-semibold text-gray-900">
                {role.title}
              </h3>
              <p className="text-sm text-gray-600">
                {role.companies?.name}
              </p>
            </div>
          </div>
          <button
            onClick={handleChatClick}
            className="flex items-center gap-2 rounded-lg bg-matchaVibrant-50 px-3 py-1.5 text-sm font-medium text-matchaVibrant-600 transition-colors hover:bg-matchaVibrant-100"
          >
            <MessageSquare className="h-4 w-4" />
            Chat with AI
          </button>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-3">
          {role.location && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-400" />
              {role.location}
            </div>
          )}
          {role.employment_type && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-gray-400" />
              {role.employment_type}
            </div>
          )}
          {role.experience_level && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <GraduationCap className="h-4 w-4 text-gray-400" />
              {role.experience_level}
            </div>
          )}
          {role.salary_range && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <IndianRupee className="h-4 w-4 text-gray-400" />
              {role.salary_range}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {role.description}
        </p>

        {/* Requirements */}
        {role.requirements && role.requirements.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {role.requirements.slice(0, 3).map((req, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600"
              >
                {req}
              </span>
            ))}
            {role.requirements.length > 3 && (
              <span className="inline-flex items-center text-xs text-gray-400">
                +{role.requirements.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="flex cursor-pointer items-center justify-between border-t border-gray-100 px-6 py-4 transition-colors group-hover:bg-gray-50"
        onClick={handleCardClick}
      >
        <span className="text-sm font-medium text-matchaVibrant-600">
          View Details
        </span>
        <ChevronRight className="h-4 w-4 text-matchaVibrant-600" />
      </div>
    </div>
  )
} 