'use client'

import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, RefreshCcw } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Error Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-block p-4 bg-matchaVibrant-50 rounded-full mb-4">
            <AlertCircle className="w-16 h-16 text-matchaVibrant-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 font-clash mb-2">
            Oops! Looks like we hit a snag
          </h1>
          <p className="text-lg text-gray-600 font-satoshi">
            Don't worry, our HR team is already reviewing this incident!
          </p>
        </motion.div>

        {/* Animated Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
        >
          <div className="w-64 h-64 mx-auto relative">
            {/* Stylized clipboard with error */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: [0, -2, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-40 h-48 bg-white rounded-lg shadow-lg border-2 border-matchaVibrant-200 p-4 flex flex-col items-center"
              >
                <div className="w-full h-2 bg-matchaVibrant-100 rounded mb-2" />
                <div className="w-3/4 h-2 bg-matchaVibrant-100 rounded mb-2" />
                <div className="w-1/2 h-2 bg-matchaVibrant-100 rounded mb-4" />
                <div className="w-12 h-12 rounded-full bg-matchaVibrant-50 flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-matchaVibrant-600 text-white hover:bg-matchaVibrant-700 transition-colors duration-200"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white border-2 border-matchaVibrant-200 text-matchaVibrant-600 hover:bg-matchaVibrant-50 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Homepage
            </Link>
          </div>

          {/* Fun HR-themed message */}
          <p className="text-sm text-gray-500 mt-8">
            Our error handling process has a 99.9% acceptance rate! 📊
          </p>
        </motion.div>
      </div>
    </div>
  )
} 