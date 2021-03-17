import React from 'react';
import dva, {connect} from 'dva';
import axios from "axios";


const app = dva();


app.model({
    namespace: 'model',
    state: {
        status: '',
        data: []
    },
    effects: {
        * globalAsync(action, {takeEvery}) {
            yield takeEvery("REQUEST_POSTS", this.getAsync)
        },
        * getAsync(action, {call, put}) {
            yield put({type: "pending"})
            try {
                const payload = yield call(() => axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=5`).then(res => res.data))
                yield put({type: "success", payload})
            } catch (e) {
                yield put({type: "error"})
            }
        },
    },
    reducers: {
        pending(state) {
            return {...state, status: 'pending'}
        },
        success(state, {payload: data}) {
            return {...state, status: 'success', data}
        },
        error(state) {
            return {...state, status: 'error'}
        },
    },
});


const App = connect((state) => ({
    state
}))(function (props) {
    console.log(props)
    return (
        <div>
            <h2>Test</h2>
            <button onClick={() => props.dispatch({type: "REQUEST_POSTS"})}>Test</button>
        </div>
    );
});


app.router(() => <App/>);


app.start('#root');
