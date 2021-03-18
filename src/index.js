import React from 'react';
import dva, {connect} from 'dva';
import axios from "axios";
import {Button, Divider, List, Typography} from 'antd';
import 'antd/dist/antd.css';
import './index.css'


const PENDING = "PENDING"
const ERROR = "ERROR"
const SUCCESS = "SUCCESS"


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


const App = connect((state) => ({
    state
}))(function (props) {
    const {statusPosts, statusUsers, users, posts} = props.state.model
    return (
        <div>
            <Button
                type="primary"
                onClick={() => props.dispatch({type: "model/getAsync"})}
                disabled={statusPosts === PENDING || statusUsers === PENDING}
            >
                {
                    statusPosts === PENDING || statusUsers === PENDING ?
                        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"/>
                        :
                        "PRESS ME"
                }
            </Button>
            <Divider orientation="left">Posts: </Divider>
            <List
                bordered
                dataSource={posts}
                renderItem={item => (
                    <List.Item>
                        <Typography.Text mark>[Post title]</Typography.Text> {item.title}
                    </List.Item>
                )}
            />
            <Divider orientation="left">Users: </Divider>
            <List
                bordered
                dataSource={users}
                renderItem={item => (
                    <List.Item>
                        <Typography.Text mark>[Username]</Typography.Text> {item.name}
                    </List.Item>
                )}
            />
        </div>
    );
});


app.router(() => <App/>);


app.start('#root');
