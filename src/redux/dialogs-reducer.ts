
const ADD_DIALOGS_MESSAGES = 'ADD-DIALOGS-MESSAGES'
const CHANGE_TEXTAREA_MESSAGES = 'CHANGE-TEXTAREA-MESSAGES'

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}

export type initialStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    valueTextareaMessage: string
}

let initialState: initialStateType = {
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

type changeTextareaMessageACType = {
    type: typeof CHANGE_TEXTAREA_MESSAGES
    valueTextarea: string
}

type addMessageACType = {
    type: typeof ADD_DIALOGS_MESSAGES
}

type ActionsTypes = changeTextareaMessageACType | addMessageACType

const dialogsReducer = (state: initialStateType = initialState, actions: ActionsTypes): initialStateType => {

    switch (actions.type) {

        case ADD_DIALOGS_MESSAGES:
            let body = state.valueTextareaMessage
            return {
                ...state,
                messages: [...state.messages, {id: new Date().getTime(), message: body}],
                valueTextareaMessage: ''
            }

        case CHANGE_TEXTAREA_MESSAGES:
            return {
                ...state,
                valueTextareaMessage: actions.valueTextarea
            }

        default:
            return state
    }
}



export const changeTextareaMessageAC = (text: string): changeTextareaMessageACType => {
    return {
        type: 'CHANGE-TEXTAREA-MESSAGES',
        valueTextarea: text
    } as const
}

export  const addMessageAC = (): addMessageACType => {
    return{
        type: 'ADD-DIALOGS-MESSAGES'
    } as const
}

export default dialogsReducer