import { clearCartThunk } from '@/features/cart/clearCartThunk'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DeleteConditionalDialog } from '../Dialog/DeleteConditionalDialog'
import { DeleteType } from '../Dialog/types'

export const SummaryBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { totalPrice } = useAppSelector((state) => state.cart)

  const handleClear = () => {
    dispatch(clearCartThunk())
  }

  return (
    <Stack
      role='list'
      position='sticky'
      bottom={0}
      boxShadow={3}
      width='100%'
      padding={2}
      direction='row'
      justifyContent='space-between'
      alignItems='center'
    >
      <Button onClick={() => setIsOpen(true)} sx={{ color: 'teritary.light' }}>
        {t('clearCartText')}
      </Button>
      <Stack direction='row' gap={1}>
        <Typography>{t('total')}: </Typography>
        <Typography fontWeight='medium'>${totalPrice}</Typography>
      </Stack>
      <DeleteConditionalDialog type={DeleteType.All} isOpen={isOpen} setIsOpen={setIsOpen} handleDelete={handleClear} />
    </Stack>
  )
}
