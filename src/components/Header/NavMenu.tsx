import { ROUTES } from '@/constants'
import { clearCurrentUser } from '@/features/currentUser/currentUserSlice'
import { useProfileImage } from '@/hooks/useProfileImage'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Button, Stack, Tooltip } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Cart } from '../Cart/Cart'
import { ProfileAvatar } from '../ProfileAvatar/ProfileAvatar'
import { LanguageMenu } from './LanguageMenu'
import { NavMenuProps } from './types'

export const NavMenu = ({ handleClick, anchorEl, handleClose, isOpen }: NavMenuProps) => {
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.currentUser)
  const { t } = useTranslation()
  const { image } = useProfileImage()
  const dispatch = useAppDispatch()

  const profileStatus = isOpen ? 'basic-menu' : undefined

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
      <Tooltip title={t('navMenuProfileText')}>
        <Button
          sx={{ pr: 0, minWidth: '0' }}
          id='basic-button'
          aria-controls={profileStatus}
          aria-haspopup='true'
          aria-expanded={isOpen}
          onClick={handleClick}
          aria-label='btn-account'
        >
          <ProfileAvatar image={image} isInHeader />
        </Button>
      </Tooltip>
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
