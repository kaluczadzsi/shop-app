export const thunkMiddleware =
  ({ dispatch, getState }: any) =>
  (next: (arg0: any) => any) =>
  (action: (arg0: any, arg1: any) => any) => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    return next(action)
  }

export const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  }
  const next = jest.fn()

  const invoke = (action: (arg0: any, arg1: any) => any) => thunkMiddleware(store)(next)(action)

  return { store, next, invoke }
}
