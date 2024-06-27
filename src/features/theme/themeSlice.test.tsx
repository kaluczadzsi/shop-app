import reducer, { toggleTheme } from './themeSlice'

describe('themeSlice reducer', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  let initialState = {
    theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  }

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('should handle toggleTheme', () => {
    initialState = { theme: 'light' }

    const newState = reducer(initialState, toggleTheme())
    expect(newState.theme).toBe('dark')

    const finalState = reducer(newState, toggleTheme())
    expect(finalState.theme).toBe('light')
  })
})
