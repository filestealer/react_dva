import {PENDING, SUCCESS, ERROR} from "../globalStatuses";
import {postsActions} from "./postsActions";
import {postsApi} from "./postsApi";

const posts = {
    namespace: 'posts',
    state: {
        posts: [],
        postsStatus: ''
    },
    reducers: {
        get_posts_pending(state) {
            return {
                ...state,
                postsStatus: PENDING
            }
        },
        get_posts_success(state, {payload}) {
            return {
                ...state,
                posts: payload,
                postsStatus: SUCCESS
            }
        },
        get_posts_error(state) {
            return {
                ...state,
                postsStatus: ERROR
            }
        }
    },
    effects: {
        * getPosts(action, {put, call}) {
            yield put(postsActions.getPostsPending())
            try {
                const posts = yield call(postsApi.getPostsApi)
                yield put(postsActions.getPostsSuccess(posts))
            } catch (e) {
                yield put(postsActions.getPostsError())
            }
        }
    }
}

export default posts