import { IMAGES, ROUTES } from '@/constants'
import { Box, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { DiscountStrip, DiscountText, SliderImg, SpecialOffersButton } from './Slider.styled'

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderImages = [IMAGES.xboxcontroller, IMAGES.hatchet, IMAGES.chair]
  const { t } = useTranslation()

  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box height='25rem' position='relative'>
      <Stack
        height='100%'
        position='relative'
        overflow='hidden'
        boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px'
        borderRadius='4px'
      >
        {sliderImages.map((image, index) => (
          <SliderImg key={image} src={image} alt='Discounted product image' isVisible={index === currentSlide} />
        ))}

        <Stack
          justifyContent='center'
          alignItems='center'
          position='absolute'
          top={0}
          left={0}
          width='100%'
          height='100%'
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          <DiscountText>{t('sliderText')}</DiscountText>
        </Stack>

        <DiscountStrip>{t('discount')}</DiscountStrip>
        <SpecialOffersButton onClick={() => navigate(ROUTES.special)}>{t('sliderButtonText')}</SpecialOffersButton>
      </Stack>
    </Box>
  )
}
