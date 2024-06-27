import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useTranslation } from 'react-i18next'
import { DeleteDialogProps } from './types'

export const DeleteDialog = ({ isOpen, title, description, setIsOpen, handleDelete }: DeleteDialogProps) => {
  const { t } = useTranslation()

  return (
    <Dialog
      data-testid='delete-dialog'
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)} sx={{ color: 'secondary.dark' }}>
          {t('deny')}
        </Button>
        <Button onClick={handleDelete} sx={{ color: 'secondary.dark' }} autoFocus>
          {t('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
