import React from "react";
import {
    addPostActionCreator, changeTextareaActionCreator
} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import StoreContext from "../../../StoreContext";




export const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {

                    const state = store.getState()

                    const addPost = () => {
                        store.dispatch(addPostActionCreator())
                    }

                    const onChangeTextarea = (text: string) => {
                        store.dispatch(changeTextareaActionCreator(text))

                    }
                    return (
                        <MyPosts
                            posts={state.profileState.posts}
                            valueTextarea={state.profileState.valueTextarea}
                            addPost={addPost}
                            upDateTextarea={onChangeTextarea}
                        />
                    )
                }
            }
        </StoreContext.Consumer>
    )
}

