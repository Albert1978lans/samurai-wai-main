
import React from "react";
import {
    addMessageActionsCreator,
    changeTextareaMessageAC,
    }
    from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import StoreContext from "../../StoreContext";





export const DialogsContainer = () => {



    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState()

                    const sandMessage =() => {
                        store.dispatch(addMessageActionsCreator())
                    }

                    const changeTextarea = (text: string) => {
                        store.dispatch(changeTextareaMessageAC(text))
                    }
                    return (
                        <Dialogs
                            dialogs={state.dialogsState.dialogs}
                            messages={state.dialogsState.messages}
                            valueTextarea ={state.dialogsState.valueTextareaMessage}
                            sendMessage={sandMessage}
                            updateTextarea={changeTextarea}
                        />
                    )
                }
            }
        </StoreContext.Consumer>
    )
}

