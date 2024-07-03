import { ExpandLess } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { ScrollToTopProps } from './types'

export const Scroll = ({ showBelow }: ScrollToTopProps) => {
  const [show, setShow] = useState(!showBelow)

  const handleScroll = () => {
    if (window.scrollY > showBelow) {
      if (!show) setShow(true)
    } else setShow(false)
  }

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (showBelow) {
      window.addEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box right={16} bottom={16} zIndex={2} position='fixed'>
      {show && (
        <IconButton
          onClick={handleClick}
          sx={{
            backgroundColor: 'primary.light',
            '&:hover': {
              backgroundColor: 'primary.light'
            }
          }}
        >
          <ExpandLess
            sx={{
              color: 'primary.main'
            }}
          />
        </IconButton>
      )}
    </Box>
  )
}
