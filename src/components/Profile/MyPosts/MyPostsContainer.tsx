import React from "react";
import {
    addPostAC, changeTextareaAC, PostType,
} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppsStateType} from "../../../redux/redux-store";

export type mapDispatchToPropsType = {
    addPost: () => void
    upDateTextarea: (text: string) => void
}

export type mapStateToPropsType = {
    posts: Array<PostType>
    valueTextarea: string
}

const mapStateToProps = (state: AppsStateType): mapStateToPropsType => {
    return {
        posts: state.profileState.posts,
        valueTextarea: state.profileState.valueTextarea,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        upDateTextarea: (text: string) => {
            dispatch(changeTextareaAC(text))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

