import { Avatar } from '@mui/material'
import { ProfileAvatarProps } from './types'

export const ProfileAvatar = ({ image, isInHeader }: ProfileAvatarProps) => {
  const avatarSize = isInHeader ? 28 : 150

  return (
    <Avatar
      src={image}
      alt='profile'
      sx={{
        position: 'relative',
        backgroundPosition: 'center',
        width: avatarSize,
        height: avatarSize,
        '&:hover': {
          opacity: 0.85
        }
      }}
    />
  )
}
