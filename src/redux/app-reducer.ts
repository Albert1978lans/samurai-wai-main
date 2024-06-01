
import {getAuthUserData} from "./auth-reducer";
import {AppThunk} from "./redux-store";



export type initialStateType = {
    initialized: boolean
}

const initialState: initialStateType = {
    initialized: false
}



type initializeSuccessType = {
    type: 'INITIALIZE-SUCCESS'
}

export type AppActionType = initializeSuccessType

const appReducer = (state: initialStateType = initialState, action: AppActionType): initialStateType => {

    switch (action.type) {
        case "INITIALIZE-SUCCESS": {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state
    }
}

export const initializeSuccess = (): initializeSuccessType => {
    return {
        type: 'INITIALIZE-SUCCESS',
    } as const
}

// THUNK

export  const initializeApp = (): AppThunk => (dispatch) => {
    const promise = dispatch(getAuthUserData())
   Promise.all([promise])
       .then(() => {
           dispatch(initializeSuccess())
       })
}

export default appReducer
