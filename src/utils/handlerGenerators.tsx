export const generatePendingAction = (type: string) => ({ type })

export const generateFulfilledAction = <T,>(type: string, payload: T) => ({ type, payload })

export const generateRejectedAction = (type: string, error: { message: string }) => ({
  type,
  payload: { error }
})
