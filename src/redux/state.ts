import {rerenderEntireTree} from "../render";

export type PostItemType = {
    id: number,
    message: string,
    likesCount: number
}
export type DialogItemType = {
    id: number,
    name: string
}
export  type MessageItemType = {
    id: number,
    message: string
}

export type ProfileStateType = {
    posts: Array<PostItemType>
}
export  type DialogsStateType = {
    dialogs: Array<DialogItemType>,
    messages: Array<MessageItemType>
}

export type StateType = {
    profileState: ProfileStateType,
    dialogsState: DialogsStateType
}

let state: StateType = {
    profileState: {
        posts: [
            {id: 1, message: 'Hi, hou are you', likesCount: 5},
            {id: 2, message: 'It\'s my first post', likesCount: 17}
        ]
    },
    dialogsState: {
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
}

export const addPost = (text: string) => {
    let newPost = {id: 5, message: text, likesCount: 0}
    state.profileState.posts.push(newPost)
    rerenderEntireTree(state)
}

 export default state