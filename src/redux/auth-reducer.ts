import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {formDataType} from "../components/Login/Login";

const SET_USER_DATA = 'SET_USER_DATA'

export type initialStateType = {
    userId?: number | null
    email?: string | null
    login: string | null
    isAuth: boolean
}

const initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
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

type ActionType = setAuthUserDataType

const authReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {

    switch (action.type) {
        case "SET_USER_DATA": {
            return {
                ...state,
                ...action.data,
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

// THUNK

export  const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                const isAuth = true
                dispatch(setAuthUserDataAC({id, email, login, isAuth}))
            }

        })
}

export  const loginTC = (formData: formDataType) => (dispatch: any) => {
    authAPI.login(formData)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }

        })
}

export  const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(res => {
            const id = null
            const email = null
            const login = null
            const isAuth = false
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserDataAC({id, email, login, isAuth}))
            }

        })
}

export default authReducer
