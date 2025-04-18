'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Role = Database['public']['Tables']['roles']['Row'] & {
  companies?: {
    name: string
    logo_url: string | null
  } | null
}

export default function ChatPage({ params }: { params: { roleId: string } }) {
  const router = useRouter()
  const [role, setRole] = useState<Role | null>(null)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('roles')
          .select(`
            *,
            companies (
              name,
              logo_url
            )
          `)
          .eq('id', params.roleId)
          .single()

        if (error) throw error
        setRole(data)
      } catch (err) {
        console.error('Error fetching role:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRole()
  }, [params.roleId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || sending) return

    const userMessage = input.trim()
    setInput('')
    setSending(true)
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      // TODO: Implement actual AI chat functionality
      // For now, just echo back the message
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `I received your message about the ${role?.title} role: "${userMessage}"` 
        }])
        setSending(false)
      }, 1000)
    } catch (err) {
      console.error('Error sending message:', err)
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-matchaVibrant-500" />
      </div>
    )
  }

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Role not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Roles
            </button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900">
                {role.title}
              </h1>
              <p className="text-sm text-gray-500">
                {role.companies?.name}
              </p>
            </div>
            <div className="w-24" /> {/* Spacer for balance */}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Messages */}
          <div className="h-[calc(100vh-16rem)] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-matchaVibrant-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-matchaVibrant-500 focus:border-matchaVibrant-500"
                disabled={sending}
              />
              <button
                onClick={handleSend}
                disabled={sending || !input.trim()}
                className="p-2 rounded-lg bg-matchaVibrant-500 text-white hover:bg-matchaVibrant-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 