
import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {PostItemType, ProfileStateType} from "../../../redux/state";

type MyPostsPropsType = {
    posts: Array<PostItemType>,
    addPost: (text: string)=>void
}


export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} count={p.likesCount}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const buttonAddPost = () => {
        let text = newPostElement.current?.value
        if (text) {
            props.addPost(text)
        }
        if (newPostElement.current?.value) {
            newPostElement.current.value = ''
        }


    }


    return (
        <div className={s.myPosts}>
            <h3>My post</h3>
            <div>
                <textarea  ref={newPostElement}></textarea>
            </div>
            <div>
                <button onClick={buttonAddPost}>AddPost</button>
            </div>
            {postsElements}
        </div>
    )
}