import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { useHeaderController } from './useHeaderController'

describe('test', () => {
  test('initially anchorEl should be null', () => {
    const { result } = renderHook(() => useHeaderController())
    expect(result.current.anchorEl).toBe(null)
  })

  test('handleClick and handleClose work correctly', () => {
    const { result } = renderHook(() => useHeaderController())

    const mockButton = document.createElement('button')
    const mockEvent = { currentTarget: mockButton } as unknown as React.MouseEvent<HTMLButtonElement>

    act(() => {
      result.current.handleClick(mockEvent)
    })
    expect(result.current.anchorEl).toBe(mockButton)

    act(() => {
      result.current.handleClose()
    })
    expect(result.current.anchorEl).toBe(null)
  })
})
