import { store } from '@/store/store'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router'
import { CartDrawer } from '../CartDrawer'

const renderCartDrawer = () => {
  return render(
    <Provider store={store}>
      <Router>
        <CartDrawer isOpen onClose={() => {}} cart={[]} isLoading={false} />
      </Router>
    </Provider>
  )
}

describe('CartDrawer component tests', () => {
  test('drawer has cart item if cartItems length bigger than 0', async () => {
    const { cartItems } = store.getState().cart

    if (cartItems?.length > 0) {
      expect(screen.getByRole('listitem', { name: /cart item/i })).toBeInTheDocument()
    }
  })

  test('delete cart item works correctly', async () => {
    renderCartDrawer()
    const deleteItemMock = jest.fn()

    const { cartItems } = store.getState().cart

    if (cartItems?.length > 0) {
      expect(screen.getByRole('listitem', { name: /cart item/i })).toBeInTheDocument()
      const deleteButton = screen.getByRole('svg')
      fireEvent.click(deleteButton)
      expect(deleteItemMock).toHaveBeenCalled()
      expect(cartItems.length).toEqual(cartItems.length - 1)
    }
  })

  test('+ button increases cart item amount correctly ', async () => {
    renderCartDrawer()
    const increaseQuantityMock = jest.fn()

    const { cartItems } = store.getState().cart

    if (cartItems?.length > 0) {
      expect(screen.getByRole('listitem', { name: /cart item/i })).toBeInTheDocument()
      const increaseButton = screen.getByRole('button', { name: '+' })

      fireEvent.click(increaseButton)
      expect(increaseQuantityMock).toHaveBeenCalled()

      const amount = await screen.findByRole('span', { name: /quantity/i })
      expect(amount.textContent).toBe(2)
    }
  })

  test('- button decreases cart item amount correctly ', async () => {
    renderCartDrawer()
    const decreaseQuantityMock = jest.fn()

    const { cartItems } = store.getState().cart

    if (cartItems?.length > 0) {
      expect(screen.getByRole('listitem', { name: /cart item/i })).toBeInTheDocument()
      const decreaseButton = screen.getByRole('button', { name: '-' })

      fireEvent.click(decreaseButton)
      expect(decreaseQuantityMock).toHaveBeenCalled()

      expect(screen.getByRole('listitem', { name: /cart item/i })).not.toBeInTheDocument()
    }
  })
})
