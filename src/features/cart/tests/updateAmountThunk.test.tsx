import { mockedProducts } from '@/mocks/mockedProducts'
import { updateAmountThunk } from '../updateAmountThunk'

const mockedGetRequest = jest.fn()
const mockedPutRequest = jest.fn()
const mockedDeleteRequest = jest.fn()
const dispatch = jest.fn()

jest.mock('@/api/apiService', () => ({
  apiService: () => ({
    getRequest: mockedGetRequest,
    putRequest: mockedPutRequest,
    deleteRequest: mockedDeleteRequest
  })
}))

describe('updateAmountThunk tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should increase quantity when type is increase', async () => {
    const existingItem = { ...mockedProducts[0], id: 1, quantity: 1 }
    mockedGetRequest.mockResolvedValue([existingItem])
    const updatedItem = { ...existingItem, quantity: 2 }
    mockedPutRequest.mockResolvedValue(updatedItem)
    const thunk = updateAmountThunk({ id: 1, type: 'increase' })

    await thunk(dispatch, () => {}, undefined)

    const { calls } = dispatch.mock
    const [pending, fulfilled] = calls
    expect(pending[0].type).toBe('cart/updateAmountThunk/pending')
    expect(fulfilled[0].type).toBe('cart/updateAmountThunk/fulfilled')
    expect(fulfilled[0].payload).toEqual(updatedItem)
    expect(mockedPutRequest).toHaveBeenCalledWith('/cartItems/1', updatedItem)
  })

  test('should decrease quantity when type is decrease', async () => {
    const existingItem = { ...mockedProducts[0], id: 1, quantity: 2 }
    mockedGetRequest.mockResolvedValue([existingItem])
    const updatedItem = { ...existingItem, quantity: 1 }
    mockedPutRequest.mockResolvedValue(updatedItem)
    const thunk = updateAmountThunk({ id: 1, type: 'decrease' })

    await thunk(dispatch, () => {}, undefined)

    const { calls } = dispatch.mock
    const [pending, fulfilled] = calls
    expect(pending[0].type).toBe('cart/updateAmountThunk/pending')
    expect(fulfilled[0].type).toBe('cart/updateAmountThunk/fulfilled')
    expect(fulfilled[0].payload).toEqual(updatedItem)
    expect(mockedPutRequest).toHaveBeenCalledWith('/cartItems/1', updatedItem)
  })

  test('should delete item when quantity becomes zero', async () => {
    const existingItem = { ...mockedProducts[0], id: 1, quantity: 1 }
    mockedGetRequest.mockResolvedValue([existingItem])
    const updatedItem = { ...existingItem, quantity: 0 }
    mockedDeleteRequest.mockResolvedValue({})
    const thunk = updateAmountThunk({ id: 1, type: 'decrease' })

    await thunk(dispatch, () => {}, undefined)

    const { calls } = dispatch.mock
    const [pending, fulfilled] = calls
    expect(pending[0].type).toBe('cart/updateAmountThunk/pending')
    expect(fulfilled[0].type).toBe('cart/updateAmountThunk/fulfilled')
    expect(fulfilled[0].payload).toEqual(updatedItem)
    expect(mockedDeleteRequest).toHaveBeenCalledWith('/cartItems/1')
  })

  test('should handle error when product is not found', async () => {
    mockedGetRequest.mockResolvedValue(mockedProducts)
    const thunk = updateAmountThunk({ id: 99, type: 'increase' })
    await thunk(dispatch, () => {}, undefined)

    const { calls } = dispatch.mock
    const [pending, errorAction] = calls
    expect(pending[0].type).toBe('cart/updateAmountThunk/pending')
    expect(errorAction[0].type).toBe('error/setError')
    expect(errorAction[0].payload).toBe('Failed to update amount: Product not found')
  })

  test('should handle rejected response', async () => {
    const existingItem = { ...mockedProducts[0], id: 1, quantity: 1 }
    mockedGetRequest.mockResolvedValue([existingItem])
    mockedPutRequest.mockRejectedValue(new Error('Something went wrong'))
    const thunk = updateAmountThunk({ id: 99, type: 'increase' })
    await thunk(dispatch, () => {}, undefined)

    const { calls } = dispatch.mock
    const [pending, errorAction] = calls
    expect(pending[0].type).toBe('cart/updateAmountThunk/pending')
    expect(errorAction[0].type).toBe('error/setError')
    expect(errorAction[0].payload).toBe('Failed to update amount: Product not found')
  })
})
