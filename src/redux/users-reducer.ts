import {Col} from "antd";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'

export type UserType = {
    id: number
    imageUrl: string
    folloved: boolean
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

type ActionsType = followACType
    | unFollowACType
    | setUsersACType
    | setCurrentPageACType
    | totalUsersCountACType
    | toggleIsFetchingACType

const initialState:initialStateType = {
    users: [],
    currentPage: 1,
    pageSize: 5,
    totalUsersCount: 70,
    isFetching: false
}

const usersReducer = (state: initialStateType = initialState, actions: ActionsType): initialStateType => {

    switch (actions.type) {

        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u => u.id === actions.id ? {...u, folloved: true} : u))
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u => u.id === actions.id ? {...u, folloved: false} : u))
            }

        case SET_USERS:
            return {
                ...state,
                users: actions.newUsers
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

        default:
            return state
    }
}



export const follow = (userId: number): followACType => {
    return {
        type: FOLLOW,
        id: userId
    }
}

export const unFollow = (userId: number): unFollowACType => {
    return {
        type: UNFOLLOW,
        id: userId
    }
}

export const setUsers = (newUsers: Array<UserType>): setUsersACType => {
    return {
        type: SET_USERS,
        newUsers: newUsers
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



export default usersReducer