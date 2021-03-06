import { useState } from 'react';

import { Box, IconButton, Stack, Popover } from '@mui/material';
import { Delete, Edit, MoreVert } from '@mui/icons-material';

import { usePosts } from '../../../contexts/PostsContext';

import { EditPostModal } from '../EditPostModal';

interface PostPopoverProps {
    id: number;
    title: string;
    content: string;
}

export function PostPopover({ id, content, title }: PostPopoverProps) {
    const [openEditPostModal, setOpenEditPostModal] = useState(false);
    const handleOpenEditPostModal = () => setOpenEditPostModal(true);
    const handleCloseEditPostModal = () => setOpenEditPostModal(false);

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const openPopover = Boolean(anchorEl);
    const idPopover = openPopover ? 'simple-popover' : undefined;

    const { deletePost } = usePosts()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


  return (
    <Box
        sx={{
            position: 'absolute' as 'absolute',
            top: 5,
            right: 5,
        }}
    >
        <IconButton aria-describedby={idPopover} onClick={handleClick}>
            <MoreVert sx={{ color: 'secondary.dark' }} />
        </IconButton>

        <Popover
            id={idPopover}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Stack padding={1}>
                <IconButton onClick={() => deletePost(id)}>
                    <Delete sx={{ width: 16, height: 16, color: 'primary.contrastText' }} />
                </IconButton>
                <IconButton onClick={handleOpenEditPostModal}>
                    <Edit sx={{ width: 16, height: 16, color: 'primary.contrastText' }} />
                </IconButton>
                <EditPostModal
                    open={openEditPostModal}
                    handleClose={handleCloseEditPostModal}
                    id={id}
                    title={title}
                    content={content}
                />
            </Stack>
        </Popover>
    </Box>
  );
}
