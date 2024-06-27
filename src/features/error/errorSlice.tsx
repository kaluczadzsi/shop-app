/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { ErrorState } from './types'

const initialState: ErrorState = {
  errorMessage: '',
  isOpen: false
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action) {
      state.errorMessage = action.payload
      state.isOpen = true
    },
    clearError(state) {
      state.errorMessage = ''
      state.isOpen = false
    }
  }
})

export const { setError, clearError } = errorSlice.actions
export default errorSlice.reducer
