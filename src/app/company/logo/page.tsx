'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import LogoUpload from '@/components/LogoUpload'

export default function CompanyLogoPage() {
  const [companyId, setCompanyId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchCompanyId = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('companies')
          .select('id')
          .eq('name', 'SmartJoules')
          .single()

        if (error) {
          console.error('Error fetching company ID:', error)
          setError('Failed to fetch company ID')
          return
        }

        if (!data) {
          setError('Company not found')
          return
        }

        setCompanyId(data.id)
      } catch (err) {
        console.error('Error in fetchCompanyId:', err)
        setError('An unexpected error occurred')
      }
    }

    fetchCompanyId()
  }, [])

  const handleSuccess = (url: string) => {
    setSuccess(true)
    console.log('Logo uploaded successfully:', url)
  }

  const handleError = (error: string) => {
    setError(error)
    console.error('Logo upload error:', error)
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-matchaVibrant-600 hover:text-matchaVibrant-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!companyId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full mx-auto p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Upload Smart Joules Logo
        </h1>
        {success ? (
          <div className="text-center">
            <p className="text-green-500 mb-4">Logo uploaded successfully!</p>
            <button
              onClick={() => window.location.reload()}
              className="text-matchaVibrant-600 hover:text-matchaVibrant-700"
            >
              Upload Another
            </button>
          </div>
        ) : (
          <LogoUpload
            companyId={companyId}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}
      </div>
    </div>
  )
} 