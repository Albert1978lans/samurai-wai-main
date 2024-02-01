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

export type dataType = {
    id: number
    email: string
    login?: string
}

type setAuthUserDataType = {
    type: typeof SET_USER_DATA
    data: dataType
}

type ActionType = setAuthUserDataType | ReturnType<typeof deleteAuthUser>

const authReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {

    switch (action.type) {
        case "SET_USER_DATA": {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        case "DELETE_AUTH_USER": {
            return {
                ...state,
                isAuth: false
            }
        }
        default:
            return state
    }
}

export const setAuthUserData = (data: dataType): setAuthUserDataType => {
    return {
        type: SET_USER_DATA,
        data
    } as const
}

export const deleteAuthUser = () => {
    return {
        type: 'DELETE_AUTH_USER'
    } as const
}


// THUNK

export  const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setAuthUserData({id, email, login}))
            }

        })
}

export  const loginTC = (formData: formDataType) => (dispatch: Dispatch) => {
    authAPI.login(formData)
        .then(res => {
            if (res.data.resultCode === 0) {
                const id = res.data.data.userId
                const {email} = formData
                dispatch(setAuthUserData({id, email}))
            }

        })
}

export  const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteAuthUser())
            }

        })
}

export default authReducer
