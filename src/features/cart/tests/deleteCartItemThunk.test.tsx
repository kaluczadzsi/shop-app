import { mockedProducts } from '@/mocks/mockedProducts'
import { deleteCartItemThunk } from '../deleteCartItemThunk'

const mockedDeleteRequest = jest.fn()
const dispatch = jest.fn()
const thunk = deleteCartItemThunk(2)

jest.mock('@/api/apiService', () => ({
  apiService: () => ({
    deleteRequest: mockedDeleteRequest
  })
}))

describe('deleteCartItemThunk tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should delete cart item', async () => {
    const id = 2
    mockedDeleteRequest.mockResolvedValue(mockedProducts.filter((item) => item.id !== id))
    await thunk(dispatch, () => {}, undefined)
    const { calls } = dispatch.mock
    const [pending, fulfilled] = calls

    expect(pending[0].type).toBe('cart/deleteCartItemThunk/pending')
    expect(fulfilled[0].type).toBe('cart/deleteCartItemThunk/fulfilled')
    expect(mockedDeleteRequest).toHaveBeenCalledWith('/cartItems/2')
    expect(fulfilled[0].payload).toEqual(mockedProducts.filter((item) => item.id !== id))
  })

  test('should handle rejected response', async () => {
    mockedDeleteRequest.mockRejectedValue(new Error('Something went wrong'))

    await thunk(dispatch, () => {}, undefined)
    const { calls } = dispatch.mock
    const [pending, rejected] = calls
    expect(pending[0].type).toBe('cart/deleteCartItemThunk/pending')
    expect(rejected[0].type).toBe('error/setError')
    expect(rejected[0].payload).toBe('Error fetching cart items: Something went wrong')
  })
})
