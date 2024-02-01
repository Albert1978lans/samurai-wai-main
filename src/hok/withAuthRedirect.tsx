import React, {Component, ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

type mapStateToPropsType = {
    isAuth: boolean
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {  // <T> - тип принимаемого компонента

    const RedirectComponent = (props: mapStateToPropsType) => {

        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to = "/login" />

        return <Component {...restProps as T} />
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}



