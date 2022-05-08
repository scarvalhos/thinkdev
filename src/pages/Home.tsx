import { Helmet } from "react-helmet"

import { Box, Container, Typography, Stack, useMediaQuery } from "@mui/material"

import { Header } from "../components/Header"
import { Post } from "../components/Post"
import { CreatePostButton } from "../components/Post/CreatePostButton"
import { usePosts } from "../contexts/PostsContext"

export default function Home() {
    const { posts } = usePosts()

    const matches = useMediaQuery('(min-width:720px)');

    return (
        <>
            <Helmet>
                <title>Home - Thinkdev</title>
                <meta name="description" content="Home - Thinkdev" />
            </Helmet>
            <Header />
            <Box >
                <Container
                    maxWidth="sm"
                    sx={{
                        padding: matches ? '3rem 0' : '3rem 2rem',
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="space-between"
                    >
                        <Typography variant="h5" component="h5" fontWeight={600}>
                            Timeline
                        </Typography>
                        <CreatePostButton />
                    </Stack>

                    <Stack
                        marginTop={4}
                        spacing={2}
                    >
                        {posts?.length || !posts ? posts?.map(post => {
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
                        }).reverse() : (
                            <Typography variant="subtitle1" color="primary.contrastText">
                                Nenhum post por enquanto
                            </Typography>
                        )}
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

