import { calculateDiscountByPercent } from '../calculateDiscountByPercent'

describe('calculateDiscountByPercent test', () => {
  test('calculate discount percentage correctly', () => {
    expect(calculateDiscountByPercent(200, 15)).toBe(170)
  })
})
