import { store } from '@/store/store'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router'
import { SummaryBar } from '../SummaryBar'

const clearCartText = /clearCartText/i

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

  test('opens delete confirmation dialog on button click', async () => {
    renderSummaryBar()

    const clearButton = screen.getByText(clearCartText)
    await userEvent.click(clearButton)

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeInTheDocument()
  })

  test('on clicking the confirm button, the cart is successfully cleared.', async () => {
    renderSummaryBar()

    const clearButton = await screen.findByText(clearCartText)
    await userEvent.click(clearButton)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    const confirmButton = await screen.findByRole('button', { name: /confirm/i })
    await userEvent.click(confirmButton)

    expect(!store.getState().cart.cartItems.length)
  })
})
