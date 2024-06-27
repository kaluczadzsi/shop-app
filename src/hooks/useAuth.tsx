import { useAppSelector } from '@/store/hooks'

export const useAuth = () => {
  const user = useAppSelector((state) => state.currentUser.user)

  return user?.token || null
}
