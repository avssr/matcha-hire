'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Target, Zap, Building2, MapPin, Clock, IndianRupee, GraduationCap } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-matchaVibrant-900 via-matchaVibrant-800 to-matchaVibrant-700">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-10" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-clash">
                Find Your Next<br />
                <span className="text-matchaVibrant-300">Champion</span>
              </h1>
              <p className="text-xl text-matchaVibrant-100 mb-8 font-satoshi">
                Connect with exceptional talent through AI-powered conversations. 
                Let candidates showcase their potential beyond resumes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/company/roles/new"
                  className="group px-8 py-4 bg-matchaVibrant-500 hover:bg-matchaVibrant-400 text-white rounded-xl font-medium transition-all duration-300 flex items-center"
                >
                  <span>Post a Role</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/roles"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-300"
                >
                  Browse Roles
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-matchaVibrant-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-matchaVibrant-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-matchaVibrant-500 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">AI-Powered Screening</h3>
                      <p className="text-matchaVibrant-100">Evaluate candidates holistically</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-matchaVibrant-500 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Smart Personas</h3>
                      <p className="text-matchaVibrant-100">Custom interview experiences</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-matchaVibrant-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Fast-Track Hiring</h3>
                      <p className="text-matchaVibrant-100">Streamlined candidate evaluation</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Roles Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-clash">
              Open Roles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-satoshi">
              Discover opportunities at forward-thinking companies. Apply through our AI-powered chat or traditional resume upload.
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
                        💬 Chat
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
                      <Link 
                        href="/roles/apply"
                        className="text-sm px-4 py-2 bg-matchaVibrant-600 text-white rounded-lg hover:bg-matchaVibrant-700 transition-colors"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Companies Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/dots.svg')] bg-center opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-matchaVibrant-600 font-medium mb-2 inline-block">FOR COMPANIES</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-clash">
              Transform Your Hiring
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-satoshi">
              Create engaging role experiences that attract top talent. Our AI-powered platform helps you evaluate candidates beyond their resumes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Smart Personas",
                description: "Create custom interview experiences that showcase your company culture and role requirements.",
                icon: Sparkles
              },
              {
                title: "AI-Powered Screening",
                description: "Evaluate candidates holistically through natural conversations and structured assessments.",
                icon: Zap
              },
              {
                title: "Streamlined Process",
                description: "Manage your hiring pipeline with our intuitive dashboard and automated workflows.",
                icon: Target
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-matchaVibrant-50 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-matchaVibrant-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/company/roles/new"
                className="group px-8 py-4 bg-matchaVibrant-600 hover:bg-matchaVibrant-500 text-white rounded-xl font-medium transition-all duration-300 flex items-center"
              >
                <span>Post a Role</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/company/demo"
                className="px-8 py-4 bg-matchaVibrant-50 hover:bg-matchaVibrant-100 text-matchaVibrant-600 rounded-xl font-medium transition-all duration-300"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-matchaVibrant-900 to-matchaVibrant-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-clash">
            Ready to Transform Hiring?
          </h2>
          <p className="text-xl text-matchaVibrant-100 mb-8 max-w-2xl mx-auto font-satoshi">
            Join forward-thinking companies who are reimagining how they connect with exceptional talent.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/company/roles/new"
              className="group px-8 py-4 bg-white text-matchaVibrant-900 rounded-xl font-medium hover:bg-matchaVibrant-50 transition-all duration-300 flex items-center"
            >
              <span>Post a Role</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/roles"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-300"
            >
              Browse Roles
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
