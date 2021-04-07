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
        GET_POSTS_PENDING(state) {
            return {
                ...state,
                postsStatus: PENDING
            }
        },
        GET_POSTS_SUCCESS(state, {payload}) {
            return {
                ...state,
                posts: payload,
                postsStatus: SUCCESS
            }
        },
        GET_POSTS_ERROR(state) {
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
                const posts = yield call(postsApi.getPostsApi())
                yield put(postsActions.getPostsSuccess(posts))
            } catch (e) {
                yield put(postsActions.getPostsError())
            }
        }
    }
}

export default posts