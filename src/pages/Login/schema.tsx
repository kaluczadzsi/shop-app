import * as yup from 'yup'
import { EMAIL_REGEX } from '@/constants'

export const schema = yup.object().shape({
  email: yup.string().trim().required('Email is a required field').matches(EMAIL_REGEX, 'Invalid email'),
  password: yup
    .string()
    .required('Password is a required field')
    .matches(/^(?=.*[a-z])/, ' Must contain one lowercase character')
    .matches(/^(?=.*[A-Z])/, '  Must Contain One Uppercase Character')
    .matches(/^(?=.*[0-9])/, '  Must Contain One Number Character')
    .matches(/^(?=.*[!@#\\$%\\^&\\*])/, '  Must Contain  One Special Case Character')
    .min(8, 'Password must be at least 8 characters')
})
