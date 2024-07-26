import { useProfileImage } from '@/hooks/useProfileImage'
import { ChangeCircle } from '@mui/icons-material'
import { Box, Input, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ProfileAvatar } from '../ProfileAvatar/ProfileAvatar'

export const ProfileImage = () => {
  const { inputRef, image, handleImageClick, handleImageChange } = useProfileImage()
  const { t } = useTranslation()
  const theme = useTheme()
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Stack onClick={handleImageClick} flexDirection='column' alignItems='center' justifyContent='center'>
      <Tooltip title={t('changeProfilePicture')} placement={isSmUp ? 'right-start' : 'top'}>
        <Box
          position='relative'
          display='inline-block'
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s ease-out',
            '&:hover': {
              '& .MuiSvgIcon-root': {
                transform: 'scale(1.3)',
                animation: 'rotate 2s infinite linear'
              }
            }
          }}
        >
          <ProfileAvatar image={image} />
          <ChangeCircle
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: theme.palette.primary.main,
              fontSize: '2rem',
              color: 'white',
              borderRadius: '100%',
              cursor: 'pointer'
            }}
          />
        </Box>
      </Tooltip>
      <Input
        type='file'
        inputRef={inputRef}
        onChange={handleImageChange}
        sx={{ position: 'absolute', left: 0, top: 0, visibility: 'hidden' }}
      />
    </Stack>
  )
}
