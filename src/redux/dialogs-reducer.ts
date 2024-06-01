
const ADD_DIALOGS_MESSAGES = 'ADD-DIALOGS-MESSAGES'

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
    ]
}

type addMessageACType = {
    type: typeof ADD_DIALOGS_MESSAGES
    newMessage: string
}

export type DialogsActionsTypes = addMessageACType

const dialogsReducer = (state: initialStateType = initialState, actions: DialogsActionsTypes): initialStateType => {

    switch (actions.type) {

        case ADD_DIALOGS_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, {id: new Date().getTime(), message: actions.newMessage}],
            }

        default:
            return state
    }
}

export  const addMessageAC = (newMessage: string): addMessageACType => {
    return{
        type: 'ADD-DIALOGS-MESSAGES',
        newMessage
    } as const
}

export default dialogsReducer