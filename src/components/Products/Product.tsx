import { addCartItemThunk } from '@/features/cart/addCartItemThunk'
import { fetchProductsThunk } from '@/features/product/fetchProductsThunk'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { capitalizeAfterFirstWord } from '@/utils/capitalizeAfterFirstWord'
import { Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DiscountStrip } from '../Slider/Slider.styled'
import { ProductProps } from './types'

export const Product = ({ title, image, price, isonsale, id }: ProductProps) => {
  const { user } = useAppSelector((state) => state.currentUser)
  const { products } = useAppSelector((state) => state.product)
  const updatedTitle = capitalizeAfterFirstWord(title)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProductsThunk())
  }, [])

  const getSelectedProduct = () => {
    const product = products.find((prod) => prod.id === id)

    return product
  }

  const onHandleAddToBasket = () => {
    const selectedProduct = getSelectedProduct()

    if (user && selectedProduct) {
      dispatch(addCartItemThunk({ url: '/cartItems', cartItem: { ...selectedProduct, quantity: 1 } }))
    }
  }

  return (
    <Card sx={{ position: 'relative' }}>
      {isonsale && <DiscountStrip>{t('discount')}</DiscountStrip>}
      <CardMedia component='img' alt={`Image of ${t(`${title.toLowerCase()}`)}`} image={image} height={300} />
      <Stack justifyContent='space-between' height='20rem'>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {t(`${updatedTitle}`)}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {t(`${updatedTitle}Description`)}
          </Typography>
        </CardContent>

        <Stack alignItems='center' justifyContent='space-between' direction='row' padding='8px 16px'>
          <Button onClick={onHandleAddToBasket} size='small' sx={(theme) => ({ color: theme.palette.secondary.dark })}>
            {t('addToBasketText')}
          </Button>

          {isonsale ? (
            <Stack direction='row' alignItems='center' gap={2}>
              <Typography color={red[600]} sx={{ textDecoration: 'line-through' }} fontSize='medium'>
                ${price}
              </Typography>
              <Typography color={green[600]} sx={{ fontSize: '1.2rem' }} fontSize='medium'>
                ${price - price * 0.25}
              </Typography>
            </Stack>
          ) : (
            <Typography fontSize='medium'>${price}</Typography>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}
