import * as yup from 'yup'
import { EMAIL_REGEX, USERNAME_REGEX } from '@/constants'

export const schema = yup.object().shape({
  username: yup
    .string()
    .required('Username is a required field')
    .min(3, 'Username must be at least 3 characters')
    .matches(USERNAME_REGEX, 'First letter of username must be uppercase (only)'),
  email: yup
    .string()
    .trim()
    .required('Email is a required field')
    .email('Invalid email')
    .matches(EMAIL_REGEX, 'Invalid email'),
  password: yup
    .string()
    .required('Password is a required field')
    .matches(/^(?=.*[a-z])/, ' Must contain one lowercase character')
    .matches(/^(?=.*[A-Z])/, '  Must Contain One Uppercase Character')
    .matches(/^(?=.*[0-9])/, '  Must Contain One Number Character')
    .matches(/^(?=.*[!@#\\$%\\^&\\*])/, '  Must Contain  One Special Case Character')
    .min(8, 'Password must be at least 8 characters'),
  passwordConfirmation: yup
    .string()
    .required('Password is a required field')
    .oneOf([yup.ref('password')], 'Passwords must match')
})
