import { setValue } from '@/features/search/searchSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import SearchIcon from '@mui/icons-material/Search'
import { alpha, Box, Stack, useTheme } from '@mui/material'
import InputBase from '@mui/material/InputBase'
import { ChangeEvent, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'

export const SearchBar = () => {
  const { t } = useTranslation()
  const inputValue = useAppSelector((state) => state.search.inputValue)
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const location = useLocation()

  useEffect(() => {
    dispatch(setValue(''))
  }, [location])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setValue(e.target.value))
  }

  return (
    <Box
      position='relative'
      borderRadius='4px'
      marginRight={theme.spacing(2)}
      marginLeft={0}
      width='100%'
      sx={{
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25)
        },
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto'
        }
      }}
    >
      <Stack
        justifyContent='center'
        alignItems='center'
        padding={theme.spacing(0, 2)}
        position='absolute'
        height='100%'
        sx={{
          pointerEvents: 'none'
        }}
      >
        <SearchIcon />
      </Stack>
      <InputBase
        onChange={handleInputChange}
        value={inputValue}
        placeholder={t('searchPlaceholder')}
        inputProps={{ 'aria-label': 'search' }}
        sx={{
          color: 'inherit',
          padding: theme.spacing(1, 1, 1, 0),
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '16rem'
          }
        }}
      />
    </Box>
  )
}
