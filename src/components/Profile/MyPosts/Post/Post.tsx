import s from "./Post.module.css";
import React from "react";
// import './Post.module.css'

export const Post = () => {
    return (
        <div className={s.item}>
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAbQvowIqss8KDb8fH2YcQ2JLKdwQBI16CcQ&usqp=CAU'}/>
            Post1
        </div>
    )
}