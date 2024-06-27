import { apiService } from '@/api/apiService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ProductProps as CartItem } from '@/components/Products/types'
import { setError } from '../error/errorSlice'

export const fetchCartItems = createAsyncThunk<CartItem[]>('cart/fetchCartItems', async (_, { dispatch }) => {
  const { getRequest } = apiService()

  try {
    const cartItems = await getRequest<CartItem[]>(`/cartItems`)

    return cartItems
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setError(`Error fetching cart items: ${error.message}`))
    }

    throw error
  }
})
