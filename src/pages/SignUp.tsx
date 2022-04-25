import { useLocation, useNavigate } from 'react-router-dom'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Box, Stack, Button, Typography, Alert } from '@mui/material'

import { useAuth } from '../contexts/AuthContext';

import { Input } from '../components/Form/Input'

const signUpFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório!'),
  username: yup.string().required('Username obrigatório!'),
  password: yup.string().required('Senha obrigatória!'),
});

export default function SignUp() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signUpFormSchema)
    })
    const { errors } = formState;

    const { signUp } = useAuth()
    const navigate = useNavigate();
    const location: any = useLocation();
    
    const from = location.state?.from?.pathname || "/home";
    
    const handleSignUp: SubmitHandler<FieldValues> = async ({ name, username, password }) => {
        signUp({ name, username, password }, () => {
            navigate(from, { replace: true });
        });
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Box sx={{ width: '360px' }}>
                <Typography
                    variant="h1"
                    component="h1"
                    fontSize="3.25rem"
                    fontWeight={800}
                    color='primary.main'
                >
                    Sign up now
                </Typography>
                <form
                    onSubmit={handleSubmit(handleSignUp)}
                    style={{ marginTop: '2rem' }}
                >
                    <Stack spacing={2} flex={1}>
                        <Input
                            type='text'
                            label="Nome"
                            error={errors.name}
                            {...register("name")}
                        />
                        <Input
                            type='text'
                            label="Username"
                            error={errors.username}
                            {...register("username")}
                        />
                        <Input
                            type="password"
                            label="Senha"
                            error={errors.password}
                            {...register("password")}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                              textTransform: 'capitalize',
                              padding: 2,
                              fontWeight: 600,
                              color: 'primary.light',
                              '&:hover': {
                                backgroundColor: 'primary.main',
                                filter: 'brightness(0.8)'
                              },
                            }}
                        >
                            Cadastrar
                        </Button>
                        {errors.username || errors.password ? (
                            <Alert variant="filled" severity='error'>
                            Required fields are missing!
                            </Alert>
                        ) : ''}
                    </Stack>
                </form>
            </Box>
        </Box>
    )
}