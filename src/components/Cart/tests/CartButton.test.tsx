import { useAppSelector } from '@/store/hooks'
import { store } from '@/store/store'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router'
import { CartButton } from '../CartButton'

const mockFn = jest.fn()
const cartButton = screen.getByLabelText(/open drawer/i)
const tooltip = 'tooltip'

const renderCartButton = () => {
  return render(
    <Provider store={store}>
      <Router>
        <CartButton onClick={mockFn} />
      </Router>
    </Provider>
  )
}

describe('CartButton component tests', () => {
  test('tooltip text is equal to Cart when it has items', async () => {
    renderCartButton()

    userEvent.hover(cartButton)

    waitFor(() => {
      expect(screen.findByText(tooltip)).toBeInTheDocument()

      if (store.getState().cart.cartItems.length) {
        expect(screen.findByText(/'cart'/i)).toBeInTheDocument()
      }
    })
  })

  test('tooltip text is equal to There are no items in your cart when it has no items', async () => {
    renderCartButton()

    userEvent.hover(cartButton)

    waitFor(() => {
      expect(screen.findByText(tooltip)).toBeInTheDocument()

      const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>
      mockUseAppSelector.mockReturnValue({ cartItems: [{ id: 1, name: 'cart item' }] })

      expect(screen.findByText(/'there are no items in your cart when it has no items'/i)).toBeInTheDocument()
    })
  })

  test('when button clicked it calls the onClick function', async () => {
    renderCartButton()

    userEvent.hover(cartButton)
    expect(mockFn).toHaveBeenCalled()
  })
})
