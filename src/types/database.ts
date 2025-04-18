export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]

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
        Insert: Omit<Database['public']['Tables']['companies']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['companies']['Insert']>
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
        Insert: Omit<Database['public']['Tables']['roles']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['roles']['Insert']>
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
        Insert: Omit<Database['public']['Tables']['personas']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['personas']['Insert']>
      }
      candidates: {
        Row: {
          id: string
          name: string
          email: string
          role_id: string
          fit_score: number | null
          resume_url: string | null
          answers: Json | null
          status: string | null
          current_company: string | null
          experience_years: number | null
          notice_period: number | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['candidates']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['candidates']['Insert']>
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company: string | null
          role: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      applications: {
        Row: {
          id: string
          candidate_id: string
          role_id: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['applications']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['applications']['Insert']>
      }
      conversations: {
        Row: {
          id: string
          application_id: string
          messages: Json[]
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['conversations']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['conversations']['Insert']>
      }
      feedback: {
        Row: {
          id: string
          application_id: string
          evaluator_id: string
          score: number
          comments: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['feedback']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['feedback']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 