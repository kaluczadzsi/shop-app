import { apiService } from '@/api/apiService'
import { User } from '@/components/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setError } from '../error/errorSlice'
import { UpdateUsernameThunkProps } from './types'

export const updateUsernameThunk = createAsyncThunk(
  'currentUser/updateUsernameThunk',
  async ({ user, username }: UpdateUsernameThunkProps, { dispatch }) => {
    const { patchRequest } = apiService()

    try {
      const updatedUser = { ...user, username: username ?? undefined }
      await patchRequest<User>(`users/${user.id}`, { username: username ?? undefined })
      localStorage.setItem('user', JSON.stringify(updatedUser))

      return updatedUser
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(`Error updating user username: ${error.message}`))
      }

      throw error
    }
  }
)
