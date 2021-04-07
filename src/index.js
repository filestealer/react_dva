import React from 'react';
import dva, {connect} from 'dva';
import 'antd/dist/antd.css';
import './index.css'
import {AppConnect} from "./App";
import posts from "./models/postsModel/posts";


export const PENDING = "PENDING"
export const ERROR = "ERROR"
export const SUCCESS = "SUCCESS"


const app = dva();

app.model({
    namespace: 'model',
    state: {
        statusPosts: '',
        posts: [],
        users: [],
        statusUsers: ''
    },
    reducers: {
        pendingPosts(state) {
            return {...state, statusPosts: PENDING}
        },
        successPosts(state, action) {
            const {payload} = action
            return {...state, statusPosts: SUCCESS, posts: payload}
        },
        errorPosts(state) {
            return {...state, statusPosts: ERROR}
        },
        pendingUsers(state) {
            return {...state, statusUsers: PENDING}
        },
        successUsers(state, {payload}) {
            return {...state, statusUsers: SUCCESS, users: payload}
        },
        errorUsers(state) {
            return {...state, statusUsers: ERROR}
        }
    },
    effects: {
        * getAsync(action, {call, put, select}) {

            yield put({type: "pendingPosts"})
            yield put({type: "pendingUsers"})
            try {
                const payload_posts = yield call(() => axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=5`).then(res => res.data))
                const payload_users = yield call(() => axios.get(`https://jsonplaceholder.typicode.com/users?_limit=3`).then(res => res.data))
                yield put({type: "successPosts", payload: payload_posts})
                yield put({type: "successUsers", payload: payload_users})
            } catch (e) {
                console.log(e)
                yield put({type: "errorPosts"})
                yield put({type: "errorUsers"})
            } finally {
                const posts = yield select(state => state.model.posts);
            }
        },
    },
});


app.router(() => <AppConnect/>);


app.start('#root');
