import {AppStateType} from "./redux-store";
import {UserType} from "./users-reducer";
import {createSelector} from "reselect";

export const getUsers = (state:AppStateType): Array<UserType> => {
    return state.usersState.users
}

export const getUsersNoReselect = (state:AppStateType): Array<UserType> => {
    return getUsers(state).filter(u => true)
}

export const getUsersWithReselect = createSelector(getUsers, (users) => {
    return users.filter(u => true)
})


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
