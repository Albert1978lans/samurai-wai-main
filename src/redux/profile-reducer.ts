import {Dispatch} from "redux";
import {AppThunk, InferActionsType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {profileAPI} from "../api/profile-api";
import {ResultCodesEnum} from "../api/api";
import {ProfileType} from "../types/types";

export type PostType = {
    id: number
    message: string
    likesCount: number
}

let initialState = {
    posts: [
        {id: 1, message: 'Hi, hou are you', likesCount: 5},
        {id: 2, message: 'It\'s my first post', likesCount: 17}
    ],
    profile: null as ProfileType | null,
    status: ''
}

export type initialStateType = typeof initialState

export type ProfileActionsTypes = InferActionsType<typeof actions>

const profileReducer = (state: initialStateType = initialState, actions: ProfileActionsTypes): initialStateType => {

    switch (actions.type) {
        case 'profile/ADD-POST':
            let newPost = {
                id: new Date().getTime(),
                message: actions.newPost,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case "profile/SET-USERS-PROFILE":
            return {
                ...state,
                profile: actions.profile
            }
        case "profile/SET-STATUS":
            return {
                ...state,
                status: actions.status
            }

        case "profile/SET-PHOTO":
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

export const actions = {
    addPostAC: (newPost: string) =>
        ({type: 'profile/ADD-POST', newPost} as const),

    setUserProfile: (profile: ProfileType | null) =>
        ({type: 'profile/SET-USERS-PROFILE', profile} as const),

    setStatusAC: (status: string) =>
        ({type: 'profile/SET-STATUS', status } as const),

    setPhotosSuccess: (photos: { small: string | null, large: string | null }) =>
        ({type: 'profile/SET-PHOTO',photos} as const),
}


//======================================================================================//

export const getProfile = (userId: number): AppThunk => async (dispatch: Dispatch) => {

    let response = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response))

}


export const getUserStatus = (userId: number): AppThunk => {

    return async (dispatch: Dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(actions.setStatusAC(response))

    }
}

export const updateStatus = (status: string): AppThunk => {

    return async (dispatch: Dispatch) => {
        let response = await profileAPI.updateStatus(status)
        if (response.resultCode === ResultCodesEnum.Success)
            dispatch(actions.setStatusAC(status))

    }
}

export const savePhotos = (photoFile: File): AppThunk => {

    return async (dispatch: Dispatch) => {
        let res = await profileAPI.savePhotos(photoFile)

        if (res.data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setPhotosSuccess(res.data.data.photos))
        }
    }
}

export const saveProfile = (formData: ProfileType): AppThunk => {

    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        let response = await profileAPI.saveProfile(formData)

        if (response.resultCode === ResultCodesEnum.Success) {
            if (userId) {
                await dispatch(getProfile(userId))
            }
            return Promise.resolve()
        } else {
            const message = response.messages.length ? response.messages[0] : 'some error'
            dispatch(stopSubmit('editProfile', {_error: message}))
            // dispatch(stopSubmit('editProfile', {"contacts": {'facebook': message}}))
            return Promise.reject(message)
        }
    }
}

export default profileReducer