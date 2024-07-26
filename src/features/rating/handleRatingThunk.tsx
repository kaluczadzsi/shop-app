import { apiService } from '@/api/apiService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Rating } from './types'
import { setError } from '../error/errorSlice'

export const handleRatingThunk = createAsyncThunk(
  '/rating/handleRatingThunk',
  async ({ id, value }: { id: number; value: number }, { dispatch }) => {
    const { getRequest, putRequest } = apiService()

    const allRatings = await getRequest<Rating[]>('/ratings')
    const selectedRating = allRatings.find((rating) => rating.id === id)

    if (!selectedRating) {
      throw new Error('Rating not found')
    }

    try {
      selectedRating.value = value
      await putRequest(`/ratings/${selectedRating.id}`, selectedRating)

      return selectedRating
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(`Failed to update rating: ${error.message}`))
      }

      throw error
    }
  }
)
