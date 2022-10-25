import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import React from "react";

type DialogItemPropsType = {
    name: string,
    id: number,
}

const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    let patch = '/dialogs/' + props.id
    return (
        <div className={s.dialog}>
            <NavLink
                to={patch}
                activeClassName={s.activeLink}>
                {props.name}
            </NavLink>
        </div>
    )
}

const MessageItem = (props: { message: string }) => {
    return <div className={s.messagesItem}>{props.message}</div>
}
type dialogType = {
    id: number,
    name: string
}

type messageType = {
    id: number,
    message: string
}

export const Dialogs = () => {

    let dialogs: Array<dialogType>  = [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sacha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'},
    ]
    let messages: Array<messageType> = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 6, message: 'Hello'},
    ]

    let dialogsElements = dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = messages.map(m => <MessageItem message={m.message}/>)


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