import { CustomButton } from '@/components/Components.styled'
import { IMAGES } from '@/constants'
import { Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export const ErrorPage = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      height='100%'
      gap={4}
      sx={{
        [theme.breakpoints.down('sm')]: {
          img: {
            width: '22rem'
          }
        }
      }}
    >
      <img src={IMAGES.notFound} style={{ width: '31,25rem' }} alt='Not found' />
      <Typography variant='h5'>{t('pageNotFoundText').toUpperCase()}</Typography>
      <Typography>{t('pageNotFoundDescription')}</Typography>
      <CustomButton onClick={() => navigate('/')}>{t('pageNotFoundBtnText').toUpperCase()}</CustomButton>
    </Stack>
  )
}
