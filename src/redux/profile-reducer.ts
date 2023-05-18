import {ProfileType} from "../components/Profile/ProfileContainer";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST'
const CHANGE_TEXTAREA = 'CHANGE-TEXTAREA'
const SET_USERS_PROFILE = 'SET-USERS-PROFILE'
const SET_STATUS = 'SET-STATUS'

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type initialStateType = {
    posts: Array<PostType>
    valueTextarea: string
    profile?: any
    status: string
}

let initialState: initialStateType = {
    posts: [
        {id: 1, message: 'Hi, hou are you', likesCount: 5},
        {id: 2, message: 'It\'s my first post', likesCount: 17}
    ],
    valueTextarea: 'it-incubator',
    profile: null,
    status: ''
}

type changeTextareaACType = {
    type: typeof CHANGE_TEXTAREA
    valueTextarea: string
}

type addPostACType = {
    type: typeof ADD_POST
}

type setUserProfileAC = {
    type: typeof SET_USERS_PROFILE
    profile: any
}

type setStatusACType = {
    type: typeof SET_STATUS
    status: string
}

type ActionsTypes = changeTextareaACType | addPostACType | setUserProfileAC | setStatusACType

const profileReducer = (state: initialStateType = initialState, actions: ActionsTypes): initialStateType => {

    switch (actions.type) {
        case ADD_POST:
            let newPost = {
                id: new Date().getTime(),
                message: state.valueTextarea,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                valueTextarea: ''
            }

        case CHANGE_TEXTAREA:
            return {
                ...state,
                valueTextarea: actions.valueTextarea
            }
        case "SET-USERS-PROFILE":
            return {
                ...state,
                profile: actions.profile
            }
        case "SET-STATUS":
            return  {
                ...state,
                status: actions.status
            }

        default:
            return state
    }


}




export const changeTextareaAC = (text: string): changeTextareaACType => {
    return {type: "CHANGE-TEXTAREA",
        valueTextarea: text
    } as const
}

export const addPostAC = ():addPostACType => {
    return {type: 'ADD-POST'} as const
}

export const setUserProfile = (profile: ProfileType):setUserProfileAC => {
    return {
        type: 'SET-USERS-PROFILE',
        profile
    }
}

export const setStatusAC = (status: string):setStatusACType => {
    return {
        type: 'SET-STATUS',
        status
    }
}

//======================================================================================//

export const getProfile = (userId: number) => {
    return (dispatch: Dispatch) => {
        usersAPI.getUser(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            })
    }
}

export const getUserStatus = (userId: number) => {
    return (dispatch: Dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatusAC(response.data))
            })
    }
}

export const updateStatus = (status: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0)
                dispatch(setStatusAC(status))
            })
    }
}

export default profileReducer