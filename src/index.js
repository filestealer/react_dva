import React from 'react';
import dva, {connect} from 'dva';
import 'antd/dist/antd.css';
import './index.css'
import {AppConnect} from "./App";
import posts from "./models/postsModel";


export const PENDING = "PENDING"
export const ERROR = "ERROR"
export const SUCCESS = "SUCCESS"


const app = dva();


app.model(posts)


app.router(() => <AppConnect/>);


app.start('#root');
