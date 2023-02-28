import React from "react";
import s from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import {DialogItemType} from "../../../redux/store";

type DialogItemTypePropsType = DialogItemType

export const DialogItem: React.FC<DialogItemTypePropsType> = (props) => {
    let patch = '/dialogs/' + props.id
    return (
        <div className={s.dialog}>
            <NavLink
                key={props.id}
                to={patch}
                activeClassName={s.activeLink}>
                {props.name}
            </NavLink>
        </div>
    )
}