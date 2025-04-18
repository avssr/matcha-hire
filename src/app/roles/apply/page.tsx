'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function ApplyToRole() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const roleId = searchParams.get('roleId')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClientComponentClient()
      
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push(`/auth/login?redirectTo=/roles/apply?roleId=${roleId}`)
        return
      }

      const formData = new FormData(e.currentTarget as HTMLFormElement)
      const resumeFile = formData.get('resume') as File

      if (!resumeFile || resumeFile.size === 0) {
        throw new Error('Please upload your resume')
      }

      // Upload resume to storage
      const { data: resumeData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(`${session.user.id}/${roleId}/${resumeFile.name}`, resumeFile)

      if (uploadError) throw uploadError

      // Create application record
      const { error: applicationError } = await supabase
        .from('applications')
        .insert({
          role_id: roleId,
          user_id: session.user.id,
          cover_letter: formData.get('coverLetter'),
          resume_url: resumeData.path,
          status: 'pending'
        })

      if (applicationError) throw applicationError

      router.push('/roles/apply/success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting your application')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Apply for Role</CardTitle>
            <CardDescription>
              Please fill out the form below to submit your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="resume">Resume</Label>
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Accepted formats: PDF, DOC, DOCX
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  placeholder="Tell us why you're interested in this role and what makes you a great fit..."
                  rows={6}
                  required
                />
              </div>

              {error && (
                <div className="text-sm text-red-500">
                  {error}
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 