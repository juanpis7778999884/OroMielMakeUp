import { createClient } from '@/lib/supabase/server'
import type {
  Category,
  Product,
  Promotion,
  Settings,
  Testimonial,
} from '@/lib/types'

const PRODUCT_SELECT =
  '*, category:categories(*), product_images(id, product_id, url, sort_order)'

export async function getSettings(): Promise<Settings | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('settings').select('*').eq('id', 1).single()
    return data as Settings | null
  } catch {
    return null
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    return (data as Category[]) ?? []
  } catch {
    return []
  }
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select(PRODUCT_SELECT)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)
    return (data as Product[]) ?? []
  } catch {
    return []
  }
}

export async function getBestsellers(limit = 8): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select(PRODUCT_SELECT)
      .eq('is_bestseller', true)
      .order('created_at', { ascending: false })
      .limit(limit)
    return (data as Product[]) ?? []
  } catch {
    return []
  }
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select(PRODUCT_SELECT)
      .order('created_at', { ascending: false })
      .limit(limit)
    return (data as Product[]) ?? []
  } catch {
    return []
  }
}

export type CatalogFilters = {
  category?: string
  search?: string
  sort?: string
  status?: string
}

export type CatalogResult = {
  products: Product[]
  categories: Category[]
  total: number
}

export async function getCatalogProducts(
  filters: CatalogFilters,
  { offset = 0, limit = 12 }: { offset?: number; limit?: number } = {},
): Promise<CatalogResult> {
  try {
    const supabase = await createClient()
    const categories = await getCategories()

    let query = supabase
      .from('products')
      .select(PRODUCT_SELECT, { count: 'exact' })

    // Only show available products in the public catalog
    query = query.neq('status', 'agotado').gt('stock', 0)

    if (filters.category && filters.category !== 'todos') {
      const cat = categories.find((c) => c.slug === filters.category)
      if (cat) query = query.eq('category_id', cat.id)
    }

    if (filters.status && filters.status !== 'todos') {
      query = query.eq('status', filters.status)
    }

    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`)
    }

    switch (filters.sort) {
      case 'precio-asc':
        query = query.order('price', { ascending: true })
        break
      case 'precio-desc':
        query = query.order('price', { ascending: false })
        break
      case 'nombre':
        query = query.order('name', { ascending: true })
        break
      default:
        query = query.order('created_at', { ascending: false })
    }

    query = query.range(offset, offset + limit - 1)

    const { data, count } = await query
    return {
      products: (data as Product[]) ?? [],
      categories,
      total: count ?? 0,
    }
  } catch {
    return { products: [], categories: [], total: 0 }
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select(PRODUCT_SELECT)
      .eq('slug', slug)
      .single()
    return data as Product | null
  } catch {
    return null
  }
}

export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from('products')
      .select(PRODUCT_SELECT)
      .neq('id', product.id)
      .limit(limit)
    if (product.category_id) query = query.eq('category_id', product.category_id)
    const { data } = await query
    return (data as Product[]) ?? []
  } catch {
    return []
  }
}

export async function getPromotions(): Promise<Promotion[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('promotions')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    return (data as Promotion[]) ?? []
  } catch {
    return []
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    return (data as Testimonial[]) ?? []
  } catch {
    return []
  }
}
