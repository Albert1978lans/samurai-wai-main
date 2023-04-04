import {connect} from "react-redux";
import {AppsStateType} from "../../redux/redux-store";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unFollowAC,
    UserType
} from "../../redux/users-reducer";
import {Dispatch} from "redux";
import {initialStateType} from "../../redux/users-reducer";
import React from "react";
import axios from "axios";
import {UsersNew} from "./UsersNew";

class UsersCompContainer extends React.Component<initialStateType & mapDispatchToPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                // this.props.setTotalUsersCount(response.data.totalCount)
                console.log(response.data.totalCount)
            })
    }


    changeFollow = (id: number, folloved: boolean) => {
        (folloved ? this.props.unFollow(id) : this.props.follow(id))
    }

    changeCurrentPage = (numberPage: number) => {
        this.props.setCurrentPage(numberPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${numberPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                // this.props.setTotalUsersCount(response.data.totalCount)
            })
    }


    render() {
            return (
                <>
                    <UsersNew
                        totalUsersCount = {this.props.totalUsersCount}
                        pageSize = {this.props.pageSize}
                        currentPage = {this.props.currentPage}
                        changeCurrentPage = {this.changeCurrentPage}
                        users = {this.props.users}
                        changeFollow = {this.changeFollow}
                    />
                </>
                )
    }
}

export type mapDispatchToPropsType = {
    follow: (id: number) => void
    unFollow: (id: number) => void
    setUsers: (newUsers: Array<UserType>) => void
    setCurrentPage: (numberPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}

const mapStateToProps = (state: AppsStateType): initialStateType => {
    return {
        users: state.usersState.users,
        currentPage: state.usersState.currentPage,
        pageSize: state.usersState.pageSize,
        totalUsersCount: state.usersState.totalUsersCount
    }
}


const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {

    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId: number) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (newUsers: Array<UserType>) => {
            dispatch(setUsersAC(newUsers))
        },
        setCurrentPage: (numberPage) => {
            dispatch(setCurrentPageAC(numberPage))
        },
        setTotalUsersCount: (totalUsersCount) => {
            dispatch(setTotalUsersCountAC(totalUsersCount))
        }
    }
}


export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersCompContainer)