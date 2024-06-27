import { LANGUAGES } from '@/constants/languages'
import { updateUserLangThunk } from '@/features/currentUser/updateUserLangThunk'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Language } from '@mui/icons-material'
import { Box, Button, Menu, MenuItem, Tooltip } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function LanguageMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { user } = useAppSelector((state) => state.currentUser)
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (lang: string) => {
    if (user) {
      dispatch(updateUserLangThunk({ user, lang }))
    } else {
      i18n.changeLanguage(lang)
    }

    handleClose()
  }

  return (
    <Box>
      <Button
        sx={{ color: '#fff', minWidth: '0' }}
        id='language-button'
        aria-controls={open ? 'language-menu' : undefined}
        aria-label='language-button'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Tooltip title={i18n.language.toUpperCase()}>
          <Language sx={{ fontSize: '28px' }} />
        </Tooltip>
      </Button>

      <Menu
        id='language-menu'
        aria-labelledby='language-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        {LANGUAGES.map((lng) => (
          <MenuItem key={lng} onClick={() => handleLanguageChange(lng)}>
            {lng.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
