import { CustomButton } from '@/components/Components.styled'
import { ROUTES } from '@/constants'
import { clearCurrentUser } from '@/features/currentUser/currentUserSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { ProfileBox } from './styles'

export const Profile = () => {
  const { user } = useAppSelector((state) => state.currentUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLogout = () => {
    navigate(ROUTES.root)
    dispatch(clearCurrentUser())
  }

  return (
    <Box flexGrow={1} p={2}>
      <ProfileBox>
        <Box display='flex' flexDirection='column' gap={2}>
          <AccountCircleIcon sx={{ fontSize: '6rem', margin: 'auto' }} />
          <Box>
            <Typography variant='h4'>
              {t('welcomeText')} {user?.username}!
            </Typography>
            <Typography sx={{ mt: 1, mb: 2 }}>{user?.email}</Typography>
          </Box>

          <CustomButton sx={{ maxWidth: '50%', margin: 'auto' }} onClick={handleLogout}>
            {t('logoutText')}
          </CustomButton>
        </Box>
      </ProfileBox>
    </Box>
  )
}
