'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  MessageSquare,
  Video,
  FileText,
  Star,
  ChevronLeft
} from 'lucide-react'

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  location: string
  role: string
  status: 'new' | 'reviewed' | 'interviewing' | 'offered' | 'hired' | 'rejected'
  score: number
  resume: string
  coverLetter: string
  skills: string[]
  experience: {
    company: string
    role: string
    duration: string
    description: string
  }[]
  education: {
    institution: string
    degree: string
    year: string
  }[]
}

export default function CandidateProfile() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'profile' | 'interviews' | 'assessments'>('profile')
  const [interviewType, setInterviewType] = useState<'video' | 'ai'>('video')
  const [interviewDate, setInterviewDate] = useState('')
  const [interviewTime, setInterviewTime] = useState('')

  // Mock data - replace with actual data from your backend
  const candidate: Candidate = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    role: 'Senior Software Engineer',
    status: 'interviewing',
    score: 85,
    resume: 'https://example.com/resume.pdf',
    coverLetter: 'https://example.com/cover-letter.pdf',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    experience: [
      {
        company: 'Tech Corp',
        role: 'Senior Software Engineer',
        duration: '2019 - Present',
        description: 'Led development of multiple high-impact features...'
      }
    ],
    education: [
      {
        institution: 'Stanford University',
        degree: 'M.S. Computer Science',
        year: '2018'
      }
    ]
  }

  const handleScheduleInterview = () => {
    // TODO: Implement interview scheduling
    console.log('Scheduling interview:', {
      type: interviewType,
      date: interviewDate,
      time: interviewTime
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to Candidates
          </button>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-matchaVibrant-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-matchaVibrant-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
                  <p className="text-sm text-gray-500">{candidate.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  candidate.status === 'interviewing' ? 'bg-blue-100 text-blue-800' :
                  candidate.status === 'hired' ? 'bg-green-100 text-green-800' :
                  candidate.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                </span>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-900">{candidate.score}%</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`${
                    activeTab === 'profile'
                      ? 'border-matchaVibrant-500 text-matchaVibrant-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('interviews')}
                  className={`${
                    activeTab === 'interviews'
                      ? 'border-matchaVibrant-500 text-matchaVibrant-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Interviews
                </button>
                <button
                  onClick={() => setActiveTab('assessments')}
                  className={`${
                    activeTab === 'assessments'
                      ? 'border-matchaVibrant-500 text-matchaVibrant-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  AI Assessment
                </button>
              </nav>
            </div>

            {/* Content */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{candidate.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{candidate.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{candidate.location}</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-matchaVibrant-100 text-matchaVibrant-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Experience</h3>
                  <div className="space-y-4">
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-matchaVibrant-500 pl-4">
                        <div className="flex justify-between">
                          <h4 className="text-md font-medium text-gray-900">{exp.role}</h4>
                          <span className="text-sm text-gray-500">{exp.duration}</span>
                        </div>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                        <p className="mt-1 text-sm text-gray-500">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Education</h3>
                  <div className="space-y-4">
                    {candidate.education.map((edu, index) => (
                      <div key={index} className="border-l-4 border-matchaVibrant-500 pl-4">
                        <div className="flex justify-between">
                          <h4 className="text-md font-medium text-gray-900">{edu.degree}</h4>
                          <span className="text-sm text-gray-500">{edu.year}</span>
                        </div>
                        <p className="text-sm text-gray-600">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Documents</h3>
                  <div className="space-y-2">
                    <a
                      href={candidate.resume}
                      className="flex items-center text-matchaVibrant-600 hover:text-matchaVibrant-700"
                    >
                      <FileText className="h-5 w-5 mr-2" />
                      <span>Resume</span>
                    </a>
                    <a
                      href={candidate.coverLetter}
                      className="flex items-center text-matchaVibrant-600 hover:text-matchaVibrant-700"
                    >
                      <FileText className="h-5 w-5 mr-2" />
                      <span>Cover Letter</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'interviews' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule Interview</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Interview Type</label>
                      <div className="mt-1 flex space-x-4">
                        <button
                          type="button"
                          onClick={() => setInterviewType('video')}
                          className={`flex items-center px-4 py-2 border rounded-md ${
                            interviewType === 'video'
                              ? 'border-matchaVibrant-500 bg-matchaVibrant-50 text-matchaVibrant-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Video className="h-5 w-5 mr-2" />
                          Video Call
                        </button>
                        <button
                          type="button"
                          onClick={() => setInterviewType('ai')}
                          className={`flex items-center px-4 py-2 border rounded-md ${
                            interviewType === 'ai'
                              ? 'border-matchaVibrant-500 bg-matchaVibrant-50 text-matchaVibrant-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <MessageSquare className="h-5 w-5 mr-2" />
                          AI Interview
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="date"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-matchaVibrant-500 focus:ring-matchaVibrant-500 sm:text-sm"
                          value={interviewDate}
                          onChange={(e) => setInterviewDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                          type="time"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-matchaVibrant-500 focus:ring-matchaVibrant-500 sm:text-sm"
                          value={interviewTime}
                          onChange={(e) => setInterviewTime(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-matchaVibrant-600 hover:bg-matchaVibrant-700"
                        onClick={handleScheduleInterview}
                      >
                        Schedule Interview
                      </button>
                    </div>
                  </div>
                </div>

                {/* Past Interviews */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Past Interviews</h3>
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {/* Add past interview items here */}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'assessments' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">AI Assessment</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-md font-medium text-gray-900">Technical Skills</h4>
                        <p className="text-sm text-gray-500">Based on resume and experience</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium text-gray-900">85%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-md font-medium text-gray-900">Cultural Fit</h4>
                        <p className="text-sm text-gray-500">Based on company values</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium text-gray-900">92%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-md font-medium text-gray-900">Growth Potential</h4>
                        <p className="text-sm text-gray-500">Based on career trajectory</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium text-gray-900">78%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">AI Recommendations</h3>
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      <li className="px-4 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-md font-medium text-gray-900">Technical Interview Focus</h4>
                            <p className="text-sm text-gray-500">System design and architecture</p>
                          </div>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            High Priority
                          </span>
                        </div>
                      </li>
                      <li className="px-4 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-md font-medium text-gray-900">Cultural Fit Questions</h4>
                            <p className="text-sm text-gray-500">Team collaboration and leadership</p>
                          </div>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Medium Priority
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 