import { postUserThunk } from '../postUserThunk'

const user = {
  username: 'new mocked user',
  email: 'newmock@gmail.com',
  password: 'newMock&00'
}
const thunk = postUserThunk({
  url: '/signup',
  user
})
const dispatch = jest.fn()
const mockedPostRequest = jest.fn()

jest.mock('@/api/apiService', () => ({
  apiService: () => ({
    postRequest: mockedPostRequest
  })
}))

describe('postUserThunk tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should post user successfully ', async () => {
    const mockResponse = { user, accessToken: 'mockedToken' }
    mockedPostRequest.mockResolvedValue(mockResponse)
    await thunk(dispatch, () => {}, undefined)

    expect(mockedPostRequest).toHaveBeenCalledWith('/signup', user)
    const { calls } = dispatch.mock
    const [pending, fulfilled] = calls
    expect(pending[0].type).toBe('currentUser/postUserThunk/pending')
    expect(fulfilled[0].type).toBe('currentUser/postUserThunk/fulfilled')
    expect(fulfilled[0].payload).toEqual({ ...user, token: 'mockedToken' })
  })

  test('should save user to localStorage on success', async () => {
    const mockToken = 'mockedToken'
    mockedPostRequest.mockResolvedValue({ user, accessToken: mockToken })

    const localStorageMock = jest.spyOn(Storage.prototype, 'setItem')
    localStorageMock.mockImplementation(() => {})

    await thunk(dispatch, () => {}, undefined)

    expect(localStorageMock).toHaveBeenCalledWith('user', JSON.stringify({ ...user, token: mockToken }))

    localStorageMock.mockRestore()
  })

  test('should save user to localStorage on success', async () => {
    const mockToken = 'mockedToken'
    mockedPostRequest.mockResolvedValue({ user, accessToken: mockToken })

    const localStorageMock = jest.spyOn(Storage.prototype, 'setItem')
    localStorageMock.mockImplementation(() => {})

    await thunk(dispatch, () => {}, undefined)

    expect(localStorageMock).toHaveBeenCalledWith('user', JSON.stringify({ ...user, token: mockToken }))

    localStorageMock.mockRestore()
  })

  test('should handle rejected response', async () => {
    mockedPostRequest.mockRejectedValue(new Error('Something went wrong'))

    await thunk(dispatch, () => {}, undefined)
    const { calls } = dispatch.mock
    const [pending, rejected] = calls
    expect(pending[0].type).toBe('currentUser/postUserThunk/pending')
    expect(rejected[0].type).toBe('error/setError')
    expect(rejected[0].payload).toBe('Error posting user: Something went wrong')
  })
})
