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
      products: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          slug: string
          description: string
          price: number
          original_price: number | null
          category: string
          subcategory: string | null
          material: string | null
          care: string | null
          pattern: string | null
          rating: number
          reviews: number
          in_stock: boolean
          featured: boolean
          trending: boolean
          new_arrival: boolean
          flash_deal: boolean
          images: string[]
          colors: Json
          sizes: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          slug: string
          description: string
          price: number
          original_price?: number | null
          category: string
          subcategory?: string | null
          material?: string | null
          care?: string | null
          pattern?: string | null
          rating?: number
          reviews?: number
          in_stock?: boolean
          featured?: boolean
          trending?: boolean
          new_arrival?: boolean
          flash_deal?: boolean
          images: string[]
          colors: Json
          sizes: string[]
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          slug?: string
          description?: string
          price?: number
          original_price?: number | null
          category?: string
          subcategory?: string | null
          material?: string | null
          care?: string | null
          pattern?: string | null
          rating?: number
          reviews?: number
          in_stock?: boolean
          featured?: boolean
          trending?: boolean
          new_arrival?: boolean
          flash_deal?: boolean
          images?: string[]
          colors?: Json
          sizes?: string[]
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          order_number: string
          user_id: string | null
          customer_name: string
          customer_email: string
          customer_phone: string
          shipping_address: string
          city: string
          region: string
          items: Json
          subtotal: number
          shipping_cost: number
          total: number
          payment_method: string
          status: string
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          order_number: string
          user_id?: string | null
          customer_name: string
          customer_email: string
          customer_phone: string
          shipping_address: string
          city: string
          region: string
          items: Json
          subtotal: number
          shipping_cost: number
          total: number
          payment_method: string
          status?: string
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          order_number?: string
          user_id?: string | null
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          shipping_address?: string
          city?: string
          region?: string
          items?: Json
          subtotal?: number
          shipping_cost?: number
          total?: number
          payment_method?: string
          status?: string
          notes?: string | null
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string
          phone: string | null
          role: string
          avatar_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          email: string
          full_name: string
          phone?: string | null
          role?: string
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string
          phone?: string | null
          role?: string
          avatar_url?: string | null
        }
      }
      inventory: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          product_id: string
          quantity: number
          low_stock_threshold: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          product_id: string
          quantity: number
          low_stock_threshold?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          product_id?: string
          quantity?: number
          low_stock_threshold?: number
        }
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          product_id: string
          user_id: string | null
          user_name: string
          rating: number
          comment: string
          helpful_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          product_id: string
          user_id?: string | null
          user_name: string
          rating: number
          comment: string
          helpful_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          product_id?: string
          user_id?: string | null
          user_name?: string
          rating?: number
          comment?: string
          helpful_count?: number
        }
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
