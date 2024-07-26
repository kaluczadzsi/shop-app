import { mockedProducts } from '@/mocks/mockedProducts'
import { axiosInstance } from './axiosInstance'
import { apiService } from './apiService'

const MOCK_PRODUCT_DATA = { id: 1, name: 'Product' }
const cartItemsURL = '/cartItems'

jest.mock('@/api/axiosInstance')

describe('apiService tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('getRequest test', async () => {
    ;(axiosInstance as jest.MockedFunction<typeof axiosInstance>).mockResolvedValue({
      data: mockedProducts
    })

    const response = await apiService().getRequest(cartItemsURL)

    expect(axiosInstance).toHaveBeenCalledWith({
      data: undefined,
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      url: cartItemsURL
    })

    expect(response).toEqual(mockedProducts)
  })

  test('postRequest test', async () => {
    ;(axiosInstance.post as jest.MockedFunction<typeof axiosInstance.post>).mockResolvedValue({
      data: [...mockedProducts, MOCK_PRODUCT_DATA]
    })

    const response = await axiosInstance.post(cartItemsURL, MOCK_PRODUCT_DATA)

    expect(axiosInstance.post).toHaveBeenCalledWith(cartItemsURL, MOCK_PRODUCT_DATA)
    expect(response.data).toEqual([...mockedProducts, MOCK_PRODUCT_DATA])
  })

  test('putRequest test', async () => {
    ;(axiosInstance.put as jest.MockedFunction<typeof axiosInstance.put>).mockResolvedValue({
      data: MOCK_PRODUCT_DATA
    })

    const response = await axiosInstance.put(`${cartItemsURL}/1`, MOCK_PRODUCT_DATA)
    expect(axiosInstance.put).toHaveBeenCalledWith(`${cartItemsURL}/1`, MOCK_PRODUCT_DATA)
    expect(response.data).toEqual(MOCK_PRODUCT_DATA)
  })

  test('deleteRequest test', async () => {
    ;(axiosInstance.delete as jest.MockedFunction<typeof axiosInstance.delete>).mockResolvedValue({
      data: { success: true }
    })

    const response = await axiosInstance.delete(`${cartItemsURL}/1`)

    expect(axiosInstance.delete).toHaveBeenCalledWith(`${cartItemsURL}/1`)
    expect(response.data).toEqual({ success: true })
  })
})
