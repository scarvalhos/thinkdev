import { Link, useLocation, useNavigate } from 'react-router-dom'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Box, Stack, Button, Typography, Alert } from '@mui/material'

import { useAuth } from '../contexts/AuthContext'
import { Input } from '../components/Form/Input'

const signInFormSchema = yup.object().shape({
  username: yup.string().required('Username obrigatório!'),
  password: yup.string().required('Senha obrigatória!'),
});

export default function Login() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  const { errors } = formState

  const { signIn } = useAuth()
  const navigate = useNavigate();
  const location: any = useLocation();

  const from = location.state?.from?.pathname || "/"

  const handleSignIn: SubmitHandler<FieldValues> = async ({ username, password }) => {
    signIn({ username, password }, () => {
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
        <Box sx={{
          width: '360px',
        }}>
          <Stack justifyContent='center' alignItems='center' marginBottom={4}>
            <Typography
                variant="subtitle1"
                component="span"
                fontSize='1.25rem'
                marginBottom='-10px'
            >
              Welcome to
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              fontSize="4rem"
              fontWeight={800}
              color='primary.main'
            >
              Think Dev
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit(handleSignIn)} style={{ marginBottom: '1rem' }}>
            <Stack spacing={2} flex={1}>
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
                Entrar
              </Button>
              {errors.username || errors.password ? (
                <Alert variant="filled" severity='error'>
                  Required fields are missing!
                </Alert>
              ) : ''}
            </Stack>
          </form>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Typography
              fontSize="0.8rem"
              fontWeight={400}
              color='primary.contrastText'
            >
              Don't have an account? Register now
            </Typography>
          </Link>
        </Box>
      </Box>
  )
}
