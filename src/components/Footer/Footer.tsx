import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <Stack component='footer' direction='row' justifyContent='space-between' gap={2} padding={2} color='secondary.main'>
      <Typography>
        {t('copyrightText')}
        {year}
      </Typography>

      <Stack direction='row'>
        <FacebookIcon aria-label='Facebook Icon' sx={{ cursor: 'pointer' }} />
        <InstagramIcon aria-label='Instagram Icon' sx={{ cursor: 'pointer' }} />
      </Stack>
    </Stack>
  )
}
