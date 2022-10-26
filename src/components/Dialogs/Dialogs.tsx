import s from './Dialogs.module.css'
import React from "react";
import {DialogItem} from "./DialogItem/DialogItem";
import {MessageItem} from "./MessageItem/MessageItem";
import {DialogsStateType} from "../../index";



type DialogsPropsType = {
    dialogsState: DialogsStateType
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
    let dialogsElements = props.dialogsState.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.dialogsState.messages.map(m => <MessageItem message={m.message} id={m.id}/>)

    return (
        <div className={s.dialogs}>

            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElements}
            </div>

        </div>
    )
}