'use client'

import { motion } from 'framer-motion'
import { Search, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-8xl font-bold text-matchaVibrant-600 font-clash mb-2">
            404
          </h1>
          <p className="text-2xl text-gray-600 font-satoshi">
            Looks like this position has been filled!
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
            {/* Stylized magnifying glass with resume */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Search className="w-32 h-32 text-matchaVibrant-300" strokeWidth={1.5} />
                <motion.div
                  animate={{
                    rotate: [0, -5, 5, -5, 0],
                    y: [0, -5, 0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-16 h-20 bg-white rounded-lg shadow-lg border-2 border-matchaVibrant-200 flex flex-col justify-center items-center p-2">
                    <div className="w-10 h-1 bg-matchaVibrant-200 rounded mb-1" />
                    <div className="w-8 h-1 bg-matchaVibrant-200 rounded mb-1" />
                    <div className="w-6 h-1 bg-matchaVibrant-200 rounded" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Message and CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Don't worry! We have plenty of other great opportunities waiting for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-matchaVibrant-600 text-white hover:bg-matchaVibrant-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Homepage
            </Link>
            <Link
              href="/roles"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white border-2 border-matchaVibrant-200 text-matchaVibrant-600 hover:bg-matchaVibrant-50 transition-colors duration-200"
            >
              View Open Positions
            </Link>
          </div>

          {/* Fun HR-themed message */}
          <p className="text-sm text-gray-500 mt-8">
            Plot twist: Even our 404 page is going through the interview process! 🎯
          </p>
        </motion.div>
      </div>
    </div>
  )
} 