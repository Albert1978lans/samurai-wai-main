import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "3e10d153-598b-476d-835d-ac308d49aded"
    }
})

export const userAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data)
        )
    }
}

export const followedAPI = {

    unfollowUser: (userId: number) => {
        return (
            instance.delete(`follow/${userId}`)
        )
    },

    followUser: (userId: number) => {
        return (
            instance.post(`follow/${userId}`)
        )
    }
}




