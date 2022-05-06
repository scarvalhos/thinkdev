import { useState } from 'react';

import { Box, IconButton, Stack, Popover } from '@mui/material';
import { Delete, Edit, MoreVert } from '@mui/icons-material';

import { usePosts } from '../../../contexts/PostsContext';

import { EditCommentModal } from '../EditComment';

interface CommentPopoverProps {
    postId: number;
    id: number;
    content: string;
}

export function CommentPopover({ id, postId, content }: CommentPopoverProps) {
    const [openEditCommentModal, setOpenEditCommentModal] = useState(false);
    const handleOpenEditCommentModal = () => setOpenEditCommentModal(true);
    const handleCloseEditCommentModal = () => {
        setOpenEditCommentModal(false);
    }

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
                    content={content}
                />
            </Stack>
        </Popover>
    </Box>
  );
}
