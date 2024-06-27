import { apiService } from '@/api/apiService'
import { ProductProps as CartItemResponse } from '@/components/Products/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AddCartItemThunkArgs } from './types'
import { setError } from '../error/errorSlice'

export const addCartItemThunk = createAsyncThunk(
  'cart/addCartItemThunk',
  async ({ cartItem, url = '/cartItems' }: AddCartItemThunkArgs, { dispatch }) => {
    const { postRequest, getRequest, putRequest } = apiService()

    const allItem = await getRequest<CartItemResponse[]>(url)
    const exists = allItem.find((item) => item.id === cartItem.id)

    try {
      if (exists) {
        exists.quantity += 1
        await putRequest<CartItemResponse>(`${url}/${exists.id}`, exists)

        return exists
      }

      const newItem = await postRequest<CartItemResponse>(url, cartItem)

      return newItem
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(`Error posting cart item: ${error.message}`))
      }

      throw error
    }
  }
)
