import { getCurrentURL } from '@/utils/getCurrentURL'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Logo } from '../Logo'

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

  test('logo navigates to its corresponding URL', () => {
    render(
      <Router>
        <Logo />
      </Router>
    )

    const logoElement = screen.getByRole('link', { name: /titleText/i })
    fireEvent.click(logoElement)
    const URL = getCurrentURL()

    expect(URL).toEqual('http://localhost/')
  })
})
