import { apiService } from '@/api/apiService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ProductProps as Product } from '@/components/Products/types'
import { setError } from '../error/errorSlice'

export const fetchProductsThunk = createAsyncThunk<Product[]>('product/fetchProductsThunk', async (_, { dispatch }) => {
  const { getRequest } = apiService()

  try {
    const products = await getRequest<Product[]>(`/products`)
    return products
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setError(`Error fetching products: ${error.message}`))
    }

    throw error
  }
})
