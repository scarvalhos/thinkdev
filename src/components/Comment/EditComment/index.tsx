import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import {
    Box,
    Button,
    Modal,
    Stack,
    TextField,
    Alert
} from '@mui/material';

import * as yup from 'yup'

import { usePosts } from '../../../contexts/PostsContext';
import { yupResolver } from '@hookform/resolvers/yup';

interface EditPostModalProps {
    id: number;
    postId: number;
    open: boolean;
    handleClose: () => void;
}

const EditCommentSchema = yup.object().shape({
    content: yup.string().required('Conteúdo obrigatório!'),
});

export function EditCommentModal({ open, handleClose, postId, id }: EditPostModalProps) {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(EditCommentSchema)
    })
    const { errors } = formState

    const { updateComment } = usePosts()

    const handleEditComment: SubmitHandler<FieldValues> = async ({ content }) => {
        updateComment({
            post_id: postId,
            comment_id: id,
            comment: {
                content
            }
        })
        handleClose()
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.box}>
                    <Stack spacing={2} marginY={2}>
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
                            onClick={handleSubmit(handleEditComment)}
                            sx={{
                                textTransform: 'capitalize',
                                padding: 2,
                                fontWeight: 600,
                                color: 'primary.light',
                                '&:hover': {
                                    backgroundColor: 'primary.main'
                                }
                            }}
                        >
                            Editar comentário
                        </Button>
                        {errors.title || errors.content ? (
                            <Alert variant="filled" severity='error' >
                                Required fields are missing!
                            </Alert>
                        ) : ''}
                    </Stack>
                </Box>
            </Modal>
        </div>
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
    },
};