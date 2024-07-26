import { deleteCartItemThunk } from '@/features/cart/deleteCartItemThunk'
import { updateAmountThunk } from '@/features/cart/updateAmountThunk'
import { store } from '@/store/store'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router'
import { CartDrawer } from '../CartDrawer'

const cartItems = [
  {
    id: 1,
    title: 'item',
    image: 'img',
    description: 'description',
    isonsale: false,
    price: 200,
    category: 'household',
    quantity: 2
  }
]

const mockedGetRequest = jest.fn()
const mockedDeleteRequest = jest.fn()
const dispatch = jest.fn()
const deleteThunk = deleteCartItemThunk(1)
const increaseThunk = updateAmountThunk({ id: 1, type: 'increase' })
const decreaseThunk = updateAmountThunk({ id: 1, type: 'decrease' })

jest.mock('@/api/apiService', () => ({
  apiService: () => ({
    getRequest: mockedGetRequest,
    deleteRequest: mockedDeleteRequest
  })
}))

const renderCartDrawer = () => {
  return render(
    <Provider store={store}>
      <Router>
        <CartDrawer isOpen onClose={() => {}} cart={cartItems} isLoading={false} />
      </Router>
    </Provider>
  )
}

describe('CartDrawer component tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('drawer has cart item if cartItems length bigger than 0', async () => {
    renderCartDrawer()
    expect(screen.getByLabelText('cart-item')).toBeInTheDocument()
  })

  test('delete cart item works correctly', async () => {
    renderCartDrawer()
    mockedGetRequest.mockResolvedValue(cartItems)
    await deleteThunk(dispatch, () => {}, undefined)
    const { calls } = dispatch.mock
    const [pending, fulfilled] = calls

    expect(pending[0].type).toBe('cart/deleteCartItemThunk/pending')
    expect(fulfilled[0].type).toBe('cart/deleteCartItemThunk/fulfilled')
  })

  test('+ button increases cart item amount correctly ', async () => {
    renderCartDrawer()
    mockedGetRequest.mockResolvedValue(cartItems)

    const increaseButton = screen.getByRole('button', { name: '+' })
    userEvent.click(increaseButton)

    await increaseThunk(dispatch, () => {}, undefined)
    const { calls } = dispatch.mock
    const [pending] = calls

    expect(pending[0].type).toBe('cart/updateAmountThunk/pending')
    expect(cartItems[0].quantity).toBe(3)
  })

  test('- button decreases cart item amount correctly ', async () => {
    renderCartDrawer()
    mockedGetRequest.mockResolvedValue(cartItems)

    const decreaseButton = screen.getByRole('button', { name: '-' })
    userEvent.click(decreaseButton)

    await decreaseThunk(dispatch, () => {}, undefined)
    const { calls } = dispatch.mock
    const [pending] = calls

    expect(pending[0].type).toBe('cart/updateAmountThunk/pending')
    expect(cartItems[0].quantity).toBe(2)
  })

  test('summary bar is rendered correctly ', async () => {
    renderCartDrawer()

    const summaryBar = screen.getByRole('list')
    expect(summaryBar).toBeInTheDocument()
  })
})
