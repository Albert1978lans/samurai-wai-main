import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {initialStateType, getAuthUserData} from "../../redux/auth-reducer";
import {AppsStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<initialStateType & mapDispatchToPropsType> {

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
}

type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

const mapStateToProps = (state: AppsStateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer)