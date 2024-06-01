import {ResponseType, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {AxiosResponse} from "axios";
import {updateObjectInArrayMy} from "../utils/object-helpers";


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
const FAKE = 'FAKE'

export type UserType = {
    id: number
    imageUrl: string
    followed: boolean
    status: string
    name: string
    photos: {
        large: string | null
        small: string | null
    }
    location: {
        country: string
        city: string
    }
}
export type initialStateType = {
    users: Array<UserType>
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type followACType = {
    type: typeof FOLLOW,
    id: number
}
type unFollowACType = {
    type: typeof UNFOLLOW,
    id: number
}
type setUsersACType = {
    type: typeof SET_USERS,
    newUsers: Array<UserType>
    totalCount: number
}

type setCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE,
    numberPage: number
}

type totalUsersCountACType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}

type toggleIsFetchingACType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}

type toggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean
    userId: number
}

type fakeType = {
    type: typeof FAKE
}

export type UsersActionsType = followACType
    | unFollowACType
    | setUsersACType
    | setCurrentPageACType
    | totalUsersCountACType
    | toggleIsFetchingACType
    | toggleFollowingProgressType
    | fakeType

const initialState: initialStateType = {
    users: [],
    currentPage: 1,
    pageSize: 5,
    totalUsersCount: 100,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state: initialStateType = initialState, actions: UsersActionsType): initialStateType => {

    switch (actions.type) {

        case FOLLOW:
            return {
                ...state,
                // users: state.users.map((u => u.id === actions.id ? {...u, followed: true} : u))
                users: updateObjectInArrayMy(state.users, actions.id, {followed: true})
            }

        case UNFOLLOW:
            return {
                ...state,
                // users: state.users.map((u => u.id === actions.id ? {...u, followed: false} : u))
                users: updateObjectInArrayMy(state.users, actions.id, {followed: false})
            }

        case SET_USERS:
            return {
                ...state,
                users: actions.newUsers,
                totalUsersCount: actions.totalCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: actions.numberPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: actions.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: actions.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: actions.isFetching
                    ? [...state.followingInProgress, actions.userId]
                    : state.followingInProgress.filter(id => id != actions.userId)
            }

        default:
            return state
    }
}


export const followSuccess = (userId: number): followACType => {
    return {
        type: FOLLOW,
        id: userId
    }
}

export const unFollowSuccess = (userId: number): unFollowACType => {
    return {
        type: UNFOLLOW,
        id: userId
    }
}

export const setUsers = (newUsers: Array<UserType>, totalCount: number): setUsersACType => {
    return {
        type: SET_USERS,
        newUsers: newUsers,
        totalCount
    }
}

export const setCurrentPage = (numberPage: number): setCurrentPageACType => {
    return {
        type: SET_CURRENT_PAGE,
        numberPage
    }
}

export const setTotalUsersCount = (totalUsersCount: number): totalUsersCountACType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    }

}

export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingACType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgressType => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
}

// THUNK

export const requestUsers = (currentPage: number, pageSize: number) => {

    return async (dispatch: Dispatch) => {

        dispatch(toggleIsFetching(true))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items, data.totalCount))
    }
}

const followUnfollowFlow = async (dispatch: Dispatch,
                                  userId: number,
                                  apiMethod: (userId: number) => Promise<AxiosResponse<ResponseType>> ,
                                  actionCreator: (userId: number) => followACType | unFollowACType ) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const unFollow = (userId: number) => async (dispatch: Dispatch) => {

    followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unFollowSuccess)
    // dispatch(toggleFollowingProgress(true, userId))
    // let response = await usersAPI.unfollowUser(userId)
    //
    // if (response.data.resultCode == 0) {
    //     dispatch(unFollowSuccess(userId))
    // }
    // dispatch(toggleFollowingProgress(false, userId))

}


export const follow = (userId: number) => async (dispatch: Dispatch) => {

    followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), followSuccess)
    // dispatch(toggleFollowingProgress(true, userId))
    // let response = await usersAPI.followUser(userId)
    // debugger
    // if (response.data.resultCode == 0) {
    //     dispatch(followSuccess(userId))
    // }
    // dispatch(toggleFollowingProgress(false, userId))

}


export default usersReducer