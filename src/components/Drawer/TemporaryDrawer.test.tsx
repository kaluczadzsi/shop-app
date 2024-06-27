import { render, fireEvent } from '@testing-library/react'
import { TemporaryDrawer } from './TemporaryDrawer'

const mockSetState = jest.fn()
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn((initial: any) => [initial, mockSetState])
}))

describe('TemporaryDrawer', () => {
  test('should open drawer when IconButton is clicked', () => {
    const { getByLabelText } = render(<TemporaryDrawer />)

    fireEvent.click(getByLabelText('open drawer'))

    expect(mockSetState).toHaveBeenCalledWith(true)
  })
})
