import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Application Submitted - MatchaHire',
  description: 'Your application has been successfully submitted',
}

export default function ApplicationSuccess() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Application Submitted!</CardTitle>
            <CardDescription>
              Thank you for applying through MatchaHire
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center text-muted-foreground">
                <p>We've received your application and will review it shortly.</p>
                <p>You'll receive updates about your application status via email.</p>
              </div>

              <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold">Next Steps:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Review your email for a confirmation message</li>
                  <li>• Keep an eye out for updates from the hiring team</li>
                  <li>• Prepare for potential interviews</li>
                  <li>• Feel free to apply to other matching roles</li>
                </ul>
              </div>

              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
                <Link href="/roles">
                  <Button variant="outline">Browse More Roles</Button>
                </Link>
                <Link href="/dashboard">
                  <Button>View Application Status</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 