import { CustomButton } from '@/components/Components.styled'
import { ProfileImage } from '@/components/ProfileImage/ProfileImage'
import { ProfileNameDialog } from '@/components/ProfileNameDialog/ProfileNameDialog'
import { ROUTES } from '@/constants'
import { clearCurrentUser } from '@/features/currentUser/currentUserSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Box, Stack, Typography } from '@mui/material'
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

  const handleGoHome = () => {
    navigate(ROUTES.root)
  }

  return (
    <Box flexGrow={1} p={2}>
      <ProfileBox>
        <Stack flexDirection='column' alignItems='center' gap={2}>
          <ProfileImage />
          <Box>
            <Stack direction='row' justifyItems='center' alignItems='center'>
              <Typography variant='h4'>
                {t('welcomeText')} {user?.username}!
              </Typography>
              <ProfileNameDialog />
            </Stack>

            <Typography sx={{ mt: 1, mb: 2 }}>{user?.email}</Typography>
          </Box>

          <CustomButton sx={{ width: '50%', margin: 'auto' }} onClick={handleGoHome}>
            {t('homeText')}
          </CustomButton>

          <CustomButton sx={{ width: '50%', margin: 'auto' }} onClick={handleLogout}>
            {t('logoutText')}
          </CustomButton>
        </Stack>
      </ProfileBox>
    </Box>
  )
}
