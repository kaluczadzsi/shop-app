import { apiService } from '@/api/apiService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Rating } from './types'
import { setError } from '../error/errorSlice'

export const fetchRatingsThunk = createAsyncThunk('rating/fetchRatingsThunk', async (_, { dispatch }) => {
  const { getRequest } = apiService()

  try {
    const ratings = await getRequest<Rating[]>(`/ratings`)

    return ratings
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setError(`Error fetching ratings: ${error.message}`))
    }

    throw error
  }
})
