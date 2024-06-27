import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/constants'

export const PublicRoutes = () => {
  const token = useAuth()
  return token ? <Navigate to={ROUTES.profile} /> : <Outlet />
}
