import { useState } from 'react'
import { Button, useMediaQuery } from '@mui/material'
import { CreatePostModal } from '../CreatePostModal';

export function CreatePostButton() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const matches = useMediaQuery('(min-width:720px)');

    return (
        <>
            <Button
                sx={{
                    textTransform: "capitalize",
                    fontWeight: 600,
                    color: 'primary.main',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                    },
                }}
                onClick={handleOpen}
            >
                Criar novo post +
            </Button>
            <CreatePostModal open={open} handleClose={handleClose} />
        </>
    )
}
