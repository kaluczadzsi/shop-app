/* eslint-disable no-param-reassign */
import { fulfilledHandler, pendingHandler, rejectedHandler } from '@/constants/sliceStateHandlers'
import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { handleRatingThunk } from './handleRatingThunk'
import { Rating, RatingState } from './types'
import { fetchRatingsThunk } from './fetchRatingsThunk'

const initialState: RatingState = {
  ratings: [],
  isLoading: false,
  error: ''
}

const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleRatingThunk.fulfilled, (state, action: PayloadAction<Rating>) => {
      fulfilledHandler(state)
      const updatedRating: Rating = action.payload
      const updatedRatingIndex = state.ratings.findIndex((rating: Rating) => rating.id === updatedRating.id)

      state.ratings[updatedRatingIndex] = updatedRating
    })
    builder.addCase(fetchRatingsThunk.fulfilled, (state, action) => {
      state.ratings = action.payload
    })
    builder.addCase(handleRatingThunk.rejected, rejectedHandler)
    builder.addMatcher(isAnyOf(handleRatingThunk.pending, fetchRatingsThunk.pending), pendingHandler)
    builder.addMatcher(isAnyOf(handleRatingThunk.rejected, fetchRatingsThunk.rejected), rejectedHandler)
  }
})

export default ratingSlice.reducer
