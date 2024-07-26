import { updateUsernameThunk } from '@/features/currentUser/updateUsernameThunk'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Settings } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const ProfileNameDialog = () => {
  const { user } = useAppSelector((state) => state.currentUser)
  const dispatch = useAppDispatch()
  const [open, setIsOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const validateUsername = (username: string): string | null => {
    if (username.length < 3) {
      return t('usernameTooShort')
    }

    if (username.length > 18) {
      return t('usernameTooLong')
    }

    return null
  }

  const handleClose = () => {
    setIsOpen(false)
    setError('')
  }

  const handleNameChange = () => {
    const validationError = validateUsername(newName)

    if (validationError) {
      setError(validationError)
    } else if (user) {
      dispatch(updateUsernameThunk({ user, username: newName }))
      handleClose()
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleNameChange()
  }

  return (
    <>
      <Tooltip title={t('changeUsername')}>
        <Settings
          onClick={() => setIsOpen(true)}
          sx={{
            marginLeft: '4px',
            cursor: 'pointer',
            '&:hover': {
              animation: 'rotate 2s infinite linear'
            }
          }}
        />
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit
        }}
      >
        <DialogTitle>{t('profileNameDialogTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('enterNewUsername')}</DialogContentText>
          <TextField
            sx={{ marginTop: '1rem' }}
            color='secondary'
            autoFocus
            required
            margin='dense'
            id='username'
            name='username'
            label={t('newUserName')}
            type='text'
            fullWidth
            variant='standard'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: 'secondary.dark' }}>
            {t('deny')}
          </Button>
          <Button type='submit' sx={{ color: 'secondary.dark' }}>
            {t('btnChange')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
