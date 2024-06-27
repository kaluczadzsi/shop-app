import { fetchCartItems } from '@/features/cart/fetchCartItems'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { CartButton } from './CartButton'
import { CartDrawer } from './CartDrawer'

export const Cart = () => {
  const { cartItems: cart, isLoading } = useAppSelector((state) => state.cart)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [isOpen])

  return (
    <Box>
      <CartButton onClick={toggleOpen} />
      {cart.length > 0 && <CartDrawer isOpen={isOpen} onClose={toggleOpen} cart={cart} isLoading={isLoading} />}
    </Box>
  )
}
