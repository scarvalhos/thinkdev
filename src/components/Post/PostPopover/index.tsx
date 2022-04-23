import { useState } from 'react';

import Popover from '@mui/material/Popover';
import { Box, IconButton, Stack } from '@mui/material';
import { Delete, Edit, MoreVert } from '@mui/icons-material';

import { usePosts } from '../../../contexts/PostsContext';

import { EditPostModal } from '../EditPostModal';

interface PostPopoverProps {
    id: number;
}

export function PostPopover({ id }: PostPopoverProps) {
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
            top: 2,
            right: 0,
        }}
    >
        <IconButton aria-describedby={idPopover} onClick={handleClick}>
            <MoreVert />
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
                />
            </Stack>
        </Popover>
    </Box>
  );
}
