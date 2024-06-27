import { ROUTES, CATEGORIES as TempCategories } from '@/constants'
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Category } from './Category'
import { CategoriesProps } from './types'

export const Categories = ({ onClick }: CategoriesProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate(ROUTES.root)
  }

  return (
    <Grid
      aria-label='categories'
      onClick={() => onClick && onClick(false)}
      item
      xs={2}
      color={theme.palette.secondary.main}
      overflow='scroll'
      minHeight='100%'
      height={`calc(100vh - ${theme.spacing(22.75)})`}
      padding='16px 6px 16px 16px'
      width={250}
      sx={{
        [theme.breakpoints.down('sm')]: {
          height: '100%'
        },
        [theme.breakpoints.up('lg')]: {
          paddingTop: 0
        }
      }}
    >
      <Stack spacing={2} sx={{ height: '100%', justifyContent: 'space-between' }}>
        <Box>
          {TempCategories.map((category) => (
            <Category key={category.id} {...category} />
          ))}
        </Box>
        <Button
          onClick={handleHomeClick}
          size='small'
          sx={{
            color: 'primary.light',
            backgroundColor: 'primary.main',
            width: '100%',
            display: {
              lg: 'none'
            },
            '&:hover': {
              color: 'primary.main',
              backgroundColor: 'primary.light'
            }
          }}
        >
          <Typography fontSize='large' fontWeight='bold'>
            {t('homeText')}
          </Typography>
        </Button>
      </Stack>
    </Grid>
  )
}
