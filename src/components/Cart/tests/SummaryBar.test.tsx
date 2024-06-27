import { store } from '@/store/store'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router'
import { SummaryBar } from '../SummaryBar'

const renderSummaryBar = () => {
  render(
    <Provider store={store}>
      <Router>
        <SummaryBar />
      </Router>
    </Provider>
  )
}

describe('SummaryBar component tests', () => {
  test('renders correctly', () => {
    renderSummaryBar()
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  test('opens delete confirmation dialog on button click', () => {
    renderSummaryBar()

    const clearButton = screen.getByText(/clearCartText/i)
    fireEvent.click(clearButton)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  test('on clicking the confirm button, the cart is successfully cleared.', async () => {
    renderSummaryBar()

    const clearButton = screen.getByText(/clearCartText/i)
    fireEvent.click(clearButton)

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    const confirmButton = await screen.findByRole('button', { name: /confirm/i })
    fireEvent.click(confirmButton)

    expect(!store.getState().cart.cartItems.length)
  })
})
