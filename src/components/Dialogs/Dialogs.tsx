import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogItemPropsType = {
    name: string,
    id: number,
}

const DialogItem = (props: DialogItemPropsType) => {
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

export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name={'Dimych'} id={1}/>
                <DialogItem name={'Andrey'} id={2}/>
                <DialogItem name={'Sveta'} id={3}/>
                <DialogItem name={'Sacha'} id={4}/>
                <DialogItem name={'Viktor'} id={5}/>
                <DialogItem name={'Valera'} id={6}/>

            </div>
            <div className={s.messages}>
                <MessageItem message={'Hi'}/>
                <MessageItem message={'How is your it-kamasutra'}/>
                <MessageItem message={'Yo'}/>
                <MessageItem message={'Yo'}/>
                <MessageItem message={'Yo'}/>
            </div>
        </div>
    )
}