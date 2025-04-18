'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Briefcase, MessageSquare, User, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-matchaVibrant-600">
                MatchaHire
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/roles"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/roles')
                    ? 'border-matchaVibrant-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Find Roles
              </Link>
              <Link
                href="/company/setup"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/company/setup')
                    ? 'border-matchaVibrant-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                For Companies
              </Link>
            </nav>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-matchaVibrant-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-matchaVibrant-600 hover:bg-matchaVibrant-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-matchaVibrant-500"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/roles"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/roles')
                  ? 'bg-matchaVibrant-50 border-matchaVibrant-500 text-matchaVibrant-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              <Briefcase className="h-4 w-4 mr-2 inline-block" />
              Find Roles
            </Link>
            <Link
              href="/company/setup"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/company/setup')
                  ? 'bg-matchaVibrant-50 border-matchaVibrant-500 text-matchaVibrant-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              <MessageSquare className="h-4 w-4 mr-2 inline-block" />
              For Companies
            </Link>
            <Link
              href="/auth/login"
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            >
              <User className="h-4 w-4 mr-2 inline-block" />
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  )
} 