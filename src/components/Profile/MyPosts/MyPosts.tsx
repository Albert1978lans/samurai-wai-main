
import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {mapDispatchToPropsType, mapStateToPropsType} from "./MyPostsContainer";

type MyPostsPropsType = mapStateToPropsType & mapDispatchToPropsType

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

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