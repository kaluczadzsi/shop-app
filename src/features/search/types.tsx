import { ProductProps as Product } from '@/components/Products/types'

export interface SearchState {
  filteredProducts: Product[]
  inputValue: string
  error: string
  isLoading: boolean
}
