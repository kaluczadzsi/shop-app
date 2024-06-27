import { apiService } from '@/api/apiService'
import { fetchCartItems } from '../fetchCartItems'

jest.mock('@/api/apiService')

describe('fetchCartItems thunk', () => {
  let getRequest: jest.Mock

  beforeEach(() => {
    getRequest = jest.fn()
    ;(apiService as jest.Mock).mockReturnValue({ getRequest })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('fetchCartItems successfully', async () => {
    const mockItems = [
      { id: 1, title: 'Gaming mouse', price: 200 },
      { id: 2, title: 'Gaming keyboard', price: 300 }
    ]
    getRequest.mockResolvedValue(mockItems)

    const dispatch = jest.fn()
    const getState = jest.fn()

    const result = await fetchCartItems()(dispatch, getState, undefined)

    expect(result.payload).toEqual(mockItems)
    expect(result.type).toBe('cart/fetchCartItems/fulfilled')
    expect(getRequest).toHaveBeenCalledWith('/cartItems')
  })

  test('fetches cartItems unsuccessfully', async () => {
    getRequest.mockImplementation(() => {
      throw new Error('Error fetching cartItems')
    })

    const dispatch = jest.fn()
    const getState = jest.fn()

    const result = await fetchCartItems()(dispatch, getState, undefined)

    expect(result.payload).toEqual(undefined)
    expect(result.type).toBe('cart/fetchCartItems/rejected')
  })
})
