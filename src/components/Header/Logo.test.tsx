import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Logo } from './Logo'

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    }
  }
}))

describe('Logo component tests', () => {
  test('renders Shop App text', () => {
    render(
      <Router>
        <Logo />
      </Router>
    )

    const logoElement = screen.getByText(/titleText/i)

    expect(logoElement).toBeInTheDocument()
  })
})
