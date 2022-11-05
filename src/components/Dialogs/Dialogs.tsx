import s from './Dialogs.module.css'
import React from "react";
import {DialogItem} from "./DialogItem/DialogItem";
import {MessageItem} from "./MessageItem/MessageItem";
import {DialogsStateType} from "../../redux/state";



type DialogsPropsType = {
    dialogsState: DialogsStateType
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
    let dialogsElements = props.dialogsState.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = props.dialogsState.messages.map(m => <MessageItem key={m.id} message={m.message} id={m.id}/>)

    let newMessageElement = React.createRef<HTMLTextAreaElement>()

    const addMessage =() => {
        let message = newMessageElement.current?.value
        alert(message)
    }

    return (
        <div className={s.dialogs}>

            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElements}
                <textarea ref={newMessageElement}></textarea>
                <button onClick={addMessage}>addMessage</button>
            </div>

        </div>
    )
}