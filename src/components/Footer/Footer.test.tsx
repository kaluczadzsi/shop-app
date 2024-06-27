import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer component tests', () => {
  test('renders copyright text and social icons', () => {
    render(<Footer />)

    const copyrightText = screen.getByText(/copyrightText/i)
    expect(copyrightText).toBeInTheDocument()

    const facebookIcon = screen.getByLabelText(/facebook icon/i)
    expect(facebookIcon).toBeInTheDocument()

    const instagramIcon = screen.getByLabelText(/instagram icon/i)
    expect(instagramIcon).toBeInTheDocument()
  })
})
