/* eslint-disable no-param-reassign */
import { fulfilledHandler, pendingHandler, rejectedHandler } from '@/constants/sliceStateHandlers'
import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from './fetchUsers'
import { UsersState } from './types'

const initialState: UsersState = {
  users: [],
  error: '',
  isLoading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, pendingHandler)
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      fulfilledHandler(state)
      state.users = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      rejectedHandler(state, action)
      state.users = []
    })
  }
})

export default userSlice.reducer
