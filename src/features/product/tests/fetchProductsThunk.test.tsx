import { mockedProducts } from '@/mocks/mockedProducts'
import { fetchProductsThunk } from '../fetchProductsThunk'

const thunk = fetchProductsThunk()
const mockedGetRequest = jest.fn()
const dispatch = jest.fn()

jest.mock('@/api/apiService', () => ({
  apiService: () => ({
    getRequest: mockedGetRequest
  })
}))

describe('fetchProductsThunk', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should fetch product items with resolved response', async () => {
    mockedGetRequest.mockResolvedValue(mockedProducts)

    await thunk(dispatch, () => {}, undefined)
    const { calls } = dispatch.mock
    const [pending, fulfilled] = calls
    expect(pending[0].type).toBe('product/fetchProductsThunk/pending')
    expect(fulfilled[0].type).toBe('product/fetchProductsThunk/fulfilled')
    expect(fulfilled[0].payload).toEqual(mockedProducts)
  })

  test('should handle rejected response', async () => {
    mockedGetRequest.mockRejectedValue(new Error('Something went wrong'))

    await thunk(dispatch, () => {}, undefined)
    const { calls } = dispatch.mock
    const [pending, rejected] = calls
    expect(pending[0].type).toBe('product/fetchProductsThunk/pending')
    expect(rejected[0].type).toBe('error/setError')
    expect(rejected[0].payload).toBe('Error fetching products: Something went wrong')
  })
})
