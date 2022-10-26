import s from "./Post.module.css";
import React from "react";

type PostPropsType = {
    message: string
    count: number
}

export const Post: React.FC<PostPropsType> = (props) => {
    return (
        <div className={s.item}>
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAbQvowIqss8KDb8fH2YcQ2JLKdwQBI16CcQ&usqp=CAU'} alt='avatar'/>
            {props.message}
            <div>{props.count}like</div>
        </div>
    )
}