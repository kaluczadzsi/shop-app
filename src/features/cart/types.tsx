import { ProductProps as CartItem } from '@/components/Products/types'

export interface CartState {
  cartItems: CartItem[]
  totalPrice: number
  error: string
  isLoading: boolean
  isAmountLoading: boolean
}

export interface AddCartItemThunkArgs {
  url: string
  cartItem: CartItem
}
