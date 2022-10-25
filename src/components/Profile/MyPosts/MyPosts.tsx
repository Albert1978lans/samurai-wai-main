
import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";

type PostType = {
    id: number,
    message: string,
    likesCount: number
}

export const MyPosts = () => {
    let  posts: Array<PostType> = [
        {id: 1, message: 'Hi, hou are you', likesCount: 5},
        {id: 2, message: 'It\'s my first post', likesCount: 17},
    ]

    let postsElements = posts.map(p => <Post message={p.message} count={p.likesCount}/>)

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