export interface RatingState {
  ratings: Rating[]
  isLoading: boolean
  error: string
}

export interface Rating {
  id: number
  value: number
}
