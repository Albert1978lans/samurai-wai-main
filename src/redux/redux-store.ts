import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";



let rootReducer = combineReducers({
    profileState: profileReducer,
    dialogsState: dialogsReducer
})

export type AppsStateType = ReturnType<typeof rootReducer>



let store = createStore(rootReducer)

export default store