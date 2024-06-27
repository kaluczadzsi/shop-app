import { generateFulfilledAction, generatePendingAction, generateRejectedAction } from '@/utils/handlerGenerators'
import reducer from '../userSlice'

describe('userSlice reducer', () => {
  const initialState = {
    users: [],
    error: '',
    isLoading: false
  }

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('should handle fetchUsers.pending', () => {
    const action = generatePendingAction('user/fetchUsers/pending')
    const newState = reducer(initialState, action)

    expect(newState).toEqual({
      ...initialState,
      isLoading: true
    })
  })

  test('should handle fetchUsers.fulfilled', () => {
    const actionPayload = [
      {
        id: 1,
        email: 'user@gmail.com',
        password: '123'
      }
    ]

    const action = generateFulfilledAction('user/fetchUsers/fulfilled', actionPayload)
    const newState = reducer(initialState, action)

    expect(newState).toEqual({
      users: actionPayload,
      error: '',
      isLoading: false
    })
  })

  test('should handle fetchUsers.rejected', () => {
    const actionPayload = { error: { message: 'Error message' } }
    const action = generateRejectedAction('user/fetchUsers/rejected', actionPayload.error)
    const newState = reducer(initialState, action)

    expect(newState).toEqual({
      ...initialState,
      error: 'Error message'
    })
  })
})
