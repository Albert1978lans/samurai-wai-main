import React from "react";
import {
    addPostActionCreator, changeTextareaActionCreator
} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {StoreType} from "../../../redux/redux-store";

type MyPostsPropsType = {
    store: StoreType
}


export const MyPostsContainer: React.FC<MyPostsPropsType> = (props) => {

    let state = props.store.getState().profileState

    const addPost = () => {
        props.store.dispatch(addPostActionCreator())
    }

    const onChangeTextarea = (text: string) => {
        props.store.dispatch(changeTextareaActionCreator(text))

    }


    return <MyPosts
        posts={state.posts}
        valueTextarea={state.valueTextarea}
        addPost={addPost}
        upDateTextarea={onChangeTextarea}
    />
}