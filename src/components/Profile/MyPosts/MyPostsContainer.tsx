import React from "react";
import {
    addPostAC, PostType,
} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../../redux/redux-store";

export type mapDispatchToPropsType = {
    addPost: (newPost: string) => void
}

export type mapStateToPropsType = {
    posts: Array<PostType>
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        posts: state.profileState.posts,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addPost: (newPost) => {
            dispatch(addPostAC(newPost))
        },
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

