import {ProfileType} from "../components/Profile/ProfileContainer";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import {AppThunk} from "./redux-store";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST'
const SET_USERS_PROFILE = 'SET-USERS-PROFILE'
const SET_STATUS = 'SET-STATUS'
const SET_PHOTO = 'SET-PHOTO'

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type initialStateType = {
    posts: Array<PostType>
    profile?: ProfileType | null
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
    profile: ProfileType
}

type setStatusACType = {
    type: typeof SET_STATUS
    status: string
}

type setPhotosSuccess = {
    type: typeof SET_PHOTO
    photos: {small: string, large: string}
}

export type ProfileActionsTypes = addPostACType | setUserProfileAC | setStatusACType | setPhotosSuccess

const profileReducer = (state: initialStateType = initialState, actions: ProfileActionsTypes): initialStateType => {

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

        case "SET-PHOTO":
            if (state.profile) {
                return {
                    ...state,
                    profile: {...state.profile, photos: actions.photos}
                }
            }
            return {...state}


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

export const setPhotosSuccess = (photos: {small: string, large: string}): setPhotosSuccess => {
    return {
        type: 'SET-PHOTO',
        photos
    }
}

//======================================================================================//

export const getProfile = (userId: number): AppThunk => async (dispatch: Dispatch) => {

    let response = await usersAPI.getUser(userId)
    dispatch(setUserProfile(response.data))

}


export const getUserStatus = (userId: number): AppThunk => {

    return async (dispatch: Dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatusAC(response.data))

    }
}

export const updateStatus = (status: string): AppThunk => {

    return async (dispatch: Dispatch) => {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0)
            dispatch(setStatusAC(status))

    }
}

export const savePhotos = (photoFile: File): AppThunk => {

    return async (dispatch: Dispatch) => {
        let response = await profileAPI.savePhotos(photoFile)

        if (response.data.resultCode === 0) {

            dispatch(setPhotosSuccess(response.data.data.photos))

    }
}}

export const saveProfile = (formData: ProfileType): AppThunk => {

    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        let response = await profileAPI.saveProfile(formData)

        if (response.data.resultCode === 0) {
            if (userId) {
                await dispatch(getProfile(userId))
            }
            return Promise.resolve()
        }
        else {
            const message = response.data.messages.length ? response.data.messages[0] : 'some error'
            dispatch(stopSubmit('editProfile', {_error: message}))
            // dispatch(stopSubmit('editProfile', {"contacts": {'facebook': message}}))
            return Promise.reject(message)
        }
    }}

export default profileReducer