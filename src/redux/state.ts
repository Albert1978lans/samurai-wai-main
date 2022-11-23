let rerenderEntireTree = () => {
    console.log('Change')
}

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
    posts: Array<PostItemType>,
    valueTextarea: string
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
        ],
        valueTextarea: ''
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

export const addPost = () => {
    let newPost = {
        id: 5,
        message: state.profileState.valueTextarea,
        likesCount: 0
    }
    state.profileState.posts.push(newPost)
    state.profileState.valueTextarea = ''
    rerenderEntireTree()
}

export const changeTextarea = (valueTextarea: string) => {
    state.profileState.valueTextarea = valueTextarea
    rerenderEntireTree()
}

export const subscribe = (observer: ()=>void) => {
    rerenderEntireTree = observer
}

export default state