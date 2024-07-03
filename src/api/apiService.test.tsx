import { mockedProducts } from '@/mocks/mockedProducts'
import { axiosInstance } from './axiosInstance'

jest.mock('@/api/axiosInstance')
describe('apiService tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('getRequest test', async () => {
    ;(axiosInstance as jest.MockedFunction<typeof axiosInstance>).mockResolvedValue(mockedProducts)

    const response = await axiosInstance('/cartItems')

    expect(axiosInstance).toHaveBeenCalledWith('/cartItems')
    expect(response).toEqual(mockedProducts)
  })

  test('postRequest test', async () => {
    const postData = { id: 1, name: 'Product' }

    ;(axiosInstance.post as jest.MockedFunction<typeof axiosInstance.post>).mockResolvedValue({
      data: [...mockedProducts, postData]
    })

    const response = await axiosInstance.post('/cartItems', postData)

    expect(axiosInstance.post).toHaveBeenCalledWith('/cartItems', postData)
    expect(response.data).toEqual([...mockedProducts, postData])
  })

  test('putRequest test', async () => {
    const putData = { id: 1, name: 'Updated Product' }

    ;(axiosInstance.put as jest.MockedFunction<typeof axiosInstance.put>).mockResolvedValue({
      data: putData
    })

    const response = await axiosInstance.put('/cartItems/1', putData)

    expect(axiosInstance.put).toHaveBeenCalledWith('/cartItems/1', putData)
    expect(response.data).toEqual(putData)
  })

  test('deleteRequest test', async () => {
    ;(axiosInstance.delete as jest.MockedFunction<typeof axiosInstance.delete>).mockResolvedValue({
      data: { success: true }
    })

    const response = await axiosInstance.delete('/cartItems/1')

    expect(axiosInstance.delete).toHaveBeenCalledWith('/cartItems/1')
    expect(response.data).toEqual({ success: true })
  })
})
