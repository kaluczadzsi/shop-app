/* eslint-disable no-param-reassign */
import { fulfilledHandler, pendingHandler, rejectedHandler } from '@/constants/sliceStateHandlers'
import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { addCartItemThunk } from './addCartItemThunk'
import { clearCartThunk } from './clearCartThunk'
import { deleteCartItemThunk } from './deleteCartItemThunk'
import { fetchCartItems } from './fetchCartItems'
import { CartState } from './types'
import { updateAmountThunk } from './updateAmountThunk'

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  error: '',
  isLoading: false,
  isAmountLoading: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      fulfilledHandler(state)
      state.cartItems = action.payload.filter((item) => item.quantity !== 0)
    })
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      rejectedHandler(state, action)
      state.cartItems = []
    })
    builder.addCase(addCartItemThunk.fulfilled, (state, action) => {
      fulfilledHandler(state)
      const exists = state.cartItems.find((cartItem) => cartItem.id === action.payload.id)

      if (exists) {
        return
      }

      state.cartItems.push(action.payload)
    })
    builder.addCase(deleteCartItemThunk.fulfilled, (state, action) => {
      fulfilledHandler(state)
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id)
    })
    builder.addCase(clearCartThunk.fulfilled, (state) => {
      fulfilledHandler(state)
      state.cartItems = []
    })

    builder.addCase(updateAmountThunk.pending, (state) => {
      state.isAmountLoading = true
    })
    builder.addCase(updateAmountThunk.fulfilled, (state, action) => {
      fulfilledHandler(state)

      const updatedProduct = action.payload
      const existingProductIndex = state.cartItems.findIndex((cartItem) => cartItem.id === updatedProduct.id)

      if (existingProductIndex !== -1 && updatedProduct.quantity === 0) {
        state.cartItems.splice(existingProductIndex, 1)
      } else {
        state.cartItems[existingProductIndex] = updatedProduct
      }

      state.isAmountLoading = false
    })
    builder.addMatcher(
      isAnyOf(
        fetchCartItems.fulfilled,
        addCartItemThunk.fulfilled,
        addCartItemThunk.fulfilled,
        deleteCartItemThunk.fulfilled,
        clearCartThunk.fulfilled,
        updateAmountThunk.fulfilled
      ),
      (state) => {
        state.totalPrice = state.cartItems.reduce((acc, item) => {
          const discountedPrice = item.isonsale ? item.price - item.price * 0.25 : item.price
          return acc + discountedPrice * item.quantity
        }, 0)
      }
    )
    builder.addMatcher(
      isAnyOf(
        fetchCartItems.pending,
        addCartItemThunk.pending,
        addCartItemThunk.pending,
        deleteCartItemThunk.pending,
        clearCartThunk.pending
      ),
      pendingHandler
    )
    builder.addMatcher(
      isAnyOf(
        addCartItemThunk.rejected,
        deleteCartItemThunk.rejected,
        clearCartThunk.rejected,
        updateAmountThunk.rejected
      ),
      rejectedHandler
    )
  }
})

export default cartSlice.reducer
