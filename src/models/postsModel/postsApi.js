import axios from "axios";

export const postsApi = {
    getPostsApi: async () => {
        return await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5').then(res => res.data)
    }
}