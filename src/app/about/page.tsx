'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
          >
            Connecting Champions with 
            <span className="text-matchaVibrant-600"> Mission-Driven Companies</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-xl text-gray-500"
          >
            MatchaHire is revolutionizing how talented professionals find their next challenge and how companies discover their next champions.
          </motion.p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-matchaVibrant-600">For Candidates</h3>
              <p className="text-gray-600">
                Find roles that match your potential and ambitions. Our AI-powered platform helps you discover opportunities where you can make a real impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-matchaVibrant-600">For Companies</h3>
              <p className="text-gray-600">
                Connect with driven professionals who will become champions at your organization. Our platform helps you identify and engage with exceptional talent.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-matchaVibrant-600">Our Approach</h3>
              <p className="text-gray-600">
                Using advanced AI and deep understanding of both candidates and companies, we create meaningful matches that lead to long-term success.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Ready to Find Your Next Role?</h2>
              <p className="text-xl text-gray-500">
                Browse through our curated selection of opportunities and find the perfect match for your skills and ambitions.
              </p>
              <div className="pt-4">
                <Link
                  href="/roles"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-matchaVibrant-600 hover:bg-matchaVibrant-700"
                >
                  Browse Roles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Looking to Hire Champions?</h2>
              <p className="text-xl text-gray-500">
                List your roles and connect with driven professionals who will make an impact at your organization.
              </p>
              <div className="pt-4">
                <Link
                  href="/roles/new"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-matchaVibrant-600 hover:bg-matchaVibrant-700"
                >
                  Post a Role
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 