import {connect} from "dva";
import {Button, Divider, List, Typography} from "antd";
import React from "react";
import {PENDING} from "./index";
import {postsActions} from "./models/postsModel/postsActions";


const App = (props) => {
    const {posts, postsStatus} = props.state.posts
    const {dispatch} = props
    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    dispatch(postsActions.getPostsFetching())
                }}
                disabled={postsStatus === PENDING }
            >
                {
                    postsStatus === PENDING  ?
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
        </div>
    );
}


export const AppConnect = connect((state) => ({state}))(App);
