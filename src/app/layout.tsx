import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MatchaHire - Find Your Next Role',
  description: 'AI-powered hiring platform connecting driven candidates with mission-driven companies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full">
          <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/logo.svg"
                      alt="MatchaHire"
                      width={40}
                      height={40}
                      className="h-8 w-auto"
                    />
                    <span className="ml-2 text-xl font-bold text-gray-900">MatchaHire</span>
                  </Link>
                </div>
                <nav className="flex space-x-8">
                  <Link href="/roles" className="text-gray-500 hover:text-gray-900">
                    Browse Roles
                  </Link>
                  <Link href="/about" className="text-gray-500 hover:text-gray-900">
                    About
                  </Link>
                  <Link href="/contact" className="text-gray-500 hover:text-gray-900">
                    Contact
                  </Link>
                  <Link
                    href="/company/roles/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-matchaVibrant-600 hover:bg-matchaVibrant-700"
                  >
                    Post a Role
                  </Link>
                </nav>
              </div>
            </div>
          </header>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
