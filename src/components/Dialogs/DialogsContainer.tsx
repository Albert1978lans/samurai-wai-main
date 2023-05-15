
import React from "react";
import {
    addMessageAC,
    changeTextareaMessageAC, initialStateType,
}
    from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppsStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {withAuthRedirect} from "../../hok/withAuthRedirect";
import {compose} from "redux";

export type mapDispatchToPropsType = {
    sendMessage: () => void
    updateTextarea: (text: string) => void
}



const mapStateToProps = (state: AppsStateType): initialStateType => {
    return {
        dialogs: state.dialogsState.dialogs,
        messages: state.dialogsState.messages,
        valueTextareaMessage: state.dialogsState.valueTextareaMessage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        sendMessage: () => {
            dispatch(addMessageAC())
        },
        updateTextarea: (text: string) => {
            dispatch(changeTextareaMessageAC(text))
        }
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs)

