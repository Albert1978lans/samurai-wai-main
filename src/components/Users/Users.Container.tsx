import {connect} from "react-redux";
import {AppsStateType} from "../../redux/redux-store";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleFollowingProgress, toggleIsFetching,
    unFollow,
    UserType
} from "../../redux/users-reducer";
import {initialStateType} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {userAPI} from "../../api/api";

class UsersCompContainer extends React.Component<initialStateType & mapDispatchToPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        userAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            })
    }


    changeFollow = (id: number, followed: boolean) => {
        (followed ? this.props.unFollow(id) : this.props.follow(id))
    }

    changeCurrentPage = (numberPage: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(numberPage)

        userAPI.getUsers(numberPage, this.props.pageSize)
            .then(data => {
                this.props.setUsers(data.items)
                this.props.toggleIsFetching(false)
            })
    }


    render() {
            return (
                <>
                    <Users
                        totalUsersCount = {this.props.totalUsersCount}
                        pageSize = {this.props.pageSize}
                        currentPage = {this.props.currentPage}
                        changeCurrentPage = {this.changeCurrentPage}
                        users = {this.props.users}
                        changeFollow = {this.changeFollow}
                        isFetching={this.props.isFetching}
                        followingInProgress={this.props.followingInProgress}
                        toggleFollowingProgress={this.props.toggleFollowingProgress}
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
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
}

const mapStateToProps = (state: AppsStateType): initialStateType => {
    return {
        users: state.usersState.users,
        currentPage: state.usersState.currentPage,
        pageSize: state.usersState.pageSize,
        totalUsersCount: state.usersState.totalUsersCount,
        isFetching: state.usersState.isFetching,
        followingInProgress: state.usersState.followingInProgress
    }
}

export const UsersContainer = connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingProgress
})(UsersCompContainer)