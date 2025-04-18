export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          description: string | null
          vision: string | null
          values: string[] | null
          culture_notes: string | null
          policies: Json | null
          locations: string[] | null
          size: string | null
          founded_year: number | null
          website: string | null
          logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          vision?: string | null
          values?: string[] | null
          culture_notes?: string | null
          policies?: Json | null
          locations?: string[] | null
          size?: string | null
          founded_year?: number | null
          website?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          vision?: string | null
          values?: string[] | null
          culture_notes?: string | null
          policies?: Json | null
          locations?: string[] | null
          size?: string | null
          founded_year?: number | null
          website?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      roles: {
        Row: {
          id: string
          title: string
          company_id: string
          description: string | null
          requirements: string[] | null
          responsibilities: string[] | null
          salary_range: string | null
          location: string | null
          employment_type: string | null
          experience_level: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company_id: string
          description?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_range?: string | null
          location?: string | null
          employment_type?: string | null
          experience_level?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company_id?: string
          description?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_range?: string | null
          location?: string | null
          employment_type?: string | null
          experience_level?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      personas: {
        Row: {
          id: string
          name: string
          role_id: string
          personality: string | null
          tone: string | null
          background: string | null
          expertise: string | null
          communication_style: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role_id: string
          personality?: string | null
          tone?: string | null
          background?: string | null
          expertise?: string | null
          communication_style?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role_id?: string
          personality?: string | null
          tone?: string | null
          background?: string | null
          expertise?: string | null
          communication_style?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 