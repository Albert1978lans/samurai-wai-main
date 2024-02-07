
import {getAuthUserData} from "./auth-reducer";



export type initialStateType = {
    initialized: boolean
}

const initialState: initialStateType = {
    initialized: false
}



type initializeSuccessType = {
    type: 'INITIALIZE-SUCCESS'
}

type ActionType = initializeSuccessType

const appReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {

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

export  const initializeApp = () => (dispatch: any) => {
   Promise.all([dispatch(getAuthUserData())])
       .then(() => {
           dispatch(initializeSuccess())
       })
}

export default appReducer
