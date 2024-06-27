/* eslint-disable react/no-array-index-key */
import { Box, Card, Skeleton, Stack } from '@mui/material'
import { CartItemSkeletonProps } from './types'

export const CartItemSkeleton = ({ count }: CartItemSkeletonProps) => {
  if (count <= 0) return null

  const skeleton = (
    <Card component={Stack} direction='row' gap={2} padding='1rem' position='relative'>
      <Box>
        <Skeleton variant='rectangular' width={100} height={100} />
      </Box>

      <Stack width='100%'>
        <Skeleton variant='rectangular' sx={{ position: 'absolute', right: 16, top: 16 }} width={30} height={30} />
        <Box maxWidth='80%'>
          <Skeleton width='80%' />
          <Skeleton width='40%' />
        </Box>

        <Stack justifyContent='space-between' direction='row-reverse' alignItems='end' height='100%' gap={1}>
          <Skeleton width='60px' />
          <Stack direction='row' alignItems='end' gap={1} height='100%'>
            <Skeleton variant='rectangular' width={30} height={15} />
            <Skeleton width={20} height={15} />
            <Skeleton variant='rectangular' width={30} height={15} />
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )

  return (
    <Stack
      height='100%'
      sx={{
        width: {
          xs: '100vw',
          sm: '65vw',
          md: '50vw',
          lg: '35vw'
        }
      }}
      overflow='scroll'
      maxWidth='31.25rem'
      padding='1rem'
      marginTop='2rem'
      gap={2}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index}>{skeleton}</Box>
      ))}
    </Stack>
  )
}
