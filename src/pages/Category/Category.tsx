import { PageLoader } from '@/components/PageLoader/PageLoader'
import { Product } from '@/components/Products/Product'
import { ProductProps } from '@/components/Products/types'
import { fetchFilteredProductsThunk } from '@/features/search/fetchFilteredProductsThunk'
import { useDebounce } from '@/hooks/useDebounce'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Grid } from '@mui/material'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const Category = () => {
  const { inputValue, filteredProducts, isLoading } = useAppSelector((state) => state.search)
  const { category } = useParams<{ category: string }>()
  const debouncedValue = useDebounce(inputValue)
  const isSpecial = category === 'special'
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchFilteredProductsThunk(debouncedValue))
  }, [debouncedValue, dispatch])

  return (
    <PageLoader loading={isLoading}>
      <Grid container spacing={2}>
        {filteredProducts
          .filter((product: ProductProps) => {
            if (isSpecial) {
              return product.title.includes(debouncedValue) && product.isonsale
            }
            return product.category === category
          })
          .map((prod: ProductProps) => (
            <Grid key={prod.id} item xs={12} sm={6} md={4} lg={3}>
              <Product {...prod} />
            </Grid>
          ))}
      </Grid>
    </PageLoader>
  )
}
