import { Button, FormControl, styled } from '@mui/material'

export const FormBox = styled('form')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  padding: 2,
  height: '100%',
  color: theme.palette.secondary.main
}))

export const CustomFormControl = styled(FormControl)({
  display: 'flex',
  maxWidth: '100%',
  width: '30rem',
  gap: 16,
  padding: 2,
  margin: 2
})

export const FormButton = styled('button')(({ theme }) => ({
  textDecoration: 'none',
  padding: '16px 30px',
  borderRadius: '50px',
  fontSize: 'medium',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  border: 0,
  cursor: 'pointer',
  transition: '0.2s ease-in all',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark
  }
}))

export const FormButtonLogin = styled(Button)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: '0.8rem',
  color: theme.palette.secondary.light,
  padding: '10px',
  cursor: 'pointer'
}))
