import {
    createContext,
    useEffect,
    useState,
    useContext
} from "react";

import { toast } from "react-toastify";

import { api } from "../services/api";

type Comment = {
    content: string;
    id: number;
    user_id: number;
}

type Post = {
    id: number;
    title: string;
    content: string;
    user_id: number;
    comments?: Comment[];
}

type UpdatePostCredencials = {
    id: number;
    title: string;
    content: string;
}

type UpdateCommentCredencials = {
    post_id: number,
    comment_id: number,
    comment: {
        content: string
    }
}

type creteCommentCredentials = {
    postId: number;
    content: string;
}

type PostsContextType = {
    posts: Post[] | null;
    getAllPosts: () => Promise<void>;
    createPost: (title: string, content: string) => Promise<void>;
    deletePost: (postId: number) => Promise<void>;
    updatePost: (post: UpdatePostCredencials) => Promise<void>;
    createComment: (creteCommentCredentials: creteCommentCredentials) => Promise<void>;
    deleteComment: (post_id: number, comment_id: number) => Promise<void>;
    updateComment: ({ post_id, comment_id, comment }: UpdateCommentCredencials) => Promise<void>;
}

export const PostsContext = createContext({} as PostsContextType);

export function PostsProvider({children}: any) {
    const [posts, setPosts] = useState<Post[] | null>(null);

    const getAllPosts = async () => {
        try {
            const { data }: any = await api.get('/posts', {})

            if(data) {
                setPosts(data)
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getAllPosts()
    }, [])

    const createPost = async (title: string, content: string) => {
        try {
            const response = await api.post('/posts/create', { title, content })

            if(response) {
                getAllPosts()
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const deletePost = async (postId: number) => {
        try {
            const response = await api.delete('/posts/remove', { post_id: postId })

            if(response) {
                getAllPosts()
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const updatePost = async ({ id, title, content }: UpdatePostCredencials) => {
        try {
            const response = await  api.put('/posts/update', { post_id: id, post: { title, content } })

            if(response) {
                getAllPosts()  
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const createComment = async ({ postId, content }: creteCommentCredentials) => {
        try {
            const response = await api.post('/comments/create', { post_id: postId, comment: { content } })

            if(response) {
                getAllPosts()
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const deleteComment = async (post_id: number, comment_id: number) => {
        try {
            const response = await api.delete('/comments/remove', { post_id, comment_id })

            if(response) {
                getAllPosts()
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const updateComment = async ({ post_id, comment, comment_id }: UpdateCommentCredencials) => {
        try {
            const response = await api.put('/comments/update', { post_id, comment_id, comment: { content: comment.content } })

            if(response) {
                getAllPosts()
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <PostsContext.Provider value={{
            posts,
            getAllPosts,
            createPost,
            deletePost,
            updatePost,
            createComment,
            deleteComment,
            updateComment,
        }}>
            { children }
        </PostsContext.Provider>
    )
}

export function usePosts() {
    return useContext(PostsContext)
}    