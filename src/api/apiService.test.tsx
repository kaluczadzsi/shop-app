import { apiService } from '@/api/apiService'

const mockedGet = jest.fn()
const mockedPost = jest.fn()
const mockedPatch = jest.fn()
const mockedDelete = jest.fn()

jest.mock('./apiService', () => ({
  apiService: () => ({
    getRequest: mockedGet,
    postRequest: mockedPost,
    patchRequest: mockedPatch,
    deleteRequest: mockedDelete
  })
}))

describe('apiService tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getRequest test', async () => {
    mockedGet.mockResolvedValueOnce('mock-get-result')
    const result = await apiService().getRequest<any>('mock-url')

    expect(mockedGet).toHaveBeenCalledWith('mock-url')
    expect(result).toEqual('mock-get-result')
  })

  test('postRequest test', async () => {
    mockedPost.mockResolvedValueOnce('mock-post-result')
    const postData = { key: 'value' }
    const result = await apiService().postRequest<any>('mock-url', postData)

    expect(mockedPost).toHaveBeenCalledWith('mock-url', postData)
    expect(result).toEqual('mock-post-result')
  })

  test('patchRequest test', async () => {
    mockedPatch.mockResolvedValueOnce('mock-patch-result')
    const patchData = { key: 'updated-value' }
    const result = await apiService().patchRequest<any>('mock-url', patchData)

    expect(mockedPatch).toHaveBeenCalledWith('mock-url', patchData)
    expect(result).toEqual('mock-patch-result')
  })

  test('deleteRequest test', async () => {
    mockedDelete.mockResolvedValueOnce('mock-delete-result')
    const deleteData = { key: 'delete-value' }
    const result = await apiService().deleteRequest<any>('mock-url', deleteData)

    expect(mockedDelete).toHaveBeenCalledWith('mock-url', deleteData)
    expect(result).toEqual('mock-delete-result')
  })
})
