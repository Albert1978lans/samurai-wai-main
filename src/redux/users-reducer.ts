const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

export type UserType = {
    id: number
    imageUrl: string
    folloved: boolean
    status: string
    fullName: string
    location: {
        country: string
        city: string
    }
}
export type initialStateType = {
    users: Array<UserType>
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

type ActionsType = followACType | unFollowACType | setUsersACType

const initialState:initialStateType = {
    users: []
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
                users: [...state.users, ...actions.newUsers]
            }

        default:
            return state
    }
}



export const followAC = (userId: number): followACType => {
    return {
        type: FOLLOW,
        id: userId
    }
}

export const unFollowAC = (userId: number): unFollowACType => {
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

export default usersReducer