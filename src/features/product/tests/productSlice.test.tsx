import { generateFulfilledAction, generatePendingAction, generateRejectedAction } from '@/utils/handlerGenerators'
import reducer from '../productSlice'

describe('productSlice reducer', () => {
  const initialState = {
    products: [],
    error: '',
    isLoading: false
  }

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('should handle fetchProductsThunk.pending', () => {
    const action = generatePendingAction('product/fetchProductsThunk/pending')
    const newState = reducer(initialState, action)

    expect(newState).toEqual({
      ...initialState,
      isLoading: true
    })
  })

  test('should handle fetchProductsThunk.fulfilled', () => {
    const actionPayload = [
      {
        id: 1,
        title: 'tv',
        image: 'image_url',
        description: 'description',
        isonsale: true,
        price: 300,
        category: 'household',
        quantity: 1
      }
    ]

    const action = generateFulfilledAction('product/fetchProductsThunk/fulfilled', actionPayload)
    const newState = reducer(initialState, action)

    expect(newState).toEqual({
      products: actionPayload,
      error: '',
      isLoading: false
    })
  })

  test('should handle fetchProductsThunk.rejected', () => {
    const actionPayload = { error: { message: 'Error message' } }
    const action = generateRejectedAction('product/fetchProductsThunk/rejected', actionPayload.error)
    const newState = reducer(initialState, action)

    expect(newState).toEqual({
      ...initialState,
      error: 'Error message'
    })
  })
})
