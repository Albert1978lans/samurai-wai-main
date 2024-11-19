import {formDataType} from "../components/Login/Login";
import {instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum} from "./api";

type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    me: () => {
        return (
            instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
        )
    },
    login: (formData: formDataType) => {
        return (
            instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>
            (`auth/login`, formData).then(res => res.data)
        )
    },
    logout: () => {
        return (
            instance.delete<APIResponseType>(`auth/login`).then(res => res.data)
        )
    }
}