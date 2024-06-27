export const calculateDiscountByPercent = (price: number, discount: number) => {
  return price - price * (discount / 100)
}
