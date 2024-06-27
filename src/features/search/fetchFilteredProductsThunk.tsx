import { apiService } from '@/api/apiService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ProductProps as Product } from '@/components/Products/types'
import { setError } from '../error/errorSlice'

export const fetchFilteredProductsThunk = createAsyncThunk<Product[], string>(
  'search/fetchFilteredProductsThunk',
  async (text: string, { dispatch }) => {
    const { getRequest } = apiService()

    try {
      const filteredProducts = await getRequest<Product[]>(`/products?title_like=${text}`)

      return filteredProducts
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(`Error fetching filteredProducts: ${error.message}`))
      }

      throw error
    }
  }
)
