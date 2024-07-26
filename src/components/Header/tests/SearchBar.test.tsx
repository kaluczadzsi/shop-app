import { store } from '@/store/store'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react'
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

  test('allows user to type', async () => {
    renderSearchBar()

    const inputElement = screen.getByPlaceholderText('searchPlaceholder') as HTMLInputElement

    await act(async () => {
      await userEvent.type(inputElement, 'test')
    })

    await waitFor(() => {
      expect(inputElement.value).toBe('test')
    })
  })
})
