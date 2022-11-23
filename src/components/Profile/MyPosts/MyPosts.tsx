
import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {PostItemType, ProfileStateType} from "../../../redux/state";

type MyPostsPropsType = {
    stateMyPosts: ProfileStateType,
    addPost: ()=>void,
    changeTextarea: (text: string) => void
}


export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    let postsElements = props.stateMyPosts.posts.map(p => <Post key={p.id} message={p.message} count={p.likesCount}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const buttonAddPost = () => {
        props.addPost()
    }

    const onChangeTextarea = () => {
        let text = newPostElement.current?.value
        if (text)  {props.changeTextarea(text)}
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
                <button onClick={buttonAddPost}>AddPost</button>
            </div>
            {postsElements}
        </div>
    )
}