import { store } from '@/store/store'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router'
import { Cart } from '../Cart'
import { DIALOG, OPEN_DRAWER_LABEL } from '../mocks'

const renderCart = () => {
  render(
    <Provider store={store}>
      <Router>
        <Cart />
      </Router>
    </Provider>
  )
}

describe('Cart component tests', () => {
  test('renders the CartButton and initially hides the CartDrawer', async () => {
    renderCart()

    expect(screen.getByLabelText(OPEN_DRAWER_LABEL)).toBeInTheDocument()
    expect(screen.queryByRole(DIALOG)).not.toBeInTheDocument()
  })

  test('opens the CartDrawer when the CartButton is clicked', async () => {
    renderCart()

    const { cartItems } = store.getState().cart

    const cartButton = screen.getByLabelText(OPEN_DRAWER_LABEL)
    fireEvent.click(cartButton)

    if (cartItems.length > 0) {
      await waitFor(() => expect(screen.getByRole(DIALOG)).toBeInTheDocument())
    }
  })

  test('closes the CartDrawer when the close button is clicked', async () => {
    renderCart()

    const { cartItems } = store.getState().cart

    if (cartItems.length > 0) {
      fireEvent.click(screen.getByRole('button', { name: /cart/i }))
      await waitFor(() => expect(screen.getByRole(DIALOG)).toBeInTheDocument())

      fireEvent.click(screen.getByRole('button', { name: /close/i }))
      await waitFor(() => expect(screen.queryByRole(DIALOG)).not.toBeInTheDocument())
    }
  })
})
