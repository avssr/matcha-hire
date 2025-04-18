import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { revalidatePath } from 'next/cache'
import { type Database } from '@/types/database'

const CACHE_TAG = 'roles'
const CACHE_REVALIDATE_SECONDS = 60 // 1 minute

// Cache the roles query
const getCachedRoles = unstable_cache(
  async () => {
    const { data: roles, error } = await supabase
      .from('roles')
      .select(`
        *,
        companies (
          name,
          logo_url
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching roles:', error)
      throw new Error('Failed to fetch roles')
    }

    return roles
  },
  [CACHE_TAG],
  { revalidate: CACHE_REVALIDATE_SECONDS }
)

export async function GET() {
  try {
    // Verify Supabase client is properly initialized
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      )
    }

    // Log the attempt to fetch roles in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Attempting to fetch roles from Supabase...')
    }

    // Try to get roles from cache first
    try {
      const roles = await getCachedRoles()
      
      // Log success in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Successfully fetched ${roles.length} roles`)
      }

      return NextResponse.json(roles)
    } catch (error) {
      console.error('Cache fetch failed, falling back to direct query:', error)
      
      // Fallback to direct query if cache fails
      const { data: roles, error: queryError } = await supabase
        .from('roles')
        .select(`
          *,
          companies (
            name,
            logo_url
          )
        `)
        .order('created_at', { ascending: false })

      if (queryError) {
        console.error('Error fetching roles:', queryError)
        return NextResponse.json(
          { error: 'Failed to fetch roles' },
          { status: 500 }
        )
      }

      if (!roles?.length) {
        return NextResponse.json(
          { error: 'No roles found' },
          { status: 404 }
        )
      }

      return NextResponse.json(roles)
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST endpoint to create a new role
export async function POST(request: Request) {
  try {
    const json = await request.json()
    
    const { data: role, error } = await supabase
      .from('roles')
      .insert(json)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // Revalidate the roles cache
    revalidatePath('/api/roles')

    return NextResponse.json(role)
  } catch (error) {
    console.error('Error creating role:', error)
    return NextResponse.json(
      { error: 'Failed to create role' },
      { status: 500 }
    )
  }
}

// PATCH endpoint to update a role
export async function PATCH(request: Request) {
  try {
    const json = await request.json()
    const { id, ...updates } = json

    if (!id) {
      return NextResponse.json(
        { error: 'Role ID is required' },
        { status: 400 }
      )
    }

    const { data: role, error } = await supabase
      .from('roles')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // Revalidate the roles cache
    revalidatePath('/api/roles')

    return NextResponse.json(role)
  } catch (error) {
    console.error('Error updating role:', error)
    return NextResponse.json(
      { error: 'Failed to update role' },
      { status: 500 }
    )
  }
}

// DELETE endpoint to remove a role
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Role ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('roles')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // Revalidate the roles cache
    revalidatePath('/api/roles')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting role:', error)
    return NextResponse.json(
      { error: 'Failed to delete role' },
      { status: 500 }
    )
  }
} 