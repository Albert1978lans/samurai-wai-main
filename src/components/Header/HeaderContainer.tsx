import React from "react";
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {initialStateType, setAuthUserData, dataType} from "../../redux/auth-reducer";
import {AppsStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<initialStateType & mapDispatchToPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,{withCredentials: true,})

            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    this.props.setAuthUserData({id, email, login})
                }

            })
    }

    render () {
        return (
            <Header {...this.props}/>
        )
    }

}

export type mapDispatchToPropsType = {
    setAuthUserData: (data: dataType) => void
}

type mapStateToPropsType = {
    isAuth: boolean
    // userId: number | null
    // email: string | null
    login: string | null
}

const mapStateToProps = (state: AppsStateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        // userId: state.auth.userId,
        // email: state.auth.email,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)