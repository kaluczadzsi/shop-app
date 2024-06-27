import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

export const CustomLink = forwardRef(({ to, ...props }: any, ref: any) => {
  return <Link to={to} ref={ref} {...props} />
})
