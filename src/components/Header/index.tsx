import { useState } from 'react'
import { Stack, Typography, Button } from '@mui/material'

import { CreatePostModal } from '../Post/CreatePostModal'
import { NavMenu } from './NavMenu'
import AccountMenu from './AccountMenu';

export function Header() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Stack
            flex={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                bgcolor: 'primary.light',
                padding: '0 4rem',
                height: '80px',
            }}
        >
            <Typography
                fontWeight={800}
                fontSize='1.5rem'
                color='primary.main'
            >
                Think Dev
            </Typography>

            <NavMenu />

            <Stack direction="row">
                <Button
                    sx={{
                        textTransform: "capitalize",
                        fontWeight: 600,
                        color: 'primary.main',
                    }}
                    onClick={handleOpen}
                >
                    Criar novo post +
                </Button>
                <CreatePostModal open={open} handleClose={handleClose} />
                <AccountMenu />
            </Stack>
        </Stack>
    )
}
