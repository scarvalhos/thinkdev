import { useState } from 'react';

import {
    Box,
    Stack,
    TextField,
    Typography,
    Button
} from '@mui/material';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { useAuth } from "../../contexts/AuthContext";
import { usePosts } from "../../contexts/PostsContext";

import { Comment } from "../Comment";
import { PostPopover } from './PostPopover';


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

const createCommentSchema = yup.object().shape({
    comment: yup.string().required('Campo obrigatório!'),
});

export function Post({ title, content, id, user_id, comments }: PostProps) {
    const [ seeComments, setSeeComments ] = useState('Ver comentários')

    const { user, users } = useAuth()
    const { createComment } = usePosts()

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(createCommentSchema)
    })
    
    const handleCreateComment: SubmitHandler<FieldValues> = async ({ comment }) => {
        createComment({ postId: id, content: comment })
        setSeeComments('Fechar comentários')
    }
    
    const handleSeeComments = () => {
        if(seeComments === 'Ver comentários') {
            setSeeComments('Fechar comentários')
        } else {
            setSeeComments('Ver comentários')
        }
    }

    const userPostCreate = users?.filter((user) => user.id === user_id)[0]

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
                    {comments !== undefined && comments.length > 0 ? (
                        <Box
                            margin="1.5rem 0 2rem"
                        >
                            <Button
                                sx={style.seeCommentsButton}
                                onClick={handleSeeComments}
                            >
                                {seeComments}
                            </Button>

                            {seeComments === 'Fechar comentários' && (
                                <Stack
                                    spacing={2}
                                >
                                    {comments.map(comment => {
                                        return (
                                            <Comment
                                                key={comment.id}
                                                id={comment.id}
                                                content={comment.content}
                                                user_id={user_id}
                                                postId={id}
                                            />
                                        )
                                    })}
                                </Stack>  
                            )}
                        </Box>
                    ) : (
                        <Button
                                sx={style.seeCommentsButton}
                                onClick={handleSeeComments}
                        >
                            Nenhum comentário
                        </Button>
                    )}

                    <Box>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Deixe um comentário..."
                            multiline
                            maxRows={4}
                            type="text"
                            variant="outlined"
                            fullWidth
                            sx={style.textarea}
                            {...register("comment")}
                        />
                        <Button
                            variant='contained'
                            sx={style.addCommentButton}
                            onClick={handleSubmit(handleCreateComment)}
                        >
                            Adicionar comentário
                        </Button>
                    </Box>
                    <PostPopover id={id} />
                </>
            )}
        </Box>
    )
}

const style = {
    box: {
        padding: '3rem 2.5rem 1rem',
        backgroundColor: 'primary.light',
        borderRadius: '10px',
        maxWidth: '620px',
        position: 'relative',
    },
    textarea: {
        background: 'primary.dark',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    addCommentButton: {
        color: 'primary.light',
        textTransform: "capitalize",
        fontWeight: 600,
        '&:hover': {
            backgroundColor: 'primary.main',
        },
    },
    seeCommentsButton: {
        textTransform: "capitalize",
        fontWeight: 600,
        fontSize: '0.9rem',
        color: 'primary.contrastText',
        '&:hover': {
            backgroundColor: 'primary.dark',
        },
    }
};
