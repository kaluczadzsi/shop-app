import { PageLoader } from '@/components/PageLoader/PageLoader'
import { Product } from '@/components/Products/Product'
import { ProductProps } from '@/components/Products/types'
import { Slider } from '@/components/Slider/Slider'
import { fetchFilteredProductsThunk } from '@/features/search/fetchFilteredProductsThunk'
import { useDebounce } from '@/hooks/useDebounce'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Box, Grid } from '@mui/material'
import { useEffect } from 'react'

export const Products = () => {
  const dispatch = useAppDispatch()
  const { inputValue, filteredProducts, isLoading } = useAppSelector((state) => state.search)
  const debouncedValue = useDebounce(inputValue)

  useEffect(() => {
    dispatch(fetchFilteredProductsThunk(debouncedValue))
  }, [debouncedValue])

  return (
    <PageLoader loading={isLoading}>
      <Box>
        <Box marginBottom={4}>
          <Slider />
        </Box>
        <Grid container spacing={2}>
          {filteredProducts.map((prod: ProductProps) => (
            <Grid key={prod.id} item xs={12} sm={6} md={4} lg={3}>
              <Product {...prod} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageLoader>
  )
}
