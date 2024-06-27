import { alpha, styled } from '@mui/material'
import { CustomLink } from '../CustomLink'

export const CategoryLink = styled(CustomLink)(({ theme }) => ({
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  color: 'inherit',
  width: '100%',
  gap: theme.spacing(2),
  borderRadius: '5px',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 1),
    color: alpha(theme.palette.primary.light, 1)
  }
}))
