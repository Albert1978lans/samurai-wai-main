import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {loginTC} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";

export type formDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

type LoginPropsType = mapDispatchToPropsType & mapStateToPropsType

const Login = (props: LoginPropsType) => {

    const onSubmit = (formData: formDataType) => {
        console.log(formData)
        props.loginTC(formData)
    }

    if (props.isAuth) {
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
                <Field name="email" component={Input} validate={[required]} type="text"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Field name="password" component={Input} validate={[required]} type="password"/>
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

type mapDispatchToPropsType = {
    loginTC: (data: formDataType) => void
}

type mapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {loginTC})(Login)