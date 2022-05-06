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
    const { user, users } = useAuth()

    // const userPostCreate = users.filter((user) => user.id === user_id)[0]
    
    return (
        <Box
            sx={{
                padding: '1rem 3rem 1rem 1rem',
                backgroundColor: 'primary.dark',
                borderRadius: '5px',
                position: 'relative',
            }}
        >
            {/* <Typography
                component="p"
                variant='subtitle2'
                color="primary.contrastText"
                fontSize="0.75rem"  
            >
                06 de Maio de 2022
            </Typography> */}
            <Typography
                component="p"
                fontSize="0.9rem"
            >
                {content}
            </Typography>
        
            {user?.id === user_id && (
                <CommentPopover postId={postId} id={id} content={content} />
            )}
        </Box>
    )
}
