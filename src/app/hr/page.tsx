'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Building2, Briefcase, Users, Settings, FileText, MessageSquare } from 'lucide-react'

export default function HRDashboard() {
  const router = useRouter()

  const menuItems = [
    {
      title: 'Company Setup',
      description: 'Set up your company profile, branding, and policies',
      icon: Building2,
      path: '/hr/company/setup',
      color: 'bg-blue-500'
    },
    {
      title: 'Job Listings',
      description: 'Create and manage job listings',
      icon: Briefcase,
      path: '/hr/jobs',
      color: 'bg-green-500'
    },
    {
      title: 'Candidate Management',
      description: 'View and manage candidate applications',
      icon: Users,
      path: '/hr/candidates',
      color: 'bg-purple-500'
    },
    {
      title: 'AI Interview Setup',
      description: 'Configure AI interview parameters and questions',
      icon: MessageSquare,
      path: '/hr/interview-setup',
      color: 'bg-orange-500'
    },
    {
      title: 'Reports & Analytics',
      description: 'View hiring metrics and analytics',
      icon: FileText,
      path: '/hr/analytics',
      color: 'bg-red-500'
    },
    {
      title: 'Settings',
      description: 'Manage account and team settings',
      icon: Settings,
      path: '/hr/settings',
      color: 'bg-gray-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">HR Executive Dashboard</h1>
          <p className="mt-4 text-lg text-gray-600">
            Manage your company's hiring process and candidate interactions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(item.path)}
              className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className={`p-3 rounded-lg ${item.color} text-white`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 