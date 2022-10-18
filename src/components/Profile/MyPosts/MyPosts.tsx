import s from "../Profile.module.css";
import React from "react";
import './MyPosts.module.css'
import {Post} from "./Post/Post";

export const MyPosts = () => {
    return (
        <div>
            My post
            <textarea></textarea>
            <button>AddPost</button>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    )
}