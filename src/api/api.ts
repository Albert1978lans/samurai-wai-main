import axios from "axios";
import {formDataType} from "../components/Login/Login";
import {ProfileType} from "../components/Profile/ProfileContainer";
import {formDataProfileType} from "../components/Profile/ProfileInfo/ProfileInfo";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "fa09fe93-1924-4677-a887-b6a4fe71cde2"
    }
})

export const usersAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data)
        )
    },


    unfollowUser: (userId: number) => {
        return (
            instance.delete<ResponseType>(`follow/${userId}`)
        )
    },

    followUser: (userId: number) => {
        return (
            instance.post<ResponseType>(`follow/${userId}`)
        )
    },

    getUser: (userId: number) => {
        console.warn('Obsolete method. Please profileApi object')
        return profileAPI.getProfile(userId)
    }

}

export const profileAPI = {

    getProfile: (userId: number) => {
        return (
            instance.get(`profile/${userId}`)
        )
    },

    getStatus: (userId: number) => {
        return (
            instance.get(`/profile/status/${userId}`)
        )
    },

    updateStatus: (status: string) => {
        return (
            instance.put(`/profile/status`, {status: status})
        )
    },

    savePhotos: (photoFile: File) => {
        const formData = new FormData()
        formData.append("image", photoFile)
        return (
            instance.put(`/profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        )
    },

    saveProfile: (formData: ProfileType) => {
        return (
            instance.put<ResponseType>(`/profile`, formData)
        )
    },

}

export const authAPI = {
    me: () => {
        return(
            instance.get(`auth/me`)
        )
    },
    login: (formData: formDataType) => {
        return (
            instance.post<{resultCode: number, messages: string[], data: {userId: number}}>(`auth/login`, formData)
        )
    },
    logout: () => {
        return (
            instance.delete<{resultCode: number, messages: string[], data: {}}>(`auth/login`)
        )
    }
}

export const securityAPI = {
    getCaptchaUrl: () => {
        return(
            instance.get<{url: string}>(`security/get-captcha-url`)
        )
    }
}

export type ResponseType <T = {}>= {
    data: T
    fieldsErrors: Array<string>
    messages: string[]
    resultCode: number
}


