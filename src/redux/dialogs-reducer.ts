import {ActionsTypes, DialogsStateType} from "./state";


const ADD_DIALOGS_MESSAGES = 'ADD-DIALOGS-MESSAGES'
const CHANGE_TEXTAREA_MESSAGES = 'CHANGE-TEXTAREA-MESSAGES'


const dialogsReducer = (state: DialogsStateType, actions: ActionsTypes) => {

    switch (actions.type) {
        case ADD_DIALOGS_MESSAGES:
            let body = state.valueTextareaMessage
            state.valueTextareaMessage = ''
            let message = {id: new Date().getTime(), message: body}
            state.messages.push(message)
            return state
        case CHANGE_TEXTAREA_MESSAGES:
            state.valueTextareaMessage = actions.valueTextarea
            return state
        default:
            return state
    }
}

export const changeTextareaMessageAC = (text: string) => {
    return {
        type: 'CHANGE-TEXTAREA-MESSAGES',
        valueTextarea: text
    } as const
}

export  const addMessageActionsCreator = () => {
    return{
        type: 'ADD-DIALOGS-MESSAGES'
    } as const
}

export default dialogsReducer