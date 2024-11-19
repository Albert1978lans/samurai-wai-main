
import React from "react";
import {actions, initialStateType,} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {withAuthRedirect} from "../../hok/withAuthRedirect";
import {compose} from "redux";

export type mapDispatchToPropsType = {
    sendMessage: (newMessage: string) => void
}



const mapStateToProps = (state: AppStateType): initialStateType => {
    return {
        dialogs: state.dialogsState.dialogs,
        messages: state.dialogsState.messages
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        sendMessage: (newMessage) => {
            dispatch(actions.addMessageAC(newMessage))
        }
}}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs)

