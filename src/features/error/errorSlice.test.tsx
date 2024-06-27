import reducer, { clearError, setError } from './errorSlice'

const initialState = {
  errorMessage: '',
  isOpen: false
}

describe('ErrorSlice tests', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('should handle setError', () => {
    expect(reducer(initialState, setError('error'))).toEqual({ errorMessage: 'error', isOpen: true })
  })

  test('should handle clearError', () => {
    expect(reducer(initialState, clearError())).toEqual(initialState)
  })
})
