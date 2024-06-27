import { PaletteMode } from '@mui/material'
import { grey } from '@mui/material/colors'

const lightPrimary = {
  light: '#D2E0FB',
  main: '#3f50b5',
  dark: '#002884',
  contrastText: '#fff'
}

const darkPrimary = {
  main: grey[900],
  light: '#fff',
  contrastText: '#fff'
}

const lightSecondary = {
  main: grey[800],
  light: '#5356FF',
  dark: '#002884',
  contrastText: '#fff'
}

const darkSecondary = {
  main: '#fff',
  light: '#5356FF',
  contrastText: '#fff'
}

export const customTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: mode === 'light' ? lightPrimary : darkPrimary,
    secondary: mode === 'light' ? lightSecondary : darkSecondary,
    tertiary: {
      main: mode === 'light' ? '#3f50b5' : '#fff',
      light: '#5356FF',
      contrastText: '#fff'
    }
  }
})
