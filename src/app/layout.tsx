import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MatchaHire - AI-Powered Hiring Platform',
  description: 'Experience the future of hiring with AI-powered interactive personas',
}

const Logo = () => (
  <div className="flex items-center space-x-2 group">
    <div className="relative w-8 h-8">
      <div className="absolute inset-0 bg-matchaVibrant-500 rounded-lg transform rotate-6 transition-transform group-hover:rotate-12 group-hover:scale-110"></div>
      <div className="absolute inset-0 bg-white rounded-lg shadow-sm flex items-center justify-center transform transition-transform group-hover:scale-95">
        <span className="text-xl font-bold gradient-text">M</span>
      </div>
    </div>
    <span className="text-xl font-bold gradient-text transform transition-transform group-hover:translate-x-1">
      MatchaHire
    </span>
  </div>
)

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="nav-link">
    {children}
  </a>
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} min-h-full text-base antialiased`}>
        <div className="flex flex-col min-h-screen">
          <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <a href="/" className="group">
                    <Logo />
                  </a>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                  <NavLink href="/roles">Browse Roles</NavLink>
                  <NavLink href="/about">About</NavLink>
                  <NavLink href="/contact">Contact</NavLink>
                  <a href="/admin" className="btn btn-primary">
                    Admin Dashboard
                  </a>
                </div>
                <button 
                  type="button"
                  aria-label="Toggle menu"
                  className="md:hidden p-2 rounded-lg hover:bg-matchaVibrant-50 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </nav>
          </header>

          <main className="flex-grow pt-16 relative">
            <div className="absolute inset-0 ai-grid"></div>
            <div className="relative">
              {children}
            </div>
          </main>

          <footer className="relative overflow-hidden mt-16">
            <div className="absolute inset-0 ai-dots"></div>
            <div className="relative glass-effect">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="col-span-1 md:col-span-2">
                    <Logo />
                    <p className="mt-4 text-sm text-matchaVibrant-600 max-w-md">
                      Transforming the hiring process with AI-powered interactive personas that make job searching more personal and engaging.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-matchaVibrant-900 uppercase tracking-wider">Platform</h3>
                    <ul className="mt-4 space-y-3">
                      <li><NavLink href="/roles">Browse Roles</NavLink></li>
                      <li><NavLink href="/admin">Admin Dashboard</NavLink></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-matchaVibrant-900 uppercase tracking-wider">Company</h3>
                    <ul className="mt-4 space-y-3">
                      <li><NavLink href="/about">About</NavLink></li>
                      <li><NavLink href="/contact">Contact</NavLink></li>
                      <li><NavLink href="/privacy">Privacy</NavLink></li>
                      <li><NavLink href="/terms">Terms</NavLink></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-matchaVibrant-200">
                  <p className="text-sm text-matchaVibrant-400 text-center">
                    © {new Date().getFullYear()} MatchaHire. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
