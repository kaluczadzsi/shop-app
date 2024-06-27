import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { Stack } from '@mui/material'
import { Outlet } from 'react-router'

export const Layout = () => (
  <Stack direction='column' height='100vh'>
    <Header />
    <Outlet />
    <Footer />
  </Stack>
)
