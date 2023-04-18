import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunk from "redux-thunk";



let rootReducer = combineReducers({
    profileState: profileReducer,
    dialogsState: dialogsReducer,
    usersState: usersReducer,
    auth: authReducer
})

export type AppsStateType = ReturnType<typeof rootReducer>



let store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store=store

export default store