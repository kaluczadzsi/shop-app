import { store } from '@/store/store'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { LanguageMenu } from '../LanguageMenu'

const renderLanguageMenu = () => {
  render(
    <Provider store={store}>
      <Router>
        <LanguageMenu />
      </Router>
    </Provider>
  )
}

describe('LanguageMenu component tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('handleClick sets anchorEl correctly', () => {
    renderLanguageMenu()

    const button = screen.getByLabelText('language-button')
    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  test('handleClose function closes the menu', async () => {
    renderLanguageMenu()

    const button = screen.getByLabelText('language-button')
    fireEvent.click(button)

    const menu = screen.queryByRole('menu')
    fireEvent.click(button)

    expect(menu).toBeInTheDocument()

    setTimeout(() => {
      fireEvent.click(button)
      expect(menu).not.toBeInTheDocument()
    }, 500)
  })

  test('on hover shows tooltip', async () => {
    renderLanguageMenu()

    const button = screen.getByLabelText('language-button')

    fireEvent.mouseOver(button)

    setTimeout(() => {
      const tooltip = screen.queryByRole('tooltip')
      expect(tooltip).toBeInTheDocument()
    }, 1000)
  })

  test('dispatches the updateUserLangThunk correctly', async () => {
    const { user } = store.getState().currentUser

    renderLanguageMenu()

    const button = screen.getByLabelText('language-button')
    fireEvent.click(button)

    expect(screen.getByRole('menu')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('menuitem', { name: 'UK' }))

    if (user) {
      await waitFor(() => expect(user?.lang).toEqual('uk'))
    }

    fireEvent.click(button)

    expect(screen.getByRole('menu')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('menuitem', { name: 'EN' }))

    if (user) {
      await waitFor(() => expect(user?.lang).toEqual('en'))
    }
  })
})
