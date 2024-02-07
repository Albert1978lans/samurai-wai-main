import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {mapStateToPropsType, mapDispatchToPropsType} from "./HeaderContainer";


type HeaderPropsType = mapStateToPropsType & mapDispatchToPropsType

const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&usqp=CAU"
                alt="logo"/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>
                        <div>{props.login}</div>
                        <button onClick={props.logoutTC}>LogOut</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }

            </div>
        </header>
    )
}

export default Header