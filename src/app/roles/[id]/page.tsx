import React from 'react'

// Temporary mock data - will be replaced with Supabase data
const role = {
  id: '1',
  title: 'Senior Frontend Developer',
  company: 'TechCorp',
  description: 'Join our team to build beautiful, responsive web applications.',
  persona: {
    name: 'Alex',
    avatar: '/avatars/alex.png',
    intro: "Hi! I'm Alex, the Engineering Lead at TechCorp. I'm excited to chat with you about our frontend developer position.",
  }
}

export default function RolePage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{role.title}</h1>
        <p className="text-xl text-gray-600 mt-2">{role.company}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div>
            <h2 className="text-lg font-semibold">{role.persona.name}</h2>
            <p className="text-gray-600">{role.persona.intro}</p>
          </div>
        </div>

        {/* Chat interface will go here */}
        <div className="border-t pt-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-gray-700">Welcome! I'd love to learn more about your experience with React and TypeScript.</p>
          </div>
          
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 