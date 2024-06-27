import { apiService } from '@/api/apiService'
import { User } from '@/components/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setError } from '../error/errorSlice'

export const fetchUsers = createAsyncThunk<User[]>('user/fetchUsers', async (_, { dispatch }) => {
  const { getRequest } = apiService()

  try {
    const users = await getRequest<User[]>(`/users`)
    return users
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setError(`Error fetching users: ${error.message}`))
    }

    throw error
  }
})
