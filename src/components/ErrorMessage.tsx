'use client'

interface ErrorMessageProps {
  message: string
  retry?: () => void
}

export default function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-gray-600">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-matchaVibrant-500 text-white rounded-lg hover:bg-matchaVibrant-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
} 