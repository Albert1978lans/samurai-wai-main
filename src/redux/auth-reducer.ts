import {Dispatch} from "redux";
import {authAPI} from "../api/api";

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
    login: string
}

type setAuthUserDataType = {
    type: typeof SET_USER_DATA
    data: dataType
}

type ActionType = setAuthUserDataType

const authReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {

    switch (action.type) {
        case "SET_USER_DATA": {
            return {
                ...state,
                ...action.data,
                isAuth: true
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

export  const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setAuthUserData({id, email, login}))
            }

        })
}

export default authReducer
