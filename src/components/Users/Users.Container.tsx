import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {
    follow, requestUsers,
    unFollow, UserType, actions
} from "../../redux/users-reducer";

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
    getUsersWithReselect
} from "../../redux/users-selectors";

const {setCurrentPage, toggleFollowingProgress} = actions

export type mapDispatchToPropsType = {
    follow: (id: number) => void
    unFollow: (id: number) => void
    setCurrentPage: (numberPage: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type mapStateToPropsType = {
    users: Array<UserType>
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = mapStateToPropsType & mapDispatchToPropsType & OwnPropsType

class UsersCompContainer extends React.Component<PropsType> {

    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }
    changeCurrentPage = (numberPage: number) => {
        const {pageSize} = this.props
        this.props.setCurrentPage(numberPage)
        this.props.getUsers(numberPage, pageSize)
    }


    render() {
            return (
                <>
                    <h1>{this.props.pageTitle}</h1>
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


const mapStateToProps = (state: RootState): mapStateToPropsType => {
    return {
        users: getUsersWithReselect(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUserCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    // <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
    connect<mapStateToPropsType, mapDispatchToPropsType, OwnPropsType, RootState>(mapStateToProps, {
        follow,
        unFollow,
        setCurrentPage,
        toggleFollowingProgress,
        getUsers: requestUsers
    })
)(UsersCompContainer)



