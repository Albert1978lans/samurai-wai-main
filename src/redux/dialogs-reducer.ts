import {InferActionsType} from "./redux-store";

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}


let initialState = {
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

export type initialStateType = typeof initialState

export type DialogsActionsTypes = InferActionsType<typeof actions>

const dialogsReducer = (state: initialStateType = initialState, actions: DialogsActionsTypes): initialStateType => {

    switch (actions.type) {

        case 'dialogs/ADD-DIALOGS-MESSAGES':
            return {
                ...state,
                messages: [...state.messages, {id: new Date().getTime(), message: actions.newMessage}],
            }

        default:
            return state
    }
}

export const actions = {
    addMessageAC: (newMessage: string) => {
        return{
            type: 'dialogs/ADD-DIALOGS-MESSAGES',
            newMessage
        } as const
    }
}



export default dialogsReducer