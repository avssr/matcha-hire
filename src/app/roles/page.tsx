'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { MessageSquare, Users, Briefcase, Sparkles, Target, Zap, Heart, Search, Building2, MapPin, Clock, IndianRupee, GraduationCap, ChevronLeft, ChevronRight, List, Filter, Bookmark } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import debounce from 'lodash/debounce'
import RoleCard from '@/components/RoleCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import type { Database } from '@/types/database'
import RoleModal from '@/components/RoleModal'

const ITEMS_PER_PAGE = 6
const DEBOUNCE_MS = 300

type Role = Database['public']['Tables']['roles']['Row'] & {
  companies?: {
    name: string
    logo_url: string | null
  } | null
}

export default function RolesPage() {
  // State
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearching, setIsSearching] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Fetch roles
  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/roles')
      if (!response.ok) {
        throw new Error('Failed to fetch roles')
      }
      const data = await response.json()
      setRoles(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRoles()
  }, [fetchRoles])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedLocation, selectedType, selectedLevel])

  // Memoized filter values
  const { locations, types, levels } = useMemo(() => ({
    locations: Array.from(new Set(roles.map(role => role.location).filter(Boolean))),
    types: Array.from(new Set(roles.map(role => role.employment_type).filter(Boolean))),
    levels: Array.from(new Set(roles.map(role => role.experience_level).filter(Boolean)))
  }), [roles])

  // Memoized filtered roles
  const filteredRoles = useMemo(() => {
    return roles.filter(role => {
      const matchesSearch = !searchTerm || (
        (role.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.requirements?.some(req => req?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        role.responsibilities?.some(resp => resp?.toLowerCase().includes(searchTerm.toLowerCase())))
      )
      const matchesLocation = !selectedLocation || role.location === selectedLocation
      const matchesType = !selectedType || role.employment_type === selectedType
      const matchesLevel = !selectedLevel || role.experience_level === selectedLevel

      return matchesSearch && matchesLocation && matchesType && matchesLevel
    })
  }, [roles, searchTerm, selectedLocation, selectedType, selectedLevel])

  // Pagination
  const totalPages = Math.ceil(filteredRoles.length / ITEMS_PER_PAGE)
  const paginatedRoles = filteredRoles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Debounced search handler
  const handleSearch = useMemo(
    () => debounce((value: string) => {
      setIsSearching(true)
      setSearchTerm(value)
      setTimeout(() => setIsSearching(false), DEBOUNCE_MS)
    }, DEBOUNCE_MS),
    []
  )

  // Cleanup
  useEffect(() => {
    return () => {
      handleSearch.cancel()
    }
  }, [handleSearch])

  // Chat handler
  const handleChatClick = useCallback((roleId: string) => {
    // TODO: Implement chat functionality
    console.log('Chat clicked for role:', roleId)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner />
          <p className="text-matchaVibrant-700">Loading roles...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage 
          message={`Error: ${error}`}
          retry={fetchRoles}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-24 bg-gradient-to-br from-matchaVibrant-900 to-matchaVibrant-800 overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-clash">
              Discover Your Next Role
            </h1>
            <p className="text-xl text-matchaVibrant-100 mb-8 font-satoshi">
              Find opportunities that align with your skills, values, and ambitions.
            </p>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Matching",
                description: "AI-powered role alignment based on your skills and values",
                icon: Sparkles
              },
              {
                title: "Mission-Driven",
                description: "Find companies that share your vision and purpose",
                icon: Target
              },
              {
                title: "Fast-Track Growth",
                description: "Accelerate your career with meaningful opportunities",
                icon: Zap
              }
            ].map((prop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-matchaVibrant-500 rounded-lg flex items-center justify-center mb-4">
                  <prop.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{prop.title}</h3>
                <p className="text-matchaVibrant-100">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Search and Filters */}
      <section className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for your dream role..."
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-matchaVibrant-500/20 focus:border-matchaVibrant-500 transition-all text-gray-800"
                />
                <div className="absolute right-4 flex items-center">
                  <kbd className="hidden md:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded">⌘K</kbd>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 md:gap-3">
              {/* Location Filter */}
              <div className="relative flex-1 md:flex-none md:w-44">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-matchaVibrant-500/20 focus:border-matchaVibrant-500 transition-all appearance-none text-gray-800"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location}>{location}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Employment Type Filter */}
              <div className="relative flex-1 md:flex-none md:w-44">
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-matchaVibrant-500/20 focus:border-matchaVibrant-500 transition-all appearance-none text-gray-800"
                  >
                    <option value="">All Types</option>
                    {types.map(type => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Experience Level Filter */}
              <div className="relative flex-1 md:flex-none md:w-44">
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-matchaVibrant-500/20 focus:border-matchaVibrant-500 transition-all appearance-none text-gray-800"
                  >
                    <option value="">All Levels</option>
                    {levels.map(level => (
                      <option key={level}>{level}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedLocation || selectedType || selectedLevel) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedLocation && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-matchaVibrant-50 text-matchaVibrant-700 border border-matchaVibrant-100">
                  <MapPin className="w-3.5 h-3.5 mr-1.5" />
                  {selectedLocation}
                  <button
                    onClick={() => setSelectedLocation('')}
                    className="ml-1.5 text-matchaVibrant-600 hover:text-matchaVibrant-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedType && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-matchaVibrant-50 text-matchaVibrant-700 border border-matchaVibrant-100">
                  <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                  {selectedType}
                  <button
                    onClick={() => setSelectedType('')}
                    className="ml-1.5 text-matchaVibrant-600 hover:text-matchaVibrant-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedLevel && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-matchaVibrant-50 text-matchaVibrant-700 border border-matchaVibrant-100">
                  <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
                  {selectedLevel}
                  <button
                    onClick={() => setSelectedLevel('')}
                    className="ml-1.5 text-matchaVibrant-600 hover:text-matchaVibrant-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Roles Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {isSearching ? (
              <motion.div 
                key="searching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <LoadingSpinner />
              </motion.div>
            ) : (
              <>
                <motion.div 
                  key="roles-grid"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {paginatedRoles.map((role) => (
                    <motion.div
                      key={role.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <RoleCard 
                        role={role}
                        onChatClick={handleChatClick}
                        onClick={() => setSelectedRole(role)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
                {filteredRoles.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <p className="text-gray-600">No roles found matching your criteria.</p>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center space-x-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Role Modal */}
      <RoleModal
        role={selectedRole}
        onClose={() => setSelectedRole(null)}
        onChatClick={handleChatClick}
      />
    </div>
  )
} 



