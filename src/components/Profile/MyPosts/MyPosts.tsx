
import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";

export const MyPosts = () => {
    return (
        <div className={s.myPosts}>
            <h3>My post</h3>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>AddPost</button>
            </div>
            <Post message="Hi, hou are you" count={5}/>
            <Post message="It's my first post" count={3}/>
        </div>
    )
}