import { Avatar, Box, Container, Stack, Typography } from '@mui/material'

import { Header } from "../components/Header"
import { Post } from '../components/Post'
import { useAuth } from "../contexts/AuthContext"
import { usePosts } from '../contexts/PostsContext'

export default function Profile() {
    const { user } = useAuth()
    const { posts } = usePosts()

    const userPosts = posts?.filter((post) => post.user_id === user?.id)

    return (
        <>
            <Header />
            <Box
                sx={{
                    width: '100%',
                    height: '120px',
                    backgroundColor: 'primary.main',
                }}
            />
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    marginTop: '-2rem',
                }}
            >
                <Avatar sx={{ width: 140, height: 140, }} />

                <Stack
                    spacing={0.25}
                    marginBottom={3}
                    marginLeft={2}
                >
                    <Typography
                        fontWeight={600}
                        fontSize="1.75rem"
                    >
                        {user?.name}
                    </Typography>
                    <Typography
                        variant='body2'
                        color="primary.contrastText"
                    >
                        @{user?.username}
                    </Typography>
                </Stack>
            </Container>
            <Container
                maxWidth="sm"
                sx={{ padding: '3rem 0' }}
            >
                <Typography
                    variant="h5"
                    component="h5"
                    fontWeight={600}
                >
                    Publicações
                </Typography>

                <Stack
                    marginTop={4}
                    spacing={2}
                >
                    {userPosts?.map(post => {
                        return (
                            <Post
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                content={post.content}
                                user_id={post.user_id}
                                comments={post.comments}
                            />
                            )
                        }).reverse()}
                </Stack>
            </Container>
        </>
    )
}
