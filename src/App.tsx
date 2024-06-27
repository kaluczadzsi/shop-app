import i18next from '@/i18n/i18n'
import { createTheme, CssBaseline, PaletteMode, ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Layout } from './pages/Layout'
import { useAppSelector } from './store/hooks'
import { customTheme } from './themes/customTheme'
import { ErrorSnackbar } from './components/ErrorSnackbar/ErrorSnackbar'

export const App = () => {
  const themePalette = useAppSelector((state) => state.theme.theme) as PaletteMode
  const theme = createTheme(customTheme(themePalette))
  const { user } = useAppSelector((state) => state.currentUser)

  useEffect(() => {
    if (!user?.lang) {
      return
    }

    i18next.changeLanguage(user.lang)
  }, [user?.lang])

  return (
    <I18nextProvider i18n={i18next}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout />
        <ErrorSnackbar />
      </ThemeProvider>
    </I18nextProvider>
  )
}
