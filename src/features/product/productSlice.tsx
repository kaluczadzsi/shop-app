/* eslint-disable no-param-reassign */
import { fulfilledHandler, pendingHandler, rejectedHandler } from '@/constants/sliceStateHandlers'
import { createSlice } from '@reduxjs/toolkit'
import { fetchProductsThunk } from './fetchProductsThunk'
import { ProductsState } from './types'

const initialState: ProductsState = {
  products: [],
  error: '',
  isLoading: false
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, pendingHandler)
    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      fulfilledHandler(state)
      state.products = action.payload
    })
    builder.addCase(fetchProductsThunk.rejected, (state, action) => {
      rejectedHandler(state, action)
      state.products = []
    })
  }
})

export default productSlice.reducer
