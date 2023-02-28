import {ActionsTypes, ProfileStateType} from "./store";

const ADD_POST = 'ADD-POST'
const CHANGE_TEXTAREA = 'CHANGE-TEXTAREA'

let initialState: ProfileStateType = {
    posts: [
        {id: 1, message: 'Hi, hou are you', likesCount: 5},
        {id: 2, message: 'It\'s my first post', likesCount: 17}
    ],
    valueTextarea: ''
}

const profileReducer = (state: ProfileStateType = initialState, actions: ActionsTypes): ProfileStateType => {
    // debugger
    switch (actions.type) {
        case ADD_POST:
            let newPost = {
                id: new Date().getTime(),
                message: state.valueTextarea,
                likesCount: 0
            }
            state.posts.push(newPost)
            state.valueTextarea = ''
            return state
        case CHANGE_TEXTAREA:
            state.valueTextarea = actions.valueTextarea
            return state
        default:
            return state
    }


}

export const changeTextareaActionCreator = (text: string) => {
    return {type: "CHANGE-TEXTAREA",
        valueTextarea: text
    } as const
        }

export const addPostActionCreator = () => {
    return {type: 'ADD-POST'} as const
        }

export default profileReducer