
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


export type StoreType = {
    _state: StateType
    _onChange: ()=>void
    changeTextarea: (valueTextarea: string)=>void
    addPost: ()=>void
    subscribe: (observer: ()=>void)=>void
    getState: ()=>StateType
}

const store: StoreType = {
    _state: {
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
    },

    changeTextarea(valueTextarea: string)  {
        this._state.profileState.valueTextarea = valueTextarea
        this._onChange()                                 //---?
    },
    addPost() {
        let newPost = {
            id: 5,
            message: this._state.profileState.valueTextarea,
            likesCount: 0
        }
        this._state.profileState.posts.push(newPost)
        this._state.profileState.valueTextarea = ''
        this._onChange()
    },
    _onChange()  {
        console.log('Change')
    },
    subscribe(observer: ()=>void) {
        this._onChange = observer
    },
    getState() {
        return this._state
    }
}

// window.store = store

export default store