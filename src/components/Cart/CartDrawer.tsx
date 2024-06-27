import { Close } from '@mui/icons-material'
import { Drawer, Stack } from '@mui/material'
import { CartItem } from './CartItem'
import { CartItemSkeleton } from './CartItemSkeleton'
import { SummaryBar } from './SummaryBar'
import { CartDrawerProps } from './types'

export const CartDrawer = ({ isOpen, onClose, cart, isLoading }: CartDrawerProps) => {
  return (
    <Drawer open={isOpen} onClose={onClose} anchor='right'>
      {isLoading ? (
        <CartItemSkeleton count={cart.length} />
      ) : (
        <>
          <Stack
            height='100%'
            position='relative'
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
          >
            <Close sx={{ position: 'absolute', right: 16, cursor: 'pointer', zIndex: 10 }} onClick={onClose} />
            <Stack marginTop='2rem' gap={2}>
              {cart.map((cartItem) => (
                <CartItem key={cartItem.id} {...cartItem} />
              ))}
            </Stack>
          </Stack>
          <SummaryBar />
        </>
      )}
    </Drawer>
  )
}
