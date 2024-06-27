import { CATEGORIES } from '@/constants'
import { getCurrentURL } from '@/utils/getCurrentURL'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Categories } from './Categories'

const renderCategories = (onClickMock: () => void) => {
  render(
    <Router>
      <Categories onClick={onClickMock} />
    </Router>
  )
}

describe('Categories component tests', () => {
  const onClickMock = jest.fn()

  test('renders home button', () => {
    renderCategories(onClickMock)

    const homeButton = screen.getByRole('button', { name: /home/i })
    expect(homeButton).toBeInTheDocument()
  })

  test('Typography styling for home button', () => {
    renderCategories(onClickMock)

    const fontSizeLarge = '0.8125rem'
    const typographyElement = screen.getByRole('button', { name: /home/i })

    expect(typographyElement).toHaveStyle(`font-size: ${fontSizeLarge}`)
    expect(typographyElement).toHaveStyle('font-weight: 500')
  })

  test('home button click navigates to home page', () => {
    renderCategories(onClickMock)

    const homeButton = screen.getByRole('button', { name: /home/i })
    fireEvent.click(homeButton)
    const urlAfterClick = getCurrentURL()

    expect(urlAfterClick).toEqual('http://localhost/')
  })

  test('renders all categories correctly', () => {
    renderCategories(onClickMock)

    CATEGORIES.forEach((category) => {
      const categoryElement = screen.getByRole('link', { name: new RegExp(category.label, 'i') })
      expect(categoryElement).toBeInTheDocument()
    })
  })

  test('each category navigates to its corresponding URL', () => {
    renderCategories(onClickMock)

    CATEGORIES.forEach((category) => {
      const categoryElement = screen.getByRole('link', { name: new RegExp(category.label, 'i') })
      fireEvent.click(categoryElement)
      const urlAfterClick = getCurrentURL()

      expect(urlAfterClick).toEqual(`http://localhost/categories/${category.label.toLowerCase()}`)
    })
  })

  test('each category has a corresponding href', () => {
    renderCategories(onClickMock)

    CATEGORIES.forEach((category) => {
      const categoryElement = screen.getByRole('link', { name: new RegExp(category.label, 'i') })
      fireEvent.click(categoryElement)

      expect(categoryElement).toHaveAttribute('href', `/categories/${category.label.toLowerCase()}`)
    })
  })

  test('each category color change on hover', () => {
    renderCategories(onClickMock)

    CATEGORIES.forEach((category) => {
      const categoryElement = screen.getByRole('link', { name: new RegExp(category.label, 'i') })
      fireEvent.mouseEnter(categoryElement)

      expect(categoryElement).toHaveStyle(`background: primary.light`)
      expect(categoryElement).toHaveStyle(`background: primary.main`)
    })
  })

  test('categories width is equal to 250px', () => {
    renderCategories(onClickMock)

    const categoriesElement = screen.getByLabelText('categories')
    expect(categoriesElement).toHaveStyle('width: 250px')
  })
})
