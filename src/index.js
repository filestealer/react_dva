import React from 'react';
import dva, {connect} from 'dva';
import axios from "axios";
import {Button, Divider, List, Typography} from 'antd';
import 'antd/dist/antd.css';
import './index.css'
import {AppConnect} from "./App";


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
    effects: {
        * getAsync(action, {call, put}) {
            yield put({type: "pendingPosts"})
            yield put({type: "pendingUsers"})
            try {
                const payload_posts = yield call(() => axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=5`).then(res => res.data))
                const payload_users = yield call(() => axios.get(`https://jsonplaceholder.typicode.com/users?_limit=3`).then(res => res.data))
                yield put({type: "successPosts", payload: payload_posts})
                yield put({type: "successUsers", payload: payload_users})
            } catch (e) {
                yield put({type: "errorPosts"})
                yield put({type: "errorUsers"})
            }
        },
    },
    reducers: {
        pendingPosts(state) {
            return {...state, statusPosts: PENDING}
        },
        successPosts(state, {payload}) {
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
});





app.router(() => <AppConnect/>);


app.start('#root');
