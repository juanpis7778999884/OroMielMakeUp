"use server"

import { getCatalogProducts, type CatalogFilters } from "@/lib/data"
import type { Product } from "@/lib/types"

export type LoadMoreResult = {
  products: Product[]
  hasMore: boolean
  total: number
}

export async function loadMoreProducts(
  filters: CatalogFilters,
  offset: number,
  limit = 12,
): Promise<LoadMoreResult> {
  const result = await getCatalogProducts(filters, { offset, limit })
  return {
    products: result.products,
    hasMore: offset + limit < result.total,
    total: result.total,
  }
}
