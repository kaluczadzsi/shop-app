/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit'

export const pendingHandler = <T extends { isLoading?: boolean }>(state: T): void => {
  state.isLoading = true
}

export const fulfilledHandler = <T extends { isLoading?: boolean; error: string }>(state: T): void => {
  state.isLoading = false
  state.error = ''
}

export const rejectedHandler = <T extends { isLoading?: boolean; error: string }>(
  state: T,
  action: PayloadAction<any>
) => {
  state.isLoading = false
  state.error = action.payload?.error?.message || 'Unknown error occurred'
}
