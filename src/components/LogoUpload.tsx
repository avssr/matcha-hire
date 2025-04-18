import React, { useState } from 'react'
import { Upload } from 'lucide-react'

interface LogoUploadProps {
  companyId: string
  onSuccess?: (url: string) => void
  onError?: (error: string) => void
}

export default function LogoUpload({ companyId, onSuccess, onError }: LogoUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('companyId', companyId)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload logo')
      }

      onSuccess?.(data.url)
    } catch (error) {
      console.error('Error uploading logo:', error)
      onError?.(error instanceof Error ? error.message : 'Failed to upload logo')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="logo-upload"
        className={`
          flex flex-col items-center justify-center w-full h-32
          border-2 border-dashed rounded-lg cursor-pointer
          ${uploading ? 'bg-gray-100 border-gray-300' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'}
        `}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className={`w-8 h-8 mb-3 ${uploading ? 'text-gray-400' : 'text-gray-500'}`} />
          <p className="mb-2 text-sm text-gray-500">
            {uploading ? 'Uploading...' : 'Click to upload company logo'}
          </p>
          <p className="text-xs text-gray-500">SVG, PNG, or JPG (MAX. 800x400px)</p>
        </div>
        <input
          id="logo-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>
    </div>
  )
} 