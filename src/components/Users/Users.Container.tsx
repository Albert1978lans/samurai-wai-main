import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    follow, requestUsers,
    setCurrentPage,toggleFollowingProgress,
    unFollow
} from "../../redux/users-reducer";
import {initialStateType} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {withAuthRedirect} from "../../hok/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUserCount,
    getUsers
} from "../../redux/users-selectors";

class UsersCompContainer extends React.Component<initialStateType & mapDispatchToPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    changeCurrentPage = (numberPage: number) => {
        this.props.setCurrentPage(numberPage)
        this.props.getUsers(numberPage, this.props.pageSize)
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
                        isFetching={this.props.isFetching}
                        followingInProgress={this.props.followingInProgress}
                        toggleFollowingProgress={this.props.toggleFollowingProgress}
                        follow={this.props.follow}
                        unfollow={this.props.unFollow}
                    />
                </>
                )
    }
}

export type mapDispatchToPropsType = {
    follow: (id: number) => void
    unFollow: (id: number) => void
    setCurrentPage: (numberPage: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

// const mapStateToProps = (state: AppStateType): initialStateType => {
//     return {
//         users: state.usersState.users,
//         currentPage: state.usersState.currentPage,
//         pageSize: state.usersState.pageSize,
//         totalUsersCount: state.usersState.totalUsersCount,
//         isFetching: state.usersState.isFetching,
//         followingInProgress: state.usersState.followingInProgress
//     }
// }

const mapStateToProps = (state: AppStateType): initialStateType => {
    return {
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUserCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {
        follow,
        unFollow,
        setCurrentPage,
        toggleFollowingProgress,
        getUsers: requestUsers
    })
)(UsersCompContainer)

