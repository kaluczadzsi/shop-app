import { InputPassword, InputText, Title } from '@/components/Form'
import { CustomFormControl, FormBox, FormButton, FormButtonLogin } from '@/components/Form/Form.styled'
import { User } from '@/components/types'
import { ROUTES, SIGN_UP_VALUES } from '@/constants'
import { DEFAULT_LANGUAGE } from '@/constants/languages'
import { postUserThunk } from '@/features/currentUser/postUserThunk'
import { setError } from '@/features/error/errorSlice'
import { fetchUsers } from '@/features/user/fetchUsers'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { schema } from './schema'

export const SignUp = () => {
  const { users } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { control, handleSubmit, reset } = useForm({
    defaultValues: SIGN_UP_VALUES,
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const onSubmitHandler = async (user: User) => {
    reset()

    const isEmailTaken = users.some((currentUser: User) => currentUser.email === user.email)

    if (isEmailTaken) {
      dispatch(setError(t('signUpEmailIsAlreadyUsedText')))
    } else {
      dispatch(
        postUserThunk({
          user: { username: user.username, email: user.email, password: user.password, lang: DEFAULT_LANGUAGE }
        })
      )
    }
  }

  return (
    <Box flexGrow={1} p={2}>
      <FormBox onSubmit={handleSubmit(onSubmitHandler)}>
        <CustomFormControl>
          <Title title={t('signUpText')} description={t('signUpDescription')} />
          <InputText control={control} name='username' label={t('signUpUsernameLabel')} />
          <InputText control={control} name='email' label={t('emailLabel')} />
          <InputPassword control={control} name='password' label={t('passwordLabel')} />
          <InputPassword control={control} name='passwordConfirmation' label={t('passwordLabel')} />
          <FormButton type='submit'>{t('signUpCreateAccBtnText')}</FormButton>
          <Typography fontSize='small'>
            {t('signUpAlreadyText')}{' '}
            <FormButtonLogin onClick={() => navigate(ROUTES.login)}>{t('loginText')}</FormButtonLogin>
          </Typography>
        </CustomFormControl>
      </FormBox>
    </Box>
  )
}
