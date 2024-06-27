import { ProductProps as Product } from '@/components/Products/types'

export interface ProductsState {
  products: Product[]
  error: string
  isLoading: boolean
}
