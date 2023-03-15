import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";



let reducers = combineReducers({
    profileState: profileReducer,
    dialogsState: dialogsReducer
})

// export type ReducesType = typeof reducers
// export type AppsStateType = ReturnType<ReducesType>



let store = createStore(reducers)
export type StoreType = typeof store

export default store