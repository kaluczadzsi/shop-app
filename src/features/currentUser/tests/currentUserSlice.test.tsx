import { User } from '@/components/types'
import { generateFulfilledAction, generatePendingAction, generateRejectedAction } from '@/utils/handlerGenerators'
import reducer from '../currentUserSlice'
import { postUserThunk } from '../postUserThunk'
import { updateUserLangThunk } from '../updateUserLangThunk'

let storedUser = localStorage.getItem('user')
let initialUser: User | null = storedUser ? (JSON.parse(storedUser) as User) : null

const generateInitialState = () => ({
  user: initialUser,
  error: '',
  isLoading: false
})

describe('currentUserSlice reducer', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(generateInitialState())
  })

  test('should handle postUserThunk.pending', () => {
    const previousState = generateInitialState()
    const action = generatePendingAction(postUserThunk.pending.type)
    const newState = reducer(previousState, action)
    expect(newState).toEqual({ user: initialUser, error: '', isLoading: true })
  })

  test('should handle postUserThunk.fulfilled', () => {
    const previousState = generateInitialState()
    const actionPayload = { id: 1, username: 'tom', email: 'tom@gmail.com' }
    const action = generateFulfilledAction(postUserThunk.fulfilled.type, actionPayload)
    const newState = reducer(previousState, action)
    expect(newState).toEqual({ user: actionPayload, error: '', isLoading: false })
  })

  test('should handle postUserThunk.rejected', () => {
    const previousState = generateInitialState()
    const actionPayload = { message: 'Error message' }
    const action = generateRejectedAction(postUserThunk.rejected.type, actionPayload)
    const newState = reducer(previousState, action)

    expect(newState).toEqual({
      user: initialUser,
      error: actionPayload.message,
      isLoading: false
    })
  })

  test('should handle updateUserLangThunk.fulfilled', () => {
    const previousState = generateInitialState()
    const actionPayload = { id: 1, username: 'tom', email: 'tom@gmail.com' }
    const action = generateFulfilledAction(updateUserLangThunk.fulfilled.type, actionPayload)
    const newState = reducer(previousState, action)
    expect(newState).toEqual({ user: actionPayload, error: '', isLoading: false })
  })

  test('should set initialUser to parsed user from localStorage', () => {
    const mockUser = { id: 1, name: 'John Doe' }
    localStorage.setItem('user', JSON.stringify(mockUser))
    storedUser = localStorage.getItem('user')
    initialUser = storedUser ? (JSON.parse(storedUser) as User) : null
    expect(initialUser).toEqual(mockUser)
  })
})
