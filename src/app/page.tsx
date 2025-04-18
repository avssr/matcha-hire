'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageSquare, Users, Briefcase, Sparkles, Target, Zap, ArrowRight, Building2, Search, Heart, MapPin, Clock, IndianRupee, BarChart2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative isolate">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Find Champions. Build Champions.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              MatchaHire connects exceptional, driven candidates with companies looking for their next champions. Our AI-powered platform helps you discover roles that match your potential and companies find talent that will drive their mission forward.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/roles"
                className="rounded-md bg-matchaVibrant-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-matchaVibrant-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matchaVibrant-600"
              >
                Find Your Next Challenge
              </Link>
              <Link
                href="/company/setup"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                List Your Roles <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Roles Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-clash">
              Featured Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-satoshi">
              Discover roles where you can make an impact and grow your career.
            </p>
          </div>

          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
              {/* Featured Role Cards */}
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="flex-none w-80 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-matchaVibrant-50 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-matchaVibrant-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Senior Product Designer</h3>
                          <p className="text-sm text-gray-500">Tech Company</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 text-xs font-medium text-matchaVibrant-600 bg-matchaVibrant-50 rounded-full">
                        New
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full">
                        Remote
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full">
                        Full-time
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full">
                        $120k - $180k
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      Lead the design of our next-generation product suite, working closely with engineering and product teams.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Link 
                        href="/roles"
                        className="text-sm text-matchaVibrant-600 hover:text-matchaVibrant-700 transition-colors"
                      >
                        View Details
                      </Link>
                      <button className="text-sm px-4 py-2 bg-matchaVibrant-600 text-white rounded-lg hover:bg-matchaVibrant-700 transition-colors">
                        Get Matched
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Companies Section */}
      <div className="relative isolate bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">For Companies & HR Teams</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find your next champions - candidates who will drive your mission forward. Our AI-powered platform helps you identify and engage with exceptional talent who are ready to make an impact.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-8 ring-1 ring-gray-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-matchaVibrant-600">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold leading-7 text-gray-900">AI-Powered Screening</h3>
              <p className="text-base leading-7 text-gray-600">
                Our intelligent screening process helps you identify top candidates quickly and efficiently.
              </p>
              <Link
                href="/company/setup"
                className="text-sm font-semibold leading-6 text-matchaVibrant-600"
              >
                Get Started <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-8 ring-1 ring-gray-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-matchaVibrant-600">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold leading-7 text-gray-900">Smart Interview Bot</h3>
              <p className="text-base leading-7 text-gray-600">
                Engage candidates with our AI interview bot that provides consistent, unbiased assessments.
              </p>
              <Link
                href="/company/setup"
                className="text-sm font-semibold leading-6 text-matchaVibrant-600"
              >
                Learn More <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-8 ring-1 ring-gray-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-matchaVibrant-600">
                <BarChart2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold leading-7 text-gray-900">Analytics Dashboard</h3>
              <p className="text-base leading-7 text-gray-600">
                Track your hiring metrics and make data-driven decisions with our comprehensive analytics.
              </p>
              <Link
                href="/company/setup"
                className="text-sm font-semibold leading-6 text-matchaVibrant-600"
              >
                View Demo <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-clash">
              How MatchaHire Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-satoshi">
              A smarter way to connect exceptional talent with mission-driven companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Discover",
                description: "Find roles that match your potential and companies that value your drive. Our AI helps surface opportunities where you can make an impact.",
                icon: Search
              },
              {
                title: "Connect",
                description: "Engage with companies through our AI-powered platform. Get deep insights about their mission, culture, and growth opportunities.",
                icon: Heart
              },
              {
                title: "Grow",
                description: "Join organizations that recognize your potential. Make an impact from day one and grow with companies that invest in their champions.",
                icon: Zap
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-matchaVibrant-50 rounded-lg flex items-center justify-center mb-6">
                  <step.icon className="w-6 h-6 text-matchaVibrant-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-matchaVibrant-900 to-matchaVibrant-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-clash">
            Ready to Find Your Next Champion?
          </h2>
          <p className="text-xl text-matchaVibrant-100 mb-8 max-w-2xl mx-auto font-satoshi">
            Whether you're a driven professional seeking your next challenge or a company looking for exceptional talent, MatchaHire helps you make the right connection.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/roles"
              className="inline-flex items-center px-8 py-4 bg-white text-matchaVibrant-900 rounded-xl font-medium hover:bg-matchaVibrant-100 transition-all duration-300"
            >
              <span>Find Your Next Challenge</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              href="/company/setup"
              className="inline-flex items-center px-8 py-4 bg-matchaVibrant-500 text-white rounded-xl font-medium hover:bg-matchaVibrant-400 transition-all duration-300"
            >
              <span>List Your Roles</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 