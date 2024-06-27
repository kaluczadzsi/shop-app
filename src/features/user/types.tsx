import { User } from '@/components/types'

export interface UsersState {
  users: User[]
  error: string
  isLoading: boolean
}
