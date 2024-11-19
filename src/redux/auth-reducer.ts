
import {formDataType} from "../components/Login/Login";
import {stopSubmit} from "redux-form";
import {AppThunk, InferActionsType} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api";

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}
export type initialStateType = typeof initialState

export type DataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

export type AuthActionType = InferActionsType<typeof actions>

const authReducer = (state: initialStateType = initialState, action: AuthActionType): initialStateType => {

    switch (action.type) {
        case "AUTH/SET_USER_DATA": {
            return {
                ...state,
                ...action.data,
                userId: action.data.id
            }
        }
        case "AUTH/SET_CAPTCHA_URL_SUCCESS": {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}

export const actions = {
    setAuthUserDataAC: (data: DataType) =>
        ({type: 'AUTH/SET_USER_DATA', data} as const),
    setCaptchaUrlAC: (url: string | null) =>
        ({type: 'AUTH/SET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl: url}} as const)
}




// THUNK

export const getAuthUserData = (): AppThunk => async (dispatch) => {
    const response = await authAPI.me()

    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = response.data
        const isAuth = true
        dispatch(actions.setAuthUserDataAC({id, email, login, isAuth}))
    }
}

export const loginTC = (formData: formDataType): AppThunk => async (dispatch) => {

    let res = await authAPI.login(formData)
    if (res.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        const message = res.messages.length ? res.messages[0] : 'some error'
        dispatch(stopSubmit('login', {_error: message}))
        if (res.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {

            const response = await securityAPI.getCaptchaUrl()
            dispatch(actions.setCaptchaUrlAC(response.data.url))
        }
    }


}

export const logoutTC = (): AppThunk => async (dispatch) => {
    let res = await authAPI.logout()
    const id = null
    const email = null
    const login = null
    const isAuth = false
    if (res.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserDataAC({id, email, login, isAuth}))
        dispatch(actions.setCaptchaUrlAC(null))
    }

}

export default authReducer
