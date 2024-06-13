import s from './FormsControls.module.css'
import React from "react"
import {Field} from "redux-form"
import {WrappedFieldProps} from "redux-form/lib/Field"


type OwnPropsType = {elementType: string}
// interface FormControlPropsType extends WrappedFieldProps {
//     elementType: string
// }

type FormControlPropsType = WrappedFieldProps & OwnPropsType

const FormControl: React.FC<FormControlPropsType> =
    ({elementType, input, meta: {touched, error}, ...restProps}) => {
    const element = React.createElement(elementType, {...input, ...restProps})
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
// WrappedFieldProps
export const Textarea: React.FC<WrappedFieldProps> = (props) => <FormControl elementType={'textarea'} {...props} />

export const Input: React.FC<WrappedFieldProps> = (props) => <FormControl elementType={'input'} {...props} />

export function createField<KeysType extends string>(placeholder: string | null,
                            name: KeysType,
                            validators: Array<(values: string) => string | undefined> | [],
                            component: React.FC<WrappedFieldProps>,
                            props: any = {},
                            text = '')  {
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

// Argument of type '(props: FormControlPropsType) => JSX.Element' is not assignable to parameter of type 'string | ComponentType<{}> | FC<{}>'.
// Type '(props: FormControlPropsType) => JSX.Element' is not assignable to type 'FunctionComponent<{}>'.
// Types of parameters 'props' and 'props' are incompatible.
// Type '{ children?: ReactNode; }' is missing the following properties from type 'FormControlPropsType': input, meta, props