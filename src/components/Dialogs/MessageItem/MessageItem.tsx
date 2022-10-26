import s from "../Dialogs.module.css";
import React from "react";
import {MessageItemType} from "../../../redux/state";

type MessageItemPropsType = MessageItemType

export const MessageItem: React.FC<MessageItemPropsType> = (props) => {
    return <div key={props.id} className={s.messagesItem}>{props.message}</div>
}