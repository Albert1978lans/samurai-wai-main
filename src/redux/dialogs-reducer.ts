import {ActionsTypes, DialogsStateType} from "./store";


const ADD_DIALOGS_MESSAGES = 'ADD-DIALOGS-MESSAGES'
const CHANGE_TEXTAREA_MESSAGES = 'CHANGE-TEXTAREA-MESSAGES'

let initialState: DialogsStateType = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sacha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'},
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Bye'},
        {id: 6, message: 'Hello'},
    ],
    valueTextareaMessage : ''
}

const dialogsReducer = (state: DialogsStateType = initialState, actions: ActionsTypes): DialogsStateType => {

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