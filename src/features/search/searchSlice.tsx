/* eslint-disable no-param-reassign */
import { fulfilledHandler, pendingHandler, rejectedHandler } from '@/constants/sliceStateHandlers'
import { createSlice } from '@reduxjs/toolkit'
import { fetchFilteredProductsThunk } from './fetchFilteredProductsThunk'
import { SearchState } from './types'

const initialState: SearchState = {
  filteredProducts: [],
  inputValue: '',
  error: '',
  isLoading: false
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setValue(state, action) {
      state.inputValue = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilteredProductsThunk.pending, pendingHandler)
    builder.addCase(fetchFilteredProductsThunk.fulfilled, (state, action) => {
      fulfilledHandler(state)
      state.filteredProducts = action.payload
    })
    builder.addCase(fetchFilteredProductsThunk.rejected, (state, action) => {
      rejectedHandler(state, action)
      state.filteredProducts = []
    })
  }
})

export const { setValue } = searchSlice.actions
export default searchSlice.reducer
