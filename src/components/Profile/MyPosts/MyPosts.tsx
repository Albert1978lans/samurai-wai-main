
import React from "react";
import './MyPosts.module.css'
import {Post} from "./Post/Post";

export const MyPosts = () => {
    return (
        <div>
            My post
            <textarea></textarea>
            <button>AddPost</button>
            <Post message="Hi, hou are you" count={5}/>
            <Post message="It's my first post" count={3}/>
        </div>
    )
}