import s from './Dialogs.module.css'
import React, {ChangeEvent} from "react";
import {DialogItem} from "./DialogItem/DialogItem";
import {MessageItem} from "./MessageItem/MessageItem";
import {
    addMessageActionsCreator,
    changeTextareaMessageAC,
    }
    from "../../redux/dialogs-reducer";
import {ActionsTypes, DialogsStateType} from "../../redux/state";



type DialogsPropsType = {
    dialogsState: DialogsStateType
    dispatch: (action: ActionsTypes)=>void
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
    let dialogsElements = props.dialogsState.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = props.dialogsState.messages.map(m => <MessageItem key={m.id} message={m.message} id={m.id}/>)

    const sandMessage =() => {
        props.dispatch(addMessageActionsCreator())
    }

    const changeTextarea = (e:ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(changeTextareaMessageAC(e.currentTarget.value))
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
                    <textarea value={props.dialogsState.valueTextareaMessage} onChange={changeTextarea}></textarea>
                </div>
                <div>
                    <button onClick={sandMessage}>Sand</button>
                </div>
            </div>

        </div>
    )
}