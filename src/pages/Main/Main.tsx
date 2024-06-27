import { Grid } from '@mui/material'
import { Outlet } from 'react-router'
import { Categories } from '@/components/Categories/Categories'
import { mediaQueryMatcher } from '@/utils/mediaQueryMatcher'

export const Main = () => {
  const matches = mediaQueryMatcher('max', 1200)

  return (
    <Grid container component='main' p={2} gap={2} flexGrow={1}>
      {!matches && <Categories />}

      <Grid item xs>
        <Outlet />
      </Grid>
    </Grid>
  )
}
