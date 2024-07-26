import { store } from '@/store/store'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

    const cartButton = screen.getByLabelText(OPEN_DRAWER_LABEL)
    await userEvent.click(cartButton)

    waitFor(async () => {
      expect(await screen.findByRole(DIALOG)).toBeInTheDocument()
    })
  })

  test('closes the CartDrawer when the close button is clicked', async () => {
    renderCart()

    const cartButton = screen.getByLabelText(OPEN_DRAWER_LABEL)
    await userEvent.click(cartButton)

    waitFor(async () => {
      const drawer = await screen.findByLabelText('cart-drawer')
      expect(await screen.findByRole(DIALOG)).not.toBeInTheDocument()
      const closeIcon = await screen.findByLabelText('close-icon')
      await userEvent.click(closeIcon)
      expect(drawer).not.toBeInTheDocument()
    })
  })
})
