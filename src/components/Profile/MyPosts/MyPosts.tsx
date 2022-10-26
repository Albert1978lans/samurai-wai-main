
import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {ProfileStateType} from "../../../redux/state";

type MyPostsPropsType = ProfileStateType


export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} count={p.likesCount}/>)

    return (
        <div className={s.myPosts}>
            <h3>My post</h3>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>AddPost</button>
            </div>
            {postsElements}
        </div>
    )
}