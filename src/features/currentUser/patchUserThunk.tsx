import { apiService } from '@/api/apiService'
import { User } from '@/components/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setError } from '../error/errorSlice'

export const patchUserThunk = createAsyncThunk(
  'currentUser/patchUserThunk',
  async (updatedUser: User, { dispatch }) => {
    const { patchRequest } = apiService()

    try {
      const responseUser = await patchRequest<User>(`/users/${updatedUser.id}`, updatedUser)
      localStorage.setItem('user', JSON.stringify(responseUser))

      return responseUser
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(`Error overwrite user: ${error.message}`))
      }

      throw error
    }
  }
)
