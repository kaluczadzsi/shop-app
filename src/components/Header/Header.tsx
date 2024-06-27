import { toggleTheme } from '@/features/theme/themeSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Box, IconButton } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useHeaderController } from '../../hooks/useHeaderController'
import { TemporaryDrawer as Drawer } from '../Drawer/TemporaryDrawer'
import { Logo } from './Logo'
import { NavMenu } from './NavMenu'
import { SearchBar } from './SearchBar'

export const Header = () => {
  const { anchorEl, isOpen, handleClick, handleClose } = useHeaderController()
  const theme = useAppSelector((state) => state.theme.theme)
  const dispatch = useAppDispatch()

  return (
    <AppBar position='sticky'>
      <Toolbar disableGutters sx={{ p: '1rem' }}>
        <Box data-testid='drawer' sx={{ display: { xs: 'block', lg: 'none' } }}>
          <Drawer />
        </Box>
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Logo />
        </Box>

        <SearchBar />

        <Box>
          <IconButton aria-label='theme-toggle-button' onClick={() => dispatch(toggleTheme())} color='inherit'>
            {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        <NavMenu handleClick={handleClick} anchorEl={anchorEl} handleClose={handleClose} isOpen={isOpen} />
      </Toolbar>
    </AppBar>
  )
}
