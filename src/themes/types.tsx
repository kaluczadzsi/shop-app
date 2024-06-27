import { PaletteMode, Theme } from '@mui/material'

export interface ThemeContextProviderProps {
  children: React.ReactNode
}

export interface ThemeContextType {
  theme: Theme
  colorMode: { toggleColorMode: () => void }
  mode: PaletteMode
}
