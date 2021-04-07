import {postsTypes} from "./postsTypes";

export const postsActions = {
    getPostsPending: () => {
        return {
            type: postsTypes.GET_POSTS_PENDING
        }
    },
    getPostsSuccess: (posts) => {
        return {
            type: postsTypes.GET_POSTS_SUCCESS,
            payload:posts
        }
    },
    getPostsError: () => {
        return {
            type: postsTypes.GET_POSTS_ERROR
        }
    }
}