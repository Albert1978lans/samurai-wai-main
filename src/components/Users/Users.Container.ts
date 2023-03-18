import {connect} from "react-redux";
import {Users} from "./Users";
import {AppsStateType} from "../../redux/redux-store";
import {followAC, setUsers, unFollowAC, UserType} from "../../redux/users-reducer";
import {Dispatch} from "redux";
import {initialStateType} from "../../redux/users-reducer";

export type mapDispatchToPropsType = {
    follow: (id: number) => void
    unFollow: (id: number) => void
    setUsers: (newUsers: Array<UserType>) => void
}

const mapStateToProps = (state: AppsStateType): initialStateType => {
    return {
        users: state.usersState.users
    }
}


const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {

    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId: number) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (newUsers: Array<UserType>) => {
            dispatch(setUsers(newUsers))
        }
    }
}


export const UsersContainer = connect(mapStateToProps, mapDispatchToProps) (Users)