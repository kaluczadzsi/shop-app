import { updateUserImageThunk } from '@/features/currentUser/updateUserImageThunk'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect, useRef } from 'react'

export const useProfileImage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { user } = useAppSelector((state) => state.currentUser)
  const dispatch = useAppDispatch()

  const image = user?.image || '/avatars/anonym.jpg'

  useEffect(() => {
    const storedUser = localStorage.getItem('user')

    if (storedUser && user) {
      dispatch(updateUserImageThunk({ user, image }))
    }
  }, [])

  const handleImageClick = () => {
    inputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onloadend = () => {
        const base64String = reader.result as string

        if (user && typeof image === 'string') {
          dispatch(updateUserImageThunk({ user, image: base64String }))
        }
      }
    }
  }

  return {
    inputRef,
    image,
    handleImageClick,
    handleImageChange
  }
}
