
import React from "react";
import {
    addMessageActionsCreator,
    changeTextareaMessageAC,
    }
    from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {StoreType} from "../../redux/redux-store";



type DialogsContainerPropsType = {
    store: StoreType
}

export const DialogsContainer: React.FC<DialogsContainerPropsType> = (props) => {

    let state = props.store.getState()

    const sandMessage =() => {
        props.store.dispatch(addMessageActionsCreator())
    }

    const changeTextarea = (text: string) => {
        props.store.dispatch(changeTextareaMessageAC(text))
    }

    return <Dialogs
        dialogs={state.dialogsState.dialogs}
        messages={state.dialogsState.messages}
        valueTextarea ={state.dialogsState.valueTextareaMessage}
        sendMessage={sandMessage}
        updateTextarea={changeTextarea}
    />
}