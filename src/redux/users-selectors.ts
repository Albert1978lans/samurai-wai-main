import {AppStateType} from "./redux-store";
import {UserType} from "./users-reducer";

export const getUsers = (state:AppStateType): Array<UserType> => {
    return state.usersState.users
}

export const getCurrentPage = (state:AppStateType): number => {
    return state.usersState.currentPage
}

export const getPageSize = (state:AppStateType): number => {
    return state.usersState.pageSize
}

export const getTotalUserCount = (state:AppStateType): number => {
    return state.usersState.totalUsersCount
}

export const getIsFetching = (state:AppStateType): boolean => {
    return state.usersState.isFetching
}

export const getFollowingInProgress = (state:AppStateType): number[] => {
    return state.usersState.followingInProgress
}
