import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { InputProps } from './types'

export const InputText = ({ name, control, label }: InputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size='medium'
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant='outlined'
          inputProps={{ maxLength: 32 }}
        />
      )}
    />
  )
}
