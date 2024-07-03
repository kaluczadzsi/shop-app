import { useAppSelector } from '@/store/hooks'
import { ShoppingCart } from '@mui/icons-material'
import { Badge, IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CartButtonProps } from './types'

export const CartButton = ({ onClick }: CartButtonProps) => {
  const { cartItems: cart } = useAppSelector((state) => state.cart)
  const { t } = useTranslation()

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
      <Tooltip title={cart.length ? t('navMenuCartText') : t('navMenuEmptyCartText')}>
        <Badge badgeContent={cart.length} color='error'>
          <ShoppingCart sx={{ color: 'white', fontSize: '1.75rem' }} />
        </Badge>
      </Tooltip>
    </IconButton>
  )
}
