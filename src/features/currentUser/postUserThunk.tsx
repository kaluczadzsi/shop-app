import { apiService } from '@/api/apiService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { PostRequestResponse, PostUserThunkArgs } from './types'
import { setError } from '../error/errorSlice'

export const postUserThunk = createAsyncThunk(
  'currentUser/postUserThunk',
  async ({ user, url = '/users' }: PostUserThunkArgs, { dispatch }) => {
    const { postRequest } = apiService()

    try {
      const { user: responseUser, accessToken } = await postRequest<PostRequestResponse>(url, {
        ...user
      })

      const updatedUser = { ...responseUser, token: accessToken }
      localStorage.setItem('user', JSON.stringify(updatedUser))

      return updatedUser
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(`Error posting user: ${error.message}`))
      }

      throw error
    }
  }
)
