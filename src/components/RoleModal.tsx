'use client'

import { Building2, MapPin, Clock, IndianRupee, GraduationCap, X, MessageSquare } from 'lucide-react'
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
  onChatClick?: (roleId: string) => void
}

export default function RoleModal({ role, onClose, onChatClick }: RoleModalProps) {
  if (!role) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
              {role.companies?.logo_url ? (
                <img
                  src={role.companies.logo_url}
                  alt={role.companies.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Building2 className="h-8 w-8 m-4 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-clash text-2xl font-bold text-gray-900">
                {role.title}
              </h2>
              <p className="text-lg text-gray-600">
                {role.companies?.name}
              </p>
            </div>
            <button
              onClick={() => onChatClick?.(role.id)}
              className="flex items-center gap-2 rounded-lg bg-matchaVibrant-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-matchaVibrant-600"
            >
              <MessageSquare className="h-4 w-4" />
              Chat with AI
            </button>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {role.location && (
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <MapPin className="h-4 w-4 text-gray-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Location</div>
                <div className="text-sm text-gray-600">{role.location}</div>
              </div>
            )}
            {role.employment_type && (
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <Clock className="h-4 w-4 text-gray-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Type</div>
                <div className="text-sm text-gray-600">{role.employment_type}</div>
              </div>
            )}
            {role.experience_level && (
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <GraduationCap className="h-4 w-4 text-gray-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Level</div>
                <div className="text-sm text-gray-600">{role.experience_level}</div>
              </div>
            )}
            {role.salary_range && (
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <IndianRupee className="h-4 w-4 text-gray-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Salary</div>
                <div className="text-sm text-gray-600">{role.salary_range}</div>
              </div>
            )}
          </div>

          {/* Description */}
          {role.description && (
            <div>
              <h3 className="font-clash mb-3 text-lg font-semibold text-gray-900">
                About the Role
              </h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {role.description}
              </p>
            </div>
          )}

          {/* Requirements */}
          {role.requirements && role.requirements.length > 0 && (
            <div>
              <h3 className="font-clash mb-3 text-lg font-semibold text-gray-900">
                Requirements
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-gray-600">
                {role.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Responsibilities */}
          {role.responsibilities && role.responsibilities.length > 0 && (
            <div>
              <h3 className="font-clash mb-3 text-lg font-semibold text-gray-900">
                Responsibilities
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-gray-600">
                {role.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 