import {ActionsTypes, ProfileStateType} from "./state";

const ADD_POST = 'ADD-POST'
const CHANGE_TEXTAREA = 'CHANGE-TEXTAREA'



const profileReducer = (state: ProfileStateType, actions: ActionsTypes) => {

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