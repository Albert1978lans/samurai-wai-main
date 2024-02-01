
import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {mapDispatchToPropsType, mapStateToPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type postFormDataType = {
    post: string
}

type MyPostsPropsType = mapStateToPropsType & mapDispatchToPropsType

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} count={p.likesCount}/>)

    const addPost = (newPost: postFormDataType) => {
        props.addPost(newPost.post)
    }
    return (
        <div className={s.myPosts}>
            <MyPostsReduxForm onSubmit={addPost}/>
            {postsElements}
        </div>
    )
}

let MyPostsForm = (props: InjectedFormProps<postFormDataType>) => {
    const { pristine, submitting, handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="post" component="textarea" type="text"/>
            </div>
            <button type="submit" disabled={pristine || submitting}>AddPost</button>
        </form>
    )
}


const MyPostsReduxForm = reduxForm<postFormDataType>({
    form: 'post'
})(MyPostsForm)