import { Box, styled } from '@mui/material'

export const ProfileBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  gap: 16,
  maxWidth: '100%',
  width: '30rem',
  margin: '0 auto',
  height: '100%',
  color: theme.palette.secondary.main
}))
