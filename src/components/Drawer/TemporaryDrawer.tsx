import MenuIcon from '@mui/icons-material/Menu'
import { Box, Drawer, IconButton, Tooltip } from '@mui/material'
import { useState } from 'react'
import { Categories } from '../Categories/Categories'

export const TemporaryDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsOpen(newOpen)
  }

  return (
    <Box>
      <IconButton onClick={toggleDrawer(true)} size='large' edge='start' color='inherit' aria-label='open drawer'>
        <Tooltip title='Categories'>
          <MenuIcon sx={{ fontSize: '1.75rem' }} />
        </Tooltip>
      </IconButton>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        <Categories onClick={toggleDrawer(false)} />
      </Drawer>
    </Box>
  )
}
