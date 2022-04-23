import { useState } from 'react';

import Popover from '@mui/material/Popover';
import { Box, IconButton, Stack } from '@mui/material';
import { Delete, Edit, MoreVert } from '@mui/icons-material';

import { usePosts } from '../../../contexts/PostsContext';

import { EditCommentModal } from '../EditComment';

interface CommentPopoverProps {
    postId: number;
    id: number;
}

export function CommentPopover({ id, postId }: CommentPopoverProps) {
    const [openEditCommentModal, setOpenEditCommentModal] = useState(false);
    const handleOpenEditCommentModal = () => setOpenEditCommentModal(true);
    const handleCloseEditCommentModal = () => setOpenEditCommentModal(false);

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const openPopover = Boolean(anchorEl);
    const idPopover = openPopover ? 'simple-popover' : undefined;

    const { deleteComment } = usePosts()

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
                <IconButton onClick={() => deleteComment(postId, id)}>
                    <Delete sx={{ width: 16, height: 16, color: 'primary.contrastText' }} />
                </IconButton>
                <IconButton onClick={handleOpenEditCommentModal}>
                    <Edit sx={{ width: 16, height: 16, color: 'primary.contrastText' }} />
                </IconButton>
                <EditCommentModal
                    open={openEditCommentModal}
                    handleClose={handleCloseEditCommentModal}
                    id={id}
                    postId={postId}
                />
            </Stack>
        </Popover>
    </Box>
  );
}
