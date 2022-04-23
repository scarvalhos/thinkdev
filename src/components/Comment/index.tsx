import {
    Box,
    Typography,
} from '@mui/material';

import { useAuth } from "../../contexts/AuthContext";

import { CommentPopover } from './CommentPopover';

type CommentProps = {
    content: string;
    id: number;
    user_id: number;
    postId: number;
}

export function Comment({ content, user_id, postId, id }: CommentProps) {
    const { user } = useAuth()

    return (
        <Box
            sx={{
                padding: '1rem 3rem 1rem 1rem',
                backgroundColor: 'primary.dark',
                borderRadius: '5px',
                position: 'relative',
            }}
        >
            <Typography
                component="p"
                fontSize="0.9rem"
            >
                {content}
            </Typography>
        
            {user?.id === user_id && (
                <CommentPopover postId={postId} id={id} />
            )}
        </Box>
    )
}
