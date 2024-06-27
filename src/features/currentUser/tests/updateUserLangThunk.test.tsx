import { setError } from '@/features/error/errorSlice'
import { updateUserLangThunk } from '../updateUserLangThunk'

const user = {
  id: '123',
  username: 'mockedUser',
  email: 'mockeduser@example.com',
  password: '1234',
  lang: 'en'
}
const lang = 'uk'

const thunk = updateUserLangThunk({ user, lang })
const dispatch = jest.fn()
const patchRequestMock = jest.fn()

jest.mock('@/api/apiService', () => ({
  apiService: () => ({
    patchRequest: patchRequestMock
  })
}))

describe('updateUserLangThunk tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should update user language successfully', async () => {
    patchRequestMock.mockResolvedValue(user)

    const localStorageMock = jest.spyOn(Storage.prototype, 'setItem')
    localStorageMock.mockImplementation(() => {})

    await thunk(dispatch, () => {}, undefined)
    expect(patchRequestMock).toHaveBeenCalledWith(`users/${user.id}`, { lang })
    expect(localStorageMock).toHaveBeenCalled()
  })

  test('should handle API request failure', async () => {
    const errorMessage = 'Failed to update user language'
    patchRequestMock.mockRejectedValue(new Error(errorMessage))

    await thunk(dispatch, () => {}, undefined)
    expect(patchRequestMock).toHaveBeenCalledWith(`users/${user.id}`, { lang })
    expect(dispatch).toHaveBeenCalledWith(setError(`Error updating user language: ${errorMessage}`))
  })
})
