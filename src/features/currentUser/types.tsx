import { User } from '@/components/types'

export interface CurrentUserState {
  user: User | null
  error: string
  isLoading: boolean
}

export interface PostUserThunkPayload {
  url: string
  user: User
}

export interface PostRequestResponse {
  user: User
  id?: string
  username?: string
  email: string
  password: string
  token?: string
  accessToken?: string
}

export interface PostUserThunkArgs {
  user: User
  url?: string
}

export interface UpdateUsernameThunkProps {
  user: User
  username: string | null
}

export interface UpdateUserLangThunkProps {
  user: User
  lang: string
}

export interface UpdateUserImageThunkProps {
  user: User
  image: string | null
}
