
import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {PostItemType} from "../../../redux/store";

type MyPostsPropsType = {
    posts: Array<PostItemType>
    valueTextarea: string
    addPost: () => void
    upDateTextarea: (text: string) => void
}



export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
// debugger
    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} count={p.likesCount}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        props.addPost()
    }

    const onChangeTextarea = () => {
        let text = newPostElement.current?.value
        if (text)  {
            props.upDateTextarea(text)
        }
    }


    return (
        <div className={s.myPosts}>
            <h3>My post</h3>
            <div>
                <textarea
                    value={props.valueTextarea}
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