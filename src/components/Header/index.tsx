import { Stack, Typography, useMediaQuery } from '@mui/material'

import { NavMenu } from './NavMenu'
import AccountMenu from './AccountMenu';
import { CreatePostButton } from '../Post/CreatePostButton';
import { Link } from 'react-router-dom';

export function Header() {
    const matches = useMediaQuery('(min-width:720px)');

    return (
        <Stack
            flex={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                bgcolor: 'primary.light',
                padding: matches ? '0 4rem' : '0 2rem',
                height: '80px',
            }}
        >
            <Link to="/home" style={{ textDecoration: 'none' }}>
                <Typography
                    fontWeight={800}
                    fontSize='1.5rem'
                    color='primary.main'
                >
                    Think Dev
                </Typography>
            </Link>
            {matches && <NavMenu />}
            <Stack direction="row">
                <CreatePostButton />
                <AccountMenu />
            </Stack>
        </Stack>
    )
}
