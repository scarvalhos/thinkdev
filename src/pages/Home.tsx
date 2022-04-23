import { Box, Container, Typography, Stack } from "@mui/material";

import { Header } from "../components/Header";
import { Post } from "../components/Post";
import { usePosts } from "../contexts/PostsContext";

export default function Home() {
    const { posts } = usePosts()

    return (
        <>
            <Header />
            <Box sx={{ bgcolor: 'primary.dark', }}>
                <Container
                    maxWidth="sm"
                    sx={{ padding: '3rem 0' }}
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

