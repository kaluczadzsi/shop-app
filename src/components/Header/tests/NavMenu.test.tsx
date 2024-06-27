import { clearCurrentUser } from '@/features/currentUser/currentUserSlice'
import { store } from '@/store/store'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { NavMenu } from '../NavMenu'
import { NavMenuProps } from '../types'

const renderNavMenu = (mockObj: NavMenuProps) => {
  render(
    <Provider store={store}>
      <Router>
        <NavMenu {...mockObj} />
      </Router>
    </Provider>
  )
}

describe('NavMenu component tests', () => {
  const mockObj = {
    handleClick: jest.fn(),
    anchorEl: document.createElement('p'),
    handleClose: jest.fn(),
    isOpen: true
  }

  test('click on profile redirects user to the profile page', () => {
    renderNavMenu(mockObj)

    const { user } = store.getState().currentUser

    if (user) {
      const profile = screen.getByRole('menuitem', { name: /profile/i })
      expect(profile).toBeInTheDocument()

      fireEvent.click(profile)
      expect(window.location.pathname).toBe('/profile')
    }
  })

  test('click on logout redirects user to the root page', () => {
    renderNavMenu(mockObj)

    const { user } = store.getState().currentUser

    if (user) {
      const logout = screen.getByRole('menuitem', { name: /logout/i })
      expect(logout).toBeInTheDocument()

      fireEvent.click(logout)
      expect(window.location.pathname).toBe('/')
    }
  })

  test('click on login redirects user to the login page', () => {
    renderNavMenu(mockObj)

    store.dispatch(clearCurrentUser())
    const { user } = store.getState().currentUser

    if (!user) {
      const login = screen.getByRole('menuitem', { name: /login/i })
      expect(login).toBeInTheDocument()

      fireEvent.click(login)
      expect(window.location.pathname).toBe('/login')
    }
  })

  test('if the user is not logged in, clicking on the profile will redirect them to the sign-up page', () => {
    renderNavMenu(mockObj)

    store.dispatch(clearCurrentUser())
    const { user } = store.getState().currentUser

    if (!user) {
      const profile = screen.getByRole('menuitem', { name: /profile/i })
      expect(profile).toBeInTheDocument()

      fireEvent.click(profile)

      setTimeout(() => {
        expect(window.location.pathname).toBe('/signup')
      }, 500)
    }
  })
})
