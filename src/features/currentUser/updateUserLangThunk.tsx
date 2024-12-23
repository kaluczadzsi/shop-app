import { apiService } from '@/api/apiService'
import { User } from '@/components/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setError } from '../error/errorSlice'
import { UpdateUserLangThunkProps } from './types'

export const updateUserLangThunk = createAsyncThunk(
  'currentUser/updateUserLangThunk',
  async ({ user, lang }: UpdateUserLangThunkProps, { dispatch }) => {
    const { patchRequest } = apiService()

    try {
      const updatedUser = { ...user, lang }
      await patchRequest<User>(`users/${user.id}`, { lang })
      localStorage.setItem('user', JSON.stringify(updatedUser))

      return updatedUser
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(`Error updating user language: ${error.message}`))
      }

      throw error
    }
  }
)
