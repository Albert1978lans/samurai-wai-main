import s from "./Users.module.css";
import userPhoto from "../../assets/images/User.png";
import React from "react";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";


type UserPropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}


export const User = (props: UserPropsType) => {
    const {user} = props
    return <>
        <div key={user.id} className={s.wrapper}>
            <div className={s.imageButton}>
                <div className={s.foto}>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small !== null ? user.photos.small : userPhoto} alt=""/>
                    </NavLink>
                </div>

                {user.followed
                    ? <button
                        disabled={props.followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            props.unfollow(user.id)
                        }}
                    >
                        UNFOLLOW
                    </button>
                    : <button
                        disabled={props.followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            props.follow(user.id)
                        }}
                    >
                        FOLLOW
                    </button>
                }
            </div>
            <div className={s.description}>
                <div className={s.wrapper_name_status}>
                    <div className={s.name}>{user.name}</div>
                    <div className={s.status}>{user.status}</div>
                </div>
                <div className={s.location}>
                    <div>{'user.location.country'}</div>
                    <div>{'user.location.city'}</div>
                </div>
                <div></div>
            </div>
        </div>
    </>

}