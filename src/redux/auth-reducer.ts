import {Dispatch} from "redux";
import {authAPI, securityAPI} from "../api/api";
import {formDataType} from "../components/Login/Login";
import {stopSubmit} from "redux-form";
import {AppThunk} from "./redux-store";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_CAPTCHA_URL_SUCCESS = 'SET_CAPTCHA_URL_SUCCESS'

export type initialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

const initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

export type DataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type setAuthUserDataType = {
    type: typeof SET_USER_DATA
    data: DataType
}
type setCaptchaUrlACType = {
    type: typeof SET_CAPTCHA_URL_SUCCESS
    payload: {
        captchaUrl: string | null
    }
}

export type AuthActionType = setAuthUserDataType | setCaptchaUrlACType

const authReducer = (state: initialStateType = initialState, action: AuthActionType): initialStateType => {

    switch (action.type) {
        case "SET_USER_DATA": {
            return {
                ...state,
                ...action.data,
                userId: action.data.id
            }
        }
        case "SET_CAPTCHA_URL_SUCCESS": {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}

export const setAuthUserDataAC = (data: DataType): setAuthUserDataType => {
    return {
        type: SET_USER_DATA,
        data
    } as const
}

export const setCaptchaUrlAC = (url: string | null): setCaptchaUrlACType => {
    return {
        type: SET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl: url}
    } as const
}

// THUNK

export const getAuthUserData = (): AppThunk => async (dispatch) => {
    const response = await authAPI.me()

    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        const isAuth = true
        dispatch(setAuthUserDataAC({id, email, login, isAuth}))
    }


}

export const loginTC = (formData: formDataType): AppThunk => async (dispatch) => {

    let res = await authAPI.login(formData)
    if (res.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        const message = res.data.messages.length ? res.data.messages[0] : 'some error'
        dispatch(stopSubmit('login', {_error: message}))
        if (res.data.resultCode === 10) {

            const response = await securityAPI.getCaptchaUrl()
            dispatch(setCaptchaUrlAC(response.data.url))
        }
    }


}

export const logoutTC = (): AppThunk => async (dispatch) => {
    let res = await authAPI.logout()
    const id = null
    const email = null
    const login = null
    const isAuth = false
    if (res.data.resultCode === 0) {
        dispatch(setAuthUserDataAC({id, email, login, isAuth}))
        dispatch(setCaptchaUrlAC(null))
    }

}

export default authReducer
