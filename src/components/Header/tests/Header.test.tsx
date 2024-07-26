import { store } from '@/store/store'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { Header } from '../Header'

const renderHeader = () => {
  render(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  )
}

describe('Header component tests', () => {
  test('renders correctly', () => {
    renderHeader()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  test('theme toggler works correctly', async () => {
    renderHeader()

    const initialTheme = 'light'
    expect(initialTheme).toBe('light')

    const themeToggleButton = screen.getByLabelText('theme-toggle-button')
    await userEvent.click(themeToggleButton)

    const newTheme = store.getState().theme.theme
    expect(newTheme).toBe('dark')
  })

  test('Drawer rendered', () => {
    renderHeader()

    const drawer = screen.queryByTestId('drawer') as HTMLElement
    expect(drawer).toBeInTheDocument()
  })
})
