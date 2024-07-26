import { apiService } from '@/api/apiService'
import { User } from '@/components/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setError } from '../error/errorSlice'
import { UpdateUserImageThunkProps } from './types'

export const updateUserImageThunk = createAsyncThunk(
  'currentUser/updateUserImageThunk',
  async ({ user, image }: UpdateUserImageThunkProps, { dispatch }) => {
    const { patchRequest } = apiService()

    try {
      const updatedUser = { ...user, image }
      await patchRequest<User>(`users/${user.id}`, { image })
      localStorage.setItem('user', JSON.stringify(updatedUser))

      return updatedUser
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(`Error updating user image: ${error.message}`))
      }

      throw error
    }
  }
)
