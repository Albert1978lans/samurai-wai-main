import s from './Dialogs.module.css'
import React from "react";
import {DialogItem} from "./DialogItem/DialogItem";
import {MessageItem} from "./MessageItem/MessageItem";
import {initialStateType} from "../../redux/dialogs-reducer";
import {mapDispatchToPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreators, required} from "../../utils/validators";

type DialogsPropsType = initialStateType & mapDispatchToPropsType

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
    let dialogsElements = props.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = props.messages.map(m => <MessageItem key={m.id} message={m.message} id={m.id}/>)

    const sandMessage =(data: messageFormDataType) => {
        props.sendMessage(data.newDialogsMessage)
    }

    return (
        <div className={s.dialogs}>

            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>
                    {messagesElements}
                </div>
                <DialogsMessageReduxForm onSubmit={sandMessage}/>
            </div>

        </div>
    )
}

export type messageFormDataType = {
    newDialogsMessage: string
}

const maxLength30 = maxLengthCreators(30)

let DialogsMessage = (props: InjectedFormProps<messageFormDataType>) => {
    const { pristine, submitting, handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    name="newDialogsMessage"
                    component={Textarea}
                    type="text"
                    placeholder='Enter your message'
                    validate={[required, maxLength30]}
                />
            </div>
            <button type="submit" disabled={pristine || submitting}>Sand</button>
        </form>
    )
}


const DialogsMessageReduxForm = reduxForm<messageFormDataType>({
    form: 'post'
})(DialogsMessage)