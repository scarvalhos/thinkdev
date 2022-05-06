import {
    Box,
    Typography,
} from '@mui/material';


import { useAuth } from "../../contexts/AuthContext";

import { Comment } from "../Comment";
import { PostPopover } from './PostPopover';
import { CommentsArea } from '../Comment/CommentsArea';


type Comment = {
    content: string;
    id: number;
    user_id: number;
}

interface PostProps {
    id: number;
    user_id: number;
    title: string;
    content: string;
    comments?: Comment[];
}

export function Post({ title, content, id, user_id, comments }: PostProps) {
    const { user, users } = useAuth()

    const userPostCreate = users.filter((user) => user.id === user_id)[0]

    return (
        <Box sx={style.box}>
            <Box>
                <Typography
                    component="p"
                    color="primary.contrastText"
                    fontSize=".9rem"
                    position="absolute"
                    top="1.5rem"
                    left="2.5rem"
                >
                    @{userPostCreate?.username}
                </Typography>
            </Box>
            <Typography
                component="strong"
                fontWeight={600}
                fontSize='1.25rem'
            >
                {title}
            </Typography>
            <Typography
                component="p"
                fontSize="0.9rem"
                marginY={2}
            >
                {content}
            </Typography>


            {user?.id === user_id && (
                <>
                    <CommentsArea user_id={user_id} comments={comments} id={id} />
                    <PostPopover id={id} title={title} content={content} />
                </>
            )}
        </Box>
    )
}

const style = {
    box: {
        padding: '3rem 2.5rem 1.5rem',
        backgroundColor: 'primary.light',
        borderRadius: '10px',
        maxWidth: '620px',
        position: 'relative',
    },
};
