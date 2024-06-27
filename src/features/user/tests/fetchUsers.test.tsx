import { apiService } from '@/api/apiService'
import { fetchUsers } from '../fetchUsers'

jest.mock('@/api/apiService')

describe('fetchUsers thunk', () => {
  let getRequest: jest.Mock

  beforeEach(() => {
    getRequest = jest.fn()
    ;(apiService as jest.Mock).mockReturnValue({ getRequest })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('fetches users successfully', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }]
    getRequest.mockResolvedValue(mockUsers)

    const dispatch = jest.fn()
    const getState = jest.fn()

    const result = await fetchUsers()(dispatch, getState, undefined)

    expect(result.payload).toEqual(mockUsers)
    expect(result.type).toBe('user/fetchUsers/fulfilled')
    expect(getRequest).toHaveBeenCalledWith('/users')
  })

  test('fetches users unsuccessfully', async () => {
    getRequest.mockImplementation(() => {
      throw new Error('Error fetching users')
    })

    const dispatch = jest.fn()
    const getState = jest.fn()

    const result = await fetchUsers()(dispatch, getState, undefined)

    expect(result.payload).toEqual(undefined)
    expect(result.type).toBe('user/fetchUsers/rejected')
  })
})
