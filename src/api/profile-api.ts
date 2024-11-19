import {instance, APIResponseType} from "./api";
import {PhotosType, ProfileType} from "../types/types";

export const profileAPI = {

    getProfile: (userId: number) => {
        return (
            instance.get<ProfileType>(`profile/${userId}`)
                .then(res => res.data)
        )
    },

    getStatus: (userId: number) => {
        return (
            instance.get<string>(`/profile/status/${userId}`)
                .then(res => res.data)
        )
    },

    updateStatus: (status: string) => {
        return (
            instance.put<APIResponseType>(`/profile/status`, {status: status})
                .then(res => res.data)
        )
    },

    savePhotos: (photoFile: File) => {
        const formData = new FormData()
        formData.append("image", photoFile)
        return (
            instance.put<APIResponseType<{photos: PhotosType}>>(`/profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        )
    },

    saveProfile: (formData: ProfileType) => {
        return (
            instance.put<APIResponseType>(`/profile`, formData)
                .then(res => res.data)
        )
    },
}

