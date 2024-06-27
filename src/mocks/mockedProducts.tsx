import { ProductProps as Product } from '@/components/Products/types'

export const mockedProducts: Product[] = [
  {
    id: 1,
    title: 'painter',
    image: 'image',
    description: 'desc',
    isonsale: false,
    price: 500,
    category: 'household',
    quantity: 2
  },
  {
    id: 2,
    title: 'playstation 5',
    image: 'image',
    description: 'desc',
    isonsale: false,
    price: 1500,
    category: 'gaming',
    quantity: 2
  }
]
