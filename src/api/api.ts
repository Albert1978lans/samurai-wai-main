import axios from "axios";
import {UserType} from "../redux/users-reducer";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "6952ad27-0af4-4ffd-97b9-d4dd2e68bb7a"
    }
})

export type APIResponseType<D = {}, RC = ResultCodesEnum>= {
    data: D
    fieldsErrors: Array<string>
    messages: string[]
    resultCode: RC
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}


