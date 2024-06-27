import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { Controller } from 'react-hook-form'
import { InputProps } from './types'

export const InputPassword = ({ name, control, label }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl variant='outlined'>
          <TextField
            type={showPassword ? 'text' : 'password'}
            fullWidth
            onChange={onChange}
            error={!!error}
            value={value}
            helperText={error ? error.message : null}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            label={label}
          />
        </FormControl>
      )}
    />
  )
}
