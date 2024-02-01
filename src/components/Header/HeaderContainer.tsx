import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {initialStateType, getAuthUserData, deleteAuthUser} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<mapStateToPropsType & mapDispatchToPropsType> {

    componentDidMount() {

        this.props.getAuthUserData()
    }

    render () {
        return (
            <Header {...this.props}/>
        )
    }

}

export type mapDispatchToPropsType = {
    getAuthUserData: () => void
    deleteAuthUser: () => void
}

type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {getAuthUserData, deleteAuthUser})(HeaderContainer)