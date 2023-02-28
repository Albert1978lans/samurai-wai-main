
import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {
     addPostActionCreator, changeTextareaActionCreator
} from "../../../redux/profile-reducer";
import {ActionsTypes, ProfileStateType} from "../../../redux/store";

type MyPostsPropsType = {
    stateMyPosts: ProfileStateType,
    dispatch: (action: ActionsTypes)=>void
}



export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    let postsElements = props.stateMyPosts.posts.map(p => <Post key={p.id} message={p.message} count={p.likesCount}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        props.dispatch(addPostActionCreator())
    }

    const onChangeTextarea = () => {
        debugger
        let text = newPostElement.current?.value
        if (text)  {
            props.dispatch(changeTextareaActionCreator(text))
        }
    }


    return (
        <div className={s.myPosts}>
            <h3>My post</h3>
            <div>
                <textarea
                    value={props.stateMyPosts.valueTextarea}
                    ref={newPostElement}
                    onChange={onChangeTextarea}
                >

                </textarea>
            </div>
            <div>
                <button onClick={addPost}>AddPost</button>
            </div>
            {postsElements}
        </div>
    )
}