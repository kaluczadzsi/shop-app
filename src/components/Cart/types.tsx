import { ProductProps as CartItem } from '../Products/types'

export interface SummaryBarProps {
  toggleDrawer: () => void
}

export interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  isLoading: boolean
}

export interface CartButtonProps {
  onClick: () => void
}

export interface CartItemSkeletonProps {
  count: number
}
