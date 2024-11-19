import {GetItemsType, instance, APIResponseType} from "./api";
import {profileAPI} from "./profile-api";

export const usersAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
        return (
            instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
                .then(res => res.data)
        )
    },


    unfollowUser: (userId: number) => {
        return (
            instance.delete<APIResponseType>(`follow/${userId}`)

        )
    },

    followUser: (userId: number) => {
        return (
            instance.post<APIResponseType>(`follow/${userId}`)

        )
    },
}