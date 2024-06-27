import { deleteCartItemThunk } from '@/features/cart/deleteCartItemThunk'
import { fetchCartItems } from '@/features/cart/fetchCartItems'
import { updateAmountThunk } from '@/features/cart/updateAmountThunk'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { calculateDiscountByPercent } from '@/utils/calculateDiscountByPercent'
import { capitalizeAfterFirstWord } from '@/utils/capitalizeAfterFirstWord'
import { Delete } from '@mui/icons-material'
import { Box, Button, Card, CardMedia, Stack, Typography, useTheme } from '@mui/material'
import { red } from '@mui/material/colors'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DeleteConditionalDialog } from '../Dialog/DeleteConditionalDialog'
import { ProductProps as CartItemProps } from '../Products/types'
import { DeleteType } from '../Dialog/types'

export const CartItem = ({ image, title, price, quantity, isonsale, id }: CartItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { isAmountLoading } = useAppSelector((state) => state.cart)
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const updatedTitle = capitalizeAfterFirstWord(title)

  const handleDelete = async () => {
    await dispatch(deleteCartItemThunk(id))
    dispatch(fetchCartItems())
    setIsOpen(false)
  }

  const handleIncreaseAmount = async () => {
    await dispatch(updateAmountThunk({ id, type: 'increase' }))
  }

  const handleDecreaseAmount = async () => {
    await dispatch(updateAmountThunk({ id, type: 'decrease' }))
  }

  const handleDecreaseButtonClick = () => {
    if (quantity - 1 !== 0) {
      handleDecreaseAmount()
    } else {
      setIsOpen(true)
    }
  }

  return (
    <Card aria-label='cart-item' component={Stack} direction='row' gap={2} padding='1rem' position='relative'>
      <Box position='relative'>
        <CardMedia component='img' image={image} alt='Product Image' sx={{ width: '100px', height: '100px' }} />
        {isonsale && (
          <Box
            sx={{ backgroundColor: red[400] }}
            textAlign='center'
            width='100%'
            bottom={0}
            left={0}
            position='absolute'
          >
            <Typography fontSize='small' color='white'>
              {t('onSaleText')}
            </Typography>
          </Box>
        )}
      </Box>

      <Stack width='100%'>
        <Button
          aria-label='delete-button'
          disabled={isAmountLoading}
          onClick={() => setIsOpen(true)}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            padding: 0,
            minWidth: '30px',
            width: '30px',
            height: '30px',
            color: 'tertiary.main',
            '&:hover': {
              color: 'red'
            }
          }}
        >
          <Delete sx={{ fontSize: '30px' }} />
        </Button>
        <Box maxWidth='80%'>
          <Typography fontWeight='medium'> {t(`${updatedTitle}`)}</Typography>
          <Typography fontSize='small' color='green'>
            ${isonsale ? calculateDiscountByPercent(price, 25) : price}
          </Typography>
        </Box>
        <Stack
          justifyContent='space-between'
          direction='row-reverse'
          alignItems='end'
          height='100%'
          gap={1}
          sx={{
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              alignItems: 'center'
            }
          }}
        >
          <Typography
            sx={{
              [theme.breakpoints.down('sm')]: {
                width: '100%',
                textAlign: 'right'
              }
            }}
          >
            ${isonsale ? calculateDiscountByPercent(price, 25) * quantity : price * quantity}
          </Typography>
          <Stack direction='row' alignItems='end' gap={1} height='100%'>
            <Button
              disabled={isAmountLoading}
              onClick={handleDecreaseButtonClick}
              sx={{ height: '20px' }}
              variant='contained'
            >
              -
            </Button>

            <Typography aria-label='quantity' lineHeight={1.2}>
              {quantity}
            </Typography>
            <Button
              disabled={isAmountLoading}
              onClick={handleIncreaseAmount}
              sx={{ height: '20px' }}
              variant='contained'
            >
              +
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <DeleteConditionalDialog
        type={DeleteType.Single}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleDelete}
      />
    </Card>
  )
}
