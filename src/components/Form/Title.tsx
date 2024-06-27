import { Box, Typography } from '@mui/material'
import { FormTitleProps } from './types'

export const Title = ({ title, description }: FormTitleProps) => {
  return (
    <Box>
      <Typography marginTop={2} marginBottom={1} variant='h4'>
        {title}
      </Typography>
      <Typography mb={2} variant='body2'>
        {description}
      </Typography>
    </Box>
  )
}
