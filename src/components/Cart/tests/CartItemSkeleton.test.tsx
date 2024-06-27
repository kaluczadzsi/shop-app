import { store } from '@/store/store'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router'
import { CartItemSkeleton } from '../CartItemSkeleton'

const renderCartItemSkeleton = (count: number) => {
  return render(
    <Provider store={store}>
      <Router>
        <CartItemSkeleton count={count} />
      </Router>
    </Provider>
  )
}

describe('CartItemSkeleton component tests', () => {
  test('renders null when count is 0', async () => {
    const { container } = renderCartItemSkeleton(0)
    expect(container.firstChild).toBeNull()
  })

  test('renders null when count is negative', () => {
    const { container } = renderCartItemSkeleton(0)
    expect(container.firstChild).toBeNull()
  })

  test('renders skeleton item when count is greater than 0', () => {
    const { container } = renderCartItemSkeleton(2)
    expect(container.firstChild).not.toBeNull()
  })
})
