import { Backdrop, CircularProgress } from '@mui/material'
import { PageLoaderProps } from './types'

export const PageLoader = ({ loading, children }: PageLoaderProps) => {
  const layer = (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <CircularProgress color='inherit' />
    </Backdrop>
  )

  return loading ? layer : children
}
