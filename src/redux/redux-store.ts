import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer, {ProfileActionsTypes} from "./profile-reducer";
import dialogsReducer, {DialogsActionsTypes} from "./dialogs-reducer";
import usersReducer, {UsersActionsType} from "./users-reducer";
import authReducer, {AuthActionType} from "./auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer, {AppActionType} from "./app-reducer";



let rootReducer = combineReducers({
    profileState: profileReducer,
    dialogsState: dialogsReducer,
    usersState: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>


//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// let store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
export type ActionsType = ProfileActionsTypes
    | DialogsActionsTypes
    | UsersActionsType
    | AuthActionType
    |AppActionType

// window.store=store

export default store