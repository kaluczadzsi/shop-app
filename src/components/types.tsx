export interface User {
  id?: string
  username?: string
  email: string
  password: string
  token?: string
  accessToken?: string
  lang?: string
  ratings?: { [productId: number]: number }
}
