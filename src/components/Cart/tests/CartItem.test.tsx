import { updateAmountThunk } from '@/features/cart/updateAmountThunk'
import { store } from '@/store/store'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router'
import { CartItem } from '../CartItem'

jest.mock('@/features/cart/updateAmountThunk')

const defaultProps = {
  id: 1,
  image: 'image-url',
  title: 'Test Product',
  price: 100,
  quantity: 1,
  isonsale: false,
  description: 'desc',
  category: 'category'
}

const renderCartItem = () => {
  return render(
    <Provider store={store}>
      <Router>
        <CartItem {...defaultProps} />
      </Router>
    </Provider>
  )
}

describe('CartItem tests', () => {
  test('should render the CartItem component correctly', () => {
    renderCartItem()
    const priceElements = screen.queryAllByText('$100')
    expect(priceElements.length).toBeGreaterThan(0)
    expect(screen.getByRole('img', { name: 'Product Image' })).toHaveAttribute('src', 'image-url')
    expect(screen.getByLabelText('quantity')).toHaveTextContent('1')
  })

  test('should increase quantity when + button is clicked', async () => {
    renderCartItem()
    const increaseButton = screen.getByRole('button', { name: '+' })
    let quantity = screen.getByLabelText(/quantity/i)
    expect(quantity).toHaveTextContent('1')
    expect(increaseButton).toBeInTheDocument()

    userEvent.click(increaseButton)

    setTimeout(async () => {
      expect(updateAmountThunk).toHaveBeenCalledTimes(1)
      expect(updateAmountThunk).toHaveBeenCalledWith({ id: 1, type: 'increase' })
      quantity = await screen.findByLabelText(/quantity/i)
      expect(quantity.textContent).toBe(2)
    }, 500)
  })

  test('should decrease quantity when - button is clicked', async () => {
    render(
      <Provider store={store}>
        <Router>
          <CartItem {...defaultProps} quantity={3} />
        </Router>
      </Provider>
    )
    const decreaseButton = screen.getByRole('button', { name: '-' })
    let quantity = screen.getByLabelText(/quantity/i)
    expect(quantity).toHaveTextContent('3')
    expect(decreaseButton).toBeInTheDocument()

    userEvent.click(decreaseButton)

    setTimeout(async () => {
      expect(updateAmountThunk).toHaveBeenCalledTimes(1)
      expect(updateAmountThunk).toHaveBeenCalledWith({ id: 1, type: 'decrease' })
      quantity = await screen.findByLabelText(/quantity/i)
      expect(quantity.textContent).toBe(2)
    }, 500)
  })

  test('handle setOpen on delete button click', async () => {
    renderCartItem()
    const deleteBtn = screen.getByLabelText('delete-button')
    userEvent.click(deleteBtn)
    const isOpenState = await screen.findByRole('dialog')
    expect(isOpenState).toBeInTheDocument()
  })
})
