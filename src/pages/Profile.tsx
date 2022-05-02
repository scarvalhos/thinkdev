import { Avatar, Box, Container, Stack, Typography, useMediaQuery } from '@mui/material'

import { useAuth } from "../contexts/AuthContext"
import { usePosts } from '../contexts/PostsContext'

import { Header } from "../components/Header"
import { Post } from '../components/Post'

import { useSwitchTheme } from '../contexts/ThemeContext'

export default function Profile() {
    const { user } = useAuth()
    const { posts } = usePosts()
    const { theme } = useSwitchTheme()

    const userPosts = posts?.filter((post) => post.user_id === user?.id)

    const matches = useMediaQuery('(min-width:720px)');

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
                    px: matches ? 'auto' : '2rem'
                }}
            >
                <Avatar sx={{ width: '7rem', height: '7rem', background: theme.palette.secondary.dark }} />

                <Stack
                    spacing={0.25}
                    marginBottom={3}
                    marginLeft={2}
                    mt={5}
                >
                    <Typography
                        fontWeight={600}
                        fontSize={matches ? "1.75rem" : "1rem"}
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
                sx={{
                    padding: matches ? '3rem 0' : '3rem 2rem',
                }}
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
