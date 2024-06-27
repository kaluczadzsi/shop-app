import { generateFulfilledAction, generatePendingAction, generateRejectedAction } from '@/utils/handlerGenerators'
import reducer, { setValue } from '../searchSlice'

describe('searchSlice reducer', () => {
  const generateInitialState = () => ({
    filteredProducts: [],
    inputValue: '',
    error: '',
    isLoading: false
  })

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(generateInitialState())
  })

  test('should handle setValue action', () => {
    const previousState = generateInitialState()
    const newState = reducer(previousState, setValue('new value'))

    expect(newState).toEqual({
      ...previousState,
      inputValue: 'new value'
    })
  })

  test('should handle fetchFilteredProductsThunk.pending', () => {
    const previousState = generateInitialState()
    const action = generatePendingAction('search/fetchFilteredProductsThunk/pending')
    const newState = reducer(previousState, action)

    expect(newState).toEqual({
      ...previousState,
      isLoading: true
    })
  })

  test('should handle fetchFilteredProductsThunk.fulfilled', () => {
    const previousState = {
      ...generateInitialState(),
      isLoading: true
    }

    const actionPayload = [
      { id: 1, name: 'Product A' },
      { id: 2, name: 'Product B' }
    ]

    const action = generateFulfilledAction('search/fetchFilteredProductsThunk/fulfilled', actionPayload)
    const newState = reducer(previousState, action)

    expect(newState).toEqual({
      ...previousState,
      filteredProducts: actionPayload,
      isLoading: false
    })
  })

  test('should handle fetchFilteredProductsThunk.rejected', () => {
    const previousState = {
      ...generateInitialState(),
      isLoading: true
    }

    const actionPayload = {
      error: { message: 'Error message' }
    }

    const action = generateRejectedAction('search/fetchFilteredProductsThunk/rejected', actionPayload.error)
    const newState = reducer(previousState, action)

    expect(newState).toEqual({
      ...previousState,
      error: 'Error message',
      isLoading: false
    })
  })
})
