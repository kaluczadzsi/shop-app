/* eslint-disable no-param-reassign */
import { User } from '@/components/types'
import { fulfilledHandler, pendingHandler, rejectedHandler } from '@/constants/sliceStateHandlers'
import { createSlice } from '@reduxjs/toolkit'
import { postUserThunk } from './postUserThunk'
import { CurrentUserState } from './types'
import { updateUserLangThunk } from './updateUserLangThunk'
import { patchUserThunk } from './patchUserThunk'

const storedUser = localStorage.getItem('user')
const initialUser: User | null = storedUser ? (JSON.parse(storedUser) as User) : null

const initialState: CurrentUserState = {
  user: initialUser,
  error: '',
  isLoading: false
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    clearCurrentUser(state) {
      state.user = null
      localStorage.removeItem('user')
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postUserThunk.pending, pendingHandler)
    builder.addCase(postUserThunk.fulfilled, (state, action) => {
      fulfilledHandler(state)
      state.user = action.payload
    })
    builder.addCase(postUserThunk.rejected, rejectedHandler)
    builder.addCase(updateUserLangThunk.pending, pendingHandler)
    builder.addCase(updateUserLangThunk.fulfilled, (state, action) => {
      fulfilledHandler(state)
      state.user = action.payload
    })
    builder.addCase(updateUserLangThunk.rejected, rejectedHandler)
    builder.addCase(patchUserThunk.pending, pendingHandler)
    builder.addCase(patchUserThunk.fulfilled, (state, action) => {
      fulfilledHandler(state)
      state.user = action.payload
    })
  }
})

export const { clearCurrentUser } = currentUserSlice.actions
export default currentUserSlice.reducer
