import { store } from '@/store/store'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { SearchBar } from '../SearchBar'

const renderSearchBar = () => {
  render(
    <Provider store={store}>
      <Router>
        <SearchBar />
      </Router>
    </Provider>
  )
}

describe('SearchBar component tests', () => {
  test('renders without a value', () => {
    renderSearchBar()

    const inputElement = screen.getByPlaceholderText('searchPlaceholder') as HTMLInputElement
    expect(inputElement.value).toBe('')
  })

  test('allows user to type', () => {
    renderSearchBar()

    const inputElement = screen.getByPlaceholderText('searchPlaceholder') as HTMLInputElement
    fireEvent.change(inputElement, { target: { value: 'test' } })
    expect(inputElement.value).toBe('test')
  })
})
