import {
    Box,
    Button,
    Typography,
    Modal,
    Stack,
    TextField,
    Alert
} from '@mui/material';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { usePosts } from '../../../contexts/PostsContext';

import { Input } from '../../Form/Input';

interface CreatePostModalProps {
    open: boolean;
    handleClose: () => void;
}

const createPostSchema = yup.object().shape({
    title: yup.string().required('Título obrigatório!'),
    content: yup.string().required('Conteúdo obrigatório!'),
});

export function CreatePostModal({ open, handleClose }: CreatePostModalProps) {
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(createPostSchema)
    })
    const { errors } = formState

    const { createPost } = usePosts()

    const handleCreatePost: SubmitHandler<FieldValues> = async ({ title, content }) => {
        createPost(title, content)
        reset()
        handleClose()
    }

    return (
        <Modal
            open={open}
            onClose={() => {
                reset()
                handleClose()
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style.box}>
                <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    color="primary.main"
                >
                    Novo Post
                </Typography>
                <Stack spacing={2} marginY={2}>
                    <Input
                        type='text'
                        label="Título"
                        error={errors.title}
                        {...register("title")}

                    />

                    <TextField
                        id="outlined-multiline-flexible"
                        label="Conteúdo"
                        multiline
                        maxRows={4}
                        type="text"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        error={errors.content}
                        {...register("content")}
                    />
                    <Button
                        fullWidth
                        variant='contained'
                        onClick={handleSubmit(handleCreatePost)}
                        sx={{
                            textTransform: 'capitalize',
                            padding: 2,
                            fontWeight: 600,
                            color: 'primary.light',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                            },
                        }}
                    >
                        Criar novo post
                    </Button>
                    {errors.title || errors.content ? (
                        <Alert variant="filled" severity='error' >
                            Required fields are missing!
                        </Alert>
                    ) : ''}
                </Stack>
            </Box>
        </Modal>
    );
}

const style = {
    box: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 5,
        p: 6,
        borderRadius: '10px',
    },
};
