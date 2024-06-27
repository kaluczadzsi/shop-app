import { InputPassword, InputText, Title } from '@/components/Form'
import { CustomFormControl, FormBox, FormButton } from '@/components/Form/Form.styled'
import { User } from '@/components/types'
import { LOGIN_VALUES, ROUTES } from '@/constants'
import { postUserThunk } from '@/features/currentUser/postUserThunk'
import { setError } from '@/features/error/errorSlice'
import { useAppDispatch } from '@/store/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { schema } from './schema'

export const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { control, handleSubmit, reset } = useForm({
    defaultValues: LOGIN_VALUES,
    resolver: yupResolver(schema)
  })

  const onSubmitHandler = async (user: User) => {
    reset()

    try {
      await dispatch(postUserThunk({ url: '/login', user }))
    } catch (err) {
      dispatch(setError(t('invalidEmailOrPassText')))
    }
  }

  return (
    <Box flexGrow={1} p={2}>
      <FormBox onSubmit={handleSubmit(onSubmitHandler)}>
        <CustomFormControl>
          <Title title={t('loginText')} description={t('loginDescription')} />
          <InputText control={control} name='email' label={t('emailLabel')} />
          <InputPassword control={control} name='password' label={t('passwordLabel')} />
          <FormButton type='submit'>{t('loginText')}</FormButton>
          <Button
            onClick={() => navigate(ROUTES.signup)}
            color='inherit'
            sx={{
              textDecoration: 'none',
              padding: '12px 30px',
              borderRadius: '50px',
              fontSize: 'small',
              fontWeight: 400,
              '&:hover': {
                background: 'transparent'
              }
            }}
          >
            {t('signUpText')}
          </Button>
        </CustomFormControl>
      </FormBox>
    </Box>
  )
}
