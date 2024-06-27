import { ROUTES } from '@/constants'
import { clearCurrentUser } from '@/features/currentUser/currentUserSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Button, Stack, Tooltip } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { NavMenuProps } from './types'
import { Cart } from '../Cart/Cart'
import { LanguageMenu } from './LanguageMenu'

export const NavMenu = ({ handleClick, anchorEl, handleClose, isOpen }: NavMenuProps) => {
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.currentUser)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleLogin = () => {
    handleClose()
    navigate(ROUTES.login)
  }

  const handleLogout = () => {
    navigate(ROUTES.root)
    dispatch(clearCurrentUser())
  }

  const handleProfileClick = () => {
    handleClose()
    navigate(ROUTES.profile)
  }

  return (
    <Stack flexDirection='row' ml='auto' alignItems='center'>
      <LanguageMenu />
      {user && <Cart />}

      <Button
        sx={{ pr: 0, minWidth: '0' }}
        id='basic-button'
        aria-controls={isOpen ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
        aria-label='btn-account'
      >
        <Tooltip title='Profile'>
          <AccountCircleIcon sx={{ color: 'white', fontSize: '1.75rem' }} />
        </Tooltip>
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleProfileClick}>{t('navMenuProfileText')}</MenuItem>
        <MenuItem onClick={!user?.token ? handleLogin : handleLogout}>
          {!user?.token ? t('loginText') : t('logoutText')}
        </MenuItem>
      </Menu>
    </Stack>
  )
}
