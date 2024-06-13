import {ResponseType, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {AxiosResponse} from "axios";
import {updateObjectInArrayMy} from "../utils/object-helpers";
import {AppThunk, InferActionsType} from "./redux-store";

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

export type UsersActionsType = InferActionsType<typeof actions>

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

        case "FOLLOW":
            return {
                ...state,
                // users: state.users.map((u => u.id === actions.id ? {...u, followed: true} : u))
                users: updateObjectInArrayMy(state.users, actions.id, {followed: true})
            }

        case "UNFOLLOW":
            return {
                ...state,
                // users: state.users.map((u => u.id === actions.id ? {...u, followed: false} : u))
                users: updateObjectInArrayMy(state.users, actions.id, {followed: false})
            }

        case "SET_USERS":
            return {
                ...state,
                users: actions.newUsers,
                totalUsersCount: actions.totalCount
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: actions.numberPage
            }
        case "SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCount: actions.totalUsersCount
            }
        case "TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: actions.isFetching
            }
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
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

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', id: userId} as const),

    unFollowSuccess: (userId: number) => ({type: 'UNFOLLOW', id: userId} as const),

    setUsers: (newUsers: Array<UserType>, totalCount: number) => ({type: 'SET_USERS', newUsers: newUsers, totalCount} as const),

    setCurrentPage: (numberPage: number) => ({type: 'SET_CURRENT_PAGE', numberPage} as const),

    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount } as const),

    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),

    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
}




// THUNK

export const requestUsers = (currentPage: number, pageSize: number): AppThunk => {

    return async (dispatch) => {

        dispatch(actions.toggleIsFetching(true))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items, data.totalCount))
    }
}

const followUnfollowFlow = async (dispatch: Dispatch,
                                  userId: number,
                                  apiMethod: (userId: number) => Promise<AxiosResponse<ResponseType>> ,
                                  actionCreator: (userId: number) => UsersActionsType ) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const unFollow = (userId: number): AppThunk => async (dispatch) => {

    followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), actions.unFollowSuccess)
    // dispatch(toggleFollowingProgress(true, userId))
    // let response = await usersAPI.unfollowUser(userId)
    //
    // if (response.data.resultCode == 0) {
    //     dispatch(unFollowSuccess(userId))
    // }
    // dispatch(toggleFollowingProgress(false, userId))

}


export const follow = (userId: number): AppThunk => async (dispatch) => {

    followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), actions.followSuccess)
    // dispatch(toggleFollowingProgress(true, userId))
    // let response = await usersAPI.followUser(userId)
    // debugger
    // if (response.data.resultCode == 0) {
    //     dispatch(followSuccess(userId))
    // }
    // dispatch(toggleFollowingProgress(false, userId))

}


export default usersReducer