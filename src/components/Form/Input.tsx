import { TextField } from '@mui/material';

import { forwardRef, ForwardRefRenderFunction, useState } from 'react'

import { FieldError } from 'react-hook-form'

interface InputProps {
    type: string;
    name?: string;
    label?: string;
    error?: FieldError;
    className?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({ name, label, className, type, error = null, ...rest }, ref) => {
    return (
      <TextField
        id={`${name} ${'outlined-basic'}`}
        type={type}
        name={name}
        ref={ref}
        variant="outlined"
        label={label}
        fullWidth
        error={!!error}
        color="primary"
        { ...rest }
      />
    )
} 

export const Input = forwardRef(InputBase)