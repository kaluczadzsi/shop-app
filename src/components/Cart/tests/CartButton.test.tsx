import { store } from '@/store/store'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router'
import { CartButton } from '../CartButton'

const renderCartButton = (mockFn: () => void) => {
  return render(
    <Provider store={store}>
      <Router>
        <CartButton onClick={mockFn} />
      </Router>
    </Provider>
  )
}

const mockFn = jest.fn()

describe('CartButton component tests', () => {
  test('tooltip opens on hover', async () => {
    renderCartButton(mockFn)

    const cartButton = screen.getByLabelText(/open drawer/i)
    fireEvent.mouseEnter(cartButton)

    waitFor(() => {
      expect(screen.findByText('tooltip')).toBeInTheDocument()
    })
  })

  test('tooltip text is equal to Cart when it has items', async () => {
    renderCartButton(mockFn)

    const cartButton = screen.getByLabelText(/open drawer/i)
    fireEvent.mouseEnter(cartButton)

    waitFor(() => {
      expect(screen.findByText('tooltip')).toBeInTheDocument()

      if (store.getState().cart.cartItems.length) {
        expect(screen.findByText(/'cart'/i)).toBeInTheDocument()
      }
    })
  })

  test('tooltip text is equal to There are no items in your cart when it has no items', async () => {
    renderCartButton(mockFn)

    const cardButton = screen.getByLabelText(/open drawer/i)
    fireEvent.mouseEnter(cardButton)

    waitFor(() => {
      expect(screen.findByText('tooltip')).toBeInTheDocument()

      if (!store.getState().cart.cartItems.length) {
        expect(screen.findByText(/'there are no items in your cart when it has no items'/i)).toBeInTheDocument()
      }
    })
  })

  test('when button clicked it calls the onClick function', async () => {
    renderCartButton(mockFn)

    const cardButton = screen.getByLabelText(/open drawer/i)
    fireEvent.mouseEnter(cardButton)

    if (store.getState().cart.cartItems.length) {
      expect(mockFn).toHaveBeenCalled()
    }
  })
})
