import { generateFulfilledAction, generateRejectedAction } from '@/utils/handlerGenerators'
import { addCartItemThunk } from '../addCartItemThunk'
import reducer from '../cartSlice'
import { clearCartThunk } from '../clearCartThunk'
import { deleteCartItemThunk } from '../deleteCartItemThunk'
import { fetchCartItems } from '../fetchCartItems'
import { CartState } from '../types'
import { updateAmountThunk } from '../updateAmountThunk'

describe('cartSlice reducer', () => {
  const initialState = {
    cartItems: [],
    totalPrice: 0,
    error: '',
    isLoading: false,
    isAmountLoading: false
  }

  const sampleCartItem = {
    id: 1,
    title: 'tv',
    image: 'image_url',
    description: 'description',
    isonsale: true,
    price: 300,
    category: 'household',
    quantity: 1
  }

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('should handle fetchCartItems.fulfilled', () => {
    const action = generateFulfilledAction(fetchCartItems.fulfilled.type, [sampleCartItem])
    const newState = reducer(initialState, action)

    expect(newState.cartItems).toEqual([sampleCartItem])
    expect(newState.isLoading).toBe(false)
  })

  test('should handle fetchCartItems.rejected', () => {
    const action = generateRejectedAction(fetchCartItems.rejected.type, { message: 'Error message' })
    const newState = reducer(initialState, action)

    expect(newState.cartItems).toEqual([])
    expect(newState.error).toBe('Error message')
    expect(newState.isLoading).toBe(false)
  })

  test('should handle addCartItemThunk.fulfilled', () => {
    const action = generateFulfilledAction(addCartItemThunk.fulfilled.type, sampleCartItem)
    const newState = reducer(initialState, action)

    expect(newState.cartItems).toContainEqual(sampleCartItem)
    expect(newState.isLoading).toBe(false)
  })

  test('should handle deleteCartItemThunk.fulfilled', () => {
    const previousState = { ...initialState, cartItems: [sampleCartItem] }
    const action = generateFulfilledAction(deleteCartItemThunk.fulfilled.type, { id: 1 })
    const newState = reducer(previousState, action)

    expect(newState.cartItems).toEqual([])
    expect(newState.isLoading).toBe(false)
  })

  test('should handle clearCartThunk.fulfilled', () => {
    const previousState: CartState = { ...initialState, cartItems: [sampleCartItem] }
    const action = generateFulfilledAction<void>(clearCartThunk.fulfilled.type, undefined)
    const newState = reducer(previousState, action)

    expect(newState.cartItems).toEqual([])
    expect(newState.isLoading).toBe(false)
  })

  test('should handle updateAmountThunk.pending', () => {
    const action = { type: updateAmountThunk.pending.type }
    const newState = reducer(initialState, action)

    expect(newState.isAmountLoading).toBe(true)
  })

  test('should handle updateAmountThunk.fulfilled', () => {
    const previousState = { ...initialState, cartItems: [sampleCartItem] }
    const updatedCartItem = { ...sampleCartItem, quantity: 2 }
    const action = generateFulfilledAction(updateAmountThunk.fulfilled.type, updatedCartItem)
    const newState = reducer(previousState, action)

    expect(newState.cartItems[0].quantity).toBe(2)
    expect(newState.isAmountLoading).toBe(false)
  })
})
