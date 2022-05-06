import { forwardRef, ForwardRefRenderFunction } from 'react'

import { TextField } from '@mui/material';

import { FieldError } from 'react-hook-form'

interface InputProps {
    type: string;
    name?: string;
    label?: string;
    error?: FieldError;
    className?: string;
    defaultValue?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({ name, label, className, type, error = null, defaultValue, ...rest }, ref) => {
    return (
      <TextField
        id={`${name} ${'outlined-basic'}`}
        type={type}
        name={name}
        ref={ref}
        variant="outlined"
        label={label}
        fullWidth
        defaultValue={defaultValue}
        error={!!error}
        color="primary"
        { ...rest }
      />
    )
} 

export const Input = forwardRef(InputBase)