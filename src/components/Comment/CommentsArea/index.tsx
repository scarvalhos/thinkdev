import { useState, useRef } from 'react';

import { Box, Button, Portal, TextField, Stack, Typography, useTheme, styled } from '@mui/material';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { Comment } from '..';

import { useAuth } from '../../../contexts/AuthContext';
import { usePosts } from '../../../contexts/PostsContext';

type Comment = {
    content: string;
    id: number;
    user_id: number;
}

interface CommentsAreaProps {
    id: number;
    user_id: number;
    comments?: Comment[];
}

const createCommentSchema = yup.object().shape({
    comment: yup.string().required('Campo obrigatório!'),
});

export function CommentsArea({ user_id, comments, id }: CommentsAreaProps) {
    const { user } = useAuth()
    const { createComment } = usePosts()

    const [show, setShow] = useState(false)
    const container = useRef(null)

    const { register, handleSubmit, reset } = useForm({
        resolver: yupResolver(createCommentSchema)
    })

    const handleClick = () => {
        setShow(!show)
    };

    const handleCreateComment: SubmitHandler<FieldValues> = async ({ comment }) => {
        createComment({ postId: id, content: comment })
        reset()
    }

    const { palette } = useTheme()

    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
          color: palette.primary.main,
        },
        '& .MuiOutlinedInput-root': {
            background: palette.primary.dark,
          '& fieldset': {
            borderColor: palette.primary.dark,
          },
          '&:hover fieldset': {
            borderColor: palette.primary.dark,
          },
          '&.Mui-focused fieldset': {
            borderColor: palette.primary.main,
          },
        },
    })

    return (
        <div>
            <Box>
                {show ? (
                    <Portal container={container.current}>
                        <Stack spacing="6px">
                            {!comments || comments.length ? (
                                <Typography variant="subtitle2" color="primary.contrastText">
                                    Comentários:
                                </Typography>
                            ) : ''}
                            {!comments || comments.length ? comments?.map(comment => {
                                return (
                                    <Comment
                                        key={comment.id}
                                        id={comment.id}
                                        content={comment.content}
                                        user_id={user_id}
                                        postId={id}
                                    />
                                )
                            }) : ''}
                        </Stack>

                        <Stack spacing="6px" sx={{ my: 3 }}>
                            <Typography variant="subtitle2" color="primary.contrastText">
                                Novo Comentário:
                            </Typography>
                            <Box>
                                <CssTextField
                                    id="outlined-multiline-flexible"
                                    multiline
                                    maxRows={5}
                                    type="text"
                                    fullWidth
                                    sx={{ mb: '10px' }}
                                    {...register("comment")}
                                />
                                <Button
                                    fullWidth
                                    variant='contained'
                                    sx={style.addCommentButton}
                                    onClick={handleSubmit(handleCreateComment)}
                                >
                                    Adicionar comentário
                                </Button>
                            </Box>

                        </Stack>
                    </Portal>
                ) : null}
            </Box>
            <Box ref={container} />
            <Button
                onClick={handleClick}
                type="button"
                variant='text'
                color="inherit"
                sx={{
                    color: 'primary.main',
                    textTransform: "capitalize",
                    fontWeight: 600,
                    p: 0,
                    '&:hover': {
                        backgroundColor: 'transparent',
                        filter: 'brightness(0.9)'
                    },
                    '&:active': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                {show ? 'Fechar' : 'Comentários'}
            </Button>
        </div>
    );
}

const style = {
    addCommentButton: {
        color: 'primary.light',
        textTransform: "capitalize",
        fontWeight: 600,
        '&:hover': {
            backgroundColor: 'primary.main',
        },
    },
};
