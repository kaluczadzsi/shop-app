import { patchUserThunk } from '@/features/currentUser/patchUserThunk'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Rating, Stack, Typography } from '@mui/material'
import { green, red, yellow } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { User } from '../types'
import { Labels, ProductRatingProps } from './types'

export const ProductRating = ({ productId }: ProductRatingProps) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.currentUser)
  const rating = user?.ratings?.[productId] || 3
  const [value, setValue] = useState<number | null>(rating)

  useEffect(() => {
    setValue(rating)
  }, [rating])

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

  const handleRatingChange = (newValue: number | null) => {
    if (!user) return

    const updatedUser: User = {
      ...user,
      ratings: {
        ...(user.ratings || {}),
        [productId]: newValue !== null ? newValue : 0
      }
    }

    dispatch(patchUserThunk(updatedUser))
  }

  return (
    <Stack marginTop='auto' paddingInline={2} direction='row' alignItems='center' gap={2}>
      <Rating
        disabled={!user}
        onChange={(_, newValue) => {
          setValue(newValue)
          handleRatingChange(newValue)
        }}
        value={value}
        name='size-medium'
        defaultValue={1}
      />
      <Typography fontWeight='bold' color={getRatingColor(value || 1)}>
        {user && getLabelText(value || 1)}
      </Typography>
    </Stack>
  )
}
