import React from "react";
import s from './Profile.module.css'

const Profile = () => {
    return (
        <div className={s.content}>
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVI0Cqa5bYHtHDE5-fVDxVeGtZV6anu8qVzw&usqp=CAU" alt="image"/>
            </div>
            <div>
                ava + description
            </div>
            <div>
                My post
                <div>
                    New post
                </div>
                <div>
                    Post1
                </div>
                <div className={s.item}>
                    Post2
                </div>
                <div className={s.item}>
                    Post3
                </div>
            </div>
        </div>
    )
}

export default Profile