import { store } from '@/store/store'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router'
import { DeleteDialog } from './DeleteDialog'
import { DeleteDialogProps } from './types'

const renderDeleteDialog = (mockObj: DeleteDialogProps) => {
  render(
    <Provider store={store}>
      <Router>
        <DeleteDialog {...mockObj} />
      </Router>
    </Provider>
  )
}

describe('DeleteDialog component tests', () => {
  const mockFn = jest.fn()

  const mockObj = {
    title: 'title',
    description: 'description',
    isOpen: true,
    setIsOpen: mockFn,
    handleDelete: mockFn
  }

  beforeEach(() => {
    mockFn.mockClear()
  })

  test('renders the dialog with title and description', () => {
    renderDeleteDialog(mockObj)

    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('description')).toBeInTheDocument()
  })

  test('calls setIsOpen with false when the deny button is clicked', async () => {
    renderDeleteDialog(mockObj)

    await userEvent.click(screen.getByText('deny'))
    expect(mockFn).toHaveBeenCalledWith(false)
  })

  test('calls handleDelete when the confirm button is clicked', async () => {
    renderDeleteDialog(mockObj)

    await userEvent.click(screen.getByText('confirm'))
    expect(mockFn).toHaveBeenCalled()
  })
})
