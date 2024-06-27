import { Control } from 'react-hook-form'

export interface FormTitleProps {
  title: string
  description: string
}

export interface InputFieldValues {
  email: string
  password: string
  passwordConfirmation: string
}

export interface InputProps {
  name: string
  label: string
  control?: Control<any>
}
