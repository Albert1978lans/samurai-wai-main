import s from './Dialogs.module.css'
import React, {ChangeEvent} from "react";
import {DialogItem} from "./DialogItem/DialogItem";
import {MessageItem} from "./MessageItem/MessageItem";
import {initialStateType} from "../../redux/dialogs-reducer";
import {mapDispatchToPropsType} from "./DialogsContainer";
import {Redirect} from "react-router-dom";

type DialogsPropsType = initialStateType & mapDispatchToPropsType

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
    let dialogsElements = props.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = props.messages.map(m => <MessageItem key={m.id} message={m.message} id={m.id}/>)

    const sandMessage =() => {
        props.sendMessage()
    }

    const changeTextarea = (e:ChangeEvent<HTMLTextAreaElement>) => {
        props.updateTextarea(e.currentTarget.value)
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
                <div>
                    <textarea value={props.valueTextareaMessage} onChange={changeTextarea}></textarea>
                </div>
                <div>
                    <button onClick={sandMessage}>Sand</button>
                </div>
            </div>

        </div>
    )
}