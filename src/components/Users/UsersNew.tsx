import s from "./Users.module.css";
import userPhoto from "../../assets/images/User.png";
import React from "react";
import {UserType} from "../../redux/users-reducer";
import {Preloader} from "../common/Preloader/Preloader";


type UsersNewPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    changeCurrentPage: (p: number) => void
    users: Array<UserType>
    changeFollow: (id: number, folloved: boolean) => void
    isFetching: boolean
}


export const UsersNew = (props: UsersNewPropsType) => {

    let arrPages = []

    let numberOfPages = Math.ceil(props.totalUsersCount / props.pageSize)

    for (let i = 1; i <= numberOfPages; i++) {
        arrPages.push(i)
    }

    let pages = arrPages.map(p => {

        const finalSpanClass = s.pages + ' ' + (props.currentPage === p ? s.selected : '')

        return <span
            key={p}
            className={finalSpanClass}
            onClick={() => props.changeCurrentPage(p)}
        >
                {p}
            </span>
    })

    return (
        <>
            {props.isFetching ? <Preloader/> : null}
            <div className={s.listPages}>{pages}</div>
            {props.users.map((u) => {
                return (
                    <div key={u.id} className={s.wrapper}>
                        <div className={s.imageButton}>
                            <div className={s.foto}>
                                <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt=""/>
                            </div>

                            <button onClick={() => props.changeFollow(u.id, u.folloved)}>
                                {u.folloved ? 'UNFOLLOW' : 'FOLLOW'}
                            </button>
                        </div>
                        <div className={s.description}>
                            <div className={s.wrapper_name_status}>
                                <div className={s.name}>{u.name}</div>
                                <div className={s.status}>{u.status}</div>
                            </div>
                            <div className={s.location}>
                                <div>{'u.location.country'}</div>
                                <div>{'u.location.city'}</div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}