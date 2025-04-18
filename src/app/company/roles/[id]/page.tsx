'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Role {
  id: string
  title: string
  department: string
  location: string
  employment_type: string
  experience_level: string
  salary_range: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  status: 'draft' | 'published' | 'closed'
  created_at: string
  updated_at: string
}

interface Persona {
  id: string
  name: string
  tone: string
  conversation_mode: string
  avatar_url: string
  system_prompt: string
  question_sequence: string[]
}

export default function RoleDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [role, setRole] = useState<Role | null>(null)
  const [persona, setPersona] = useState<Persona | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedRole, setEditedRole] = useState<Partial<Role>>({})

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No user found')

        const { data: profile } = await supabase
          .from('profiles')
          .select('company_id')
          .eq('id', user.id)
          .single()

        if (!profile?.company_id) {
          router.push('/company/setup')
          return
        }

        const { data: roleData, error: roleError } = await supabase
          .from('roles')
          .select('*')
          .eq('id', params.id)
          .eq('company_id', profile.company_id)
          .single()

        if (roleError) throw roleError
        setRole(roleData)
        setEditedRole(roleData)

        const { data: personaData, error: personaError } = await supabase
          .from('personas')
          .select('*')
          .eq('role_id', params.id)
          .single()

        if (personaError) throw personaError
        setPersona(personaData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchRole()
  }, [params.id, router, supabase])

  const handleInputChange = (field: keyof Role, value: string | string[]) => {
    setEditedRole(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    try {
      const { error: updateError } = await supabase
        .from('roles')
        .update(editedRole)
        .eq('id', params.id)

      if (updateError) throw updateError
      setRole(prev => prev ? { ...prev, ...editedRole } : null)
      setIsEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Role not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{role.title}</h1>
        <div className="flex gap-4">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              Edit Role
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Role Details</CardTitle>
            <CardDescription>Basic information about the role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              {isEditing ? (
                <Input
                  value={editedRole.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              ) : (
                <div className="text-gray-900">{role.title}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              {isEditing ? (
                <Input
                  value={editedRole.department || ''}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                />
              ) : (
                <div className="text-gray-900">{role.department}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              {isEditing ? (
                <Input
                  value={editedRole.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              ) : (
                <div className="text-gray-900">{role.location}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Employment Type</label>
              {isEditing ? (
                <Select
                  value={editedRole.employment_type || ''}
                  onValueChange={(value) => handleInputChange('employment_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-gray-900">{role.employment_type}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Experience Level</label>
              {isEditing ? (
                <Select
                  value={editedRole.experience_level || ''}
                  onValueChange={(value) => handleInputChange('experience_level', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-gray-900">{role.experience_level}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Salary Range</label>
              {isEditing ? (
                <Input
                  value={editedRole.salary_range || ''}
                  onChange={(e) => handleInputChange('salary_range', e.target.value)}
                />
              ) : (
                <div className="text-gray-900">{role.salary_range}</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Description</CardTitle>
            <CardDescription>Detailed information about the role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              {isEditing ? (
                <Textarea
                  value={editedRole.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />
              ) : (
                <div className="text-gray-900 whitespace-pre-line">{role.description}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Responsibilities</label>
              {isEditing ? (
                <Textarea
                  value={editedRole.responsibilities?.join('\n') || ''}
                  onChange={(e) => handleInputChange('responsibilities', e.target.value.split('\n'))}
                  rows={4}
                />
              ) : (
                <ul className="list-disc list-inside text-gray-900">
                  {role.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Requirements</label>
              {isEditing ? (
                <Textarea
                  value={editedRole.requirements?.join('\n') || ''}
                  onChange={(e) => handleInputChange('requirements', e.target.value.split('\n'))}
                  rows={4}
                />
              ) : (
                <ul className="list-disc list-inside text-gray-900">
                  {role.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Benefits</label>
              {isEditing ? (
                <Textarea
                  value={editedRole.benefits?.join('\n') || ''}
                  onChange={(e) => handleInputChange('benefits', e.target.value.split('\n'))}
                  rows={4}
                />
              ) : (
                <ul className="list-disc list-inside text-gray-900">
                  {role.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 