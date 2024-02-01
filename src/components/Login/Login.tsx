import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {loginTC} from "../../redux/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";

export type formDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

const Login = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType>(state => state.auth.isAuth)

    const onSubmit = (formData: formDataType) => {
        console.log(formData)
        dispatch(loginTC(formData))
    }

    if (isAuth) {
        return <Redirect to='/profile'/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>

    )

}

let LoginForm = (props: InjectedFormProps<formDataType>) => {
    const { pristine, submitting, reset, handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <Field name="email" component="input" type="text"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Field name="password" component="input" type="password"/>
            </div>
            <div>
                <Field name="rememberMe" component="input" type="checkbox"/> remember me
            </div>
            <button type="submit" disabled={pristine || submitting}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
                Clear Values
            </button>
        </form>
    )
}


const LoginReduxForm = reduxForm<formDataType>({
    form: 'login'
})(LoginForm)

export default Login