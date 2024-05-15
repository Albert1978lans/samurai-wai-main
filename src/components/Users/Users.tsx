import s from "./Users.module.css";
import React from "react";
import {UserType} from "../../redux/users-reducer";
import {Preloader} from "../common/Preloader/Preloader";
import {Paginator} from "../../components/common/Paginator/Paginator";
import {User} from "./User";


type UsersNewPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    changeCurrentPage: (p: number) => void
    users: Array<UserType>
    isFetching: boolean
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}


export const Users = (props: UsersNewPropsType) => {

    return (
        <>
            {props.isFetching ? <Preloader/> : null}

            <div className={s.listPages}>
                <Paginator
                    totalUsersCount={props.totalUsersCount}
                    pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    changeCurrentPage={props.changeCurrentPage}
                />
            </div>

            {props.users.map((u) => {
                return (
                    <User
                        key={u.id}
                        user={u}
                        followingInProgress={props.followingInProgress}
                        follow={props.follow}
                        unfollow={props.unfollow}
                    />
                )
            })}
        </>
    )
}