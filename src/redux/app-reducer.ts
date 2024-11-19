import {getAuthUserData} from "./auth-reducer";
import {AppThunk, InferActionsType} from "./redux-store";

const initialState = {
    initialized: false
}

export type initialStateType = typeof initialState

export type AppActionType = InferActionsType<typeof actions>

const appReducer = (state: initialStateType = initialState, action: AppActionType): initialStateType => {

    switch (action.type) {
        case "APP/INITIALIZE-SUCCESS": {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state
    }
}
const actions = {
    initializeSuccess: () => ({type: 'APP/INITIALIZE-SUCCESS'} as const)
}

// THUNK

export  const initializeApp = (): AppThunk => (dispatch) => {
    const promise = dispatch(getAuthUserData())
   Promise.all([promise])
       .then(() => {
           dispatch(actions.initializeSuccess())
       })
}

export default appReducer
