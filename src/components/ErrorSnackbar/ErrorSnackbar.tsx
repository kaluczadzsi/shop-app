import { DEFAULT_ERROR_MESSAGE } from '@/constants/defaultErrorMessage'
import { clearError } from '@/features/error/errorSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Alert, Snackbar, Typography } from '@mui/material'
import { TransitionDown } from './TransitionDown'

export const ErrorSnackbar = () => {
  const { isOpen, errorMessage } = useAppSelector((state) => state.error)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(clearError())
  }

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      autoHideDuration={4000}
      onClose={handleClose}
      TransitionComponent={TransitionDown}
    >
      <Alert severity='error' variant='filled' sx={{ display: 'flex', alignItems: 'center', maxWidth: '90vw' }}>
        <Typography>{errorMessage || DEFAULT_ERROR_MESSAGE} </Typography>
      </Alert>
    </Snackbar>
  )
}
