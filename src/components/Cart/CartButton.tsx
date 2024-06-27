import { useAppSelector } from '@/store/hooks'
import { ShoppingCart } from '@mui/icons-material'
import { Badge, IconButton, Tooltip } from '@mui/material'
import { CartButtonProps } from './types'

export const CartButton = ({ onClick }: CartButtonProps) => {
  const { cartItems: cart } = useAppSelector((state) => state.cart)

  return (
    <IconButton
      sx={{
        padding: '8px',
        marginLeft: 'auto'
      }}
      onClick={onClick}
      size='large'
      edge='start'
      color='inherit'
      aria-label='open drawer'
    >
      <Tooltip title={cart.length ? 'Cart' : 'There are no items in your cart'}>
        <Badge badgeContent={cart.length} color='error'>
          <ShoppingCart sx={{ color: 'white', fontSize: '1.75rem' }} />
        </Badge>
      </Tooltip>
    </IconButton>
  )
}
