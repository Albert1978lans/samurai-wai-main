import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "3e10d153-598b-476d-835d-ac308d49aded"
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
            instance.delete(`follow/${userId}`)
        )
    },

    followUser: (userId: number) => {
        return (
            instance.post(`follow/${userId}`)
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

}

export const authAPI = {
    me: () => {
        return(
            instance.get(`auth/me`)
        )
    }
}




