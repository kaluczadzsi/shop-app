import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CategoryLink } from './Categories.styled'
import { CategoryProps } from './types'

export const Category = ({ icon, label }: CategoryProps) => {
  const categoryRoute = label.toLowerCase()
  const { t } = useTranslation()

  return (
    <CategoryLink to={`/categories/${categoryRoute}`}>
      {icon}
      <Typography sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>{t(`${label.toLowerCase()}`)}</Typography>
    </CategoryLink>
  )
}
