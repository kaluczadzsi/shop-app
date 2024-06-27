import { Button, styled } from '@mui/material'

export const CustomButton = styled(Button)(({ theme }) => ({
  textDecoration: 'none',
  padding: '12px 30px',
  borderRadius: '50px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: '0.2s ease-in all',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark
  }
}))
