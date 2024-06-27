import { ROUTES } from '@/constants'
import { Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const Logo = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Link to={ROUTES.root} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Typography sx={{ [theme.breakpoints.up('sm')]: { display: 'block' } }} variant='h6'>
        {t('titleText')}
      </Typography>
    </Link>
  )
}
