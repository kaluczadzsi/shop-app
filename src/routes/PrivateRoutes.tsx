import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/constants'

export const PrivateRoutes = () => {
  const token = useAuth()
  return token ? <Outlet /> : <Navigate to={ROUTES.signup} />
}
