const postsTypes = {
    get_posts_fetch: "posts/getPosts",
    get_posts_pending: "get_posts_pending",
    get_posts_success: "get_posts_success",
    get_posts_error: "get_posts_error"
}


export const postsActions = {
    getPostsFetching:()=>{
      return{
          type:postsTypes.get_posts_fetch
      }
    },
    getPostsPending: () => {
        return {
            type: postsTypes.get_posts_pending
        }
    },
    getPostsSuccess: (posts) => {
        return {
            type: postsTypes.get_posts_success,
            payload:posts
        }
    },
    getPostsError: () => {
        return {
            type: postsTypes.get_posts_error
        }
    }
}