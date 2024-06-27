import { Box, Button, styled, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { SliderImgProps } from './types'

export const SliderImg = styled('img')<SliderImgProps>(({ isVisible }) => ({
  position: 'relative',
  objectFit: 'cover',
  display: isVisible ? 'block' : 'none',
  maxWidth: '100%',
  maxHeight: '100%',
  width: '100%',
  height: '100%',
  filter: 'grayscale(70%)'
}))

export const DiscountStrip = styled(Box)({
  top: '5%',
  right: -50,
  position: 'absolute',
  color: 'white',
  backgroundColor: red[400],
  width: '200px',
  padding: '10px 16px',
  textAlign: 'center',
  transform: 'rotate(45deg)',
  fontSize: '1rem',
  zIndex: 1
})

export const SpecialOffersButton = styled(Button)({
  position: 'absolute',
  bottom: 16,
  left: 16,
  border: '1px solid white',
  borderRadius: '4px',
  padding: '8px 12px',
  zIndex: 1,
  color: 'white',
  transition: '0.2s ease-in-out all',
  '&:hover': {
    backgroundColor: 'white',
    color: 'black',
    transform: 'scale(1.05)'
  }
})

export const DiscountText = styled(Typography)(({ theme }) => ({
  color: 'white',
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    fontSize: 50
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 30
  }
}))
