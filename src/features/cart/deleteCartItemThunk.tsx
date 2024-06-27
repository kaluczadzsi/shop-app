import { apiService } from '@/api/apiService'
import { ProductProps as CartItem } from '@/components/Products/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setError } from '../error/errorSlice'

export const deleteCartItemThunk = createAsyncThunk<CartItem, number>(
  'cart/deleteCartItemThunk',
  async (cartItemId: number, { dispatch }) => {
    const { deleteRequest } = apiService()

    try {
      const item = await deleteRequest<CartItem>(`/cartItems/${cartItemId}`)

      return item
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(`Error fetching cart items: ${error.message}`))
      }

      throw error
    }
  }
)
