import React from 'react'
import { motion } from 'framer-motion'

interface ErrorMessageProps {
  message: string
  retry?: () => void
}

export const ErrorMessage = ({ message, retry }: ErrorMessageProps) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
  >
    <p className="text-red-600">{message}</p>
    {retry && (
      <button 
        onClick={retry}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    )}
  </motion.div>
)

export default ErrorMessage 