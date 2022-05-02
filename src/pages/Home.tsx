import { Box, Container, Typography, Stack, useMediaQuery } from "@mui/material";

import { Header } from "../components/Header";
import { Post } from "../components/Post";
import { usePosts } from "../contexts/PostsContext";

export default function Home() {
    const { posts } = usePosts()

    const matches = useMediaQuery('(min-width:720px)');

    return (
        <>
            <Header />
            <Box >
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
                        Timeline
                    </Typography>

                    <Stack
                        marginTop={4}
                        spacing={2}
                    >
                        {posts?.map(post => {
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

            </Box>
        </>
    )
}

