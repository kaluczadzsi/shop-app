import { setError } from '@/features/error/errorSlice'
import { mockedProducts } from '@/mocks/mockedProducts'
import { clearCartThunk } from '../clearCartThunk'

const dispatch = jest.fn()
const thunk = clearCartThunk()
const mockedDeleteRequest = jest.fn()
const mockedGetRequest = jest.fn()

jest.mock('@/api/apiService', () => ({
  apiService: () => ({
    deleteRequest: mockedDeleteRequest,
    getRequest: mockedGetRequest
  })
}))

describe('clearCartThunk tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should clear cart', async () => {
    mockedGetRequest.mockReturnValue(mockedProducts)
    await thunk(dispatch, () => {}, undefined)
    const { calls } = dispatch.mock
    const [pending, fulfilled] = calls

    expect(pending[0].type).toBe('cart/clearCartThunk/pending')
    expect(fulfilled[0].type).toBe('cart/clearCartThunk/fulfilled')
    expect(mockedDeleteRequest).toHaveBeenCalledTimes(2)
  })

  test('should handle error when clearing cart fails', async () => {
    const errorMessage = 'Failed to clear cart: Network error'

    mockedGetRequest.mockRejectedValue(new Error('Network error'))

    try {
      await thunk(dispatch, () => {}, undefined)
    } catch (error) {
      expect(dispatch).toHaveBeenCalledWith(setError(errorMessage))
      expect(error).toBeInstanceOf(Error)
    }
  })
})
