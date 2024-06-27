import { mockedProducts } from '@/mocks/mockedProducts'
import { addCartItemThunk } from '../addCartItemThunk'

const cartItem = {
  id: 1,
  title: 'painter',
  image: 'image',
  description: 'desc',
  isonsale: false,
  price: 500,
  category: 'household',
  quantity: 3
}

const thunk = addCartItemThunk({
  url: '/cartItems',
  cartItem
})

const mockedGetRequest = jest.fn()
const mockedPostRequest = jest.fn()
const mockedPutRequest = jest.fn()
const dispatch = jest.fn()

jest.mock('@/api/apiService', () => ({
  apiService: () => ({
    getRequest: mockedGetRequest,
    postRequest: mockedPostRequest,
    putRequest: mockedPutRequest
  })
}))

describe('addCartItemThunk tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should add cart item when it does not exist', async () => {
    mockedGetRequest.mockResolvedValue(mockedProducts)
    mockedPostRequest.mockResolvedValue(cartItem)

    await thunk(dispatch, () => {}, undefined)
    const { calls } = dispatch.mock
    const [pending, fulfilled] = calls
    expect(pending[0].type).toBe('cart/addCartItemThunk/pending')
    expect(fulfilled[0].type).toBe('cart/addCartItemThunk/fulfilled')
    expect(fulfilled[0].payload).toEqual(cartItem)
  })

  test('should update cart item when it exists', async () => {
    const existingItem = { ...cartItem, id: 1, quantity: 1 }
    mockedGetRequest.mockResolvedValue([existingItem])
    const updatedItem = { ...existingItem, quantity: 2 }
    mockedPutRequest.mockResolvedValue(updatedItem)

    await thunk(dispatch, () => {}, undefined)

    const { calls } = dispatch.mock
    const [pending, fulfilled] = calls
    expect(pending[0].type).toBe('cart/addCartItemThunk/pending')
    expect(fulfilled[0].type).toBe('cart/addCartItemThunk/fulfilled')
    expect(fulfilled[0].payload).toEqual(updatedItem)
    expect(mockedPutRequest).toHaveBeenCalledWith('/cartItems/1', updatedItem)
  })

  test('should handle rejected response', async () => {
    mockedGetRequest.mockResolvedValue(new Error('Something went wrong'))
    mockedPostRequest.mockRejectedValue(new Error('Something went wrong'))
    await thunk(dispatch, () => {}, undefined)
    const { calls } = dispatch.mock
    const [pending, rejected] = calls
    expect(pending[0].type).toBe('cart/addCartItemThunk/pending')
    expect(rejected[0].type).toBe('cart/addCartItemThunk/rejected')
    expect(rejected[0].payload).toBeUndefined()
  })
})
