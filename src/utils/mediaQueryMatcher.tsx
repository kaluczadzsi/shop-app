/* eslint-disable react-hooks/rules-of-hooks */
import useMediaQuery from '@mui/material/useMediaQuery'

export const mediaQueryMatcher = (direction: 'min' | 'max', breakpointWidth: number) => {
  return direction === 'min'
    ? useMediaQuery(`(min-width: ${breakpointWidth}px)`)
    : useMediaQuery(`(max-width: ${breakpointWidth}px)`)
}
