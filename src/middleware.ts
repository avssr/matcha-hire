import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Auth routes that don't require session
  const authRoutes = ['/auth/login', '/auth/signup', '/auth/callback']
  const isAuthRoute = authRoutes.some(route => req.nextUrl.pathname === route)

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/about', '/contact', '/roles']
  const isPublicRoute = publicRoutes.some(route => 
    req.nextUrl.pathname === route || 
    req.nextUrl.pathname.startsWith('/roles/') ||
    req.nextUrl.pathname.startsWith('/api/roles')
  )

  // Protected routes that require authentication
  const protectedRoutes = ['/company', '/hr', '/chat']
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // Admin routes require special handling
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')

  // If it's an auth route and user is already logged in, redirect to appropriate page
  if (isAuthRoute && session) {
    // Check if user has a company profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, company_id')
      .single()

    if (profile?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', req.url))
    } else if (profile?.company_id) {
      return NextResponse.redirect(new URL('/company', req.url))
    } else {
      return NextResponse.redirect(new URL('/roles', req.url))
    }
  }

  // If it's a public route or auth route, allow access
  if (isPublicRoute || isAuthRoute) {
    return res
  }

  // If user is not signed in and the current path is a protected route
  if (!session && (isProtectedRoute || isAdminRoute)) {
    const redirectUrl = new URL('/auth/login', req.url)
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Special handling for admin routes - check if user has admin role
  if (isAdminRoute) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/roles', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets|images).*)',
  ],
} 