import { apiService } from '@/api/apiService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ProductProps as CartItem } from '@/components/Products/types'
import { setError } from '../error/errorSlice'

export const updateAmountThunk = createAsyncThunk(
  'cart/updateAmountThunk',
  async ({ id, type }: { id: number; type: string }, { dispatch }) => {
    const { getRequest, putRequest, deleteRequest } = apiService()
    const allCartItem: CartItem[] = await getRequest('/cartItems')
    const selectedProduct = allCartItem.find((item: CartItem) => item.id === id)

    try {
      if (!selectedProduct) {
        throw new Error('Product not found')
      }

      switch (type) {
        case 'increase':
          selectedProduct.quantity += 1
          break
        case 'decrease':
          if (selectedProduct.quantity > 0) {
            selectedProduct.quantity -= 1
          }
          break
        default:
          throw new Error('Invalid update type')
      }

      if (selectedProduct.quantity !== 0) {
        await putRequest(`/cartItems/${selectedProduct.id}`, selectedProduct)
      } else {
        await deleteRequest(`/cartItems/${selectedProduct.id}`)
      }

      return selectedProduct
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(`Failed to update amount: ${error.message}`))
      }

      throw error
    }
  }
)
