import s from './FormsControls.module.css'
import React from "react";
import {Field} from "redux-form";

type FormControlPropsType = {
    input: object
    meta: {
        touched: string
        error: string
    }
    elementType: string
}
type FormControlType = (props: FormControlPropsType) => React.ReactNode

const FormControl1 = ({input, meta: {touched, error}, elementType, ...props}: any) => {
    const element = React.createElement(elementType, {...input, ...props})
    const hasError = touched && error
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                {element}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props: any) => <FormControl1 elementType={'textarea'} {...props} />

export const Input = (props: any) => <FormControl1 elementType={'input'} {...props} />

export const createField = (placeholder: string | null,
                            name: string,
                            validators: Array<(values: string) => string | undefined> | [],
                            component: React.ComponentType,
                            props: any = {},
                            text = '') => {
    return <div>
        {/*<label htmlFor={name}>{name}</label>*/}
        <Field
            placeholder={placeholder}
            name={name}
            validate={validators}
            component={component}
            {...props}
        />{text}
    </div>
}

