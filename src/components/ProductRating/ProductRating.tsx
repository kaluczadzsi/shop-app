import { fetchRatingsThunk } from '@/features/rating/fetchRatingsThunk'
import { handleRatingThunk } from '@/features/rating/handleRatingThunk'
import { Rating as RatingProp } from '@/features/rating/types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Rating, Stack, Typography } from '@mui/material'
import { green, red, yellow } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { Labels, ProductRatingProps } from './types'

export const ProductRating = ({ productId }: ProductRatingProps) => {
  const { user } = useAppSelector((state) => state.currentUser)
  const { ratings } = useAppSelector((state) => state.rating)
  const rating = ratings.find((r: RatingProp) => r.id === productId)
  const [value, setValue] = useState<number | null>(rating?.value ?? 1)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchRatingsThunk())
  }, [])

  useEffect(() => {
    if (rating) {
      setValue(rating.value)
    }
  }, [rating])

  const handleRatingChange = async (newValue: number | null) => {
    if (newValue !== null) {
      setValue(newValue)
      dispatch(handleRatingThunk({ id: productId, value: newValue }))
    }
  }

  const getLabelText = (starValue: number) => {
    return starValue ? Labels[starValue] : Labels[2]
  }

  const getRatingColor = (tier: number) => {
    const [lowColor, midColor, highColor] = [red[800], yellow[900], green[800]]
    let color

    if (tier < 3) {
      color = lowColor
    } else if (tier > 3) {
      color = highColor
    } else {
      color = midColor
    }

    return color
  }

  return (
    <Stack marginTop='auto' paddingInline={2} direction='row' alignItems='center' gap={2}>
      <Rating
        disabled={!user}
        onChange={(_, newValue) => handleRatingChange(newValue)}
        value={value}
        name={`${productId}-rating`}
        defaultValue={1}
      />
      <Typography fontWeight='bold' color={getRatingColor(value || 1)}>
        {user && getLabelText(value || 1)}
      </Typography>
    </Stack>
  )
}
