import s from './FormsControls.module.css'
import React from "react";
import {Field} from "redux-form";


// export const Textarea = ({input, meta, ...props}: any) => {
//     const hasError = meta.touched && meta.error
//     return (
//         <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
//             <div>
//                 <textarea {...input} {...props}/>
//             </div>
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }
//
// export const Input = ({input, meta, ...props}: any) => {
//     const hasError = meta.touched && meta.error
//     return (
//         <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
//             <div>
//                 <input {...input} {...props}/>
//             </div>
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }
//
// const FormControl = (props: any) => {
//     const hasError = props.meta.touched && props.meta.error
//     return (
//         <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
//             {props.children}
//             <div>
//                 {hasError && <span>{props.meta.error}</span>}
//             </div>
//         </div>
//     )
// }
//
// export const Textarea2 = (props: any) => {
//     return <FormControl {...props}><textarea {...props.input} {...props}/></FormControl>
// }
// export const Input2 = (props: any) => {
//     return <FormControl {...props}><input {...props.input} {...props}/></FormControl>
// }
//
// const Element = (Element: any) => ({ input, meta, ...props }: any) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div className={ s.formControl + " " + (hasError ? s.error : "") }>
//             <div><Element {...input} {...props} /></div>
//             <div>{ hasError && <span> { meta.error } </span> }</div>
//         </div>
//     );
// };
// export const Textarea3 = Element("textarea")
// export const Input3 = Element("input")
//
//
//
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
        <label htmlFor={name}>{name}</label>
        <Field
            placeholder={placeholder}
            name={name}
            validate={validators}
            component={component}
            {...props}
        />{text}
    </div>
}

