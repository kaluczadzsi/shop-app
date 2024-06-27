import { apiService } from '@/api/apiService'
import { ProductProps as CartItem } from '@/components/Products/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setError } from '../error/errorSlice'

export const clearCartThunk = createAsyncThunk('cart/clearCartThunk', async (_, { dispatch }) => {
  const { getRequest, deleteRequest } = apiService()

  try {
    const allCartItem: CartItem[] = await getRequest(`cartItems`)
    const allId = allCartItem.map((item) => item.id)
    await Promise.all(allId.map((id) => deleteRequest(`cartItems/${id}`)))
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setError(`Failed to clear cart: ${error.message}`))
    }

    throw error
  }
})
