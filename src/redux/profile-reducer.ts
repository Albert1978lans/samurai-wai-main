import {ProfileType} from "../components/Profile/ProfileContainer";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST'
const SET_USERS_PROFILE = 'SET-USERS-PROFILE'
const SET_STATUS = 'SET-STATUS'

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type initialStateType = {
    posts: Array<PostType>
    profile?: any
    status: string
}

let initialState: initialStateType = {
    posts: [
        {id: 1, message: 'Hi, hou are you', likesCount: 5},
        {id: 2, message: 'It\'s my first post', likesCount: 17}
    ],
    profile: null,
    status: ''
}

type addPostACType = {
    type: typeof ADD_POST
    newPost: string
}

type setUserProfileAC = {
    type: typeof SET_USERS_PROFILE
    profile: any
}

type setStatusACType = {
    type: typeof SET_STATUS
    status: string
}

type ActionsTypes = addPostACType | setUserProfileAC | setStatusACType

const profileReducer = (state: initialStateType = initialState, actions: ActionsTypes): initialStateType => {

    switch (actions.type) {
        case ADD_POST:
            let newPost = {
                id: new Date().getTime(),
                message: actions.newPost,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case "SET-USERS-PROFILE":
            return {
                ...state,
                profile: actions.profile
            }
        case "SET-STATUS":
            return {
                ...state,
                status: actions.status
            }

        default:
            return state
    }


}
export const addPostAC = (newPost: string): addPostACType => {
    return {type: 'ADD-POST', newPost} as const
}

export const setUserProfile = (profile: ProfileType): setUserProfileAC => {
    return {
        type: 'SET-USERS-PROFILE',
        profile
    }
}

export const setStatusAC = (status: string): setStatusACType => {
    return {
        type: 'SET-STATUS',
        status
    }
}

//======================================================================================//

export const getProfile = (userId: number) => async (dispatch: Dispatch) => {

    let response = await usersAPI.getUser(userId)
    dispatch(setUserProfile(response.data))

}


export const getUserStatus = (userId: number) => {

    return async (dispatch: Dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatusAC(response.data))

    }
}

export const updateStatus = (status: string) => {

    return async (dispatch: Dispatch) => {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0)
            dispatch(setStatusAC(status))

    }
}

export default profileReducer