import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {loginTC} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import s from '../common/FormsControls/FormsControls.module.css'

export type formDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

type formDataPropsType = {
    captchaUrl: string | null
}

type LoginPropsType = mapDispatchToPropsType & mapStateToPropsType

const Login = (props: LoginPropsType) => {

    const onSubmit = (formData: formDataType) => {
        // console.log(formData)
        props.loginTC(formData)
    }

    if (props.isAuth) {
        return <Redirect to='/profile'/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>

    )

}

let LoginForm = (props: InjectedFormProps<formDataType, formDataPropsType> & formDataPropsType) => {
    const { pristine, submitting, reset, handleSubmit, captchaUrl} = props
    // debugger
    return (
        <form onSubmit={handleSubmit}>

            {createField('Email', 'email', [required], Input, {type: 'text'})}
            {createField('Password', 'password',  [required], Input, {type: 'password'})}
            {createField( null, 'rememberMe',  [], Input, {type: 'checkbox'}, 'rememberMe')}
            {props.error && <div className={s.formSummaryError}>{props.error}</div>}
            {captchaUrl && <img alt='captcha' src={captchaUrl}/> }
            {captchaUrl && createField('Captcha', 'captcha', [required], Input, {type: 'text'})}
            <button type="submit" disabled={pristine || submitting}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
                Clear Values
            </button>
        </form>
    )
}


const LoginReduxForm = reduxForm<formDataType, formDataPropsType>({
    form: 'login'
})(LoginForm)

type mapDispatchToPropsType = {
    loginTC: (data: formDataType) => void
}

type mapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {loginTC})(Login)